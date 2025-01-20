import {
  ImageBackground,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import FastImage from "react-native-fast-image";
import { CustomImages } from "../assets/CustomImages";
import CustomFont from "../assets/fonts/customFonts";
import { colors } from "../constants/colors";
import CustomInput from "../common/CustomInput";
import React, { useCallback } from "react";
import CustomButton from "../common/CustomButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScreenProps } from "../navigator/Stack";
import { useCustomStyle } from "../constants/CustomStyles";

const Login: React.FC<ScreenProps<"Login">> = ({ navigation }) => {
  const handleChange = useCallback(() => {}, []);
  const handlePress = useCallback(() => {}, []);
  const handleNav = useCallback((PageName: any) => {
    navigation.navigate(PageName);
  }, []);
  const insets = useSafeAreaInsets();
  const CustomStyle = useCustomStyle();
  
  return (
    <ScrollView
      style={[
        styles.container,
        CustomStyle.safeAreaMarginBottom
      ]}
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
        <CustomInput
          label="Email"
          placeholderText="Enter email"
          onChange={handleChange}
        />
        <CustomInput
          label="Password"
          placeholderText="Enter Password"
          onChange={handleChange}
          isPassword={true}
        />
        <CustomButton
          buttonStyle={styles.loginButton}
          text="Login"
          onPress={handlePress}
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
