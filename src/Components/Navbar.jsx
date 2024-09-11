import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { HiMenu  , HiX} from "react-icons/hi";
import {  whitetextLogo } from '../assets/imgexp';
import LogoutBtn from '../Components/Authentication/LogoutBtn';
import { useSelector , useDispatch } from 'react-redux';



const Navbar = () => {

  // checking user login status
  const authStatus = useSelector((state) => state.auth.status )
  const [showlogout , setShowLogout] = useState(true)
  useEffect(() => {
    
    if (authStatus) {
      setShowLogout(true);
      
    } else {
      setShowLogout(false);
      
    }
  }, [authStatus]); // Re-run this effect when authStatus changes

  



  const [isOpen , setisOpen] = useState(false);
  const toggleMenu = () => {
    setisOpen(!isOpen);
  };

  const TOP_OFFSET = 50;
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);




  return (
<nav className={` sticky top-0 z-50  font-poppins  text-white ${showBackground ? "bg-black  bg-opacity-85 " : "bg-black "}  md:flex md:items-center md:justify-between`}>
      <div className='flex justify-between items-center'>
      <span className=' font-sedan cursor-pointer ml-6 py-2 ' >
{showBackground ? 
          <NavLink to="/">
            <img className=' inline  ml-4  bg-transparent w-40 object-cover' src={whitetextLogo} />
          </NavLink>
          
          // <h2>scroll logo</h2>
 :
          <NavLink to="/">
            <img className=' inline ml-4  bg-transparent w-40 object-cover' src={whitetextLogo} />
          </NavLink>
          
          // <h2>EduQuest</h2>
}  
        </span>

        <span className='text-3xl  mx-2 cursor-pointer md:hidden block' onClick={toggleMenu}>
        {isOpen ? <HiX /> : <HiMenu />}
        </span>
      </div>

      <ul className={`md:flex md:items-center md:static bg-gray-800 md:bg-transparent md:bg-opacity-65 w-full md:w-auto p-5 pt-3 pb-2   md:pl-0 pl-7  ease-in-out duration-300 ${isOpen ? 'top-[80px] opacity-100' : ' hidden md:block top-[-400px] opacity-0 md:opacity-100'}`}>
        <li className='mx-4  my-6 md:my-0'>
          <NavLink to="/" className='text-xl hover:text-red-800  duration-500' onClick={toggleMenu}>
            Home
          </NavLink>
        </li>
        <li className='mx-4 my-6 md:my-0'>
          <NavLink to="/course" className='text-xl hover:text-red-800  duration-500' onClick={toggleMenu}>
            Courses
          </NavLink>
        </li>
        <li className='mx-4 my-6 md:my-0'>
          <NavLink to="/about" className='text-xl  hover:text-red-800 duration-500' onClick={toggleMenu}>
            About
          </NavLink>
        </li>
        <li className='mx-4 my-6 md:my-0'>
          {showlogout ? (
            <div onClick={toggleMenu}>
              <LogoutBtn/>
            </div>
          ) : (
            <NavLink to="/login" className='text-xl px-2  bg-[#872346] rounded-md hover:text-[#6ee157] hover:bg-black duration-500' onClick={() => {toggleMenu();}}>
            Sign-In
          </NavLink>
          )}
          
        </li>
        
      </ul>
      
    </nav>
  )
}

export default Navbar
