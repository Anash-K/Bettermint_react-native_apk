import { useCallback } from "react";
import AxiosInstance from "./AxiosInstance";


export const logoutApi = async({userId}) =>{
    const response  =  await AxiosInstance('logout');
    console.log(response)
    return response;
};