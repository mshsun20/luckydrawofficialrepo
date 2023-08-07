const express = require('express')
const dotenv = require('dotenv')
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
dotenv.config({path:'config.env'})


// middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(express.json())

// env variables
const port = process.env.PORT || 5000
const host = process.env.HOST || 'localhost'
const user = process.env.USER || 'root'
const password = process.env.PASSWORD || ''
const database = process.env.DATABASE || 'luckydrawdb'

// listening to server
app.listen(port,host, (req, res) => {
    console.log(`Server is Running at http://${host}:${port}`)
})

// DB Connection
const conn = mysql.createConnection({
    host, user, password, database, multipleStatements: true
})
conn.connect((err) => {
    if (err) throw err
    console.log('Successfully Connected to Database...')
})



// Routing
// ------------------------------------------------------------------------------
// app.get('/', (req, res) => {
//     res.send('Server is Online...')
// })

// Account api
// read
app.get('/viewacc', (req, res) => {
    const sql = `select * from account`
    conn.query(sql, (err, result) => {
        if (err) throw err.message
        res.json(result)
    })
})
// create
app.post('/pushacc', (req, res) => {
    const {account_phone, account_name, account_email} = req.body
    const sql = `select * from account`
    const sql2 = `insert into account(account_phone, account_name, account_email) values('${account_phone}', '${account_name}', '${account_email}')`
    let flag
    conn.query(sql, (err, result) => {
        if (err) throw err.message
        result.forEach(item => {
            if (account_phone == item.account_phone) {
                flag = 1
            }
        })
        if (flag == 1) {
            res.json({error: 'Number Exists.', statuscode: 422})
        }
        else {
            flag = 0
            conn.query(sql2, (err2, result2) => {
                if (err2) throw err2.message
                res.json(result2)
            })
        }
    })
})
// update
app.get('/editac/:id', (req, res) => {
    const id = req.params.id
    const sql = `select * from account where account_id = '${id}'`
    conn.query(sql, (err, result) => {
        if (err) throw err
        res.json(result)
    })
})
app.put('/updateacc/:id', (req, res) => {
    const accid = req.params.id
    const {account_phone, account_name, account_email} = req.body
    const sql = `update account set account_phone='${account_phone}', account_name='${account_name}', account_email='${account_email}' where account_id='${accid}'`
    conn.query(sql, (err, result) => {
        if (err) throw err.message
        res.send('Data Updated.')
    })
})
// delete
app.delete('/delacc/:id', (req, res) => {
    const accid = req.params.id
    const sql = `delete from account where account_id='${accid}'`
    conn.query(sql, (err, result) => {
        if (err) throw err
        res.send('Data Deleted.')
    })
})


// Contest api
app.get('/viewcntst', (req, res) => {
    conn.query('select * from contest inner join user on contest.createdby_id = user.user_id;select contest_id, count(contest_id) as count_cntst from ticket group by ticket.contest_id having count(contest_id)>0', (err, results) => {
        if (err) throw err.message
        res.json(results)
    })
})
app.get('/viewcntst/:id', (req, res) => {
    const cntstid = req.params.id
    const sql = `select * from contest inner join user on contest.createdby_id = user.user_id where contest.contest_id='${cntstid}'`
    conn.query(sql, (err, result) => {
        if (err) throw err.message
        res.json(result)
    })
})
// app.get('/participnt')


// Prize api
app.get('/viewprz', (req, res) => {
    const sql = `select * from prize inner join contest on prize.contest_id = contest.contest_id`
    conn.query(sql, (err, result) => {
        if (err) throw err.message
        res.json(result)
    })
})


// Ticket api
app.get('/viewtickt', (req, res) => {
    const sql = `select * from ticket inner join account on ticket.account_id = account.account_id inner join contest on ticket.contest_id = contest.contest_id`
    conn.query(sql, (err, result) => {
        if (err) throw err.message
        res.json(result)
    })
})
app.get('/viewtickt/:id', (req, res) => {
    const cntckid = req.params.id
    const sql = `select * from ticket inner join account on ticket.account_id = account.account_id inner join contest on ticket.contest_id = contest.contest_id where ticket.contest_id='${cntckid}'`
    conn.query(sql, (err, result) => {
        if (err) throw err.message
        res.json(result)
    })
})
// app.delete('/dlttickt/:id', (req, res) => {
//     const acc_id = req.params.id
//     const sql = `delete from ticket inner join account on ticket.account_id = account.account_id inner join contest on ticket.contest_id = contest.contest_id where ticket.account_id='${acc_id}'`
//     conn.query(sql, (err, result) => {
//         if (err) throw err.message
//         res.json(result)
//     })
// })


// Winner api
app.get('/viewwnr', (req, res) => {
    const sql = `select * from winner inner join account on winner.account_id = account.account_id inner join contest on winner.contest_id = contest.contest_id inner join prize on winner.prize_id = prize.prize_id inner join ticket on winner.ticket_no = ticket.ticket_no`
    conn.query(sql, (err, result) => {
        if (err) throw err.message
        res.json(result)
    })
})

