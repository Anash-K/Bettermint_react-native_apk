import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StatusBar, Text, View } from "react-native";
import MainStack from "./StackNavigator";
import BottomTabStack from "./BottomTabNavigator";
import AuthStack from "./AuthStack";
import { useSelector } from "react-redux";
import { colors } from "../constants/colors";

export type RootStackParams = {
  AuthStack: undefined;
  MainStack: undefined;
  BottomTabStack: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

const RootScreen: React.FC<RootStackParams> = () => {
  const { token } = useSelector((state: any) => state.auth);

  return (
    <React.Fragment>
      <StatusBar barStyle={"light-content"} backgroundColor={colors.primary} />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!token ? (
          <Stack.Screen name="AuthStack" component={AuthStack} />
        ) : (
          <>
            <Stack.Screen name="MainStack" component={MainStack} />
          </>
        )}
      </Stack.Navigator>
    </React.Fragment>
  );
};

export default RootScreen;
