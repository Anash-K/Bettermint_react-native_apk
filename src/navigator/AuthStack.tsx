import { createStackNavigator } from "@react-navigation/stack";
import { StackParams } from "./StackNavigator";
import React from "react";
import { ScreenProps } from "./Stack";
import { StyleSheet } from "react-native";
import { colors } from "../constants/colors";
import { CustomImages } from "../assets/CustomImages";
import Login from "../screens/auth/Login";
import SignUp from "../screens/auth/SignUp";
import ForgotPassword from "../screens/auth/ForgotPassword";
import CustomButton from "../common/CustomButton";

export type AuthStackParams = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};

const Stack = createStackNavigator<AuthStackParams>();

const AuthStack: React.FC<ScreenProps<"AuthStack">> = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        contentStyle: styles.contentPagesStyle,
        headerStyle: styles.CommonHeaderStyle,
        headerShadowVisible: false,
        headerLeft: () => (
          <CustomButton
            icon={CustomImages.blackDropDownIcon}
            buttonStyle={styles.backButtonStyle}
            iconStyle={styles.backArrowIcon}
            onPress={() => navigation.goBack()}
          />
        ),
      })}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ headerTitle: "" }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({
  backButtonStyle: {
    backgroundColor: "transparent",
    borderColor: colors.primary,
    borderWidth: 1.25,
    padding: 7,
    paddingVertical: 8,
    marginLeft:16
  },
  contentPagesStyle: { backgroundColor: "#F2F7F6" },
  CommonHeaderStyle: {
    backgroundColor: "#F2F7F6",
    shadowColor: "transparent",
    borderWidth: 0,
    shadowOpacity: 0,
  },
  backArrowIcon: {
    transform: [{ rotate: "90deg" }],
    height: 8,
    width: 11,
    resizeMode: "contain",
    tintColor: colors.primary,
  },
});
