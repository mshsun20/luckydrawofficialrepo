import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/cntst.css'
import axios from 'axios'
import Header from './Header'
import Footer from './Footer'

const Contest = () => {
    // let c = 0
    const [dtaa, setDtaa] = useState([])
    const [dtab, setDtab] = useState([])
    const vwCntst = async () => {
        const res = await axios.get('http://localhost:5000/viewcntst')
        const dataa = await res.data[0]
        const datab = await res.data[1]
        console.log(dataa)
        console.log(datab);
        setDtaa(dataa)
        setDtab(datab)
    }
    useEffect(() => {
        vwCntst()
    }, [])

  return (
    <>
        <div className='wrap'>
          <Header/>
          <div className="container">
            <div className="main">
              <div className="cntsthd">Select any Contest</div>
              <div className="cntstcrd">
                <table className='cntsttbl'>
                  <thead>
                    <tr>
                      <th>Sl. No.</th>
                      <th>Contest</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      dtaa.map((elm, i) => (                            
                        <tr key={i}>
                          <td>{i+1}</td>
                          <td><NavLink to={`/raffle/${elm.contest_id}`} className='navlnk'>{elm.contest_name}</NavLink></td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
                <table className='cntsttbl'>
                  <thead>
                    <tr>
                      <th>Participants</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      dtab.map((elm, i) => (
                        <tr key={i}>
                          <td>{elm.count_cntst}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Footer/>
        </div>
    </>
  )
}

export default Contest