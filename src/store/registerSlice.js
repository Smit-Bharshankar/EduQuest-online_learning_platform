import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isRegistered: false,
    profileInfo: null,
    profilePicUrl: '',
};

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        userRegister: (state, action) => {
            state.isRegistered = true;
            state.profileInfo = action.payload.profileInfo;
        },
        setProfilePicUrl: (state, action) => {
            state.profilePicUrl = action.payload;  // Action for updating profile picture URL
          },
        clearProfile: (state) => {
            state.isRegistered = false;
            state.profileInfo = null;
            state.profilePicUrl=null;
        },
    },
});

export const { userRegister, clearProfile , setProfilePicUrl} = registerSlice.actions;
export default registerSlice.reducer;
