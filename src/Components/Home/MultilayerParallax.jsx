import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { NavLink } from "react-router-dom";

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
      className="w-full h-[90vh] bg-gradient-to-b from-black via-[#1f1a2e] to-[#333157] overflow-hidden relative  grid place-items-start"
    >
      <motion.div
        style={{ y: textY }}
        className="font-bold text-white text-4xl text-center md:text-8xl mt-[5%] absolute z-10"
      >
        Unlock Your Potential with Expert-Led Courses.
        <h1 className="font-medium text-[#b9d0d0] text-xl pt-6 md:pt-10 md:text-4xl text-center">Explore a variety of courses designed to help you excel in your career.</h1>
        <motion.div className="flex flex-col gap-6 md:flex-row justify-center items-center">
          <NavLink to="/course">
            <motion.button animate={{ x: [0, 100, 0] }}
                      whileHover={{ scale: 1.1 }} 
                      whileTap={{ scale: 0.9 }} 
                  className="from-cyan-500 to-blue-500 bg-gradient-to-r mt-8 md:p-4 p-2 rounded-2xl text-center text-xl md:text-3xl text-white ">Explore Courses →</motion.button>
          </NavLink>
          <NavLink to="/login">
          <motion.h1
           className="text-white p-6 mt-10 text-center text-xl md:text-2xl font-mono underline">
            Sign Up
          </motion.h1>
          </NavLink>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default MultilayerParallax;
