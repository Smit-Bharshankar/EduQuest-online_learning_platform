import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowDown , IoIosArrowUp } from "react-icons/io";


const CourseCard = ({ title, description, date, courseId, thumbnailUrl }) => {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const [forwardtoSignin, SetForwardtoSignin] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false); // State to control description

  useEffect(() => {
    if (authStatus) {
      SetForwardtoSignin(false);
    } else {
      SetForwardtoSignin(true);
    }
  }, [authStatus]);

  const handleEnroll = () => {
    console.log(`Enroll in course with ID: ${courseId}`);
    if (forwardtoSignin) {
      navigate('/login');
    } else {
      navigate(`/course/${courseId}/lessons`);
    }
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription); // Toggle full description
  };

  return (
    
    <div className="card font-poppins md:mt-1 mt-6 w-80 h-auto rounded-2xl bg-[#212121] shadow-[15px_15px_30px_rgb(25,25,25),-15px_-15px_30px_rgb(60,60,60)] text-gray-700">
      <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-gradient-to-r from-[#49848b] to-[#1d7454] shadow-lg shadow-blue-gray-500/40">
        <img src={thumbnailUrl} alt={title} className="w-full h-48 object-cover" />
      </div>
      <div className="p-6">
        <h5 className="text-xl font-semibold leading-snug text-gray-400">{title}</h5>
        <p className={`text-base my-2 font-light leading-relaxed ${showFullDescription ? '' : 'line-clamp-5'}`}>
          {description}
        </p>
        <button
          className="text-blue-500 text-sm underline pb-4"
          onClick={toggleDescription}
        >
          {showFullDescription ? <IoIosArrowUp size={20}/> : <IoIosArrowDown  size={20}/>   }
        </button>
        <p className="text-gray-400 text-sm mb-4">{new Date(date).toLocaleDateString()}</p>
      </div>
      <div className="p-6 pt-0">
        <button
          onClick={handleEnroll}
          className="rounded-lg bg-[#472474] py-3 px-6 text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-85 focus:shadow-none active:opacity-85 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          Enroll Now
        </button>
      </div>
    </div>
    
  );
};

export default CourseCard;
