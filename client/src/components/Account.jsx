import React, { useState } from 'react'
import '../styles/acc.css'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import axios from 'axios'

const Account = () => {
  const [acc, setAcc] = useState({account_phone:'', account_name:'', account_email:''})
  const navig = useNavigate()
  let name, value
  const hndlChng = (e) => {
    name = e.target.name
    value = e.target.value
    setAcc({...acc, [name]:[value]})
  }
  const hndlSbmt = async (ev) => {
    ev.preventDefault()
    const {account_phone, account_name, account_email} = acc
    const res = await axios.post('http://localhost:5000/pushacc', {
      account_phone, account_name, account_email
    })
    const data = await res.data
    // console.log(data)
    if (data.statuscode === 422) {
      window.alert('Phone Number Already Exists.')
    }
    else {
      window.alert('Account Added Successfully')
      navig('/questionnair')
    }
  }

  return (
    <>
        <div className='wrap'>
          <Header/>
          <div className="container">
            <div className="main">
              <div className="accreate">
                <div className="frmhead">Create Your Account</div>
                <div className="accfrm">
                  <form className='frm'>
                    <div className="frmgrp">
                      <label htmlFor="account_phone">Phone Number : </label>
                      <input type="text" name="account_phone" id="account_phone" onChange={hndlChng}/>
                      <div className="numvld"></div>
                    </div>
                    <div className="frmgrp">
                      <label htmlFor="account_name">Account Name : </label>
                      <input type="text" name="account_name" id="account_name" onChange={hndlChng}/>
                      <div className="nmvld"></div>
                    </div>
                    <div className="frmgrp">
                      <label htmlFor="account_email">Email Address : </label>
                      <input type="text" name="account_email" id="account_email" onChange={hndlChng} />
                      <div className="emlvld"></div>
                    </div>
                    <div className="frmgrp">
                      <input type="submit" value="Create" onClick={hndlSbmt} />
                    </div>
                  </form>
                </div>
              </div>
              <div className="substatus"></div>
            </div>
          </div>
          <Footer/>
        </div>
    </>
  )
}

export default Account