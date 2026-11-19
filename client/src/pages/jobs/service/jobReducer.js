import { createSlice } from "@reduxjs/toolkit";
import { addCaseHandler } from "../../../utils/asyncReducer";
import { createJob, fetchMyPostedJobs } from "./jobAction";

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    items: [],
    createdJob: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearJobError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    addCaseHandler(builder, createJob, "createdJob");
    addCaseHandler(builder, fetchMyPostedJobs, "items");
  },
});

export const { clearJobError } = jobSlice.actions;
export default jobSlice.reducer;