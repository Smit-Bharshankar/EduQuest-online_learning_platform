import React from 'react'
import { toast } from 'react-toastify'

function Profile() {

  const handleClick = () => {
    toast.success("Your clicked successfully")
  }
  return (
    <div>
      <button className='flex justify-center items-center w-full h-screen' onClick={handleClick}>Click me</button>
    </div>
  )
}

export default Profile
