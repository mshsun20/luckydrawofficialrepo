import React from 'react'
import Hero from './Hero'
import About from './About'
import Contact from './Contact'

const Home = () => {
  return (
    <>
    <div className='main'>
      <Hero/>
      <About/>
      <Contact/>
    </div>
    </>
  )
}

export default Home