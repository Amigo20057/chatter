import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { IUser, IUserInitialState } from "~/types/user";

export const registerUser = createAsyncThunk(
  "user/register",
  async (userData: Partial<IUser>) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/register`,
      userData,
      {
        withCredentials: true,
      },
    );
    return (await response.data) as IUser;
  },
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (userData: Partial<IUser>) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/login`,
      userData,
      {
        withCredentials: true,
      },
    );
    return (await response.data) as IUser;
  },
);

export const profile = createAsyncThunk("user/profile", async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/users/profile`,
    {
      withCredentials: true,
    },
  );
  return (await response.data) as IUser;
});

const updateUser = createAsyncThunk(
  "user/update",
  async (userData: Omit<Partial<IUser>, "id" | "createdAt" | "updatedAt">) => {
    const response = await axios.patch(
      `${import.meta.env.VITE_API_URL}/users/update`,
      userData,
      {
        withCredentials: true,
      },
    );
    return (await response.data) as IUser;
  },
);

const initialState: IUserInitialState = {
  data: {},
  status: "idle",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "succeeded";
      })
      .addCase(registerUser.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "succeeded";
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(profile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(profile.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "succeeded";
      })
      .addCase(profile.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "succeeded";
      })
      .addCase(updateUser.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default userSlice.reducer;
