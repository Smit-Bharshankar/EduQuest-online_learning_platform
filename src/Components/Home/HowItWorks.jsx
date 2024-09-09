import React from 'react'
import { FaUserPlus , FaCertificate , FaPlayCircle , FaBookOpen } from "react-icons/fa";


function HowItWorks() {
  return (
    <>
          <div className='flex md:flex-row flex-col items-center justify-center max-h-full w-full pt-20 pb-8'>
              <h1 className='text-4xl font-bold font-poppins text-slate-700'>Start Learning with </h1>
              <h2 className=' pl-2 text-4xl font-bold font-poppins text-black'>4 easy Steps</h2>
          </div>

   <div className="flex flex-col md:flex-row justify-center  px-4 items-center mt-10 gap-8">
  {/* Step 1 */}
  <div className="flex flex-col items-center text-center p-6 bg-white shadow-gray-500 shadow-lg rounded-lg hover:scale-105 transition-transform duration-300">
    <FaUserPlus className="text-4xl text-blue-500 mb-4" />
    <h3 className="text-xl font-semibold">Step 1: Sign Up</h3>
    <p className="text-gray-600 mt-2">Create your free account to get started.</p>
  </div>

  {/* Step 2 */}
  <div className="flex flex-col items-center text-center p-6 bg-white shadow-gray-500 shadow-lg rounded-lg hover:scale-105 transition-transform duration-300">
    <FaBookOpen className="text-4xl text-green-500 mb-4" />
    <h3 className="text-xl font-semibold">Step 2: Choose a Course</h3>
    <p className="text-gray-600 mt-2">Explore and select from a variety of courses.</p>
  </div>

  {/* Step 3 */}
  <div className="flex flex-col items-center text-center p-6 bg-white shadow-gray-500 shadow-lg rounded-lg hover:scale-105 transition-transform duration-300">
    <FaPlayCircle className="text-4xl text-red-500 mb-4" />
    <h3 className="text-xl font-semibold">Step 3: Start Learning</h3>
    <p className="text-gray-600 mt-2">Access video lessons and study materials at your pace.</p>
  </div>

  {/* Step 4 */}
  <div className="flex flex-col items-center text-center p-6 bg-white shadow-gray-500 shadow-lg rounded-lg hover:scale-105 transition-transform duration-300">
    <FaCertificate className="text-4xl text-purple-500 mb-4" />
    <h3 className="text-xl font-semibold">Step 4: Get Certified</h3>
    <p className="text-gray-600 mt-2">Complete courses and earn a certification.</p>
  </div>
</div>


    </>
  )
}

export default HowItWorks




