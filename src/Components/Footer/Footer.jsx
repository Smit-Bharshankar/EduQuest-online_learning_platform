import React from 'react';
import { Link } from 'react-router-dom';
import { whitetextLogo } from '../../assets/imgexp';

const Footer = () => {
  return (
    <footer className="relative left-0 bottom-0 right-0 pb-5 bg-gray-900 text-white font-poppins mt-[20%]  w-full">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Article Section */}
        <article className="flex flex-col md:flex-row items-center justify-between mx-auto mt-[-90px] mb-2 min-h-[140px] w-auto p-5 md:p-7 rounded-lg bg-purple-700 text-center">
          <h1 className="text-lg font-light text-white/90 mb-4 md:mb-0">Try for Free Today</h1>
          <button className="flex items-center gap-2 px-6 py-2 bg-gray-900 text-white rounded-full">
            <p>Sign up for Free</p>
            <span>→</span>
          </button>
        </article>
        
        {/* Section - Logo, Socials, Links */}
        <section className="relative px-4 pt-5 pb-20 md:pb-12">
          <img src={whitetextLogo} alt="logo" className="block h-8 mx-auto mb-8" />

          {/* Social Links */}
          <div className="flex justify-center items-center gap-6 text-white/60 mb-6 border-b border-white/20 pb-4">
            <h1 className="text-xl font-medium">Instagram</h1>
            <a href="#" className="fa-brands fa-instagram"></a>
            {/* Add more social links here */}
          </div>
          
          {/* Link Lists */}
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
            <li>
              <h3 className="text-sm font-light text-white/60 mb-3">Resources</h3>
              <Link to="#" className="block mb-2 text-white/90">Courses</Link>
              <Link to="#" className="block mb-2 text-white/90">Roadmap</Link>
              <Link to="#" className="block mb-2 text-white/90">Support</Link>
              <Link to="#" className="block mb-2 text-white/90">Hardware</Link>
            </li>
            <li>
              <h3 className="text-sm font-light text-white/60 mb-3">Developers</h3>
              <Link to="#" className="block mb-2 text-white/90">Forum</Link>
              <Link to="#" className="block mb-2 text-white/90">Projects</Link>
              <Link to="#" className="block mb-2 text-white/90">Sources</Link>
              <Link to="#" className="block mb-2 text-white/90">GitHub</Link>
            </li>
            <li>
              <h3 className="text-sm font-light text-white/60 mb-3">Pricing</h3>
              <Link to="#" className="block mb-2 text-white/90">Plans</Link>
              <Link to="#" className="block mb-2 text-white/90">Data</Link>
              <Link to="#" className="block mb-2 text-white/90">About</Link>
              <Link to="#" className="block mb-2 text-white/90">Contact</Link>
            </li>
            <li>
              <h3 className="text-sm font-light text-white/60 mb-3">Join-Us</h3>
              <Link to="#" className="block mb-2 text-white/90">About</Link>
              <Link to="#" className="block mb-2 text-white/90">Contact</Link>
              <Link to="#" className="block mb-2 text-white/90">Put Content</Link>
              <Link to="#" className="block mb-2 text-white/90">Careers</Link>
            </li>
          </ul>
        </section>
      </div>
    </footer>
  );
};

export default Footer;