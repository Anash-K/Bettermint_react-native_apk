import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import React from "react";
import { ScreenProps } from "./Stack";
import CustomTabHeader from "../common/CustomTabHeader";
import { CustomImages } from "../assets/CustomImages";
import { StatusBar, StyleSheet } from "react-native";
import { colors } from "../constants/colors";
import TabLogo from "../constants/TabLogo";
import TabBarIcon from "../common/TabBarIcon";
import calenderScreen from "../screens/CalenderScreen";
import CalenderScreen from "../screens/CalenderScreen";
import Trends from "../screens/Tends";
import Profile from "../screens/Profile";

export type BottomParams = {
  Home: undefined;
  Calender: undefined;
  Trends: undefined;
  Profile: undefined;
};

const BottomTab = createBottomTabNavigator<BottomParams>();

const BottomTabStack: React.FC<ScreenProps<"BottomTabStack">> = () => {
  return (
    <React.Fragment>
      <StatusBar barStyle={"light-content"} backgroundColor={colors.primary} />
      <BottomTab.Navigator
        screenOptions={{
          tabBarInactiveTintColor: colors.tabBarInActive,
          tabBarActiveTintColor: colors.primary,
          tabBarShowLabel: false, // Explicitly hide the label
        }}
      >
        <BottomTab.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <TabBarIcon iconSrc={CustomImages.homeTab} TabTintColor={color} />
            ),
          })}
        />
        <BottomTab.Screen
          name="Calender"
          component={CalenderScreen}
          options={({ navigation }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <TabBarIcon
                iconSrc={CustomImages.calender}
                TabTintColor={color}
              />
            ),
          })}
        />
        <BottomTab.Screen
          name="Trends"
          component={Trends}
          options={({ navigation }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <TabBarIcon iconSrc={CustomImages.trends} TabTintColor={color} />
            ),
          })}
        />
        <BottomTab.Screen
          name="Profile"
          component={Profile}
          options={({ navigation }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <TabBarIcon iconSrc={CustomImages.profile} TabTintColor={color} />
            ),
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
