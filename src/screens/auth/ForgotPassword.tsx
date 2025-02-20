import React, { memo, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScreenProps } from "../../navigator/Stack";
import { useCustomStyle } from "../../constants/CustomStyles";
import CustomInput from "../../common/CustomInput";
import CustomButton from "../../common/CustomButton";
import auth from "@react-native-firebase/auth";
import { Controller, useForm } from "react-hook-form";
import { validations } from "../../utils/validations";
import { CustomToaster } from "../../common/CustomToaster";
import { ALERT_TYPE } from "react-native-alert-notification";

interface Inputs {
  email: string;
}

const ForgotPassword: React.FC<ScreenProps<"ForgotPassword">> = memo(
  ({ navigation }) => {
    const {
      handleSubmit,
      control,
      formState: { errors },
    } = useForm<Inputs>();

    const onSubmit = useCallback(async (data: Inputs) => {
      const { email } = data;
      if (!email) {
        return;
      }

      try {
        await auth().sendPasswordResetEmail(email);

        CustomToaster({
          type: ALERT_TYPE.SUCCESS,
          message: "Recovery Email Send Successfully",
        });
        navigation.goBack();
      } catch (error: any) {
        console.error("Error resetting password:", error.message);
      }
    }, []);

    const CustomStyle = useCustomStyle();

    return (
      <View style={styles.container}>
        <Text style={[CustomStyle.title, styles.title]}>Forgot Password?</Text>
        <Text style={[CustomStyle.subtitle, styles.subTitle]}>
          No worries! Just enter your email, and we’ll help you reset your
          password.
        </Text>
        <Controller
          control={control}
          name="email"
          rules={{
            required: validations.email?.required,
            pattern: validations?.email?.pattern,
          }}
          render={({ field: { onChange, value } }) => (
            <CustomInput
              label="Email"
              placeholderText="Enter email"
              onChange={onChange}
              value={value}
              inputConfigurations={{
                value: value,
                onChangeText: onChange,
              }}
            />
          )}
        />
        {errors.email && (
          <Text style={CustomStyle.errorMessage}>{errors.email.message}</Text>
        )}
        <CustomButton
          buttonStyle={{ marginTop: 14 }}
          text="Reset now"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    );
  }
);

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F2F7F6",
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
