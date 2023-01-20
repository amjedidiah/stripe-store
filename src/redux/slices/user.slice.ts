import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthDetails, StateError, UserState } from "redux/redux.types";
import { RootState } from "redux/store";
import { UserData } from "utils/firebase.utils";

// set as return type of the slice's initial state
export const initialState = {
  currentUser: null,
  isLoading: false,
  error: null,
} as UserState;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authenticateUserPending: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    emailRegisterPending: (state, _action: PayloadAction<AuthDetails>) => {
      state.isLoading = true;
      state.error = null;
    },
    emailLoginPending: (state, _action: PayloadAction<AuthDetails>) => {
      state.isLoading = true;
      state.error = null;
    },
    authenticateUserFulfilled: (state, action: PayloadAction<UserData>) => {
      state.isLoading = false;
      state.currentUser = action.payload;
    },
    authenticateUserRejected: (state, action: PayloadAction<StateError>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logoutPending: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    logoutFulfilled: (state) => {
      state.isLoading = false;
      state.currentUser = null;
    },
    logoutRejected: (state, action: PayloadAction<StateError>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  authenticateUserPending,
  emailRegisterPending,
  emailLoginPending,
  authenticateUserFulfilled,
  authenticateUserRejected,
  logoutPending,
  logoutFulfilled,
  logoutRejected,
} = userSlice.actions;

export const selectCurrentUser = (state: RootState): UserData | null =>
  state.user.currentUser;

export default userSlice.reducer;
