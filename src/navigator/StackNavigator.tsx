import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUp from "../screens/SignUp";
import { StyleSheet } from "react-native";
import Login from "../screens/Login";
import React from "react";
import ForgotPassword from "../screens/ForgotPassword";
import Profile from "../screens/Profile";
import { ScreenProps } from "./Stack";

export type StackParams = {
  Profile: undefined;
};

const Stack = createNativeStackNavigator<StackParams>();

const MainStack: React.FC<ScreenProps<'MainStack'>> = () => {
  return (
    <Stack.Navigator screenOptions={{ contentStyle: styles.contentPagesStyle }}>
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default MainStack;

const styles = StyleSheet.create({
  contentPagesStyle: { backgroundColor: "#F2F7F6" },
});
