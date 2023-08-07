import React from 'react'
import Logo from './Logo'
import Brandlabel from './Brandlabel'
import Navbar from './Navbar'

const Header = () => {
  return (
    <>
    <div className='header'>
      <Logo/>
      <Brandlabel/>
      <Navbar/>
    </div>
    </>
  )
}

export default Header