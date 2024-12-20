import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login as storeLogin } from "../../store/authSlice.js";
import authService from "../../Appwrite/auth.js";
import { useNavigate } from "react-router-dom";
import { nightsky } from "../../assets/imgexp.js";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FaRegEye , FaRegEyeSlash } from "react-icons/fa6";

function MobileLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit,formState: { errors },} = useForm();  
  const [error, setError] = useState("");
  const [signIn, setSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Loader for API calls
  
  


  const toggleForm = () => {
    setSignIn(!signIn);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //// Login method
  const login = async (data) => {
    setError("");
    setIsSubmitting(true);
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(storeLogin(userData));
          toast.success("Login Successful!");
          navigate('/');
        }
      }
    } catch (error) {
      if (error.code === 401) {
        setError("Incorrect ID or Password");
      } else {
        setError(error.message || "An error occurred. Please try again.");
      }
    }finally {
      setIsSubmitting(false); // Hide loader
    }
  };

  //// Sign up method
  const createAccount = async (data) => {
    setError("");
    setIsSubmitting(true);
    try {
      const session = await authService.createAccount(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(storeLogin(userData));
          toast.success("Sign-Up Successful!");
          navigate("/");
        }
      }
    } catch (error) {
      if (error.code === 409) {
        setError("Account already exists with this email.");
      } else {
        setError(error.message || "An error occurred. Please try again.");
      }
    }finally {
      setIsSubmitting(false); // Hide loader
    }
  };

  return (
   <>
   <div 
   className="h-screen w-full flex font-poppins justify-center items-center bg-gradient-to-br from-[#1a1919] via-gray-800 to-slate-700"
   style={{
     backgroundImage: `url(${nightsky})`,
     backgroundSize: 'cover', // or 'contain'
     backgroundPosition: 'center',
    //  width: '100%',
    //  height: '100vh',
   }}>

    <div className="">
    <div
            className={` inset-0 p-8 bg-transparent flex flex-col justify-center transition-transform duration-700 `}
          >
            <div className="bg-gray-300 bg-opacity-10 border border-gray-100 backdrop-filter backdrop-blur-sm p-8 rounded-2xl">
              <h2 className="text-3xl text-white font-bold mb-4">
                {signIn ? "Sign In" : "Create Account"}
              </h2>

              <form
                className="w-full"
                onSubmit={handleSubmit(signIn ? login : createAccount)}
              >
                {!signIn && (
                  <>
                    <input
                      type="text"
                      label="name"
                      placeholder="Name"
                      {...register("name", {
                        required: "Name is required",
                        validate: {
                          matchPattern: (value) =>
                            /^[a-zA-Z ]{2,30}$/.test(value) ||
                            "Name must contain only letters and spaces, and be 2-30 characters long",
                        },
                      })}
                      className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                    />
                    {errors.name && (
                      <p className="text-red-600 text-sm">
                        {errors.name.message}
                      </p>
                    )}
                  </>
                )}

                <input
                  type="email"
                  label="email"
                  placeholder="Email"
                  autoComplete="on"
                  {...register("email", {
                    required: true,
                    validate: {
                      matchPattern: (value) =>
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                          value
                        ) || "Email address must be a valid address",
                    },
                  })}
                  className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm">{errors.email.message}</p>
                )}

                <div className=" relative flex">

                <input
                  type={showPassword ? "text" : "password"}
                  label="password"
                  placeholder="Password"
                  autoComplete="on"
                  {...register("password", {
                    required: "Password is required",
                    validate: {
                      matchPattern: (value) =>
                        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value) ||
                      "Password must be at least 8 characters long and include both letters and numbers",
                    },
                  })}
                  className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                  />
                 <span
          onClick={togglePasswordVisibility}
          className=" absolute right-1 text-xl p-3 cursor-pointer opacity-65 bg-transparent"
          >
          {showPassword ? <FaRegEyeSlash /> : <FaRegEye /> } 
        </span>
        </div>
                {errors.password && (
                  <p className="text-red-600 text-sm">
                    {errors.password.message}
                  </p>
                )}

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.6 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#6f1bf7] text-white py-2 rounded-lg transition duration-300"
                >
                  {isSubmitting ? "Processing..." : signIn ? "Sign In" : "Sign Up"}
                </motion.button>

                {error && (
                  <p className="text-red-600 text-center font-mono text-sm mt-4">
                    {error}
                  </p>
                )}
              </form>
            </div>
          </div>

          <div
            className={`inset-0  p-8 bg-transparent text-white flex flex-col justify-center transition-transform duration-700 `}
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
   </>
  );
}

export default MobileLogin;
