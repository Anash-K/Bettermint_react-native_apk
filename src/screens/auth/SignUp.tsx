import {
  ImageBackground,
  Keyboard,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import FastImage from "react-native-fast-image";
import React, { useCallback, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { ScreenProps } from "../../navigator/Stack";
import { useCustomStyle } from "../../constants/CustomStyles";
import { login } from "../../redux/slices/authSlice";
import { CustomImages } from "../../assets/CustomImages";
import EmailVerificationModal from "../../Modals/EmailVerificationModal";
import CustomFont from "../../assets/fonts/customFonts";
import { colors } from "../../constants/colors";
import CustomInput from "../../common/CustomInput";
import CustomButton from "../../common/CustomButton";
import { AppLoaderRef } from "../../../App";
import { ErrorHandler } from "../../utils/ErrorHandler";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  getIdToken,
  sendEmailVerification,
  deleteUser,
} from "firebase/auth";
import auth from "@react-native-firebase/auth";
import { loginApi } from "../../axious/PostApis";
import { ALERT_TYPE } from "react-native-alert-notification";
import { CustomToaster } from "../../common/CustomToaster";
// import { getFCMToken } from "../../utils/FCM";

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};
const SignUp: React.FC<ScreenProps<"SignUp">> = ({ navigation }) => {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const [isModal, setIsModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  const CustomStyle = useCustomStyle();
  const btnDisableRef = useRef<boolean>(false);
  const authInstance = auth();

  // const onSubmit: SubmitHandler<Inputs> = (data) => {
  //   console.log(data);
  //   toggleEmailModal();
  // };

  const handlePress = useCallback(() => {
    navigation.navigate("Login");
  }, []);

  const toggleEmailModal = useCallback(() => {
    setIsModal(!isModal);
  }, [isModal]);

  const handleConfirm = useCallback(() => {
    AppLoaderRef.current?.start();
    resendVerificationEmail(); // Call resend email function
  }, [getValues]);

  const resendVerificationEmail = useCallback(async () => {
    try {
      await auth().currentUser?.sendEmailVerification();
      CustomToaster({
        type: ALERT_TYPE.SUCCESS,
        message: "Email sent successfully",
      });
    } catch (error) {
      ErrorHandler(error);
    } finally {
      await authInstance.signOut();
      AppLoaderRef.current?.stop();
    }
  }, []);

  const handleSuccess = useCallback(() => {
    CustomToaster({
      type: ALERT_TYPE.SUCCESS,
      message: "Sign-up successfully please login",
    });
    setIsModal(true);
  }, []);

  const onSubmit: SubmitHandler<Inputs> = useCallback(async (data) => {
    if (btnDisableRef.current) {
      return;
    }

    btnDisableRef.current = true;

    Keyboard.dismiss();
    const email = data?.email?.trim();
    const password = data?.password?.trim();

    AppLoaderRef.current?.start();

    try {
      if (authInstance.currentUser) {
        await authInstance.signOut();
      }

      const userCredential = await authInstance.createUserWithEmailAndPassword(
        email,
        password
      );

      const firebaseToken = await userCredential.user.getIdToken();

      const response = await loginApi({
        email: email,
        device_type: Platform.OS,
        firebase_token: firebaseToken ?? "",
        push_token: "Dummy",
      });

      console.log(response)

      await userCredential.user.sendEmailVerification();

      await authInstance.signOut();

      handleSuccess();

    } catch (er) {
      console.log(er)
      ErrorHandler(er);
    } finally {
      AppLoaderRef.current?.stop();
      btnDisableRef.current = false;
    }
  }, []);

  return (
    <ScrollView
      style={[styles.container, CustomStyle.safeAreaMarginBottom]}
      contentContainerStyle={styles.contentStyle}
      bounces={false}
    >
      <StatusBar barStyle={"light-content"} backgroundColor={"#1C657C"} />
      <ImageBackground
        style={styles.bgLogoImage}
        source={CustomImages.logoBackground}
      >
        <View style={styles.logoContainer}>
          <FastImage source={CustomImages.logo} style={styles.logo} />
        </View>
      </ImageBackground>
      <View style={styles.innerContainer}>
        <Text style={[CustomStyle.title, styles.pageTitle]}>
          Sign up for free
        </Text>
        {/* Register inputs using Controller */}
        <Controller
          control={control}
          name="email"
          rules={{ required: "Email is required" }}
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
          <Text style={styles.errorMessage}>{errors.email.message}</Text>
        )}

        <Controller
          control={control}
          name="password"
          rules={{ required: "Password is required" }}
          render={({ field: { onChange, value } }) => (
            <CustomInput
              label="Password"
              placeholderText="Enter Password"
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
        {errors.password && (
          <Text style={styles.errorMessage}>{errors.password.message}</Text>
        )}

        <Controller
          control={control}
          name="confirmPassword"
          rules={{
            required: "Confirm Password is required",
            validate: (value) =>
              value === getValues("password") || "Passwords do not match",
          }}
          render={({ field: { onChange, value } }) => (
            <CustomInput
              label="Confirm Password"
              placeholderText="Enter Password Again"
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
        {errors.confirmPassword && (
          <Text style={styles.errorMessage}>
            {errors.confirmPassword.message}
          </Text>
        )}

        <CustomButton
          buttonStyle={styles.loginButton}
          text="Create account"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
      <View style={styles.bottomButtonContainer}>
        <Text style={styles.bottomText}>Already have an account?</Text>

        <CustomButton
          text="Login"
          buttonStyle={styles.createAccountBtnStyle}
          textStyle={styles.createAccountBtnText}
          onPress={handlePress}
        />
      </View>
      <EmailVerificationModal
        isVisible={isModal}
        closeModal={toggleEmailModal}
        OnConfirm={handleConfirm}
      />
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 11,
    fontFamily: CustomFont.Urbanist400,
    color: colors.error,
  },
  loginButton: {
    marginTop: 14,
    marginBottom: 10,
  },
  contentStyle: {
    flexGrow: 1,
  },
  bottomText: {
    fontFamily: CustomFont.Urbanist400,
    fontSize: 16,
    lineHeight: 19.2,
    color: colors.secondaryLight,
  },
  bottomButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
  },
  forgotButtonText: {
    color: colors.primaryLight,
  },
  forgotButton: {
    backgroundColor: "transparent",
    textAlign: "center",
    alignSelf: "center",
  },
  createAccountBtnStyle: {
    backgroundColor: "transparent",
    padding: 0,
    margin: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.primaryLight,
  },
  createAccountBtnText: {
    color: colors.primaryLight,
    fontSize: 16,
    lineHeight: 19.2,
    marginBottom: -3,
  },
  innerContainer: {
    paddingHorizontal: 16,
    flex: 1,
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#F2F7F6",
  },
  logo: {
    width: 64,
    height: 64,
  },
  logoContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    zIndex: 1,
    flex: 1,
    marginBottom: 36,
  },
  pageTitle: {
    marginTop: 40,
    marginBottom: 32,
  },
  bgLogoImage: {
    aspectRatio: "2.34375",
    marginTop: -1,
  },
});
