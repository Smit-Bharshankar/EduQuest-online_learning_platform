import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

const CommentForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const [isTextarea, setIsTextarea] = useState(false); // Manage textarea visibility

  // Handle the comment submission
  const onSubmit = (data) => {
    console.log("Comment submitted:", data.comment);
    reset();
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
              src="https://via.placeholder.com/40"
              alt="profile"
              className="rounded-full w-10 h-10"
            />
            <h1>UserName</h1>
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
    </div>
  );
};

export default CommentForm;
