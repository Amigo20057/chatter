import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { IPost, IPostCreate, IPostInitialState } from "~/types/post";

export const getPosts = createAsyncThunk("post/getPosts", async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
    withCredentials: true,
  });
  return response.data as IPost[];
});

export const getPost = createAsyncThunk(
  "post/getPost",
  async ({ userTag, postId }: { userTag: string; postId: string }) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/posts/${userTag}/${postId}`,
      {
        withCredentials: true,
      },
    );
    return response.data as IPost;
  },
);

export const createPost = createAsyncThunk<IPost, IPostCreate>(
  "post/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/posts`,
        data,
        { withCredentials: true },
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Create post failed");
    }
  },
);

export const toggleLike = createAsyncThunk<IPost, string>(
  "post/toggle-like",
  async (postId) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/likes/toggle-like/${postId}`,
      null,
      { withCredentials: true },
    );

    return response.data;
  },
);

export const addViewToPost = createAsyncThunk<IPost, string>(
  "post/view",
  async (postId) => {
    const response = await axios.patch(
      `${import.meta.env.VITE_API_URL}/posts/${postId}/view`,
      null,
      { withCredentials: true },
    );

    return response.data;
  },
);

const initialState: IPostInitialState = {
  posts: [],
  post: null,
  listStatus: "idle",
  actionStatus: "idle",
  postStatus: "idle",
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.listStatus = "loading";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.listStatus = "succeeded";
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state) => {
        state.listStatus = "failed";
      })

      .addCase(createPost.pending, (state) => {
        state.actionStatus = "loading";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.actionStatus = "succeeded";
        state.posts.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state) => {
        state.actionStatus = "failed";
      })

      .addCase(getPost.pending, (state) => {
        state.postStatus = "loading";
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.postStatus = "succeeded";
        state.post = action.payload;
      })
      .addCase(getPost.rejected, (state) => {
        state.postStatus = "failed";
      })

      .addCase(toggleLike.pending, (state) => {
        state.actionStatus = "loading";
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        state.actionStatus = "succeeded";

        const index = state.posts.findIndex(
          (post) => post.id === action.payload.id,
        );

        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(toggleLike.rejected, (state) => {
        state.actionStatus = "failed";
      })

      .addCase(addViewToPost.pending, (state) => {
        state.actionStatus = "loading";
      })
      .addCase(addViewToPost.fulfilled, (state, action) => {
        state.actionStatus = "succeeded";

        const updatedPost = action.payload;

        if (state.post && state.post.id === updatedPost.id) {
          state.post = updatedPost;
        }

        const index = state.posts.findIndex(
          (post) => post.id === updatedPost.id,
        );

        if (index !== -1) {
          state.posts[index] = updatedPost;
        }
      })
      .addCase(addViewToPost.rejected, (state) => {
        state.actionStatus = "failed";
      });
  },
});

export default postSlice.reducer;
