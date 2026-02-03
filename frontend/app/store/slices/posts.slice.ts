import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { IPost, IPostCreate, IPostInitialState } from "~/types/post";

export const getPosts = createAsyncThunk("post/getPosts", async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
    withCredentials: true,
  });
  return (await response.data) as IPost[];
});

export const createPost = createAsyncThunk<IPost, IPostCreate>(
  "post/create",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/posts`,
        data,
        { withCredentials: true },
      );

      dispatch(getPosts());

      return response.data;
    } catch (err: any) {
      console.error("CREATE POST ERROR:", err.response?.data || err);
      return rejectWithValue(err.response?.data || "Create post failed");
    }
  },
);

export const toggleLike = createAsyncThunk<IPost, string>(
  "post/like-post",
  async (postId) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/likes/toggle-like/${postId}`,
      null,
      { withCredentials: true },
    );

    return response.data;
  },
);

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
      })

      .addCase(createPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPost.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(createPost.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(toggleLike.pending, (state) => {
        state.status = "loading";
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        state.status = "succeeded";

        const index = state.data.findIndex(
          (post) => post.id === action.payload.id,
        );

        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(toggleLike.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default postSlice.reducer;
