import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../pages/login/service/authReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
