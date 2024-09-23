import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isRegistered: false,
    profileInfo: null,
};

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        userRegister: (state, action) => {
            state.isRegistered = true;
            state.profileInfo = action.payload.profileInfo;
        },
        clearProfile: (state) => {
            state.isRegistered = false;
            state.profileInfo = null;
        },
    },
});

export const { userRegister, clearProfile } = registerSlice.actions;
export default registerSlice.reducer;
