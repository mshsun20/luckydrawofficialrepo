import React from 'react'
import Brandlabel from './Brandlabel'

const Header = () => {
  return (
    <>
        <div className='header'>
          <div className="smlogo"><img src='../logos/sm_logo1.png' alt="SM Logo" /></div>
          <Brandlabel/>
          <div className="sellogo"><img src='../logos/sel_logo.png' alt="SEL Logo" /></div>
        </div>
    </>
  )
}

export default Header