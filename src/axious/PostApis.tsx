import axios from "axios";
import { useCallback } from "react";
import AxiosInstance from "./AxiosInstance";

interface LoginData {
  email: string;
  device_type: string;
  firebase_token: string;
  push_token: string;
}

export const loginApi = async (loginData: LoginData) => {
    console.log(loginData,"logData")
  const response = await AxiosInstance.post("login", loginData);
  console.log(response, "response");
  return response;
};
