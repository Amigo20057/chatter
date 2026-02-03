import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { IUser, IUserInitialState } from "~/types/user";

export const registerUser = createAsyncThunk<
  IUser,
  Partial<IUser>,
  { rejectValue: string }
>("user/register", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/register`,
      userData,
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

export const loginUser = createAsyncThunk<
  IUser,
  Partial<IUser>,
  { rejectValue: string }
>("user/login", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/login`,
      userData,
      { withCredentials: true },
    );

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

export const profile = createAsyncThunk("user/profile", async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/users/profile`,
    {
      withCredentials: true,
    },
  );
  return (await response.data) as IUser;
});

export const logoutUser = createAsyncThunk("user/logout", async () => {
  await axios.delete(`${import.meta.env.VITE_API_URL}/auth/logout`, {
    withCredentials: true,
  });
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
  isAuth: false,
  status: "idle",
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //REGISTER
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "succeeded";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Unknown error";
      })

      //LOGIN
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "succeeded";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Unknown error";
      })

      //LOGOUT
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.data = {};
        state.status = "succeeded";
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
      })

      //PROFILE
      .addCase(profile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(profile.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "succeeded";
        state.isAuth = true;
        state.error = null;
      })
      .addCase(profile.rejected, (state, action) => {
        state.data = {};
        state.status = "failed";
        state.isAuth = false;
        state.error =
          action.error.message === "Unauthorized"
            ? "Unauthorized"
            : action.error.message;
      })

      //UPDATE
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
