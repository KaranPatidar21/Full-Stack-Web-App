import { createSlice } from "@reduxjs/toolkit";
import { getProfile, login, signup } from "./authAction";
import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
} from "../../../utils/localStorage";
import { addCaseHandler } from "../../../utils/asyncReducer";

const tokenStorageKey = "ptjob_token";
const userStorageKey = "ptjob_user";

function readStoredUser() {
  try {
    return JSON.parse(getItemFromLocalStorage(userStorageKey) || "null");
  } catch {
    return null;
  }
}

const initialState = {
  user: readStoredUser(),
  isLoading: Boolean(getItemFromLocalStorage(tokenStorageKey)),
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isLoading = false;
      state.error = null;
      removeItemFromLocalStorage(tokenStorageKey);
      removeItemFromLocalStorage(userStorageKey);
    },
    clearAuthError(state) {
      state.error = null;
    },
    clearUser(state) {
      state.user = null;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    addCaseHandler(builder, login);
    addCaseHandler(builder, signup);
    addCaseHandler(builder, getProfile, "user");
  },
});

export const {
  clearAuthError,
  clearUser,
  setUser,
  logout,
} = authSlice.actions;
export default authSlice.reducer;
