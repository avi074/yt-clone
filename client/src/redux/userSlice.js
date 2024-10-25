import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchData = createAsyncThunk(
  "user/fetchData",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/user/auth", {
        headers: {
          Authorization: `ytClone ${token}`,
        },
      })
      return response.data.data // Return user data on success
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

const userSlice = createSlice({
  name: "user",
  initialState: {
    regionCode: "IN",
    user: null,
    token: localStorage.getItem('accessToken') ?? null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null
      state.user = null
      localStorage.removeItem("accessToken")
      alert('User LogOut Successfully!')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        localStorage.removeItem('accessToken')
      })
  },
})

export const { logout } = userSlice.actions

export default userSlice.reducer
