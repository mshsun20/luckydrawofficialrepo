import React, { useState, useEffect } from 'react'
import '../styles/Account.css'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { FaUserPlus, FaUserEdit, FaUserMinus } from 'react-icons/fa'


const Account = () => {
  const [dtaDet, setDtaDet] = useState([{}])
  const vwData = async () => {
    const res = await fetch('http://localhost:5000/viewacc', {
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

  const hndldlt = async (id) => {
    try {
      const res = await axios.delete('http://localhost:5000/delacc/'+id)
      const data = await res.data
      console.log(data)
      window.location.reload()
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <>
    <div className='account'>
      <div className="acchdng">Account Details</div>
      <div className="accdtl">
        <div className="accinf"><span>Here all the Account details are listed by folllowing table.</span></div>
        <div className="accadd"><span>Add Account click here : </span><NavLink to="/addacc" className='navlnk'><button className='addbtn'><FaUserPlus/></button></NavLink></div>
      </div>
      <div className="acclst">
        <span>Existing Account lists</span>
        <table className='acctbl'>
          <thead>
            <tr>
              <th>Phone Number</th>
              <th>Account Name</th>
              <th>Email Id</th>
              <th>Edit Data</th>
              <th>Remove Data</th>
            </tr>
          </thead>
          <tbody>
            {
              dtaDet.map((dta, i) => (
                <tr key={i}>
                <td>{dta.account_phone}</td>
                <td>{dta.account_name}</td>
                <td>{dta.account_email}</td>
                <td><NavLink to={`/editacc/${dta.account_id}`} className='navlnk'><button className='edtbtn'><FaUserEdit/></button></NavLink></td>
                <td><NavLink className='navlnk' onClick={ev => hndldlt(dta.account_id)}><button className='dltbtn'><FaUserMinus/></button></NavLink></td>
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

export default Account