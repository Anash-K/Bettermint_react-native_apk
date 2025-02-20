import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useCallback } from "react";
import { ScreenProps } from "../navigator/Stack";
import { Controller, useForm } from "react-hook-form";
import { useCustomStyle } from "../constants/CustomStyles";
import CustomInput from "../common/CustomInput";
import CustomButton from "../common/CustomButton";
import { AppLoaderRef } from "../../App";
import { ErrorHandler } from "../utils/ErrorHandler";
import auth from "@react-native-firebase/auth";
import { validations } from "../utils/validations";
import { CustomToaster } from "../common/CustomToaster";
import { ALERT_TYPE } from "react-native-alert-notification";
import { useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";

interface Inputs {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const ChangePassword: React.FC<ScreenProps<"ChangePassword">> = ({
  navigation,
}) => {
  const {
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const CustomStyle = useCustomStyle();
  const { email } = useSelector((state: RootState) => state.auth);

  const changePassword = useCallback(async (data: Inputs) => {
    AppLoaderRef.current?.start();
    const { oldPassword, newPassword } = data;

    try {
      const user = auth().currentUser;

      if (!user) {
        CustomToaster({
          type: ALERT_TYPE.DANGER,
          message:
            "You are not logged in. Please log in to change your password.",
        });
        return;
      }
      const userCredential = auth.EmailAuthProvider.credential(
        email,
        oldPassword
      );
      await user.reauthenticateWithCredential(userCredential);
      await user.updatePassword(newPassword);
      CustomToaster({
        type: ALERT_TYPE.SUCCESS,
        message: "Password changed successfully",
      });
      navigation.goBack();
    } catch (error) {
      ErrorHandler(error);
    } finally {
      AppLoaderRef.current?.stop();
    }
  },[email]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container, CustomStyle.safeAreaMarginBottom]}>
        <View style={styles.content}>
          <Controller
            control={control}
            name="oldPassword"
            rules={validations.password}
            render={({ field: { onChange, value } }) => (
              <CustomInput
                label="Old Password"
                placeholderText="Enter old password"
                onChange={onChange}
                value={value}
                isPassword={true}
                inputConfigurations={{
                  value: value,
                  onChangeText: onChange,
                }}
              />
            )}
          />
          {errors.oldPassword && (
            <Text style={CustomStyle.errorMessage}>
              {errors?.oldPassword?.message}
            </Text>
          )}
          <Controller
            control={control}
            name="newPassword"
            rules={validations.password}
            render={({ field: { onChange, value } }) => (
              <CustomInput
                label="New Password"
                placeholderText="Enter new password"
                onChange={onChange}
                value={value}
                isPassword={true}
                inputConfigurations={{
                  value: value,
                  onChangeText: onChange,
                }}
              />
            )}
          />
          {errors.newPassword && (
            <Text style={CustomStyle.errorMessage}>
              {errors?.newPassword?.message}
            </Text>
          )}
          <Controller
            control={control}
            name="confirmNewPassword"
            rules={{
              required: "Confirm Password is required",
              validate: (value) =>
                value === getValues("newPassword") || "Passwords do not match",
            }}
            render={({ field: { onChange, value } }) => (
              <CustomInput
                label="Confirm New Password"
                placeholderText="Retype new password again"
                onChange={onChange}
                value={value}
                isPassword={true}
                inputConfigurations={{
                  value: value,
                  onChangeText: onChange,
                }}
              />
            )}
          />
          {errors.confirmNewPassword && (
            <Text style={CustomStyle.errorMessage}>
              {errors?.confirmNewPassword?.message}
            </Text>
          )}
        </View>
        <CustomButton
          text="Change password"
          onPress={handleSubmit(changePassword)}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    padding: 16,
  },
});
