import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Addacc = () => {
    const navigate = useNavigate()
    const [acc, setAcc] = useState({account_phone:'', account_name:'', account_email:''})
    let name, value
    const handlChang = (e) => {
        name = e.target.name
        value = e.target.value
        setAcc({...acc, [name]:[value]})
    }
    const hndlSubmt = async (ev) => {
        ev.preventDefault()
        const {account_phone, account_name, account_email} = acc
        const res = await fetch('http://localhost:5000/pushacc', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                account_phone, account_name, account_email
            })
        })
        const data = await res.json()
        console.log(data);
        if (data.statuscode === 422) {
            window.alert('Phone Number Already Exists.')
        }
        else {
            window.alert('Account Added Successfully')
            navigate('/account')
        }
    }

  return (
    <>
        <div className='accform'>
            <div className="hdr"></div>
            <div className="frm">
                <form method='POST' className='frmsec' noValidate>
                    <div className='frmgrp'>
                        <label htmlFor="account_phone" className="frmlbl">Phone Number :</label>
                        <input type="text" name="account_phone" id="account_phone" className="frmfld" value={acc.account_phone} onChange={handlChang} />
                        <div className="frmvald"></div>
                    </div>
                    <div className='frmgrp'>
                        <label htmlFor="account_name" className="frmlbl">Account Name :</label>
                        <input type="text" name="account_name" id="account_name" className="frmfld" value={acc.account_name} onChange={handlChang} />
                        <div className="frmvald"></div>
                    </div>
                    <div className='frmgrp'>
                        <label htmlFor="account_email" className="frmlbl">Email Id :</label>
                        <input type="email" name="account_email" id="account_email" className="frmfld" value={acc.account_email} onChange={handlChang} />
                        <div className="frmvald"></div>
                    </div>
                    <div className='frmgrp'>
                        <input type="submit" value="Add Account" className="frmfld" onClick={hndlSubmt} />
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default Addacc