import React, { useState, useEffect } from 'react'
import '../styles/Ticket.css'

const Ticket = () => {
  const [dtaDet, setDtaDet] = useState([{}])
  const vwData = async () => {
    const res = await fetch('http://localhost:5000/viewtickt', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const data = await res.json()
    console.log(data)
    setDtaDet(data)
  }
  useEffect(() => {
    vwData()
  },[])
  
  return (
    <>
    <div className='ticket'>
      <div className="heading">Account Details</div>
      <div className="info"><span>Here all the account details are listed by folllowing below.</span></div>
      <div className="list">
        <table border='1'>
          <thead>
            <tr>
              <th>Ticket Number</th>
              <th>Ticket Details</th>
              <th>Account Name</th>
              <th>Contest Name</th>
              <th>Edit Data</th>
              <th>Remove Data</th>
            </tr>
          </thead>
          <tbody>
            {
              dtaDet.map((dta, i) => (
                <tr key={i}>
                <td>{dta.ticket_no}</td>
                <td>{dta.ticket_details}</td>
                <td>{dta.account_name}</td>
                <td>{dta.contest_name}</td>
                <td><button className='opbtn'>_</button></td>
                <td><button className='opbtn'>x</button></td>
              </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
    </>
  )
}

export default Ticket