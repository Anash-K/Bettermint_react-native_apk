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

interface ProfileDataProps {
  name: string;
  date_of_birth: string; // format: Y-m-d
  gender: "male" | "female" | "others";
  city: string;
  mobile_number: string;
  height: number;
  height_unit: "in" | "cm";
  weight: number;
  weight_unit: "kg" | "lbs";
  status: "working" | "studying" | "neither";
  profile_picture: string;
  chest: number; // in inches
  waist: number; // in inches
  hip: number; // in inches
  thigh: number; // in inches
  blood_glucose: number; // in mg/dl
  total_cholesterol: number; // in mg/dl
  hdl_cholesterol: number; // in mg/dl
  ldl_cholesterol: number; // in mg/dl
  systolic_blood_pressure: number; // in mmHg
  diastolic_blood_pressure: number; // in mmHg
  date_of_report: string; // format: Y-m-d
  user_diseases: string[]; // array of disease names
  user_family_diseases: string[]; // array of family disease names
};

export const UpdateProfile = async (profileData: ProfileDataProps) => {
  try {
    const response = await AxiosInstance.post("profile-update");
    return response;
  } catch (error) {
    error;
  }
};
