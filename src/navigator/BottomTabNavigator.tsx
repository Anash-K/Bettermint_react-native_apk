import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { ScreenProps } from "./Stack";
import { CustomImages } from "../assets/CustomImages";
import {
  Image,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { colors } from "../constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HomeTab from "../screens/tab/HomeTab";
import CalenderTab from "../screens/tab/CalenderTab";
import TrendsTab from "../screens/tab/TendsTab";
import ProfileTab from "../screens/tab/ProfileTab";
import LogTab from "../screens/tab/LogTab";
import { CurvedBottomBar } from "react-native-curved-bottom-bar";

export type BottomParams = {
  LogTab: undefined;
  HomeTab: undefined;
  CalenderTab: undefined;
  TrendsTab: undefined;
  ProfileTab: undefined;
};

const TabBarIcon = ({
  color,
  size,
  icon,
  showDot,
  focused,
  TabStyle,
}: {
  color: string;
  size: number;
  // icon: FastImageProps["source"];
  icon: any;
  showDot?: boolean;
  focused?: boolean;
  TabStyle?: ViewStyle | ViewStyle[];
}) => {
  return (
    <View style={[styles.tabIconBox, focused && styles.focusedIcon, TabStyle]}>
      <Image
        tintColor={color}
        style={{ height: size, width: size }}
        source={icon}
        resizeMode="contain"
      />
    </View>
  );
};

const BottomTabStack: React.FC<ScreenProps<"BottomTabStack">> = () => {
  const { top, bottom } = useSafeAreaInsets();
  const _renderIcon = (routeName, selectedTab) => {
    let icon = "";

    switch (routeName) {
      case "HomeTab":
        icon = CustomImages.homeTab;
        break;
      case "CalenderTab":
        icon = CustomImages.calender;
        break;
      case "TrendsTab":
        icon = CustomImages.trends;
        break;
      case "ProfileTab":
        icon = CustomImages.profile;
        break;
    }

    return (
      <TabBarIcon
        size={16}
        icon={icon}
        focused={routeName === selectedTab}
        color={
          routeName === selectedTab ? colors.primary : colors.tabBarInActive
        }
      />
    );
  };
  const renderTabBar = ({ routeName, selectedTab, navigate }) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabbarItem}
      >
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  return (
    <React.Fragment>
      <StatusBar barStyle={"dark-content"} />
      <CurvedBottomBar.Navigator
        initialRouteName="HomeTab"
        bgColor={colors.white}
        borderColor={colors.bottomTabBorderColor}
        borderWidth={0.5}
        circleWidth={60}
        
        height={Platform.select({ ios: bottom + 80, android: bottom + 70 })}
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBarStyle,
        }}
        borderTopLeftRight={0.5}
        renderCircle={({ selectedTab, navigate }) => (
          <Pressable onPress={() => navigate("LogTab")}>
            <TabBarIcon
              TabStyle={[
                styles.centerTabIcon,
                selectedTab == "LogTab" && styles.centerTabFocus,
              ]}
              size={16}
              icon={CustomImages.add}
              color={colors.white}
            />
          </Pressable>
        )}
        tabBar={renderTabBar}
      >
        <CurvedBottomBar.Screen
          name="HomeTab"
          position="LEFT"
          component={HomeTab}
        />
        <CurvedBottomBar.Screen
          name="CalenderTab"
          position="LEFT"
          component={CalenderTab}
        />
        <CurvedBottomBar.Screen
          name="LogTab"
          component={LogTab}
          position="CENTER"
        />
        <CurvedBottomBar.Screen
          name="TrendsTab"
          component={TrendsTab}
          position="RIGHT"
        />
        <CurvedBottomBar.Screen
          name="ProfileTab"
          component={ProfileTab}
          position="RIGHT"
        />
      </CurvedBottomBar.Navigator>
    </React.Fragment>
  );
};

export default BottomTabStack;

const styles = StyleSheet.create({
  centerTabFocus: {
    borderColor: "#58a3a440",
  },
  centerTab: {
    borderWidth: 4,
    borderColor: colors.white,
  },
  tabbarItem: {
    marginBottom: Platform.select({ ios: 25 }),
    marginHorizontal: 0,
  },
  centerTabIcon: {
    backgroundColor: colors.primaryLight,
    borderRadius: 40,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    bottom: 23,
    borderWidth: 4,
    borderColor: "transparent",
  },
  logTabBar: {
    marginTop: -20,
  },
  logTabIcon: {
    marginBottom: 60,
    backgroundColor: colors.primaryLight,
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBarStyle: {
    backgroundColor: colors.white,
    color: colors.white,
    height: 60,
    marginBottom: 40,
  },
  focusedIcon: {
    backgroundColor: colors.tabIconBackground,
  },
  tabIconBox: {
    padding: 12,
    borderRadius: 80,
    margin: "auto",
    backgroundColor: colors.white,
  },
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

// const BottomTab = createBottomTabNavigator<BottomParams>();

// const BottomTabStack: React.FC<ScreenProps<"BottomTabStack">> = () => {
//   const { top, bottom } = useSafeAreaInsets();
//   return (
//     <React.Fragment>
//       <StatusBar barStyle={'dark-content'}  />
//       <BottomTab.Navigator
//         screenOptions={{
//           tabBarInactiveTintColor: colors.tabBarInActive,
//           tabBarActiveTintColor: colors.primary,
//           tabBarShowLabel: false, // Explicitly hide the label
//           tabBarStyle: [{ height: bottom + 64 }, styles.tabBarStyle],
//         }}
//       >
//         <BottomTab.Screen
//           name="HomeTab"
//           component={HomeTab}
//           options={{
//             headerShown: false,
//             tabBarIcon: ({ focused, color }) => {
//               return (
//                 <TabBarIcon
//                   size={20}
//                   icon={CustomImages.homeTab}
//                   color={color}
//                   focused={focused}
//                 />
//               );
//             },
//           }}
//         />
//         <BottomTab.Screen
//           name="CalenderTab"
//           component={CalenderTab}
//           options={{
//             headerShown: false,
//             tabBarIcon: ({ focused, color }) => {
//               return (
//                 <TabBarIcon
//                   size={20}
//                   icon={CustomImages.calender}
//                   color={color}
//                   focused={focused}
//                 />
//               );
//             },
//           }}
//         />
//         <BottomTab.Screen
//           name="LogTab"
//           component={LogTab}
//           options={{
//             headerShown: false,
//             tabBarStyle: styles.logTabBar,
//             tabBarIcon: ({ focused, color }) => {
//               return (
//                 <TabBarIcon
//                   size={20}
//                   icon={CustomImages.add}
//                   color={color}
//                   focused={focused}
//                   TabStyle={styles.logTabIcon}
//                 />
//               );
//             },
//           }}
//         />
//         <BottomTab.Screen
//           name="TrendsTab"
//           component={TrendsTab}
//           options={{
//             headerShown: false,
//             tabBarIcon: ({ focused, color }) => {
//               return (
//                 <TabBarIcon
//                   size={20}
//                   icon={CustomImages.trends}
//                   color={color}
//                   focused={focused}
//                 />
//               );
//             },
//           }}
//         />
//         <BottomTab.Screen
//           name="ProfileTab"
//           component={ProfileTab}
//           options={{
//             headerShown: false,
//             tabBarIcon: ({ focused, color }) => {
//               return (
//                 <TabBarIcon
//                   size={20}
//                   icon={CustomImages.profile}
//                   color={color}
//                   focused={focused}
//                 />
//               );
//             },
//           }}
//         />
//       </BottomTab.Navigator>
//     </React.Fragment>
//   );
// };

// export default BottomTabStack;

// const styles = StyleSheet.create({
//   logTabBar: {
//     marginTop: -20,
//   },
//   logTabIcon: {
//     marginBottom: 60,
//     backgroundColor: colors.primaryLight,
//     width: 48,
//     height: 48,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   tabBarStyle: {
//     paddingTop: 10,
//     borderTopStartRadius: 30,
//     borderTopEndRadius: 30,
//   },
//   focusedIcon: {
//     backgroundColor: colors.tabIconBackground,
//   },
//   tabIconBox: {
//     padding: 12,
//     borderRadius: 40,
//   },
//   LogoBox: {
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "column",
//     height: 100,
//   },
//   tabLogo: {
//     width: 187,
//     height: 34,
//   },
// });
