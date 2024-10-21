import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate , NavLink } from 'react-router-dom';
import service from '../../Appwrite/configure';
import { useSelector } from 'react-redux';
import { userRegister } from '../../store/registerSlice';

function TestComponent() {

  const userInfo = useSelector((state) => state.register.profileInfo);
  const userEmail = useSelector((state) => state.auth.userData?.email);
  

    const { courseId } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isTestStarted, setIsTestStarted] = useState(false); // State to track if test has started
    const [courseName , setCourseName ] = useState('')
    const [ userNameforCertificate , setUserNameforCertificate ] = useState('')
    const [ courseData , setCourseData ] = useState()

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const testData = await service.getTestByCourseId(courseId);
                const courseData = await service.getCourseById(courseId);
                if (testData && testData.documents.length > 0) {

                    const parsedQuestions = JSON.parse(testData.documents[0].questions[0]);
                    setQuestions(parsedQuestions);
                } else {
                    setError("No Test found for this course");
                }

                if (courseData) {
                    console.log('courseDetails for //:' , courseData)
                    console.log('courseDetails for find testID:' , courseData.testID[0].testID)

                    console.log(' User Name for certificate: ' , userInfo?.userName)
                    console.log('userData for finding user documents: ' , userInfo)
                    setCourseData(courseData)
                    setCourseName(courseData.title)
                    setUserNameforCertificate(userInfo?.userName)
                }
            } 
            catch (error) {
                setError("Error fetching test questions");
            } finally {
                setLoading(false);
            }
        };

        fetchLessons();
    }, [courseId]);

    if (loading) {
        return (
            <div className="flex flex-row w-full h-screen items-center justify-center gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
            </div>
        );
    }

    if (error) {
        return <p className="text-red-500 text-center">{error}</p>;
    }

    if (!userInfo) {
        return (
            <div>
                First Register Yourself Bfore Taking test
                <NavLink to={'/profile'}>
                    <button>Click here to  Register </button>
                </NavLink>
            </div>
        )
    }

    if (!userEmail) {
        return (
            <div>
                First Login Bfore Taking test
                <NavLink to={'/login'}>
                    <button> Click here to  Login </button>
                </NavLink>
            </div>
        )
    }

    const onSubmit = (data) => {
        console.log('Form submitted!', data); // Log form data
    
        let total = 0;
    
        const calculateTotal = () => {
            for (let i = 0; i < questions.length; i++) {
                if (questions[i].Answer === data[`question-${i}`]) {
                    total += 1;
                }
            }
        };
    
        calculateTotal();
    
        // Check the navigation process
        console.log("Navigating to results...");
        navigate('/results', { 
            state: { answers: data, score: total, courseName: courseName, userName: userNameforCertificate , courseData : courseData } 
        });
    };

    // Function to start the test
    const startTest = () => {
        setIsTestStarted(true); // Switch to test view
    };

    return (
        <div className='max-w-3xl mx-auto p-4'>
            {!isTestStarted ? (
                // Intro view before the test begins
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Test Introduction</h1>
                    <p className="text-lg mb-4">Welcome to the course test. Please note the following:</p>
                    <ul className="text-left list-disc list-inside mb-6">
                        <li>The test consists of multiple-choice questions.</li>
                        <li>You are required to score at least 70% to qualify for the certificate.</li>
                        <li>Once you start, you cannot pause the test.</li>
                    </ul>
                    <button 
                        onClick={startTest} 
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Begin Test
                    </button>
                </div>
            ) : (
                // Test questions view after clicking 'Begin Test'
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="text-2xl font-bold mb-4">Test Questions</h1>
                    {questions.map((question, index) => (
                        <div key={index} className="mb-6 p-4 border border-gray-300 rounded-lg shadow-md">
                            <h2 className="font-semibold text-lg mb-2">{question.Question}</h2>
                            <ul className="list-decimal pl-5">
                                {question.Options.map((option, i) => (
                                    <li key={i} className="mb-2">
                                        <input
                                            type="radio"
                                            {...register(`question-${index}`, {required: `You must select an option for question ${index + 1}`})} // Registering the input with React Hook Form
                                            id={`option-${index}-${i}`}
                                            value={option} // Value to be submitted
                                            className="mr-2"
                                        />
                                        <label htmlFor={`option-${index}-${i}`}>{option}</label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
                        Submit
                    </button>
                </form>
            )}
        </div>
    );
}

export default TestComponent;
