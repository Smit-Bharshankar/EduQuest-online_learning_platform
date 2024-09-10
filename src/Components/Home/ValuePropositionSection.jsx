import React  from "react";
import { NavLink } from "react-router-dom";
import { FaChalkboardTeacher, FaLaptopCode, FaCertificate, FaUserGraduate } from "react-icons/fa";

const ValuePropositionSection = () => {
  return (
    <div className="bg-gradient-to-br from-purple-100 via-blue-50 to-teal-100 mt-8 py-16 px-4 text-center md:text-left md:px-12"
    
    >
      <h2 className="text-4xl font-bold mb-4">Empower Your Career with the Right Skills</h2>
      <p className="text-xl text-gray-700 mb-10">
        Learn from the best instructors, engage in interactive courses, and earn certifications to boost your career prospects.
      </p>

      {/* Key Benefits */}
      <div className="flex flex-wrap w-full justify-center gap-6">
        <div className="flex flex-col items-center md:items-start">
          <FaChalkboardTeacher className="text-4xl text-blue-500 mb-3" />
          <h3 className="text-lg font-semibold">Expert Instructors</h3>
          <p className="text-gray-600 text">Learn from professionals with real-world experience.</p>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <FaLaptopCode className="text-4xl text-blue-500 mb-3" />
          <h3 className="text-lg font-semibold">Interactive Courses</h3>
          <p className="text-gray-600">Hands-on exercises and projects to build real-world skills.</p>
        </div>
        
        <div className="flex flex-col items-center md:items-start">
          <FaUserGraduate className="text-4xl text-blue-500 mb-3" />
          <h3 className="text-lg font-semibold">24/7 Access</h3>
          <p className="text-gray-600">Learn at your own pace, anytime, anywhere.</p>
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-10 w-full flex items-center justify-center">
        <NavLink to={'/course'}>
        <button className="bg-purple-500 text-white py-3 px-8 rounded-lg hover:bg-purple-700 transition duration-300">
          Get Started for Free
        </button>
        </NavLink>
      </div>
    </div>
  );
};

export default ValuePropositionSection;
