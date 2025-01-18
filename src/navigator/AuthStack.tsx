import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import ForgotPassword from "../screens/ForgotPassword";
import { StackParams } from "./StackNavigator";
import React from "react";
import { ScreenProps } from "./Stack";
import { StyleSheet } from "react-native";

export type AuthStackParams = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};

const Stack = createStackNavigator<AuthStackParams>();

const AuthStack: React.FC<ScreenProps<"AuthStack">> = () => {
  return (
    <Stack.Navigator>
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
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default AuthStack;

const styles= StyleSheet.create({

});