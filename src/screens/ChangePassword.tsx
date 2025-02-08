import {
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import React, { useCallback, useState } from "react";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScreenProps } from "../navigator/Stack";
import { Controller, useForm } from "react-hook-form";
import { useCustomStyle } from "../constants/CustomStyles";
import CustomInput from "../common/CustomInput";
import CustomButton from "../common/CustomButton";

interface Inputs {
  "Old Password": string;
  "New Password": string;
  "Confirm New Password": string;
}

const ChangePassword: React.FC<ScreenProps<"ChangePassword">> = ({
  navigation,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    control,
    setValue,
    setError,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = (data: Inputs) => {
    if (data["New Password"] !== data["Confirm New Password"]) {
      setError("Confirm New Password", { message: "Passwords do not match" });
      return;
    }
    console.log("Password changed:", data);
    // Implement password change logic here
  };

  const CustomStyle = useCustomStyle();

  const handlePress = useCallback(() => {
    navigation.goBack();
  }, []);
  const insets = useSafeAreaInsets();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={[
          styles.container,
          { marginBottom: Platform.select({ ios: insets.bottom }) },
        ]}
      >
        <View style={styles.content}>
          <Controller
            control={control}
            name="Old Password"
            rules={{ required: "Old Password is required" }}
            render={({ field: { onChange, value } }) => (
              <CustomInput
                label="Old Password"
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
          {errors["Old Password"] && (
            <Text style={CustomStyle.errorMessage}>
              {errors?.["Old Password"]?.message}
            </Text>
          )}
          <Controller
            control={control}
            name="New Password"
            rules={{ required: "New Password is required" }}
            render={({ field: { onChange, value } }) => (
              <CustomInput
                label="New Password"
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
          {errors["New Password"] && (
            <Text style={CustomStyle.errorMessage}>
              {errors?.["New Password"]?.message}
            </Text>
          )}
          <Controller
            control={control}
            name="Confirm New Password"
            rules={{
              required: "Confirm Password is required",
              validate: (value) =>
                value === getValues('New Password') || "Passwords do not match",
            }}
            render={({ field: { onChange, value } }) => (
              <CustomInput
                label="Confirm New Password"
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
          {errors["Confirm New Password"] && (
            <Text style={CustomStyle.errorMessage}>
              {errors?.["Confirm New Password"]?.message}
            </Text>
          )}
        </View>
        <CustomButton text="Change password" onPress={handleSubmit(onSubmit)} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: Platform.select({ android: 40 }),
  },
});
