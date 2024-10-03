import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import service from "../../Appwrite/configure";
import { useSelector } from "react-redux";

const CommentForm = ({userID , courseID , userName}) => {
  const { register, handleSubmit, reset } = useForm();
  const [isTextarea, setIsTextarea] = useState(false); // Manage textarea visibility
  const [error , setError] = useState('');

  const userImg = useSelector((state) => state.register.profilePicUrl);

  console.log('comment details: ', courseID , userID , userName )
  // Handle the comment submission
  const onSubmit = async (data) => {
    setError('')
    console.log("Comment submitted:", data.comment);
  
    try {
      await service.createComment({
        userID: userID,
        courseID: courseID,
        comment: data.comment,
      });
    } catch (error) {
      console.error("Error submitting comment:", error);
      setError('Error submitting comment', error);
    }
  
    reset(); // Reset the form after submission
    setIsTextarea(false); // Collapse textarea after submit
  };
  

  

  // Adjust the textarea height dynamically
  const adjustTextareaHeight = (e) => {
    e.target.style.height = "auto"; // Reset height
    e.target.style.height = e.target.scrollHeight + "px"; // Set new height
  };

  // Function to handle input focus
  const handleFocus = () => {
    setIsTextarea(true);
  };

  return (
    <div className="w-full max-w-[95%] mx-auto mt-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-start space-x-4">
          {/* Profile Picture Placeholder */}
          <div className="flex-shrink-0 flex flex-row items-center gap-6 pb-4">
            <img
              src={userImg}
              //  src="https://static.vecteezy.com/system/resources/thumbnails/030/504/836/small_2x/avatar-account-flat-isolated-on-transparent-background-for-graphic-and-web-design-default-social-media-profile-photo-symbol-profile-and-people-silhouette-user-icon-vector.jpg"
              alt="profile"
              className=" object-cover rounded-full w-10 h-10"
            />
            <h1>{userName}</h1>
          </div>

          {/* Comment Input/Area */}
          <div className="w-full">
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg resize-none overflow-hidden focus:outline-none focus:ring-2 focus:ring-slate-400"
              placeholder="Add a comment..."
              rows={1} // Initially 1 row
              onFocus={handleFocus} // Expand when focused
              onInput={adjustTextareaHeight} // Adjust height on input
              {...register("comment", { required: true })}
              style={{ minHeight: "40px", maxHeight: "200px" }} // Set min/max height
            />

            {/* Action Buttons: Submit and Cancel */}
            
              <div className="flex justify-start space-x-4 mt-2">
                
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  type="submit"
                  className="bg-gray-800 text-white px-3 py-1 font-semibold text-base rounded-lg transition duration-300 hover:bg-gray-950"
                >
                  Comment
                </motion.button>
              </div>
            
          </div>

          
        </div>
        
      </form>
      {error && (
                      <p className="text-red-600 text-sm">
                        {error}
                      </p>
                    )}
    </div>
  );
};

export default CommentForm;
