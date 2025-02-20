import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StatusBar, Text, View } from "react-native";
import MainStack from "./StackNavigator";
import BottomTabStack from "./BottomTabNavigator";
import AuthStack from "./AuthStack";
import { useSelector } from "react-redux";
import { colors } from "../constants/colors";
import CustomToastWrapper from "../components/CustomToastWrapper";
import Loader from "../components/Loaders/Loader";
import { AppLoaderRef } from "../../App";

export type RootStackParams = {
  AuthStack: undefined;
  MainStack: undefined;
  BottomTabStack: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

const RootScreen: React.FC = () => {
  const { token } = useSelector((state: any) => state.auth);

  return (
    <CustomToastWrapper>
      <React.Fragment>
        <StatusBar
          barStyle={"light-content"}
          backgroundColor={colors.primary}
        />
        {!token ? <AuthStack /> : <MainStack />}
        <Loader ref={AppLoaderRef} />
      </React.Fragment>
    </CustomToastWrapper>
  );
};

export default RootScreen;
