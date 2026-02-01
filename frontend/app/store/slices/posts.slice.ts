import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { IPost, IPostInitialState } from "~/types/post";

export const getPosts = createAsyncThunk("post/getPosts", async () => {
  const response = await axios.get(`${process.env.VITE_API_URL}/posts`, {
    withCredentials: true,
  });
  return (await response.data) as IPost[];
});

const initialState: IPostInitialState = {
  data: [],
  status: "idle",
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getPosts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default postSlice.reducer;
