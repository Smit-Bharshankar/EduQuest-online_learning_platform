import React, { useEffect, useState } from 'react';
import service from '../../Appwrite/configure';
import { useParams } from 'react-router-dom';


const LessonList = () => {
    const { courseId } = useParams();

    const [lessons, setLessons] = useState([]);
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
      <div>
        <h2>Lessons for Course ID: {courseId}</h2>
        <ul>
          {lessons.map((lesson) => (
            <li key={lesson.$id}>
              <h3>{lesson.title}</h3>
              <p>{lesson.description}</p>
              <div className="w-2/4 h-auto ">
                <iframe
                  width="560"
                  height="315"
                  src={lesson.videoUrl}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
};

export default LessonList;
