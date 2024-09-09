import React from 'react'
import { FaChalkboardTeacher , FaUserGraduate } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";



function KeyFeature() {
  return (
    <div className="max-h-screen bg-slate-100 px-5 pb-8 min-h-[50%] font-poppins w-full pt-8 flex flex-col md:flex-row items-center justify-center gap-4">
      
      <div className='flex flex-col  items-center justify-center '>
      <FaChalkboardTeacher  className="text-4xl text-slate-600 mb-4"/>
      <h1 className='text-xl pt-4 text-pretty text-center'>Engage with hands-on learning experiences that boost understanding and retention.</h1>
      </div>

      <div className='flex flex-col   items-center justify-center'>
      <FaUserGraduate  className="text-4xl text-slate-600 mb-4"/>
      <h1 className='text-xl pt-4 text-pretty text-center'>Learn from industry experts who bring real-world knowledge to every course.</h1>
      </div>

      <div className='flex flex-col   items-center justify-center'>
      <MdAccessTimeFilled  className="text-4xl text-slate-600 mb-4"/>
      <h1 className='text-xl pt-4 text-pretty text-center'>Enjoy unlimited access to all courses anytime, anywhere, at your convenience</h1>
      </div>

    </div>
  )
}

export default KeyFeature
