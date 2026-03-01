import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { IUser, IUserInitialState } from "~/types/user";

export const registerUser = createAsyncThunk<
  void,
  Partial<IUser>,
  { rejectValue: string }
>("user/register", async (userData, { rejectWithValue, dispatch }) => {
  try {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/register`,
      userData,
      { withCredentials: true },
    );
    await dispatch(profile()).unwrap();
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Registration failed",
    );
  }
});

export const loginUser = createAsyncThunk<
  void,
  Partial<IUser>,
  { rejectValue: string }
>("user/login", async (userData, { rejectWithValue, dispatch }) => {
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, userData, {
      withCredentials: true,
    });
    await dispatch(profile()).unwrap();
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

export const profile = createAsyncThunk<IUser, void, { rejectValue: string }>(
  "user/profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/me`,
        { withCredentials: true },
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Unauthorized");
    }
  },
);

export const logoutUser = createAsyncThunk("user/logout", async () => {
  await axios.delete(`${import.meta.env.VITE_API_URL}/auth/logout`, {
    withCredentials: true,
  });
});

export const updateUser = createAsyncThunk<
  IUser,
  Omit<Partial<IUser>, "id" | "createdAt" | "updatedAt">,
  { rejectValue: string }
>("user/update", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_API_URL}/users/update`,
      userData,
      { withCredentials: true },
    );

    return response.data as IUser;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Update failed");
  }
});

const initialState: IUserInitialState = {
  data: null,
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

      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Registration failed";
      })

      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Login failed";
      })

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
        state.data = null;
        state.status = "failed";
        state.isAuth = false;
        state.error = action.payload ?? "Unauthorized";
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.data = null;
        state.isAuth = false;
        state.status = "idle";
      })

      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "succeeded";
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Update failed";
      });
  },
});

export default userSlice.reducer;
