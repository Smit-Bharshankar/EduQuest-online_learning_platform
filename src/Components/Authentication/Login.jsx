import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { nightsky } from "../../assets/imgexp.js";
import { login as storeLogin } from "../../store/authSlice.js";
import authService from "../../Appwrite/auth.js";
import { motion } from "framer-motion";
import MobileLogin from "./MobileLogin.jsx";
import { toast } from "react-toastify";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

function Login() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 500); // Initialize correctly
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [signIn, setSignIn] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); // Loader for API calls
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm();

  // Optimized resize handler using useCallback
  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 500);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  if (isMobile) {
    return <MobileLogin />;
  }

  const toggleForm = () => setSignIn((prev) => !prev);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const login = async (data) => {
    setError("");
    setIsSubmitting(true); // Show loader
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        dispatch(storeLogin(userData));
        toast.success("Login Successful!");
        navigate("/");
      }
    } catch (error) {
      setError(error.code === 401 ? "Incorrect ID or Password" : error.message || "An error occurred.");
    } finally {
      setIsSubmitting(false); // Hide loader
    }
  };

  const createAccount = async (data) => {
    setError("");
    setIsSubmitting(true);
    try {
      const session = await authService.createAccount(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        dispatch(storeLogin(userData));
        toast.success("Sign-Up Successful!");
        navigate("/");
      }
    } catch (error) {
      setError(error.code === 409 ? "Account already exists with this email." : error.message || "An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="h-screen w-full flex font-poppins justify-center items-center bg-gradient-to-br from-[#1a1919] via-gray-800 to-slate-700"
      style={{
        backgroundImage: `url(${nightsky})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
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

              <form
                className="w-full"
                onSubmit={handleSubmit(signIn ? login : createAccount)}
              >
                {!signIn && (
                  <>
                    <input
                      type="text"
                      placeholder="Name"
                      {...register("name", {
                        required: "Name is required",
                        validate: {
                          matchPattern: (value) =>
                            /^[a-zA-Z ]{2,30}$/.test(value) || "Invalid name",
                        },
                      })}
                      className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                    />
                    {errors.name && (
                      <p className="text-red-600 text-sm">{errors.name.message}</p>
                    )}
                  </>
                )}

                <input
                  type="email"
                  placeholder="Email"
                  {...register("email", {
                    required: true,
                    validate: {
                      matchPattern: (value) =>
                        /^\S+@\S+\.\S+$/.test(value) || "Invalid email",
                    },
                  })}
                  className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm">{errors.email.message}</p>
                )}

                <div className="relative flex">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required",
                      validate: {
                        matchPattern: (value) =>
                          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value) ||
                          "Weak password",
                      },
                    })}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-3 text-xl cursor-pointer"
                    role="button"
                    aria-label="Toggle Password Visibility"
                  >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </span>
                </div>
                {errors.password && (
                  <p className="text-red-600 text-sm">{errors.password.message}</p>
                )}

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  type="submit"
                  disabled={isSubmitting} // Disable button during submission
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
                  ? "Enter your personal details to join us"
                  : "Login to stay connected with us"}
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
