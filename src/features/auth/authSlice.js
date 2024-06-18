import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
    username: null,
    userid: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setUserid: (state, action) => {
      state.userid = action.payload;
    },
  },
});

export const { setToken, setUsername, setUserid } = authSlice.actions;
export const selectCurrentToken = (state) => state.auth.accessToken;
export const selectCurrentUsername = (state) => state.auth.username;
export const selectCurrentUserid = (state) => state.auth.userid;
