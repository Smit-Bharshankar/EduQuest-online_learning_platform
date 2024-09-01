import React from 'react';
import { useDispatch } from 'react-redux';
import authservice from '../../Appwrite/auth';
import { logout } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Importing toast from react-toastify

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authservice.logout(); // Wait for logout to complete
      dispatch(logout());
      toast.success("Logout Successful!"); // Display success message
      navigate('/'); // Navigate to homepage
    } catch (error) {
      console.error(error);
      toast.error("Logout Failed. Please try again."); // Display error message if logout fails
    }
  };

  return (
    <button 
      onClick={handleLogout} 
      className='px-2 text-xl rounded-md bg-[#3e2371] text-white hover:bg-[#5a3a91] transition duration-200'
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
