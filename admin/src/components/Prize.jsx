import React, { useState, useEffect } from 'react'
import '../styles/Prize.css'

const Prize = () => {
  const [dtaDet, setDtaDet] = useState([{}])
  const vwData = async () => {
    const res = await fetch('http://localhost:5000/viewprz', {
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
    <div className='prize'>
      <div className="heading">Account Details</div>
      <div className="info"><span>Here all the account details are listed by folllowing below.</span></div>
      <div className="list">
        <table border='1'>
          <thead>
            <tr>
              <th>Prize Name</th>
              <th>Prize Details</th>
              <th>Contest Name</th>
              <th>Created By</th>
              <th>Edit Data</th>
              <th>Remove Data</th>
            </tr>
          </thead>
          <tbody>
            {
              dtaDet.map((dta, i) => (
                <tr key={i}>
                <td>{dta.prize_name}</td>
                <td>{dta.prize_details}</td>
                <td>{dta.contest_name}</td>
                <td>{dta.user_name}</td>
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

export default Prize