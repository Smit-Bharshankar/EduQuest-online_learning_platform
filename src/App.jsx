import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import authService from './Appwrite/auth';
import { login, logout } from './store/authSlice';
import { userRegister, setProfilePicUrl } from './store/registerSlice';

import MainLayout from './MainLayout';
import Home from './Components/Home/Home';
import Course from './Components/Courses/Course';
import Login from './Components/Authentication/Login';
import Profile from './Components/Profile/Profile';
import About from './Components/AboutUs/About';
import LessonList from './Components/Courses/LessonList';
import 'react-toastify/dist/ReactToastify.css';
import ScrolltoTop from './ScrolltoTop';
import EditProfile from './Components/Profile/EditProfile';
import service from './Appwrite/configure';

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // For error handling
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.auth.userData?.email);

  // Effect to check if the user is authenticated and fetch current user
  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
          toast.success("Welcome back!");
        } else {
          dispatch(logout());
          toast.info("You are not logged in.");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred while checking authentication.");
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  // Effect to fetch user details and profile picture
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        if (userEmail) {
          const userId = await service.findUserByEmail(userEmail);
          const userData = await service.findUserById(userId);

          if (userData) {
            const { $id, userID, userName, email, location, dob: birthDate, contact, profilePicture } = userData;

            console.log("Profile Picture ID:", profilePicture);

            if (!profilePicture) {
              console.log("Profile picture is missing in user data");
            } else {
              try {
                const profilePicUrl = await service.getProfilePic(profilePicture); // Await here
                if (!profilePicUrl) {
                  throw new Error('Profile Picture not found');
                }
                dispatch(setProfilePicUrl(profilePicUrl)); // Dispatch profile picture URL to Redux store
              } catch (error) {
                console.error('Error while fetching profile picture:', error);
                setError(error.message || 'Error fetching profile picture');
              }
            }

            // Dispatch user details to Redux store
            dispatch(
              userRegister({
                profileInfo: {
                  $id,
                  userID,
                  userName,
                  email,
                  location,
                  dob: birthDate,
                  contact,
                  profilePicture, // Pass the profile picture ID to Redux
                },
              })
            );
          }
        }
      } catch (error) {
        console.error("Failed to fetch user details:", error);
        setError('Failed to fetch user details');
      }
    };

    getUserDetails();
  }, [userEmail, dispatch]); // Include necessary dependencies

  // Loading indicator while checking authentication
  if (loading) {
    return (
      <div className="flex flex-row w-full h-screen items-center justify-center gap-2">
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastStyle={{
          maxWidth: '300px',
          borderRadius: '4px',
          fontSize: "0.875rem",
          padding: "8px",
          color: '#050505',
          fontFamily: 'Poppins',
        }}
      />
      <ScrolltoTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="course" element={<Course />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="about" element={<About />} />
          <Route path="editprofile" element={<EditProfile />} />
          <Route path="/course/:courseId/lessons" element={<LessonList />} />
        </Route>
        <Route path="*" element={<div className="flex items-center justify-center w-full h-screen text-6xl">404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
