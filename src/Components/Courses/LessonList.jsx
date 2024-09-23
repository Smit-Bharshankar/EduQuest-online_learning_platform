import React, { useEffect, useState } from 'react';
import service from '../../Appwrite/configure';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Comments from '../Comments/Comments';
import './description.css'


const LessonList = () => {

  //comment && description toggle:
  const [showComments , setShowComments] = useState(false)
  const handleCommentDisplay = () => {
    setShowComments(true)
  }
  const handleDescriptionDisplay = () => {
    setShowComments(false)
  }


    const { courseId } = useParams();

    const [lessons, setLessons] = useState([]);
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const lessonsData = await service.getLessonsByCourseId(courseId);
                if (lessonsData) {
                    setLessons(lessonsData);
                } else {
                    setError("No lessons found for this course");
                }
            } catch (error) {
                setError("Error fetching lessons");
            } finally {
                setLoading(false);
            }
        };

        fetchLessons();
    }, [courseId]);

    const handleLessonSelect = (index) => {
        setCurrentLessonIndex(index);
    };

    if (loading) {
        return ( 
          /* From Uiverse.io by Javierrocadev */ 
     <div className="flex flex-row w-full h-screen items-center justify-center gap-2">
       <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
       <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
       <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
     </div>
         );
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
      <>
      <div className="flex flex-col lg:flex-row font-poppins">
  {/* Left and Center Part - Video and Info */}
  <div className="w-full lg:w-3/4 p-4 bg-gray-200">
    {lessons.length > 0 ? (
      <div className="w-full h-auto p-4 border rounded shadow-sm">
        <h2 className="text-lg lg:text-xl font-bold mb-2">
          Lesson: {lessons[currentLessonIndex].title}
        </h2>
        <div className="w-full flex justify-center items-center">
          <iframe
            className="w-full h-[200px] md:h-[400px] lg:w-[900px] lg:h-[600px]"
            src={lessons[currentLessonIndex].videoUrl}  
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    ) : (
      <p>No lessons available for this course.</p>
    )}
  </div>

  {/* Right Part - Scrollable Lesson List */}
  <div className="w-full lg:w-1/4 p-4 border-t-2 lg:border-t-0 lg:border-l-2 border-gray-600 overflow-y-auto max-h-[300px] lg:max-h-[500px]">
    <h3 className="text-lg font-semibold mb-4">Lessons</h3>
    <ul className="space-y-2">
      {lessons.map((lesson, index) => (
        <li
          key={lesson.$id}
          className={`p-2 cursor-pointer rounded ${
            index === currentLessonIndex ? "bg-blue-100" : ""
          }`}
          onClick={() => handleLessonSelect(index)}
        >
          <span className="font-medium">Lesson {index + 1}:</span> {lesson.title}
        </li>
      ))}
    </ul>
  </div>
</div>


<div className='w-full text-start border border-t-4 border-gray-600 text-xl '>
  <div className='pl-6 flex flex-row bg-red-100 gap-8 py-2'>

  <div 
  onClick={handleDescriptionDisplay}
  className='bg-green-700 cursor-pointer shadow-md shadow-slate-600 rounded-lg py-1 px-3'>
    Description:
     
  </div>
  <div 
  onClick={handleCommentDisplay}
  className='bg-teal-700 cursor-pointer shadow-md shadow-slate-600 rounded-lg py-1 px-3'>
    Comments:
    
  </div>
  
  </div>
  <div>
      {!showComments && <div className="my-6 lg:px-4 px-1">
  <p className="font-bold text-lg lg:text-xl mb-2">Description:</p>
  <div className="description">
    <ReactMarkdown>{lessons[currentLessonIndex].description}</ReactMarkdown>
  </div> 
</div>} 
    </div>

    <div>
      {showComments && <div className="my-6 lg:px-4 px-1">
  <p className="font-bold text-lg lg:text-xl mb-2">Comments:</p>
    <Comments />
  </div> } 
</div> 
    </div>








        </>
    );
};

export default LessonList;
