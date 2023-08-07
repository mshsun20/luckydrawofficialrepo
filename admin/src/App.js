import React from 'react'
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Topper from './components/Topper'
import Header from './components/Header'
import Home from './components/Home'
import Footer from './components/Footer'
import Account from './components/Account'
import Addacc from './components/accountparts/Addacc'
import Editacc from './components/accountparts/Editacc'
import Contest from './components/Contest'
import Prize from './components/Prize'
import Ticket from './components/Ticket'
import User from './components/User'
import Winner from './components/Winner'
import Errorpage from './components/Errorpage'


const App = () => {
  return (
    <>
        <div className="wrapper">
          <Topper/>
          <Header/>
          <div className='container'>
            <Routes>
              <Route exact path='/' element={<Home/>}></Route>
              <Route path='/account' element={<Account/>}></Route>
              <Route path='/addacc' Component={Addacc}></Route>
              <Route path='/editacc/:id' Component={Editacc}></Route>
              <Route path='/contest' Component={Contest}></Route>
              <Route path='/prize' Component={Prize}></Route>
              <Route path='/ticket' Component={Ticket}></Route>
              <Route path='/user' element={<User/>}></Route>
              <Route path='/winner' Component={Winner}></Route>
              <Route path='*' element={<Errorpage/>}></Route>
            </Routes>
          </div>
          <Footer/>
        </div>
    </>
  )
}

export default App