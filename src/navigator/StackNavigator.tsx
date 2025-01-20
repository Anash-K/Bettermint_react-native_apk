import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import React from "react";
import { ScreenProps } from "./Stack";
import ProvideYourMobileNumber from "../screens/ProvideYourMobileNumber";
import TellUsALittleAboutYou from "../screens/TellUsALittleAboutYou";

export type StackParams = {
  TellUsALittleAboutYou: undefined;
  ProvideYourMobileNumber: undefined;
};

const Stack = createNativeStackNavigator<StackParams>();

const MainStack: React.FC<ScreenProps<"MainStack">> = () => {
  return (
    <Stack.Navigator screenOptions={{ contentStyle: styles.contentPagesStyle }}>
      <Stack.Screen
        name="TellUsALittleAboutYou"
        component={TellUsALittleAboutYou}
      />
      <Stack.Screen
        name="ProvideYourMobileNumber"
        component={ProvideYourMobileNumber}
      />
    </Stack.Navigator>
  );
};

export default MainStack;

const styles = StyleSheet.create({
  contentPagesStyle: { backgroundColor: "#F2F7F6" },
});
