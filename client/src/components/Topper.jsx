import React from 'react'
import { NavLink } from 'react-router-dom'

const Topper = () => {
  return (
    <>
    <div className='topper'>
      <div className="tollfree">
        <span className='tinf'>Contact Us @ :: </span>
        <NavLink to='tel:18002022233' className='navlnk'><span>1800 202 2233</span></NavLink>
      </div>
    </div>
    </>
  )
}

export default Topper