import React, { useState, useEffect } from 'react';
import service from '../../Appwrite/configure';
import CourseCard from './CourseCard';

function Course() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await service.listAllCourses({});
        if (coursesData && coursesData.documents) {
          setCourses(coursesData.documents);
        } else {
          setError("No Courses Available");
        }
      } catch (error) {
        setError("Error fetching Courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return( 
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
    <div className='w-full h-full flex justify-center'>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-10 justify-items-center gap-y-16 py-12 w-full max-w-screen-lg mx-auto">
      {courses.map((course) => (
        <CourseCard
          key={course.$id} // Assuming each course has a unique ID from Appwrite
          title={course.title}
          description={course.description}
          date={course.$createdAt}
          courseId={course.$id}
          thumbnailUrl={course.thumbnail} // Adjust based on your data structure
          instructor={course.instructor}
        />
      ))}
    </div>
  </div>
  

  );
}

export default Course;
