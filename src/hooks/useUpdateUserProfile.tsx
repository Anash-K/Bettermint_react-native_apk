import { useMutation } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { MutationKey } from "../Types/MutationKeys";
import { AppLoaderRef } from "../../App";
import { UpdateProfile } from "../axious/PostApis";
import { CustomToaster } from "../common/CustomToaster";
import { ALERT_TYPE } from "react-native-alert-notification";
import { ErrorHandler } from "../utils/ErrorHandler";

const useUpdateUserProfile = (successMessage?: string) => {
  return useMutation({
    mutationKey: [MutationKey.updateProfile],
    mutationFn: async (data: any) => await UpdateProfile(data), // `data` should be passed when calling `mutate`
    onMutate: () => AppLoaderRef.current?.start(),
    onSuccess: (data) => {
      console.log(data, "res data");
      if (data?.status === 200) {
        CustomToaster({
          type: ALERT_TYPE.SUCCESS,
          message: successMessage ?? "Profile updated Successfully",
        });
      }
    },
    onError: (error) => {
      console.log(error, "error");
      ErrorHandler(error);
    },
    onSettled: () => AppLoaderRef.current?.stop(),
  });
};

export default useUpdateUserProfile;
