import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { nightsky } from '../assets/imgexp.js';
import { login as storeLogin } from "../store/authSlice.js";
import authService from "../Appwrite/auth.js";
import { motion } from "framer-motion";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');
  const [signIn, setSignIn] = useState(true);

  const toggleForm = () => {
    setSignIn(!signIn);
  };

  //// Login method
  const login = async (data) => {
    setError('');
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(storeLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  ////  Sign up method
  const createAccount = async (data) => {
    setError('');
    try {
      const session = await authService.createAccount(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(storeLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div 
      className="h-screen w-full flex font-poppins justify-center items-center bg-gradient-to-br from-[#1a1919] via-gray-800 to-slate-700"
      style={{
        backgroundImage: `url(${nightsky})`,
        backgroundSize: 'cover', // or 'contain'
        backgroundPosition: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <div className="min-h-auto w-screen flex items-center justify-center">
        <div className="relative w-full max-w-4xl p-8 bg-transparent shadow-lg rounded-lg flex">
          {/* Sign In/Up Forms */}
          <div
            className={`absolute inset-0 w-1/2 p-8 bg-transparent flex flex-col justify-center transition-transform duration-700 ${
              signIn ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="bg-gray-300 bg-opacity-10 border border-gray-100 backdrop-filter backdrop-blur-sm p-8 rounded-2xl">
              <h2 className="text-3xl text-white font-bold mb-4">
                {signIn ? "Sign In" : "Create Account"}
              </h2>

              <form className="w-full" onSubmit={handleSubmit(signIn ? login : createAccount)}>
                {!signIn && (
                  <input
                    type="text"
                    label="name"
                    placeholder="Name"
                    {...register('name', { required: true })}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                  />
                )}
                <input
                  type="email"
                  label="email"
                  placeholder="Email"
                  autoComplete="on"
                  {...register('email', { required: true })}
                  className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                />
                <input
                  type="password"
                  label="password"
                  placeholder="Password"
                  autoComplete="on"
                  {...register('password', { required: true })}
                  className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                />
                <motion.button 
                 whileHover={{ scale: 1.1 }} 
                 whileTap={{ scale: 0.6 }}
                  type="submit"
                  className="w-full bg-[#6f1bf7] text-white py-2 rounded-lg transition  duration-300"
                >
                  {signIn ? "Sign In" : "Sign Up"}
                </motion.button>
                {error && <p className="text-red-600 text-center font-mono text-sm mt-4">{error}</p>}
              </form>
            </div>
          </div>

          {/* Overlay Panel */}
          <div
            className={`absolute inset-0 w-1/2 right-0 p-8 bg-transparent text-white flex flex-col justify-center transition-transform duration-700 ${
              signIn ? "translate-x-full" : "translate-x-0"
            }`}
          >
            <div className="bg-gray-300 bg-opacity-10 border border-gray-100 p-8 rounded-2xl">
              <h2 className="text-3xl font-bold mb-4">
                {signIn ? "Hello, Friend!" : "Welcome Back!"}
              </h2>
              <p className="mb-8">
                {signIn
                  ? "Enter your personal details and start your journey with us"
                  : "To keep connected with us please login with your personal info"}
              </p>
              <button
                onClick={toggleForm}
                className="bg-white text-[#6f1bf7] font-bold py-2 px-6 rounded-full hover:bg-gray-200 transition duration-300"
              >
                {signIn ? "Sign Up" : "Sign In"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
