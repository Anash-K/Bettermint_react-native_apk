import React, { memo, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScreenProps } from "../navigator/Stack";
import CustomInput from "../common/CustomInput";
import CustomButton from "../common/CustomButton";
import { useCustomStyle } from "../constants/CustomStyles";

const ForgotPassword: React.FC<ScreenProps<"ForgotPassword">> = memo(() => {
  const handleChange = useCallback(() => {}, []);
  const handleForgotPassword = useCallback(() => {}, []);
  const CustomStyle = useCustomStyle();

  return (
    <View style={styles.container}>
      <Text style={[CustomStyle.title, styles.title]}>Forgot Password?</Text>
      <Text style={[CustomStyle.subtitle, styles.subTitle]}>
        No worries! Just enter your email, and we’ll help you reset your
        password.
      </Text>
      <CustomInput
        label="Email"
        placeholderText="Enter email"
        onChange={handleChange}
      />
      <CustomButton
        buttonStyle={{ marginTop: 14 }}
        text="Reset now"
        onPress={handleForgotPassword}
      />
    </View>
  );
});

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    lineHeight: 28.8,
    textAlign: "left",
    marginBottom: 8,
  },
  subTitle: {
    textAlign: "left",
    marginBottom: 22,
  },
});
