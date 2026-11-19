import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../pages/login/service/authReducer";
import jobReducer from "../pages/jobs/service/jobReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobReducer,
  },
});
