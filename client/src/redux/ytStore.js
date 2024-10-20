import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import settingsReducer from "./settingsSlice";

const ytStore = configureStore({
    reducer:{
        settings: settingsReducer,
        user: userReducer,
    }
})

export default ytStore