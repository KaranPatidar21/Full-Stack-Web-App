import { apiUrl } from "../../../constant";
import { getRequest, postRequest } from "../../../services/api";
import { createGenericThunk } from "../../../utils/genericThunk";

export const signup = createGenericThunk(
  "auth/signup",
  (details) => postRequest(apiUrl.auth.signup, details)
);

export const login = createGenericThunk(
  "auth/login",
  (credentials) => postRequest(apiUrl.auth.login, credentials)
);

export const getProfile = createGenericThunk(
  "auth/getProfile",
  (token) => getRequest(apiUrl.auth.profile, {
    headers: { Authorization: `Bearer ${token}` },
  }),
  (response) => response.data.user
);
