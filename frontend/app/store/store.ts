import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice";
import postReducer from "./slices/posts.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
