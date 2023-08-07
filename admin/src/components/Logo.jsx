import React from 'react'
import { NavLink } from 'react-router-dom'

const Logo = () => {
  return (
    <>
    <div className='navicon'>
      <NavLink to='/' className='navlnk'><img src="../logos/sm_logo1.png" alt="SM Logo" /></NavLink>
    </div>
    </>
  )
}

export default Logo