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
import ViewResult from './Components/CourseTest/ViewResult';
import TestComponent from './Components/CourseTest/TestComponent';

function App() {
  const [authLoading, setAuthLoading] = useState(true); // Separate loading state for authentication
  const [profileLoading, setProfileLoading] = useState(false); // Separate loading state for profile fetching
  const [error, setError] = useState(null); // For error handling
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.auth.userData?.email);

  // Effect to check if the user is authenticated and fetch current user
  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login({ userData }));
          toast.success("Welcome back!");
        } else {
          dispatch(logout());
          toast.info("You are not logged in.");
        }
      } catch (error) {
        console.error("Authentication error:", error);
        toast.error("An error occurred while checking authentication.");
      } finally {
        setAuthLoading(false);
      }
    };

    fetchAuthStatus();
  }, [dispatch]); // Removed unnecessary dependencies

  // Effect to fetch user details and profile picture
  useEffect(() => {
    if (!userEmail) return; // Early exit if userEmail is not available

    const getUserDetails = async () => {
      setProfileLoading(true); // Start profile-specific loading
      try {
        const userId = await service.findUserByEmail(userEmail);
        if (!userId) throw new Error("User not found");

        const userData = await service.findUserById(userId);
        if (!userData) throw new Error("User data could not be retrieved");

        const { $id, userID, userName, email, location, dob: birthDate, contact, profilePicture } = userData;

        // Fetch profile picture if available
        if (profilePicture) {
          try {
            const profilePicUrl = await service.getProfilePic(profilePicture);
            if (!profilePicUrl) throw new Error("Profile picture could not be fetched");
            dispatch(setProfilePicUrl(profilePicUrl));
          } catch (profileError) {
            console.error("Profile picture error:", profileError);
          }
        }

        // Dispatch user details
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
              profilePicture,
            },
          })
        );
      } catch (error) {
        console.error("Failed to fetch user details:", error);
        setError('Failed to fetch user details');
      } finally {
        setProfileLoading(false);
      }
    };

    getUserDetails();
  }, [userEmail, dispatch]);

  // Separate loading indicators for authentication and profile fetching
  if (authLoading || profileLoading) {
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
          <Route path="/course/:courseId/test" element={<TestComponent />} />
          <Route path="/results" element={<ViewResult />} />
          <Route path="editprofile" element={<EditProfile />} />
          <Route path="/course/:courseId/lessons" element={<LessonList />} />
        </Route>
        <Route path="*" element={<div className="flex items-center justify-center w-full h-screen text-6xl">404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
