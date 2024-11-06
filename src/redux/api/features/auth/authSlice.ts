/* eslint-disable @typescript-eslint/no-explicit-any */

import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

type TAuthState = {
  user: any;
  token: null | string;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    updateUserInfo: (state, action) => {
     
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const { setUser, logout,updateUserInfo  } = authSlice.actions;

export default authSlice.reducer;
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
