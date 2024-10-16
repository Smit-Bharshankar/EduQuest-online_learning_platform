import React, { useEffect, useState } from 'react';
import RegistrationForm from './RegistrationForm';
import { useDispatch, useSelector } from 'react-redux';
import service from '../../Appwrite/configure';
import Dashboard from './Dashboard'; // Corrected typo in "Dashboard"
import { userRegister } from '../../store/registerSlice';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


function Profile() {
  const dispatch = useDispatch(); // Initialize dispatch
  const navigate = useNavigate();
  const userRegistered = useSelector((state) => state.register.isRegistered);
  const userEmail = useSelector((state) => state.auth.userData?.email);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      
      if (!userEmail) {
        setLoading(false);
        setError('User is not logged in.');
        toast.info("Login to view Profile")
        navigate('/login')
        return;
      }
  
      try {
        const userId = await service.findUserByEmail(userEmail);
        const userData = await service.findUserById(userId);
  
        // Log userData to verify its content
        console.log("Fetched user data:", userData);
  
        if (userData) {
          // Destructure the fields and log them to check for null/undefined values
          const {$id , userID , userName, email, location, dob: birthDate, contact, profilePicture } = userData;
          
          console.log("Profile Picture ID:", profilePicture);
  
          if (!profilePicture) {
            console.log("profileImgId is missing in user data");
          }
  
          setUser(userData);
  
          // Dispatch user registration with profile info
          dispatch(
            userRegister({
                profileInfo: {
                  $id : $id,
                  userID: userID,
                    userName,
                    email,
                    location,
                    dob: birthDate,
                    contact,
                    profilePicture, // Use profilePicture here
                },
            })
        );

        } else {
          setError('User data not found.');
          setShowRegisterForm(true)
        };
      } catch (error) {
        setError('Error fetching user data');
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, [userEmail, dispatch]);
   // Added dispatch to dependencies

  useEffect(() => {
    if (userRegistered) {
      setShowRegisterForm(false);
    } else {
      setShowRegisterForm(true);
    }
  }, [userRegistered,userEmail, user]); // Added user to dependencies

  if (loading) {
    return (
      <div className="flex flex-row w-full h-screen items-center justify-center gap-2">
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
      </div>
    );
  }

  if (showRegisterForm) {
    return <RegistrationForm />;
  }

  if (error) {
    return (
      <div className="flex w-full h-full min-h-[400px] items-center justify-center">
        <p className="text-3xl italic">{error}</p>
      </div>
    );
  }

  

  return <Dashboard />;
}

export default Profile;
