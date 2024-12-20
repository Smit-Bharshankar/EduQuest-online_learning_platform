import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { userRegister } from '../../store/registerSlice';
import service from '../../Appwrite/configure';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

function EditProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const userInfo = useSelector((state) => state.register?.profileInfo);

    const userName = userInfo?.userName; 
    const [firstName, lastName] = userName ? userName.split(' ') : ['', ''];

    const updateUser = async (data) => {
        console.log('updating User');
    };

    const registerUser = async (data) => {
        setIsLoading(true); // Set loading state to true
        const { firstName, lastName, email, location, dob, contact } = data;
        setError(''); // Clear any previous error
        const intContact = parseInt(contact, 10);

        try {
            // If dob is provided, validate it
            let formattedDobISOString = null;
            if (dob) {
                // Parse and format dob to include time
                const formattedDob = new Date(`${dob}T00:00:00.000Z`); // Append time to the date
                if (isNaN(formattedDob)) {
                    throw new Error("Invalid Date of Birth format. Please provide a valid date.");
                }
                formattedDobISOString = formattedDob.toISOString(); // Convert to ISO format (yyyy-mm-dd hh:mm:ss.000)
            }

            const userName = `${firstName} ${lastName}`;

            // Create user document
            const updateUser = await service.updateUserDocument({
                documentId: userInfo.$id,
                userName,
                email,
                location,
                dob: formattedDobISOString, // Send null if dob is not provided
                contact: intContact,
            });

            console.log('Update user:', updateUser); // Check the new user response

            if (updateUser) {
                console.log("User updated successfully:", updateUser);
                dispatch(userRegister({
                    profileInfo: {
                        ...userInfo,
                        userName,
                        email,
                        location,
                        dob: formattedDobISOString, // Save the formatted DOB
                        contact: intContact,
                    }
                }));
                toast.success("Profile Updated Successfully!");
                reset();
                navigate('/'); // Navigate back after success
            } else {
                throw new Error("User Data Update failed");
            }

        } catch (error) {
            console.error("Error in EditProfile:", error);
            setError("Update failed: " + error.message); // Correct error setting
        } finally {
            setIsLoading(false); // Set loading state to false
        }
    };

    return (
        <div
            className="h-full w-full flex items-center justify-center bg-gradient-to-br pb-12 from-[#e45757] via-[#a20b7f] to-[#42129b]"
            style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1619796696652-a29a854f21a0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                height: '100%',
            }}
        >
            <form className="w-full md:max-w-[55%] backdrop-blur-md p-6 rounded-lg shadow-md" onSubmit={handleSubmit(registerUser)}>
                {/* Full Name */}
                <div className="flex flex-col md:flex-row bg-slate-50 bg-opacity-10 rounded-lg p-4 gap-4 mb-4">
                    <h1 className="text-lg text-white md:w-[20%] font-semibold">Full Name :</h1>
                    <div className="flex flex-col md:flex-row gap-4 w-full">
                        <input
                            type="text"
                            defaultValue={firstName}
                            autoComplete="on"
                            {...register('firstName', {
                                required: "First Name is required",
                                validate: {
                                    matchPattern: (value) =>
                                        /^[A-Za-z]{2,}$/.test(value) || "First Name must be at least 2 characters long and contain only letters",
                                },
                            })}
                            className="w-full p-2 bg-white/10 border border-gray-300 rounded-lg"
                        />
                        {errors.firstName && (<p className="text-red-600 text-sm">{errors.firstName.message}</p>)}
                        <input
                            type="text"
                            defaultValue={lastName}
                            autoComplete="on"
                            {...register('lastName', {
                                required: "Last Name is required",
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

                {/* Email */}
                <div className="flex flex-col md:flex-row bg-slate-50 bg-opacity-10 rounded-lg p-4 gap-4 mb-4">
                    <h1 className="text-lg text-white md:w-[20%] font-semibold">Email :</h1>
                    <div className="flex flex-col md:flex-row gap-4 w-full">
                        <input
                            type="email"
                            value={userInfo.email}
                            readOnly
                            placeholder="Email"
                            autoComplete="on"
                            {...register('email', { required: true })}
                            className="w-full p-2 bg-white/10 border border-gray-300 cursor-not-allowed rounded-lg"
                        />
                    </div>
                </div>

                {/* Location */}
                <div className="flex flex-col md:flex-row bg-slate-50 bg-opacity-10 rounded-lg p-4 gap-4 mb-4">
                    <h1 className="text-lg text-white md:w-[20%] font-semibold">Location :</h1>
                    <div className="flex flex-col md:flex-row gap-4 w-full">
                        <input
                            type="text"
                            defaultValue={userInfo.location}
                            autoComplete="on"
                            {...register('location', { required: "Location is required" })}
                            className="w-full p-2 bg-white/10 border border-gray-300 rounded-lg"
                        />
                        {errors.location && (<p className="text-red-600 text-sm">{errors.location.message}</p>)}
                    </div>
                </div>

                {/* Date of Birth */}
                <div className="flex w-full flex-row bg-slate-50 bg-opacity-10 rounded-lg p-4 gap-4 mb-4">
                    <h1 className="text-lg text-white md:w-[20%] font-semibold">Date of Birth :</h1>
                    <div className="flex flex-row gap-4 w-full">
                        <input
                            type="date"
                            defaultValue={userInfo.dob}
                            autoComplete="on"
                            {...register('dob')} // No required validation
                            className="w-full md:w-[40%] p-2 text-white/50 bg-white/10 border border-gray-300 rounded-lg"
                        />
                    </div>
                </div>

                {/* Contact Number */}
                <div className="flex flex-col md:flex-row bg-slate-50 bg-opacity-10 rounded-lg p-4 gap-4 mb-4">
                    <h1 className="text-lg text-white md:w-[20%] font-semibold">Contact No :</h1>
                    <div className="flex flex-row gap-4 w-full">
                        <input
                            type="number"
                            defaultValue={userInfo.contact}
                            autoComplete="on"
                            {...register('contact', {
                                required: "Contact Number is required",
                                validate: {
                                    matchPattern: (value) =>
                                        /^[0-9]{10}$/.test(value) || "Contact Number must be exactly 10 digits",
                                },
                            })}
                            className="w-full md:w-[45%] p-2 text-white/50 bg-white/10 border border-gray-300 rounded-lg"
                        />
                        {errors.contact && <p className="text-red-600 text-sm">{errors.contact.message}</p>}
                    </div>
                </div>

                <div className='w-full flex items-center justify-center py-3 md:py-6'>
                    <button
                        type="submit"
                        className="w-[40%] bg-[#6f1bf7] hover:bg-[#5d0fc4] text-white p-2 rounded-lg"
                        disabled={isLoading} // Disable button while loading
                    >
                        {isLoading ? "Updating..." : "Update Profile"}
                    </button>
                </div>

                {error && <p className="text-red-600 text-sm text-center">{error}</p>}
            </form>
        </div>
    );
}

export default EditProfile;
