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
import React, { useCallback, useEffect, useRef } from "react";
import { ScreenProps } from "../../navigator/Stack";
import { useCustomStyle } from "../../constants/CustomStyles";
import { CustomImages } from "../../assets/CustomImages";
import { colors } from "../../constants/colors";
import CustomFont from "../../assets/fonts/customFonts";
import CustomInput from "../../common/CustomInput";
import CustomButton from "../../common/CustomButton";
import { loginApi } from "../../axious/PostApis";
import { Controller, useForm } from "react-hook-form";
import { AppLoaderRef } from "../../../App";
import { CustomToaster } from "../../common/CustomToaster";
import { ALERT_TYPE } from "react-native-alert-notification";
import auth from "@react-native-firebase/auth";
import { ErrorHandler } from "../../utils/ErrorHandler";
import { login } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import EmailVerificationModal from "../../Modals/EmailVerificationModal";

interface Inputs {
  email: string;
  password: string;
}

const Login: React.FC<ScreenProps<"Login">> = ({ navigation }) => {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const btnDisableRef = useRef<boolean>(false);
  const verificationRef = useRef<boolean>(false);
  const emailRef = useRef<string | null>(null);
  const dispatch = useDispatch();

  const handleNav = useCallback((PageName: any) => {
    navigation.navigate(PageName);
  }, []);
  const CustomStyle = useCustomStyle();

  const onSubmit = useCallback(async (data: Inputs) => {
    Keyboard.dismiss();

    if (btnDisableRef.current) return;
    btnDisableRef.current = true;

    const email = data?.email?.trim();
    const pass = data?.password?.trim();

    AppLoaderRef.current?.start();

    try {
      await auth().signInWithEmailAndPassword(email, pass);

      if (!auth().currentUser?.emailVerified) {
        await auth().signOut();
        emailRef.current = email;
        setTimeout(() => {
          verificationRef.current = true;
        }, 500);
        return;
      }

      const firebaseToken = await auth().currentUser?.getIdToken();
      const pushToken = "dummy";

      const res = await loginApi({
        device_type: Platform.OS,
        push_token: pushToken,
        firebase_token: firebaseToken ?? "",
        email: email,
      });

      if (res?.status === 200) {
        CustomToaster({
          type: ALERT_TYPE.SUCCESS,
          message: "Login successFully",
        });
      }

      setTimeout(() => {
        dispatch(
          login({
            email: email,
            token: res?.data?.payload?.access_token,
          } as any)
        );
      }, 700);
    } catch (er) {
      if (auth().currentUser) {
        auth().signOut();
      }
      ErrorHandler(er);
    } finally {
      console.log(AppLoaderRef.current, "loader3");
      AppLoaderRef.current?.stop();
      btnDisableRef.current = false;
    }
  }, []);

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
      await auth().signOut();
      AppLoaderRef.current?.stop();
    }
  }, []);

  const handleModalClose = useCallback(() => {
    verificationRef.current == false;
  }, [verificationRef.current]);

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
        <Text style={[CustomStyle.title, styles.pageTitle]}>Welcome Back</Text>
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
          <Text style={CustomStyle.errorMessage}>{errors.email.message}</Text>
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
          <Text style={CustomStyle.errorMessage}>
            {errors.password.message}
          </Text>
        )}
        <CustomButton
          buttonStyle={styles.loginButton}
          text="Login"
          onPress={handleSubmit(onSubmit)}
        />
        <CustomButton
          text="Forgot Password?"
          buttonStyle={styles.forgotButton}
          textStyle={styles.forgotButtonText}
          onPress={handleNav.bind(this, "ForgotPassword")}
        />
      </View>
      <View style={styles.bottomButtonContainer}>
        <Text style={styles.bottomText}>Don’t have an account?</Text>

        <CustomButton
          text="Create Account"
          buttonStyle={styles.createAccountBtnStyle}
          textStyle={styles.createAccountBtnText}
          onPress={handleNav.bind(this, "SignUp")}
        />
      </View>
      <EmailVerificationModal
        isVisible={verificationRef.current}
        closeModal={handleModalClose}
        OnConfirm={resendVerificationEmail}
      />
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
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
    marginBottom: -2.5,
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
