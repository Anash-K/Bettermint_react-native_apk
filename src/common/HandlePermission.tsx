import { check, request } from "react-native-permissions";
import { ErrorHandler } from "../utils/ErrorHandler";

export const CheckPermission = async ({ permission }: any) => {
  try {
    const status = await check(permission);
    console.log(status, "status");
    if (status === "granted") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    ErrorHandler(error);
  }
};

export const RequestPermission = async ({ permission }: any) => {
  try {
     await request(permission);
  } catch (error) {
    throw error;
  }
};
