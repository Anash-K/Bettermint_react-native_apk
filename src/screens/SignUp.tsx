import {
  ImageBackground,
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
import { useCallback } from "react";

const SignUp = () => {
  const handleChange = useCallback(() => {}, []);
  return (
    <ScrollView style={styles.container} bounces={false}>
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
        <Text style={styles.pageTitle}>Welcome Back</Text>
        <CustomInput
          label="Email"
          placeholderText="enter your email"
          onChange={handleChange}
        />
        <CustomInput
          label="Password"
          placeholderText="enter your Password"
          onChange={handleChange}
          isPassword={true}
        />
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  innerContainer: {
    paddingHorizontal: 16,
    flex: 1,
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
    fontFamily: CustomFont.Urbanist700,
    color: colors.primary,
    fontSize: 28,
    lineHeight: 33.6,
    textAlign: "center",
    marginTop: 40,
    marginBottom: 32,
  },
  bgLogoImage: {
    aspectRatio: "2.34375",
    marginTop: -1,
  },
});
