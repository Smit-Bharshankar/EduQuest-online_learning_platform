import React , {useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch , useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { userRegister} from '../../store/registerSlice';
import service from '../../Appwrite/configure';
import { toast } from "react-toastify";


function RegistrationForm() {
    
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { register, handleSubmit , reset,  formState: { errors } } = useForm();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const userData = useSelector((state) => state.auth?.userData);
    const { isRegistered, profileInfo } = useSelector((state) => state?.register);

    // useEffect(() => {
    //     if (authStatus) {
    //       SetForwardtoSignin(false);
    //     } else {
    //       SetForwardtoSignin(true);
    //     }
    //   }, [authStatus]);

    const registerUser = async (data) => {
      setIsLoading(true); // Set loading state to true
      const { firstName, lastName, email, location, dob, contact, profileimg } = data;
      setError(''); // Clear any previous error
      const intcontact = parseInt(contact, 10);
  
      try {
          // File size validation (file should be less than 2MB)
          if (profileimg[0].size > 2 * 1024 * 1024) {
              throw new Error('File size should be less than 2 MB');
          }
  
          // Check if dob is a valid date
          if (!dob) {
              throw new Error("Date of Birth is required.");
          }
  
          // Parse and format dob to include time
          const formattedDob = new Date(`${dob}T00:00:00.000Z`); // Append time to the date
          if (isNaN(formattedDob)) {
              throw new Error("Invalid Date of Birth format. Please provide a valid date.");
          }
  
          const formattedDobISOString = formattedDob.toISOString(); // Convert to ISO format (yyyy-mm-dd hh:mm:ss.000)
  
          // Upload profile image file
          const uploadedFile = await service.uploadFile(profileimg[0]);
          console.log('Uploaded file:', uploadedFile); // Check the uploaded file response
  
          if (!uploadedFile || !uploadedFile.$id) {
              throw new Error("File upload failed");
          }
  
          const userName = `${firstName} ${lastName}`;
  
          // Create user document
          const newUser = await service.createUserDocument({
              userName,
              email,
              location,
              dob: formattedDobISOString,
              contact: intcontact,
              profileImgId: uploadedFile.$id, // Store the uploaded file ID in the user profile
          });
  
          console.log('New user:', newUser); // Check the new user response
  
          if (newUser) {
              console.log("User registered successfully:", newUser);
              dispatch(userRegister({
                  profileInfo: {
                      userName,
                      email,
                      location,
                      dob: formattedDobISOString, // Save the formatted DOB
                      contact: intcontact,
                      profileImgId: uploadedFile.$id
                  }
              }));
              toast.success("Profile Created Successfully!");
              reset();
              navigate('/'); // Navigate back after success
          } else {
              throw new Error("User registration failed");
          }
  
      } catch (error) {
          console.error("Error in registerUser:", error);
          setError("Registration failed: " + error.message); // Correct error setting
      }finally {
        setIsLoading(false); // Set loading state to false
    }
  };
  
  
  
      
      
      

  return (
    <>

    <div 
    className="h-full w-full bg-gradient-to-br pb-12 from-[#e45757] via-[#a20b7f] to-[#42129b]"
    style={{
      backgroundImage: `url(https://images.unsplash.com/photo-1619796696652-a29a854f21a0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '100%',
      height: '100%',
    }}
>
  <div className='flex pt-8 pb-4 justify-center'>
    <h1 className='text-3xl text-[#f7f7f7] font-bold'>
      Create Profile
    </h1>
  </div>

  <div className="flex justify-center py-3 md:py-6 ">

    <form className="w-full md:max-w-[55%] backdrop-blur-md p-6 rounded-lg shadow-md" onSubmit={handleSubmit(registerUser)}>
{/* /// */}
    <div className="flex flex-col md:flex-row bg-slate-50 bg-opacity-10 rounded-lg p-4 gap-4 mb-4">
        <h1 className="text-lg text-white md:w-[20%] font-semibold">Full Name :</h1>
        <div className="flex flex-col md:flex-row gap-4 w-full">
            <input
                type="text"
                placeholder="First Name"
                autoComplete="on"
                {...register('firstName',{
                    required: "First Name is required",
                    validate: {
                      matchPattern: (value) =>
                        /^[A-Za-z]{2,}$/.test(value) || "First Name must be at least 2 characters long and contain only letters",
                    },})}
                className="w-full p-2 bg-white/10 border border-gray-300 rounded-lg"
                />
                {errors.firstName && (<p className="text-red-600 text-sm">{errors.firstName.message}</p>)}
            <input
                type="text"
                placeholder="Last Name"
                autoComplete="on"
                {...register('lastName', { required: "Last Name is required",
                    validate: {
                      matchPattern: (value) =>
                        /^[A-Za-z]{2,}$/.test(value) || "Last Name must be at least 2 characters long and contain only letters",
                    },
                  })}
                className="w-full p-2 bg-white/10 border border-gray-300 rounded-lg"
            />
                            {errors.lastName && (<p className="text-red-600 text-sm">{errors.lastName.message}</p>)}

        </div>
    </div>
{/* /// */}
    <div className="flex flex-col md:flex-row bg-slate-50 bg-opacity-10 rounded-lg p-4 gap-4 mb-4">
        <h1 className="text-lg text-white md:w-[20%] font-semibold">Email :</h1>

        <div className="flex flex-col md:flex-row gap-4 w-full">
            <input
                type="email"
                value={userData.email}
                readOnly
                placeholder="Email"
                autoComplete="on"
                {...register('email', { required: true })}
                className="w-full p-2 bg-white/10 border border-gray-300  cursor-not-allowed rounded-lg"
            />
        </div>
    </div>
{/* /// */}
    <div className="flex flex-col md:flex-row bg-slate-50 bg-opacity-10 rounded-lg p-4 gap-4 mb-4">
        <h1 className="text-lg text-white md:w-[20%] font-semibold">Location :</h1>

        <div className="flex flex-col md:flex-row gap-4 w-full">
            <input
                type="text"
                placeholder="Location"
                autoComplete="on"
                {...register('location',{ required: "Location is required",
                  })}
                className="w-full p-2 bg-white/10 border border-gray-300 rounded-lg"
            />
                   {errors.location && (<p className="text-red-600 text-sm">{errors.location.message}</p>)}

        </div>
    </div>
{/* /// */}
    <div className="flex w-full flex-row bg-slate-50 bg-opacity-10 rounded-lg p-4 gap-4 mb-4">
        <h1 className="text-lg text-white md:w-[20%] font-semibold">Date of Birth :</h1>

        <div className="flex flex-row gap-4  w-full">
            <input
                type="date"
                placeholder="d.o.b"
                autoComplete="on"
                {...register('dob', { required: "Date of Birth is required", })}
                className="w-full md:w-[40%] p-2 text-white/50 bg-white/10 border border-gray-300 rounded-lg"
            />
                        {errors.dob && <p className="text-red-600 text-sm">{errors.dob.message}</p>}

        </div>
    </div>
{/* /// */}
    <div className="flex flex-col md:flex-row bg-slate-50 bg-opacity-10 rounded-lg p-4 gap-4 mb-4">
        <h1 className="text-lg text-white md:w-[20%] font-semibold">contact no :</h1>

        <div className="flex flex-row gap-4  w-full">
            <input
                type="number"
                placeholder="enter 10 digit contact no."
                autoComplete="on"
                {...register('contact', {  required: "Contact Number is required",
                    validate: {
                      matchPattern: (value) =>
                        /^[0-9]{10}$/.test(value) || "Contact Number must be exactly 10 digits",
                    },})}
                className="w-full md:w-[45%] p-2 text-white/50 bg-white/10 border border-gray-300 rounded-lg"
            />
                        {errors.contact && <p className="text-red-600 text-sm">{errors.contact.message}</p>}

        </div>
    </div>
{/* /// */}

    <div className='bg-slate-50 bg-opacity-10 rounded-lg p-4 gap-4 mb-4'>
    <div className="flex flex-col md:flex-row ">
        <h1 className="text-lg text-white md:w-[20%] font-semibold">Profile Image :</h1>
        <div className="flex flex-col md:flex-row gap-4 w-full">
            
            <input
                type="file"
                placeholder="profile img"
                autoComplete="on"
                {...register('profileimg', {  required: "Profile Image is required", })}
                className="w-full text-white p-2 bg-white/10 border border-gray-300 rounded-lg"
                />
                            {errors.profileimg && <p className="text-red-600 text-sm">{errors.profileimg.message}</p>}

        </div>
    </div>
        <h1 className='md:pl-6 pl-2 text-white/65'>{"file size should be < 2 mb , supported file: '.jpg' , '.png' , '.jpeg'"}</h1>
    </div>
   
   <div className='w-full flex items-center justify-center py-3 md:py-6'>
   <button
    type="submit"
    className="w-[40%] bg-[#6f1bf7] text-white text-xl py-2 rounded-lg transition duration-300 hover:bg-[#5a0ed7]"
    disabled={isLoading}
>
    {isLoading ? 'Creating Profile...' : 'Create Profile'}
</button>
    </div> 

    {error && <p className="text-red-600 text-center font-mono text-sm mt-4">{error}</p>}
</form>

  </div>
</div>


    </>
  )
}

export default RegistrationForm
