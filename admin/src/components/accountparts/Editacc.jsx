import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Editacc = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const [dtaDet, setDtaDet] = useState({account_phone:'', account_name:'', account_email:''})
    let name, value
    const vwData = async () => {
        const res = await axios.get('http://localhost:5000/editac/'+id)
        const data = await res.data[0]
        console.log(data)
        setDtaDet(data)
    }
    useEffect(() => {
        vwData()
    },[])
    const handlChang = (e) => {
        name = e.target.name
        value = e.target.value
        setDtaDet({...dtaDet, [name]:[value]})
    }
    const hndlSubmt = async (ev) => {
        ev.preventDefault()
        const {account_phone, account_name, account_email} = dtaDet
        const res = await axios.put('http://localhost:5000/updateacc/'+id, {
            account_phone, account_name, account_email
        })
        const data = await res.data
        console.log(data);
        if (!data) {
            window.alert('Data Could not be Updated.')
        }
        else {
            window.alert('Account Updated Successfully')
            navigate('/account')
        }
    }

  return (
    <>
        <div className='accform'>
            <div className="hdr"></div>
            <div className="frm">
                <form className='frmsec' noValidate>
                    <div className='frmgrp'>
                        <label htmlFor="account_phone" className="frmlbl">Phone Number : </label>
                        <input type="text" name="account_phone" id="account_phone" className="frmfld" value={dtaDet.account_phone} onChange={handlChang} />
                        <div className="frmvald"></div>
                    </div>
                    <div className='frmgrp'>
                        <label htmlFor="account_name" className="frmlbl">Account Name :</label>
                        <input type="text" name="account_name" id="account_name" className="frmfld" value={dtaDet.account_name} onChange={handlChang} />
                        <div className="frmvald"></div>
                    </div>
                    <div className='frmgrp'>
                        <label htmlFor="account_email" className="frmlbl">Email Id :</label>
                        <input type="email" name="account_email" id="account_email" className="frmfld" value={dtaDet.account_email} onChange={handlChang} />
                        <div className="frmvald"></div>
                    </div>
                    <div className='frmgrp'>
                        <input type="submit" value="Update Account" className="frmfld" onClick={hndlSubmt} />
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default Editacc