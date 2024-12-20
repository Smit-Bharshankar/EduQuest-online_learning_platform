import React, { useEffect, useState } from 'react';
import RegistrationForm from './RegistrationForm';
import { useDispatch, useSelector } from 'react-redux';
import service from '../../Appwrite/configure';
import Dashboard from './Dashboard'; 
import { userRegister } from '../../store/registerSlice';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const userRegistered = useSelector((state) => state.register?.isRegistered);
  const userEmail = useSelector((state) => state.auth.userData?.email);
  const userID = useSelector((state) => state.register.profileInfo?.$id);

  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [testResults, setTestResults] = useState([]); // Initialize as an empty array to avoid runtime errors

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userEmail) {
        setLoading(false);
        setError('User is not logged in.');
        toast.info('Login to view Profile');
        navigate('/login');
        return;
      }

      try {
        const userId = await service.findUserByEmail(userEmail);
        const userData = await service.findUserById(userId);

        if (userData) {
          const { $id, userName, email, location, dob: birthDate, contact, profilePicture } = userData;
          setUser(userData);

          // Dispatch user registration with profile info
          dispatch(
            userRegister({
              profileInfo: {
                $id,
                userName,
                email,
                location,
                dob: birthDate,
                contact,
                profilePicture,
              },
            })
          );
        } else {
          setError('User data not found.');
          setShowRegisterForm(true);
        }
      } catch (error) {
        setError('Error fetching user data.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserTestResults = async () => {
      try {
        if (userID) {
          const userTestResults = await service.getTestResultsByUserId(userID);
          if (userTestResults) {
            setTestResults(userTestResults);
          }
        }
      } catch (error) {
        console.error('Error fetching user test data:', error);
      }
    };

    fetchUserData();
    fetchUserTestResults();
  }, [userEmail, userID]); // Removed `dispatch` and unnecessary dependencies

  useEffect(() => {
    setShowRegisterForm(!userRegistered);
  }, [userRegistered]); // Simplified logic for determining registration state

  if (loading) {
    return (
      <div
        className="flex flex-row w-full h-screen items-center justify-center gap-2"
        role="status"
        aria-live="polite"
      >
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex w-full h-full min-h-[400px] items-center justify-center">
        <p className="text-3xl italic">{error}</p>
      </div>
    );
  }

  if (showRegisterForm) {
    return <RegistrationForm />;
  }

  return (
    <>
      <div className="w-full h-full flex flex-row">
        {/* User Details Section */}
        <Dashboard />

        {/* Test Results Section */}
        <div className="w-3/4 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testResults.length === 0 ? (
              <p className="text-center text-gray-500">No test results available.</p>
            ) : (
              testResults.map((course) => {
                const percentage = (course.score / course.totalMarks) * 100;

                return (
                  <div
                    key={course.courseID}
                    className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <img
                      src={course.courseID?.thumbnail || 'placeholder.jpg'} // Added fallback
                      alt={course.courseID?.title || 'Course Thumbnail'}
                      className="w-full max-h-[48%] object-cover"
                    />
                    <div className="p-4">
                      <h2 className="text-xl font-semibold">{course.courseID?.title || 'Untitled Course'}</h2>
                      <p className="mt-2 text-gray-600">Scored: {percentage.toFixed(2)}%</p>
                    </div>
                    <div className="p-4">
                      <button
                        onClick={() => service.getCourseCertificate(course.certificateID)}
                        className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-colors duration-300"
                      >
                        Download Certificate
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
