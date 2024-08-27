import React from 'react'
import { useDispatch } from 'react-redux'
import authservice from '../Appwrite/auth'
import { logout } from '../store/authSlice'
import { useNavigate } from 'react-router-dom'

function LogoutBtn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        authservice.logout().then(()=>{dispatch(logout())}).catch((error) => {console.error(error)})
    }

    const handlenavigate = () => {
      navigate('/')
    }

  return (
    <button onClick={() => {handleLogout(); handlenavigate();}} className='px-2 text-xl rounded-md  bg-[#3e2371]'>
      Logout
    </button>
  )
}

export default LogoutBtn
