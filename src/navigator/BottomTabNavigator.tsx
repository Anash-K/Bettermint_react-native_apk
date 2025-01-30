import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import React from "react";
import { ScreenProps } from "./Stack";
import CustomTabHeader from "../common/CustomTabHeader";
import { CustomImages } from "../assets/CustomImages";
import { StatusBar, StyleSheet } from "react-native";
import { colors } from "../constants/colors";
import TabLogo from "../constants/TabLogo";

export type BottomParams = {
  Home: undefined;
};

const BottomTab = createBottomTabNavigator<BottomParams>();

const BottomTabStack: React.FC<ScreenProps<"BottomTabStack">> = () => {
  return (
    <React.Fragment>
      <StatusBar barStyle={"light-content"} backgroundColor={colors.primary} />
      <BottomTab.Navigator>
        <BottomTab.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerShown: false,
          })}
        />
      </BottomTab.Navigator>
    </React.Fragment>
  );
};

export default BottomTabStack;

const styles = StyleSheet.create({
  LogoBox: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: 100,
  },
  tabLogo: {
    width: 187,
    height: 34,
  },
});
