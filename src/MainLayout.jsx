import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer/Footer'

function MainLayout() {
  return (
    <div className="min-h-[100vh] flex flex-col">
      <Navbar />
      <div className="flex-grow"> {/* This ensures the content grows and the footer stays at the bottom */}
        <Outlet /> {/* This will render the Home component by default */}
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout
