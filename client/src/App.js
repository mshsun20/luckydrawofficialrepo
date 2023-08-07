import React from 'react'
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Topper from './components/Topper'
import Account from './components/Account'
import Questionnair from './components/Questionnair'
import Contest from './components/Contest'
import Raffle from './components/Raffle'
import Errorpage from './components/Errorpage'


const App = () => {
  return (
    <>
        <div className="wrapper">
          <Topper/>
          <Routes>
            <Route exact path='/' element={<Account/>}></Route>
            <Route path='/contest' element={<Contest/>}></Route>
            <Route path='/questionnair' Component={Questionnair}></Route>
            <Route path='/raffle/:id' Component={Raffle}></Route>
            <Route path='*' element={<Errorpage/>}></Route>
          </Routes>
        </div>
    </>
  )
}

export default App