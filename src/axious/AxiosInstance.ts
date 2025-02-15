import { onlineManager } from "@tanstack/react-query";
import axios from "axios";
import store from "../redux/configureStore";
import { logout } from "../redux/slices/authSlice";

const AxiosInstance = axios.create({
  baseURL: "https://app.betterminthealth.com/api/",
  headers: {
    Accept: "application/json",
    // "Content-Type": "multipart/form-data",
    "secret-key": "c2a7fecd-a1a1-43e0-86b9-3c7eb9a04ec1",
  },
});

AxiosInstance.interceptors.request.use((request) => {
  if (!onlineManager) {
    return Promise.reject(new Error("Internet connection is not available"));
  }

  const storeData = store.getState();
  if (storeData.auth?.token) {
    request.headers.Authorization = `Bearer ${storeData.auth?.token}`;
  }

  return request;
});

AxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const errorObj = JSON.parse(JSON.stringify(error?.response ?? error));

    if (error == 401) {
      store.dispatch(logout());
    } else {
      throw errorObj;
    }
  }
);

export default AxiosInstance;
