import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "./userApi";

const initialState = {
  users: [],
  status: "idle",
  userApproval: null,
  error: null,
};

// Fetch all users
export const fetchAllUser = createAsyncThunk("user/fetchAll", async (token) => {
  try {
    return await api.fetchAllUsers(token);
  } catch (error) {
    throw new Error(error.message);
  }
});

// Request user sign-in
export const requestSignIn = createAsyncThunk(
  "user/requestSignIn",
  async (data) => {
    try {
      return await api.signInUser(data);
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

// Request user sign-out (newly added)
export const requestSignOut = createAsyncThunk(
  "user/requestSignOut",
  async () => {
    // Logic for sign out, such as clearing tokens or making an API call
    return; // or return some confirmation message if needed
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAllUser.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.status = "success";
          state.users = action.payload;
        }
      })
      .addCase(fetchAllUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(requestSignIn.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(requestSignIn.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.status = "success";
          state.userApproval = action.payload;
        }
      })
      .addCase(requestSignIn.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(requestSignOut.fulfilled, (state) => {
        state.status = "idle"; // Or any state you want after sign out
        state.userApproval = null; // Reset user approval on sign out
      });
  },
});

export const { logout } = userSlice.actions;

// Selector functions to access state
export const selectUsers = (state) => state.user.users;
export const selectUserStatus = (state) => state.user.status;
export const selectUserApproval = (state) => state.user.userApproval;
export const selectUserError = (state) => state.user.error;

export default userSlice.reducer;
