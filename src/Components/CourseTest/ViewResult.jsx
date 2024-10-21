import { useLocation } from 'react-router-dom';
import Certificate from './Certificate';
import service from '../../Appwrite/configure';

function ViewResult() {
    const location = useLocation();
    console.log(location.state); // Add this to check the passed state
    
    const { answers, score , courseName = 'Course', userName = '' , courseData } = location.state || { answers: {}, score: 0, courseName: 'Course', userName: '' }; 

    const totalQuestions = Object.keys(answers).length;
    const percentageScore = ((score / totalQuestions) * 100).toFixed(2);



    return (
        <div className='bg-gray-100 w-full h-full'>
        <div className="max-w-4xl mx-auto p-6 bg-white mt-8">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Test Results</h1>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Your Score</h2>
                <div className="text-4xl font-bold text-blue-600 mb-4">{score} / {totalQuestions}</div>

                <p className="text-gray-600 mb-4">
                    You answered <strong>{score}</strong> out of <strong>{totalQuestions}</strong> questions correctly.
                </p>

                <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                        <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                                {percentageScore}% Correct
                            </span>
                        </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                        <div
                            style={{ width: `${percentageScore}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                        ></div>
                    </div>
                </div>

                <div className="mt-6">
                    {percentageScore >= 70 ? (
                        <p className="text-green-600 font-semibold">
                            Congratulations! You passed the test and are eligible for the certificate.
                        </p>
                    ) : (
                        <p className="text-red-600 font-semibold">
                            Unfortunately, you did not meet the passing requirement of 70%.
                        </p>
                    )}
                </div>
            </div>

            <div>
                <Certificate course={courseName} userName={userName} courseData={courseData} answers = {answers} totalQuestions = {totalQuestions} score = {score} />
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">Your Answers</h2>
                <ul className="space-y-4">
                    {Object.entries(answers).map(([questionKey, answer], index) => (
                        <li key={index} className="p-4 bg-gray-50 rounded-lg shadow-md">
                            <strong className="text-gray-700">Question {index + 1}:</strong> {answer}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        </div>
    );
}

export default ViewResult;
