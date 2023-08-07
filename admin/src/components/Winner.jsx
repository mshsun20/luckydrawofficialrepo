import React, { useState, useEffect } from 'react'
import '../styles/Winner.css'

const Winner = () => {
  const [dtaDet, setDtaDet] = useState([{}])
  const vwData = async () => {
    const res = await fetch('http://localhost:5000/viewwnr', {
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
    <div className='winner'>
      <div className="heading">Account Details</div>
      <div className="info"><span>Here all the account details are listed by folllowing below.</span></div>
      <div className="list">
        <table border='1'>
          <thead>
            <tr>
              <th>Winner Name</th>
              <th>Contest Name</th>
              <th>Prize Details</th>
              <th>Ticket Details</th>
              <th>Edit Data</th>
              <th>Remove Data</th>
            </tr>
          </thead>
          <tbody>
            {
              dtaDet.map((dta, i) => (
                <tr key={i}>
                <td>{dta.account_name}</td>
                <td>{dta.contest_name}</td>
                <td>{dta.prize_details}</td>
                <td>{dta.ticket_details}</td>
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

export default Winner