import AxiosInstance from "./AxiosInstance";

interface LoginData {
  email: string;
  device_type: string;
  firebase_token: string;
  push_token: string;
}

export const loginApi = async (loginData: LoginData) => {
  try {
    const response = await AxiosInstance.post("login", loginData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const logoutApi = async () => {
  try {
    const response = await AxiosInstance.post("logout");
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteApi = async () => {
  try {
    const response = await AxiosInstance.post("delete-account");
    return response;
  } catch (error) {
    error;
  }
};
