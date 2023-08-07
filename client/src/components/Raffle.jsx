import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../styles/rffl.css'
import axios from 'axios'
import SlotCounter from 'react-slot-counter'

const Raffle = () => {
  const navig = useNavigate()
  let tm = new Date().toLocaleTimeString()
  let rndvl=0
  const {id} = useParams()
  const [cntckDta, setCntckDta] = useState([{}])
  const [curtm, setCurtm] = useState(tm)
  const [tckt, setTckt] = useState([{}])
  // const [tckt, setTckt] = useState('000000')
  const counterRef = useRef(null)

  // show contest info
  const getcntst = async () => {
    const resb = await axios.get('http://localhost:5000/viewtickt/'+id)
    const data = await resb.data
    // console.log(data)
    if (data) {
      setCntckDta(data)
    }
    else {
      console.log(`No Such Ticket Assigned with Contest: ""`)
    }
  }
  useEffect(() => {
    getcntst()
  }, [])

  // dynamic clock
  const gettime = () => {
    tm = new Date().toLocaleTimeString()
    setCurtm(tm)
  }
  setInterval(() => {
    gettime()
  }, 1000)

  // random ticket selection
  const randselct = async () => {
    const res = await axios.get('http://localhost:5000/viewtickt/'+id)
    const data = await res.data
    rndvl = data[Math.floor(Math.random()*(data.length))]
    console.log(rndvl.ticket_no)
    document.querySelector('.slotm').style.display = 'flex'
    setTckt(rndvl)
    // setCurAcc(rndvl.account_id)
    // setTckt(String(rndvl.ticket_no))
    counterRef.current?.startAnimation({duration:5, dummyCharacterCount:100})
  }
  const a = (String(tckt.ticket_no)).slice(0,1)
  const b = (String(tckt.ticket_no)).slice(1,2)
  const c = (String(tckt.ticket_no)).slice(2,3)
  const d = (String(tckt.ticket_no)).slice(3,4)
  const e = (String(tckt.ticket_no)).slice(4,5)
  const f = (String(tckt.ticket_no)).slice(5,6)

  const resetrnd = async () => {
    try {
      // const acc_id = curAcc
      // const res = await axios.delete('http://localhost:5000/dlttickt/'+acc_id)
      // const data = await res.data
      // console.log(data)
      // window.location.reload()
      // document.querySelector('.slotm').style.display = 'none'
      // setTckt('000000')
      navig('/contest')
    } catch (error) {
      console.error(error.message)
    }
  }

  
  return (
    <>
        <div className='wrap'>
          <div className="headr">
            <div className="smlgo">
              <img src='../logos/sm_logo1.png' alt="SM Logo" />
            </div>
            <div className="hdng">
              <div className="cntst">
                <table>
                  <thead>
                    <tr>
                      <th>Ticket Details</th>
                      <th>Contest Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      cntckDta.map((elm, i) => (
                        <tr key={i}>
                          <td>{elm.ticket_details}</td>
                          <td>{elm.contest_name}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
              <div className="timrpart">
                <div className="timr"><span>{curtm}</span></div>
              </div>
            </div>
            <div className="selgo">
              <img src='../logos/sel_logo.png' alt="SEL Logo" />
            </div>
          </div>
          <div className="rcontainer">
            <div className="sidecanvas">
              <div className="postera"><img src="../photos/sk2.png" alt="SK Fist" /></div>
              <div className="posterb"><img src="../photos/sk.jpg" alt="SK Fist" /></div>
            </div>
            <div className="maindv">
              <div className="ticker"></div>
              <div className="game">
                <div className="slotm">
                  <span>{a}</span>
                  <span>{b}</span>
                  <span>{c}</span>
                  <span>{d}</span>
                  <span>{e}</span>
                  <span>{f}</span>
                  {/* <SlotCounter value={tckt} containerClassName="slot-counter" charClassName="sltch" separatorClassName="sep" animateUnchanged direction="top-down" autoAnimationStart={false} ref={counterRef} /> */}
                </div>
                <div className="trigger">
                  <button id='runbtn' onClick={randselct}>Run Contest</button>
                  <button id='chngbtn' onClick={resetrnd}>Select Other Contest</button>
                </div>
              </div>
            </div>
            <div className="prizedtl"></div>
          </div>
          <div className="footr"></div>
        </div>
    </>
  )
}

export default Raffle