import React from "react";

function Startlearning() {
  return (
    <div className="max-h-screen pb-8 min-h-[50%] font-poppins w-full pt-8 flex md:flex-row flex-col items-center justify-center gap-4">
      
      {/*text section*/}
      <div className="md:w-1/2 ml-4 flex items-center justify-center">
        <h1 className=" text-clip text-pretty text-center font-medium text-sm md:text-xl w-full md:w-[90%]">
        In today's fast-paced and ever-evolving world, having the right skills is not just an advantage—it's essential. As industries transform rapidly with technological advancements, the demand for skilled professionals who can adapt and innovate is at an all-time high. Staying updated with the latest knowledge and expertise not only enhances your career prospects but also empowers you to stand out in a competitive job market, drive meaningful change, and achieve personal growth. Don't just keep up; stay ahead with the right skills for the future.
        </h1>
      </div>

     {/*img section */}
      <div className="relative md:w-1/2 mr-4 border-slate-400 border rounded-lg overflow-hidden">
        <img
          src="https://images.pexels.com/photos/5537517/pexels-photo-5537517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          className="rounded-lg  transition-all ease-in-out"
          alt=""
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity ease-in-out duration-300">
          <p className="text-white text-xl font-semibold">
          ||  Gain New Skills, Elevate Your Career  ||
          </p>
        </div>
      </div>


    </div>
  );
}

export default Startlearning;
