import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const searchVideosQ = createAsyncThunk(
  "videos/searchVideosQ",
  async (userParams={}, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/search", {
        params: userParams,
      })
      return res.data.items
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

const videosSlice = createSlice({
  name: "videos",
  initialState: {
    videos: [],
    curr_video: null,
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentVideo: (state, action) => {
      state.curr_video = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchVideosQ.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(searchVideosQ.fulfilled, (state, action) => {
        state.videos = action.payload
        state.loading = false
      })
      .addCase(searchVideosQ.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Something went wrong!"
      })
  },
})

export const { setCurrentVideo } = videosSlice.actions

export default videosSlice.reducer
