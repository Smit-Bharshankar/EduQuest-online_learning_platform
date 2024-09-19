import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import registerSlice from "./registerSlice";
const store = configureStore({
    reducer:{
        auth: authSlice , 
        reigster : registerSlice
    }
});

export default store;