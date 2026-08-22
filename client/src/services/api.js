import axios from "axios";
import { getItemFromLocalStorage } from "../utils/localStorage";

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || ""}/api`,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  const token = getItemFromLocalStorage("ptjob_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function getRequest(url, config = {}) {
  return apiClient.get(url, config);
}

export function postRequest(url, data = {}, config = {}) {
  return apiClient.post(url, data, config);
}

export function putRequest(url, data = {}, config = {}) {
  return apiClient.put(url, data, config);
}

export function patchRequest(url, data = {}, config = {}) {
  return apiClient.patch(url, data, config);
}

export function deleteRequest(url, config = {}) {
  return apiClient.delete(url, config);
}

export function getApiErrorMessage(error) {
  return error.response?.data?.message || "The request could not be completed.";
}
