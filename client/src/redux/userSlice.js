import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        c_user: null,
        regionCode:'IN',
    },
    reducers:{

    }
})

export default userSlice.reducer