import AxiosInstance from "./AxiosInstance";

export const GetProfileInfo = async () => {
  try {
    const response = await AxiosInstance.get("profile-data");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetQuestions = async () => {
  try {
    const response = await AxiosInstance.get("questions");
    return response.data;
  } catch (error) {
    throw error;
  }
};
