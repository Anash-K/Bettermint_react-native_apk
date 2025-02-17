import AxiosInstance from "./AxiosInstance";

interface LoginData {
  email: string;
  device_type: string;
  firebase_token: string;
  push_token: string;
}

export const loginApi = async (loginData: LoginData) => {
  const response = await AxiosInstance.post("login", loginData);
  return response;
};

export const logoutApi = async () => {
  const response = await AxiosInstance.post("logout");
  return response;
};

export const deleteApi = async () => {
  const response = await AxiosInstance.post("delete-account");
  return response;
};

