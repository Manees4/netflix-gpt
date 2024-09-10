import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    trendingMovies:null,
    
    trailerVideo: null, // State for storing the trailer video
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addTrendingMovies: (state, action) => {
      state.trendingMovies = action.payload;
    },
    
    
    addTrailerVideo: (state, action) => {
      // Correctly updating the trailerVideo property
      state.trailerVideo = action.payload;
    },
  },
});

export const { addNowPlayingMovies, addTrailerVideo, addTrendingMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
