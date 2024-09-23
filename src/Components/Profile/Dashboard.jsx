import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import service from '../../Appwrite/configure';

function Dashboard() {
  const userInfo = useSelector((state) => state.register.profileInfo);
  const [error, setError] = useState(null);
  const [userProfilePic, setUserProfilePic] = useState(null);

  useEffect(() => {
    async function fetchProfilePic() {
      setError('');
      if (!userInfo) {
        setError("User Info not found")
      } if (!userInfo.profileImgId) {
        setError('profileImgId is missing')
      }

      try {
        const profilePicUrl = await service.getProfilePic(userInfo.profileImgId);  // Use the new method here
        if (!profilePicUrl) {
          throw new Error('Profile Picture not found');
        }
        setUserProfilePic(profilePicUrl);  // This should be the URL for the profile picture
      } catch (error) {
        console.error('Error while fetching profile picture:', error);
        setError(error.message || 'Error fetching profile picture');
      }
    }

    fetchProfilePic();
  }, [userInfo]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-tl to-gray-200 from-gray-400 flex items-center justify-center">
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
                    src={userProfilePic}  // Display the profile picture
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
                <button className="mt-3 px-5 py-2 bg-gray-900 text-white font-medium rounded-full shadow-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-300">
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Info Section */}
            <div className="mt-8 sm:mt-0 text-center sm:text-right">
              <h2 className="text-xl font-semibold text-gray-800">
                P.E.S College of Engineering
              </h2>
              <h3 className="mt-2 text-gray-600">Skills:</h3>
              <div className="flex justify-center sm:justify-end gap-3 mt-3">
                <span className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full shadow-sm font-semibold">
                  HTML
                </span>
                <span className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full shadow-sm font-semibold">
                  CSS
                </span>
                <span className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full shadow-sm font-semibold">
                  JavaScript
                </span>
                <span className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full shadow-sm font-semibold">
                  React
                </span>
              </div>
            </div>
          </div>
        </div>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
}

export default Dashboard;
