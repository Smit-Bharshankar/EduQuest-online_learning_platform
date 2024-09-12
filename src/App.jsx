import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import authService from './Appwrite/auth';
import { login, logout } from './store/authSlice';

import MainLayout from './MainLayout';
import Home from './Components/Home/Home';
import Course from './Components/Courses/Course';
import Login from './Components/Authentication/Login';
import Profile from './Components/Profile';
import About from './Components/AboutUs/About';
import LessonList from './Components/Courses/LessonList';
import 'react-toastify/dist/ReactToastify.css';
import ScrolltoTop from './ScrolltoTop'

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
          toast.success("Welcome back!"); // Show success toast
        } else {
          dispatch(logout());
          toast.info("You are not logged in."); // Show info toast
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred while checking authentication."); // Show error toast
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

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
        position="top-left" // Adjust to 'top-center' or any other suitable position
        autoClose={3000} // Set auto-close duration to 3 seconds
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastStyle={{
          maxWidth: '300px', // Set maximum width for the toast
          borderRadius: '4px',
          fontSize: "0.875rem", // Adjust font size for a more compact message
          padding: "8px", // Adjust padding to make it less intrusive
          color: '#050505',
          fontFamily:'poppins'
        }}  />

        <ScrolltoTop />
      <Routes>
        {/* MainLayout as the parent route */}
        <Route path="/" element={<MainLayout />}>
          {/* Nested routes */}
          <Route index element={<Home />} /> {/* Default child route */}
          <Route path="course" element={<Course />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="about" element={<About />} />
          <Route path="/course/:courseId/lessons" element={<LessonList />} />
        </Route>
        {/* Optional NotFound route */}
        <Route path="*" element={<div className='flex items-center justify-center w-full h-screen text-6xl'>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
