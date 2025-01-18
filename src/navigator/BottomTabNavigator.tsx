import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import React from "react";
import { ScreenProps } from "./Stack";

export type BottomParams = {
  Home: undefined;
};

const BottomTab = createBottomTabNavigator<BottomParams>();

const BottomTabStack: React.FC<ScreenProps<"BottomTabStack">> = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name="Home" component={HomeScreen} />
    </BottomTab.Navigator>
  );
};

export default BottomTabStack;
