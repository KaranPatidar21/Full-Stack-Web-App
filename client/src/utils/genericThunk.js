import { createAsyncThunk } from "@reduxjs/toolkit";
import { getApiErrorMessage } from "../services/api";

export function createGenericThunk(
  typePrefix,
  request,
  getResponseData = (response) => response.data
) {
  return createAsyncThunk(
    typePrefix,
    async (payload, { rejectWithValue }) => {
      try {
        const response = await request(payload);
        return getResponseData(response);
      } catch (error) {
        return rejectWithValue(getApiErrorMessage(error));
      }
    }
  );
}
