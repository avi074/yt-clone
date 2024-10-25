import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import settingsReducer from "./settingsSlice";
import videosReducer from "./videosSlice";

const ytStore = configureStore({
    reducer:{
        settings: settingsReducer,
        user: userReducer,
        videos: videosReducer,
    }
})

export default ytStore