import React, { useRef, useState } from "react";
import { toPng } from "html-to-image";
import Certificate_of_Completion from "../../assets/Certificate/Certificate_of_Completion.png"; // Adjust the path accordingly
import service from "../../Appwrite/configure"; // Import Appwrite service configuration
import { useSelector } from "react-redux";

function Certificate({ userName, course, courseData, answers, totalQuestions, score }) {
  const ref = useRef(null);
  const [ buttonpress , setbuttonpress ] = useState(true)
  const [ disablebutton , setdisabblebutton ] = useState(false)
  const userInfo = useSelector((state) => state.register.profileInfo);
  console.log(userInfo);

  // Extract IDs from userInfo and courseData
  console.log('courData lllllllll:  ' , courseData)
  const userID = userInfo?.$id;
  const courseID = courseData?.$id;
  const testID = courseData?.testID[0]?.$id;

  console.log( 'userID =', userInfo?.$id,
    ' courseID = ',courseData?.$id,
    'testID = ',courseData?.testID[0]?.$id)

    console.log('ansers:' , answers)

  const downloadCerti = async () => {
    if (!ref.current || !userID || !courseID || !testID) {
      console.error('Required data is missing. Cannot generate certificate.');
      return;
    }
    setbuttonpress(false)
    setdisabblebutton(true)
    try {
      const dataUrl = await toPng(ref.current, { cacheBust: true });
      const blob = await fetch(dataUrl).then((res) => res.blob());
      
      // Step 1: Upload the certificate to Appwrite
      const certificateResponse = await saveCertToAppwrite(blob);
      console.log('Certificate uploaded successfully:', certificateResponse);

      // Step 2: Save user results to Appwrite with the uploaded certificate ID
      await saveUserResults(certificateResponse.$id);

      // Trigger download
      const link = document.createElement('a');
      link.download = 'certificate.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error generating or uploading PNG:', err);
    }
  };

  const saveCertToAppwrite = async (blob) => {
    try {
      const file = new File([blob], 'certificate.png', { type: 'image/png' });
      
      const response = await service.uploadFile(file);
      console.log('Certificate uploaded successfully:', response);
      return response; // Return response for further processing
    } catch (error) {
      console.error('Error saving PNG to Appwrite:', error);
      throw error; // Rethrow error for handling in downloadCerti
    }
  };

  const saveUserResults = async (certificateID) => {
    try {
      const isPassed = (score / totalQuestions) * 100 >= 70; // Calculate pass status

       // Check if answers is null or undefined
    if (!answers || answers.length === 0) {
      console.error('No answers to save!');
      return;
    }

    // Serialize answers to a JSON string
    const serializedAnswers = JSON.stringify(answers);

      const userResult = await service.createTestResult({
        userID: userID, // Ensure userID is being passed correctly
        courseID: courseID, // Ensure courseID is being passed correctly
        testID: testID, // Ensure testID is being passed correctly
        isPassed: isPassed, // Use the calculated value
        answers: serializedAnswers,
        totalMarks: totalQuestions,
        score: score,
        certificateID: certificateID, // Use the uploaded certificate ID
      });
      console.log('Result saved successfully:', userResult);
      setbuttonpress(true)
    } catch (error) {
      console.error('Error saving user results:', error);
    }
  };

  const today = new Date();
  const formattedDate = today.toLocaleDateString(); // Format the date as needed

  return (
    <div className="border-solid my-5 border-blue-600">
      <div ref={ref}>
        <div className="relative border-solid my-5 border-blue-600 min-w-[400px] mx-auto">
          {/* Certificate Background */}
          <img
            src={Certificate_of_Completion}
            alt="Certificate of Completion"
            className="w-full h-auto"
          />
          {/* User Name Overlay */}
          <div className="absolute pt-3 inset-0 flex items-center justify-center">
            <h2 className="text-3xl font-bold text-blue-900">{userName}</h2>
          </div>
          {/* Course Name Overlay */}
          <div className="absolute pt-16 inset-0 flex items-center justify-center mt-16">
            <h3 className="text-lg font-semibold text-red-600">{course}</h3>
          </div>
          {/* Date Overlay */}
          <div className="absolute -bottom-[345px] left-[-460px] inset-0 flex items-center justify-center mt-24">
            <h4 className="text-xs font-semibold text-green-600">
              {formattedDate}
            </h4>
          </div>
        </div>
      </div>
      {/* Download Button */}
      <div className= "w-full flex items-center justify-center mt-6 " >
        <button className={`rounded-md cursor-pointer z-20 bg-purple-600 px-2 py-1 text-white  ${disablebutton ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} `} onClick={downloadCerti} disabled={disablebutton}>
          { buttonpress ? ( ' Download  ' ) : ( "  Downloading... please don't close the window  ") }
        </button>
      </div>
    </div>
  );
}

export default Certificate;
