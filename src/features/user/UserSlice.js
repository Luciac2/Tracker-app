import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "./userApi";

const initialState = {
  users: [],
  status: "idle",
  userApproval: null,
};

export const fetchAllUser = createAsyncThunk("/user/all", async (token) => {
  try {
    return await api.fetchAllUsers(token);
  } catch (error) {
    console.log(error);
  }
});

export const requestSignIn = createAsyncThunk(
  "/user/requestApprove",
  async (data) => {
    try {
      return await api.signInUser(data);
    } catch (error) {
      console.log(error);
    }
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
      .addCase(fetchAllUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAllUser.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.status = "success";
          state.users = action.payload;
        }
      })
      .addCase(fetchAllUser.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(requestSignIn.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(requestSignIn.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.status = "success";
          state.userApproval = action.payload;
        }
      })
      .addCase(requestSignIn.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const { logout } = userSlice.actions;

// export const selectUser = (state: RootState) => state.auth;

export default userSlice.reducer;
