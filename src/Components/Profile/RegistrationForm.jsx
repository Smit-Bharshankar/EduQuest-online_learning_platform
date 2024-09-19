import React , {useState , useEffect} from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { register } from '../../store/registerSlice';
import service from '../../Appwrite/configure';

function RegistrationForm() {
    
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState('');
    // const authStatus = useSelector((state) => state.auth.status);
    // const { isRegistered, profileInfo } = useSelector((state) => state.register);

    // // useEffect(() => {
    // //     if (authStatus) {
    // //       SetForwardtoSignin(false);
    // //     } else {
    // //       SetForwardtoSignin(true);
    // //     }
    // //   }, [authStatus]);

    const registerUser = async (data) => {
        const { firstName, lastName, email, password, dob, contact, profileimg } = data;
        setError('')
      
        try {
          // Upload profile image file
          const uploadedFile = await service.uploadFile(profileimg[0]);
          const userName = firstName + ' ' + lastName
      
          if (!uploadedFile) {
            throw new Error("File upload failed");
          }
      
          // Create user document
          const newUser = await service.createUserDocument({
            userName,
            email,
            password,
            dob,
            contact,
            profileImgId: uploadedFile.$id // Store the uploaded file ID in the user profile
          });
      
          if (newUser) {
            console.log("User registered successfully:", newUser);
            dispatch(register(data));
            toast.success("Profile Created Successfully!");
            navigate(-1)
          } else {
            throw new Error("User registration failed");
          }
        } catch (error) {
          console.log("Error in registerUser:", error);
          setError("Registration failed. Please try again.");
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
                {...register('firstName', { required: true })}
                className="w-full p-2 bg-white/10 border border-gray-300 rounded-lg"
            />
            <input
                type="text"
                placeholder="Last Name"
                autoComplete="on"
                {...register('lastName', { required: true })}
                className="w-full p-2 bg-white/10 border border-gray-300 rounded-lg"
            />
        </div>
    </div>
{/* /// */}
    <div className="flex flex-col md:flex-row bg-slate-50 bg-opacity-10 rounded-lg p-4 gap-4 mb-4">
        <h1 className="text-lg text-white md:w-[20%] font-semibold">Email :</h1>

        <div className="flex flex-col md:flex-row gap-4 w-full">
            <input
                type="email"
                placeholder="Email"
                autoComplete="on"
                {...register('email', { required: true })}
                className="w-full p-2 bg-white/10 border border-gray-300 rounded-lg"
            />
        </div>
    </div>
{/* /// */}
    <div className="flex flex-col md:flex-row bg-slate-50 bg-opacity-10 rounded-lg p-4 gap-4 mb-4">
        <h1 className="text-lg text-white md:w-[20%] font-semibold">Password :</h1>

        <div className="flex flex-col md:flex-row gap-4 w-full">
            <input
                type="password"
                placeholder="Password"
                autoComplete="on"
                {...register('password', { required: true })}
                className="w-full p-2 bg-white/10 border border-gray-300 rounded-lg"
            />
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
                {...register('d.o.b', { required: true })}
                className="w-full md:w-[40%] p-2 text-white/50 bg-white/10 border border-gray-300 rounded-lg"
            />
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
                {...register('contact', { required: true })}
                className="w-full md:w-[45%] p-2 text-white/50 bg-white/10 border border-gray-300 rounded-lg"
            />
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
                {...register('profileimg', { required: true })}
                className="w-full text-white p-2 bg-white/10 border border-gray-300 rounded-lg"
                />
        </div>
    </div>
        <h1 className='md:pl-6 pl-2 text-white/65'>{"file size should be < 2 mb , supported file: '.jpg' , '.png' , '.jpeg'"}</h1>
    </div>
   
   <div className='w-full flex items-center justify-center py-3 md:py-6'>
   <button
        type="submit"
        className="w-[40%] bg-[#6f1bf7] text-white text-xl py-2 rounded-lg transition duration-300 hover:bg-[#5a0ed7]"
        >
        Create Profile
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
