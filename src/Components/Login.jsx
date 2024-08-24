import React, { useState } from "react";

function Login() {
  const [signIn, setSignIn] = useState(true);

  const toggleForm = () => {
    setSignIn(!signIn);
  };

  return (
    <div className="h-screen w-full flex font-poppins justify-center items-center   bg-gradient-to-br from-[#1a1919] via-gray-800 to-slate-700">

    
    <div className="min-h-auto w-screen  flex items-center justify-center">
      <div className="relative w-full max-w-4xl p-8 bg-transparent shadow-lg rounded-lg flex">
        {/* Sign In/Up Forms */}
        <div
          className={`absolute inset-0 w-1/2 p-8 bg-transparent flex flex-col justify-center transition-transform duration-700 ${
            signIn ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="bg-gray-300 bg-opacity-10 border border-gray-100 backdrop-filter backdrop-blur-md  p-8 rounded-2xl  ">

          <h2 className="text-3xl text-white font-bold mb-4">
            {signIn ? "Sign In" : "Create Account"}
          </h2>
          <form className="w-full">
            {!signIn && (
              <input
              type="text"
              placeholder="Name"
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
              />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
              />
            <button
              type="submit"
              className="w-full bg-[#6f1bf7] text-white py-2 rounded-lg  transition duration-300"
            >
              {signIn ? "Sign In" : "Sign Up"}
            </button>
            
          </form>
              </div>
        </div>

        {/* Overlay Panel */}
        <div
          className={`absolute inset-0 w-1/2 right-0 p-8 bg-transparent text-white flex flex-col justify-center transition-transform duration-700 ${
            signIn ? "translate-x-full" : "translate-x-0"
          }`}
        >
          <div className="bg-gray-300 bg-opacity-10 border border-gray-100 backdrop-filter backdrop-blur-md  p-8 rounded-2xl ">

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
