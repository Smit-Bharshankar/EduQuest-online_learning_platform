import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import service from '../../Appwrite/configure';
import { userRegister } from '../../store/registerSlice';
import { setProfilePicUrl } from '../../store/registerSlice';
import { NavLink } from 'react-router-dom';

function Dashboard() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.register?.profileInfo);
  const userRegistered = useSelector((state) => state.register?.isRegistered);

  const [error, setError] = useState(null);
  const [userProfilePic, setUserProfilePic] = useState(null);

  useEffect(() => {
    let timeoutId; // Variable to store the timeout ID for cleanup

    async function fetchProfilePic() {
      setError(null); // Ensure error state is cleared before fetching

      if (!userInfo) {
        setError('User Info not found');
        return; // Exit early if userInfo is not available
      }

      if (!userInfo.profilePicture) {
        setError('Profile picture ID is missing');
        return; // Exit early if profilePicture ID is not available
      }

      try {
        const profilePicUrl = await service.getProfilePic(userInfo.profilePicture);

        if (!profilePicUrl) {
          throw new Error('Profile Picture not found');
        }

        setUserProfilePic(profilePicUrl); // Set the fetched profile picture URL
        dispatch(setProfilePicUrl(profilePicUrl));
      } catch (error) {
        console.error('Error while fetching profile picture:', error);
        setError(error.message || 'Error fetching profile picture');
      }
    }

    fetchProfilePic();

    // Clear error after 3 seconds
    timeoutId = setTimeout(() => {
      setError(null);
    }, 3000);

    // Cleanup function to clear timeout on unmount
    return () => clearTimeout(timeoutId);
  }, [userInfo]); // Removed `userRegistered` from dependencies to avoid unnecessary re-renders

  return (
    <>
      <div className="max-w-[50%] min-h-screen bg-gradient-to-tl to-gray-200 from-gray-400 flex items-start justify-center">
        <div className="max-w-5xl w-full bg-white rounded-lg shadow-2xl overflow-hidden">
          {/* Cover Image */}
          <div className="h-36 relative overflow-hidden">
            <img
              src="https://gradient.page/_next/image?url=%2Fcdn%2Fvibrant-vista%2Fvibrant-vista-002.jpg&w=1920&q=75"
              alt="Cover"
              className="w-full h-full object-cover brightness-75 contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-40"></div>
          </div>

          {/* Profile and Info */}
          <div className="px-8 py-10 mt-[-100px] z-10 bg-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              {/* Profile Section */}
              <div className="flex items-center flex-col sm:flex-col sm:gap-8">
                <div className="relative">
                  {userProfilePic ? (
                    <img
                      src={userProfilePic}
                      alt="Profile"
                      className="h-36 w-36 rounded-full object-cover border-4 border-white shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
                    />
                  ) : (
                    <img
                      src="https://wallpapers.com/images/hd/aesthetic-anime-boy-icon-sips-coffee-ral4bfei9ylrpzas.jpg"
                      alt="Profile"
                      className="h-36 w-36 rounded-full object-cover border-4 border-white shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
                    />
                  )}
                </div>
                <div className="text-center mt-4 sm:mt-0 font-sedan">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {userInfo?.userName || 'User Name'}
                  </h1>
                  <h3 className="text-gray-700 text-lg">
                    {userInfo?.location || 'Location not set'}
                  </h3>
                  <h1 className="text-sm pt-2 text-gray-600">
                    {userInfo?.email || 'Email not provided'}
                  </h1>
                  <h1 className="text-sm text-gray-600">
                    {userInfo?.contact || 'Contact not provided'}
                  </h1>
                  <NavLink to='/editprofile'>
                    <button className="mt-3 px-5 py-2 bg-gray-900 text-white font-medium rounded-full shadow-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-300">
                      Edit Profile
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
