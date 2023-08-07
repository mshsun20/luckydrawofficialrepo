import React from 'react'
import { NavLink } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'

const Navbar = () => {
  return (
    <>
    <div className='navmenu'>
      <div className="mainmenu">
        <NavLink to="/" className='navlnk'>Home</NavLink>
        <NavLink to="/account" className='navlnk'>Accounts</NavLink>
        <NavLink to="/contest" className='navlnk'>Contests</NavLink>
        <NavLink to="/prize" className='navlnk'>Prizes</NavLink>
        <NavLink to="/ticket" className='navlnk'>Tickets</NavLink>
        <NavLink to="/winner" className='navlnk'>Winners</NavLink>
      </div>
      <div className="hambergermenu"><NavLink className='navlnk'><GiHamburgerMenu/></NavLink></div>
    </div>
    </>
  )
}

export default Navbar