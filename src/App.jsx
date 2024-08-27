import { useState , useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import authService from './Appwrite/auth';
import { login , logout } from './store/authSlice';

import MainLayout from './MainLayout';
import Home from './Components/Home/Home';
import Course from './Components/Courses/Course';
import Login from './Components/Login'
import Profile from './Components/Profile';
import About from './Components/About'
import LessonList from './Components/Courses/LessonList';

function App() {
  const [loading , setLoading ] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .catch((error) => {
      console.error(error)
    })
    .finally( () => setLoading(false))
  } , [])


  if (loading) {
    return ( 
     /* From Uiverse.io by Javierrocadev */ 
<div className="flex flex-row w-full h-screen items-center justify-center gap-2">
  <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
  <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
  <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
</div>
    )
  }

  return (
    <BrowserRouter>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
