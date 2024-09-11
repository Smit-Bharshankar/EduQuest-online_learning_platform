import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { NavLink } from "react-router-dom";
import { homesky , homeskydark } from "../../assets/imgexp";
import { IoLogInOutline } from "react-icons/io5";
import { FaSquareArrowUpRight } from "react-icons/fa6";
import './multi.css'



function MultilayerParallax() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

    // const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Adjusting the transform to a very narrow range to keep the text in place 
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "300%"]);

  return (
    <div
      ref={ref}
      className="w-full h-[90vh] bg-gradient-to-b from-black via-[#171421] to-[#292846] overflow-hidden relative  grid place-items-start"
      style={{
        backgroundImage: `url(${homesky})`,
        backgroundSize: "cover", // or 'contain'
        backgroundPosition: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <motion.div
        style={{ y: textY }}
        className="font-bold text-[#ffffff] text-4xl text-center md:text-8xl mt-[5%] absolute z-10"
      >
        Unlock Your Potential with Expert-Led Courses
        <h1 className="font-medium text-[#b9d0d0] text-xl pt-6 md:pt-10 md:text-4xl text-center">
          Explore a variety of courses designed to help you excel in your career
        </h1>
        <motion.div className="flex font-Ubuntu flex-col md:flex-row justify-evenly items-center">
          <NavLink to="/course">
            <motion.button
              animate={{ x: [0, -100, 0], transition: { delay: 0.4 } }}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              className="relative mt-8 md:p-4 p-2 rounded-md text-center text-xl md:text-2xl text-white overflow-hidden"
            >
              <div className="flex flex-row gap-1 relative z-10">
                Explore Courses <FaSquareArrowUpRight className="text-x3l mt-1" />
              </div>
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#3a3988] via-[#129781] to-[#0b5897] animate-gradient-flow"></div>
            </motion.button>
          </NavLink>
          <NavLink to="/login">
            <motion.h1
              className="text-white bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 px-5 py-2 rounded-full mt-10 text-center text-2xl md:text-3xl font-extrabold shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.1, rotate: 2 }}
              whileTap={{ scale: 0.95, rotate: -2 }}
            >
              <div className="flex flex-row items-center justify-center gap-2">
                Sign Up <IoLogInOutline className="text-2xl" />
              </div>
            </motion.h1>
          </NavLink>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default MultilayerParallax;
