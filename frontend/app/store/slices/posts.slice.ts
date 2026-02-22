import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { IPost, IPostCreate, IPostInitialState } from "~/types/post";

export const getPosts = createAsyncThunk<
  { posts: IPost[]; nextCursor: string | null },
  { cursor?: string } | undefined
>("post/getPosts", async (params) => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
    params: { cursor: params?.cursor, limit: 10 },
    withCredentials: true,
  });
  return response.data;
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

export const addViewToPost = createAsyncThunk<number, string>(
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

interface ExtendedPostState extends IPostInitialState {
  nextCursor: string | null;
  hasMore: boolean;
  isFetchingMore: boolean;
}

const initialState: ExtendedPostState = {
  posts: [],
  post: null,
  listStatus: "idle",
  actionStatus: "idle",
  postStatus: "idle",
  nextCursor: null,
  hasMore: true,
  isFetchingMore: false,
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    resetPosts(state) {
      state.posts = [];
      state.nextCursor = null;
      state.hasMore = true;
      state.listStatus = "idle";
    },
    resetPost(state) {
      state.post = null;
      state.postStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state, action) => {
        if (action.meta.arg?.cursor) {
          state.isFetchingMore = true;
        } else {
          state.listStatus = "loading";
        }
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        const { posts, nextCursor } = action.payload;
        if (action.meta.arg?.cursor) {
          state.posts.push(...posts);
        } else {
          state.posts = posts;
        }
        state.nextCursor = nextCursor;
        state.hasMore = !!nextCursor;
        state.isFetchingMore = false;
        state.listStatus = "succeeded";
      })
      .addCase(getPosts.rejected, (state) => {
        state.isFetchingMore = false;
        state.listStatus = "failed";
      })
      // getPost
      .addCase(getPost.pending, (state) => {
        state.postStatus = "loading";
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.post = action.payload;
        state.postStatus = "succeeded";
      })
      .addCase(getPost.rejected, (state) => {
        state.postStatus = "failed";
      })
      // createPost
      .addCase(createPost.pending, (state) => {
        state.actionStatus = "loading";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
        state.actionStatus = "succeeded";
      })
      .addCase(createPost.rejected, (state) => {
        state.actionStatus = "failed";
      })
      // toggleLike
      .addCase(toggleLike.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (post) => post.id === action.payload.id,
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
        if (state.post?.id === action.payload.id) {
          state.post = action.payload;
        }
      })
      // addViewToPost
      .addCase(addViewToPost.fulfilled, (state, action) => {
        // action.payload это число просмотров
        if (state.post) {
          state.post._count.postView = action.payload;
        }
      });
  },
});

export const { resetPosts, resetPost } = postSlice.actions;
export default postSlice.reducer;
