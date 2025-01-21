import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar, StyleSheet } from "react-native";
import React from "react";
import { ScreenProps } from "./Stack";
import ProvideYourMobileNumber from "../screens/ProvideYourMobileNumber";
import TellUsALittleAboutYou from "../screens/TellUsALittleAboutYou";
import { colors } from "../constants/colors";
import CustomButton from "../common/CustomButton";
import { CustomImages } from "../assets/CustomImages";
import WhatsYourHeight from "../screens/WhatsYourHeight";

export type StackParams = {
  TellUsALittleAboutYou: undefined;
  ProvideYourMobileNumber: undefined;
  WhatsYourHeight:undefined;
};

const Stack = createNativeStackNavigator<StackParams>();

const MainStack: React.FC<ScreenProps<"MainStack">> = () => {
  return (
    <>
      <StatusBar barStyle={"dark-content"} />
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
          name="TellUsALittleAboutYou"
          component={TellUsALittleAboutYou}
          options={{
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name="ProvideYourMobileNumber"
          component={ProvideYourMobileNumber}
          options={{
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name='WhatsYourHeight'
          component={WhatsYourHeight}
          options={{
            headerTitle: "",
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default MainStack;

const styles = StyleSheet.create({
  backButtonStyle: {
    backgroundColor: "transparent",
    borderColor: colors.primary,
    borderWidth: 1.25,
    padding: 7,
    paddingVertical: 8,
  },
  contentPagesStyle: { backgroundColor: "#F2F7F6" },
  CommonHeaderStyle: {
    backgroundColor: "#F2F7F6",
    shadowColor: "transparent",
    borderWidth: 0,
    shadowOpacity: 0,
    paddingTop: 10,
  },
  backArrowIcon: {
    transform: [{ rotate: "90deg" }],
    height: 8,
    width: 11,
    resizeMode: "contain",
    tintColor: colors.primary,
  },
});
