import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './MainLayout';
import Home from './Components/Home/Home';
import Course from './Components/Course';
import Login from './Components/Login'
import Profile from './Components/Profile';
import About from './Components/About'

function App() {
  const [count, setCount] = useState(0);

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
