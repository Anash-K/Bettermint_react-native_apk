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

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    toggleEmailModal();
  };

  const handlePress = useCallback(() => {
    navigation.navigate("Login");
  }, []);
  const toggleEmailModal = useCallback(() => {
    setIsModal(!isModal);
  }, [isModal]);

  const handleConfirm = useCallback(() => {
    toggleEmailModal();
    setTimeout(() => {
      dispatch(login("testing"));
    }, 1000);
  }, []);

  const onSendVerification = useCallback(async (email: string) => {
    try {
      // await emailVerificationApi({email: email});
      // SuccessToast(strings.signUpSuccess);
    } catch (error) {
      ErrorHandler(error);
    } finally {
      AppLoaderRef.current?.stop();
      // onLoginNav();
    }
  }, []);

  // const onSubmit: SubmitHandler<Inputs> = useCallback(
  //   async (data) => {
  //     console.log("🟡 onSubmit called with data:", data);
  //     console.log(
  //       "🔹 btnDisableRef.current before check:",
  //       btnDisableRef.current
  //     );
  //     console.log(
  //       "🔹 AppLoaderRef.current before check:",
  //       AppLoaderRef.current
  //     );

  //     if (btnDisableRef.current) {
  //       console.log("Button is disabled, exiting function.");
  //       return;
  //     }

  //     btnDisableRef.current = true;
  //     console.log("btnDisableRef.current set to true");

  //     Keyboard.dismiss();
  //     // const email = data?.email?.trim();
  //     // const password = data?.password?.trim();
  //     const email = "anash.silversky@gmail.com";
  //     const password = "test@1234";
  //     console.log("Email:", email);
  //     console.log(
  //       "🔑 Password:",
  //       password ? "Exists (Hidden for security)" : "Not provided"
  //     );

  //     AppLoaderRef.current?.start();
  //     console.log("🚀 AppLoader started");

  //     try {
  //       const authInstance = auth();
  //       console.log("Firebase Auth instance initialized");

  //       if (authInstance.currentUser) {
  //         console.log("Signing out existing user...");
  //         await authInstance.signOut();
  //       }

  //       console.log("Creating new user...");
  //       const userCredential =
  //         await authInstance.createUserWithEmailAndPassword(email, password);
  //       console.log("User created successfully:", userCredential.user.uid);

  //       const firebaseToken = await userCredential.user.getIdToken();
  //       console.log(
  //         "🔑 Firebase Token received:",
  //         firebaseToken ? ("Exists", firebaseToken) : "Not received"
  //       );

  //       console.log("Sending login API request...");
  //       const response = await loginApi({
  //         email: email,
  //         device_type: Platform.OS,
  //         firebase_token: firebaseToken ?? "",
  //         push_token: "Dummy",
  //       });

  //       console.log(" Login API Response:", response);

  //       console.log("Sending email verification...");
  //       await userCredential.user.sendEmailVerification();
  //       console.log(" Email verification sent");

  //       onSendVerification(email);
  //       console.log("onSendVerification function called");

  //       console.log("Signing out user...");
  //       await authInstance.signOut();
  //       console.log("User signed out");
  //     } catch (er) {
  //       console.error("Error caught in onSubmit:", er);

  //       const authInstance = auth();
  //       if (authInstance.currentUser) {
  //         console.log("Deleting user due to error...");
  //         await deleteUser(authInstance.currentUser);
  //         console.log("User deleted");
  //       }

  //       AppLoaderRef.current?.stop();
  //       console.log("AppLoader stopped");
  //     } finally {
  //       btnDisableRef.current = false;
  //       console.log("btnDisableRef.current reset to false");
  //     }
  //   },
  //   [onSendVerification]
  // );

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
