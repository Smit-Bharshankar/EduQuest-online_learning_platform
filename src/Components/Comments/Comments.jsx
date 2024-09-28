import React, { useEffect, useState } from 'react';
import service from '../../Appwrite/configure';
import CommentForm from './CommentForm';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

function Comments({ courseId }) {
  const userID = useSelector((state) => state.auth.userData?.userID);
  const userRegistered = useSelector((state) => state.register.isRegistered);
  const [showcomment , setshowComment] = useState(true);


  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!courseId) {
      setError("Course ID not found");
      setLoading(false);
      return;
    }

    const fetchComments = async () => {
      try {
        const commentData = await service.getCommentsByCourseId(courseId);
        if (commentData) {
          console.log('commentData :' ,commentData)
          setComments(commentData); // Update to access the correct property
        } else {
          setError("No comments found for this course");
        }
      } catch (error) {
        console.error(error); // Log the error for debugging
        setError("Error fetching comments");
      } finally {
        setLoading(false);
      }
    };

    if (!userRegistered) {
      setshowComment(false);
    }

    fetchComments();
  }, [courseId , userRegistered]);

  if (loading) {
    return (
      <div className="flex flex-row w-full min-h-[400px] items-center justify-center gap-2">
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
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

  if (!showcomment){
    return(
      <div className='h-auto min-h-[200px] w-auto flex items-center justify-center'>
        <div className='h-full w-full flex flex-col items-center justify-center gap-4 '>
        <h1 className='text-2xl'>Register to view and write comments</h1>
        <NavLink to={'/profile'} className='bg-green-400 px-3 py-2 rounded-lg hover:bg-green-500'>Register Now</NavLink>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="pb-6">
        <CommentForm userId={userID} courseID={courseId} />
      </div>
      <div>
        {comments.length > 0 ? (
          <div>
            <div className='w-full max-w-[95%]'>
              {comments.map((comment) => (
                <div key={comment.userID.id}>
                  <div className='flex flex-row gap-3 items-center'>
                  <img
              src="https://via.placeholder.com/40"
              alt="profile"
              className="rounded-full w-10 h-10"
            />
                  <h2>{comment.userID.userName}</h2>
                  </div>
                  <div className='py-3 pl-6'>
                  <p className='bg-gray-100 text-base font-medium px-4 py-2 border border-gray-200 rounded-lg'>{comment.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>No comments available.</p>
        )}
      </div>
    </div>
  );
}

export default Comments;
