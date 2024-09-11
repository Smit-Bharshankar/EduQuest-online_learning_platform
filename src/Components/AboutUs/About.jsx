import React from "react";
import { whitetextLogo , Logotextnav } from "../../assets/imgexp";

function About() {
  return (
    <div className="flex items-center justify-center  flex-col">
      <div
        className=" bg-blue-300 max-h-[40dvh] max-w-[80%] mt-12 rounded-lg flex items-center justify-evenly flex-col "
        style={{
          backgroundImage: `url(https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
          backgroundSize: "cover", // or 'contain'
          backgroundPosition: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        {/* <img src={Logotextnav} alt="whitetextlogo" /> */}
        <h1
          className="font-serif text-white text-4xl"
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
        >
          ABOUT US
        </h1>
      </div>

      <div className="bg-slate-100 mt-10 p-8 rounded-lg w-[90vw] max-w-3xl mx-auto flex flex-col justify-start items-start">
        <h1 className="font-sans text-4xl font-bold mb-4 text-slate-800">
          Our Story
        </h1>
        <p className="text-slate-700 text-lg leading-relaxed">
          At <span className="font-semibold text-slate-900">EduQuest</span>, we
          started with a simple idea: to empower people with the right skills to
          thrive in today's fast-paced, ever-evolving world. Founded by a
          passionate team of educators, developers, and industry experts, our
          platform was born from a shared belief that high-quality, accessible
          education should be available to everyone, everywhere. Our mission is
          to bridge the gap between education and opportunity, helping you
          unlock your full potential.
        </p>
      </div>

      <div className="bg-slate-100 mt-10 p-8 rounded-lg w-[90vw] max-w-3xl mx-auto flex flex-col justify-start items-start">
        <h1 className="font-sans text-4xl font-bold mb-4 text-slate-800">
          Who We Serve
        </h1>
        <p className="text-slate-700 text-lg leading-relaxed">
          At <span className="font-semibold text-slate-900">EduQuest</span>, We
          serve a diverse community of learners — from beginners to
          professionals — who are eager to enhance their skills, advance their
          careers, or simply explore new interests. Whether you're a student
          looking to gain an edge in your studies, a professional seeking career
          growth, or a hobbyist eager to learn something new, our platform
          offers something for everyone. We are here to support, motivate, and
          guide you every step of the way.
        </p>
      </div>

      <div className="bg-slate-100 mt-10 p-8 rounded-lg w-[90vw] max-w-3xl mx-auto flex flex-col justify-start items-start">
        <h1 className="font-sans text-4xl font-bold mb-4 text-slate-800">
          How We Operate
        </h1>
        <p className="text-slate-700 text-lg leading-relaxed">
          At <span className="font-semibold text-slate-900">EduQuest</span>, Our
          approach is straightforward and learner-centric. We provide
          interactive courses, expert-led instruction, and 24/7 access to
          content that matters most to you. Our courses are designed with
          real-world application in mind, combining theory with hands-on
          projects and practical insights from industry professionals. We are
          constantly evolving, adding new courses, updating content, and
          leveraging the latest technology to enhance your learning experience.
        </p>
      </div>

      <div className="bg-slate-100 mt-10 p-8 rounded-lg w-[90vw] max-w-3xl mx-auto flex flex-col justify-start items-start">
        <h1 className="font-sans text-4xl font-bold mb-4 text-slate-800">
          The Face of Our Business
        </h1>
        <p className="text-slate-700 text-lg leading-relaxed">
          Behind <span className="font-semibold text-slate-900">EduQuest</span>,
          there's a dedicated team of passionate professionals who believe in
          the power of education. Our instructors are industry experts who bring
          real-world experience to every lesson, ensuring that you receive
          practical and actionable knowledge. Our support team is always here to
          assist you, from navigating our platform to answering your questions,
          and making sure you get the most out of your learning journey.
        </p>
      </div>

      <div className="bg-slate-100 mt-10 p-8 rounded-lg w-[90vw] max-w-3xl mx-auto flex flex-col justify-start items-start">
        <h1 className="font-sans text-4xl font-bold mb-4 text-slate-800">
          Our Aim
        </h1>
        <p className="text-slate-700 text-lg leading-relaxed">
          At <span className="font-semibold text-slate-900">EduQuest</span>, We
          believe that learning should be an exciting journey, not a daunting
          task. That's why we focus on creating an engaging, dynamic, and
          interactive learning experience that keeps you motivated and eager to
          learn more. By choosing [Your Brand Name], you're not just gaining
          access to courses; you're joining a community of like-minded learners,
          driven by curiosity and the desire to grow. We are committed to
          helping you achieve your goals, providing the resources, support, and
          inspiration you need to succeed.
        </p>
      </div>
    </div>
  );
}

export default About;
