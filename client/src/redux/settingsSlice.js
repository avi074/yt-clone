import { createSlice } from "@reduxjs/toolkit";


const settingsSlice = createSlice({
    name:'settings',
    initialState:{
        hideSidebar: true,
        videos: [],
        searched: false
    },
    reducers:{
        /**
         * Toggles the sidebar hidden/collapse value
         */
        toggleSidebar: (state) =>{
            state.hideSidebar = !state.hideSidebar
        },
        /**
         * Sets the sidebar hidden value to given value
         * @param {{payload:boolean, type:string}} action 
         */
        setHideSidebar: (state, action) =>{
            state.hideSidebar = action.payload
        },
        
        
    }
})


export const {toggleSidebar, setHideSidebar} = settingsSlice.actions

export default settingsSlice.reducer