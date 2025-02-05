import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar, StyleSheet } from "react-native";
import React, { useCallback } from "react";
import { ScreenProps } from "./Stack";
import ProvideYourMobileNumber from "../screens/ProvideYourMobileNumber";
import TellUsALittleAboutYou from "../screens/TellUsALittleAboutYou";
import { colors } from "../constants/colors";
import CustomButton from "../common/CustomButton";
import { CustomImages } from "../assets/CustomImages";
import WhatsYourHeight from "../screens/WhatsYourHeight";
import WhatsYourWeight from "../screens/WhatsYourWeight";
import WhatBestDescribe from "../screens/WhatBestDescribe";
import AddYourPhoto from "../screens/AddYourPhoto";
import CustomFont from "../assets/fonts/customFonts";
import WhatsYourMeasurement from "../screens/WhatsYourMeasurement";
import { useNavigation } from "@react-navigation/native";
import CustomHeader from "../common/CustomHeader";
import Guide from "../screens/Guide";
import DoYouHaveDiseases from "../screens/DoYouHaveDiseases";
import DoYouHaveFamilyHistory from "../screens/DoYouHaveFamilyHistory";
import PleaseShareYourMeasurement from "../screens/PleaseShareYourMeasurement";
import SmallBriefBettermint from "../screens/SmallBriefBetttermint";
import MovementAssesment from "../screens/MovementAssesment";
import DoYouWorkOut from "../screens/DoYouWorkOut";
import WhatFormOfWorkout from "../screens/WhatFormOfWorkout";
import YouAreBeginner from "../screens/YouAreBeginner";
import NutritionAssessmentDetails from "../screens/NutritionAssessmentDetails";
import AddingColorfullVeggies from "../screens/AddingColorfullVeggies";
import WhatKingOfFoodYouEat from "../screens/WhatKingOfFood";
import HowDoYouGenerallyFeel from "../screens/HowDoYouGenerallyFeel";
import LogStress from "../screens/LogStress";
import BottomTabStack from "./BottomTabNavigator";
import LogEmotion from "../screens/LogEmotion";
import WhatsOneGoodThing from "../screens/WhatsOneGoodThing";
import LogFocus from "../screens/LogFocus";
import FreeSubscription from "../screens/FreeSubscription";

export type StackParams = {
  TellUsALittleAboutYou: undefined;
  ProvideYourMobileNumber: undefined;
  WhatsYourHeight: undefined;
  WhatsYourWeight: undefined;
  WhatBestDescribe: undefined;
  AddYourPhoto: undefined;
  WhatsYourMeasurement: undefined;
  Guide: undefined;
  DoYouHaveDiseases: undefined;
  DoYouHaveFamilyHistory: undefined;
  PleaseShareYourMeasurement: undefined;
  SmallBriefBettermint: undefined;
  MovementAssesment: undefined;
  DoYouWorkOut: undefined;
  WhatFormOfWorkout: undefined;
  YouAreBeginner: undefined;
  NutritionAssessmentDetails: undefined;
  AddingColorfullVeggies: undefined;
  WhatKingOfFoodYouEat: undefined;
  HowDoYouGenerallyFeel: undefined;
  LogStress: undefined;
  BottomTabStack: undefined;
  LogEmotion: undefined;
  WhatsOneGoodThing: undefined;
  LogFocus: undefined;
  FreeSubscription:undefined;
};

const Stack = createNativeStackNavigator<StackParams>();

const MainStack: React.FC<ScreenProps<"MainStack">> = ({ navigation }) => {
  const nav = useNavigation();
  const handlePress = useCallback(() => {}, []);
  return (
    <>
      <StatusBar barStyle={"dark-content"} />
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          contentStyle: styles.contentPagesStyle,
          headerStyle: styles.CommonHeaderStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerTitleAlign: "left",
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
        // initialRouteName='BottomTabStack'
      >
        <Stack.Screen
          name="TellUsALittleAboutYou"
          component={TellUsALittleAboutYou}
          options={{
            headerTitle: "",
            headerShown: false,
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
          name="WhatsYourHeight"
          component={WhatsYourHeight}
          options={{
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name="WhatsYourWeight"
          component={WhatsYourWeight}
          options={{
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name="WhatBestDescribe"
          component={WhatBestDescribe}
          options={{
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name="AddYourPhoto"
          component={AddYourPhoto}
          options={({ navigation }) => ({
            headerTitle: "",
            headerRight: () => (
              <CustomButton
                text="Skip"
                buttonStyle={styles.skipButton}
                textStyle={styles.skipText}
                onPress={() => navigation.navigate("WhatsYourMeasurement")}
              />
            ),
          })}
        />
        <Stack.Screen
          name="BottomTabStack"
          component={BottomTabStack}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="WhatsYourMeasurement"
          component={WhatsYourMeasurement}
          options={({ navigation }) => ({
            headerTitle: "",
            header: () => (
              <CustomHeader
                title="Self-Assessment"
                leftComponent={
                  <CustomButton
                    icon={CustomImages.blackDropDownIcon}
                    buttonStyle={styles.backButtonStyle}
                    iconStyle={styles.backArrowIcon}
                    onPress={() => navigation.goBack()}
                  />
                }
                rightComponent={
                  <CustomButton
                    icon={CustomImages.refreshIcon}
                    buttonStyle={styles.btnRefreshIconStyle}
                    iconStyle={styles.refreshIconStyle}
                    onPress={() => navigation.navigate("Guide")}
                  />
                }
              />
            ),
          })}
        />
        <Stack.Screen
          name="Guide"
          component={Guide}
          options={({ navigation }) => ({
            headerTitle: "",
            header: () => (
              <CustomHeader
                title="Guide"
                leftComponent={
                  <CustomButton
                    icon={CustomImages.blackDropDownIcon}
                    buttonStyle={styles.backButtonStyle}
                    iconStyle={styles.backArrowIcon}
                    onPress={() => navigation.goBack()}
                  />
                }
              />
            ),
          })}
        />
        <Stack.Screen
          name="DoYouHaveDiseases"
          component={DoYouHaveDiseases}
          options={({ navigation }) => ({
            headerTitle: "",
            header: () => (
              <CustomHeader
                title="Self-Assessment"
                leftComponent={
                  <CustomButton
                    icon={CustomImages.blackDropDownIcon}
                    buttonStyle={styles.backButtonStyle}
                    iconStyle={styles.backArrowIcon}
                    onPress={() => navigation.goBack()}
                  />
                }
              />
            ),
          })}
        />
        <Stack.Screen
          name="DoYouHaveFamilyHistory"
          component={DoYouHaveFamilyHistory}
          options={({ navigation }) => ({
            headerTitle: "",
            header: () => (
              <CustomHeader
                title="Self-Assessment"
                leftComponent={
                  <CustomButton
                    icon={CustomImages.blackDropDownIcon}
                    buttonStyle={styles.backButtonStyle}
                    iconStyle={styles.backArrowIcon}
                    onPress={() => navigation.goBack()}
                  />
                }
              />
            ),
          })}
        />
        <Stack.Screen
          name="PleaseShareYourMeasurement"
          component={PleaseShareYourMeasurement}
          options={({ navigation }) => ({
            headerTitle: "",
            header: () => (
              <CustomHeader
                title="Self-Assessment"
                leftComponent={
                  <CustomButton
                    icon={CustomImages.blackDropDownIcon}
                    buttonStyle={styles.backButtonStyle}
                    iconStyle={styles.backArrowIcon}
                    onPress={() => navigation.goBack()}
                  />
                }
                rightComponent={
                  <CustomButton
                    text="Skip"
                    buttonStyle={styles.skipButton}
                    textStyle={styles.skipText}
                    onPress={() =>
                      navigation.navigate("DoYouHaveFamilyHistory")
                    }
                  />
                }
              />
            ),
          })}
        />
        <Stack.Screen
          name="SmallBriefBettermint"
          component={SmallBriefBettermint}
          options={({ navigation }) => ({
            headerTitle: "",
          })}
        />
        <Stack.Screen
          name="MovementAssesment"
          component={MovementAssesment}
          options={({ navigation }) => ({
            headerTitle: "",
            header: () => (
              <CustomHeader
                title="Movement Assesment"
                leftComponent={
                  <CustomButton
                    icon={CustomImages.blackDropDownIcon}
                    buttonStyle={styles.backButtonStyle}
                    iconStyle={styles.backArrowIcon}
                    onPress={() => navigation.goBack()}
                  />
                }
              />
            ),
          })}
        />
        <Stack.Screen
          name="DoYouWorkOut"
          component={DoYouWorkOut}
          options={({ navigation }) => ({
            headerTitle: "",
            header: () => (
              <CustomHeader
                title="Movement Assesment"
                leftComponent={
                  <CustomButton
                    icon={CustomImages.blackDropDownIcon}
                    buttonStyle={styles.backButtonStyle}
                    iconStyle={styles.backArrowIcon}
                    onPress={() => navigation.goBack()}
                  />
                }
              />
            ),
          })}
        />
        <Stack.Screen
          name="WhatFormOfWorkout"
          component={WhatFormOfWorkout}
          options={({ navigation }) => ({
            headerTitle: "",
            header: () => (
              <CustomHeader
                title="Movement Assesment"
                leftComponent={
                  <CustomButton
                    icon={CustomImages.blackDropDownIcon}
                    buttonStyle={styles.backButtonStyle}
                    iconStyle={styles.backArrowIcon}
                    onPress={() => navigation.goBack()}
                  />
                }
              />
            ),
          })}
        />
        <Stack.Screen
          name="YouAreBeginner"
          component={YouAreBeginner}
          options={({ navigation }) => ({
            headerTitle: "",
            header: () => (
              <CustomHeader
                title="Movement Assesment"
                leftComponent={
                  <CustomButton
                    icon={CustomImages.blackDropDownIcon}
                    buttonStyle={styles.backButtonStyle}
                    iconStyle={styles.backArrowIcon}
                    onPress={() => navigation.goBack()}
                  />
                }
              />
            ),
          })}
        />
        <Stack.Screen
          name="NutritionAssessmentDetails"
          component={NutritionAssessmentDetails}
          options={({ navigation }) => ({
            headerTitle: "",
            header: () => (
              <CustomHeader
                title="Nutrition Assessment"
                leftComponent={
                  <CustomButton
                    icon={CustomImages.blackDropDownIcon}
                    buttonStyle={styles.backButtonStyle}
                    iconStyle={styles.backArrowIcon}
                    onPress={() => navigation.goBack()}
                  />
                }
              />
            ),
          })}
        />
        <Stack.Screen
          name="AddingColorfullVeggies"
          component={AddingColorfullVeggies}
          options={({ navigation }) => ({
            headerTitle: "",
            header: () => (
              <CustomHeader
                title="Nutrition Assessment"
                leftComponent={
                  <CustomButton
                    icon={CustomImages.blackDropDownIcon}
                    buttonStyle={styles.backButtonStyle}
                    iconStyle={styles.backArrowIcon}
                    onPress={() => navigation.goBack()}
                  />
                }
              />
            ),
          })}
        />
        <Stack.Screen
          name="WhatKingOfFoodYouEat"
          component={WhatKingOfFoodYouEat}
          options={({ navigation }) => ({
            headerTitle: "",
            header: () => (
              <CustomHeader
                title="Nutrition Assessment"
                leftComponent={
                  <CustomButton
                    icon={CustomImages.blackDropDownIcon}
                    buttonStyle={styles.backButtonStyle}
                    iconStyle={styles.backArrowIcon}
                    onPress={() => navigation.goBack()}
                  />
                }
              />
            ),
          })}
        />
        <Stack.Screen
          name="HowDoYouGenerallyFeel"
          component={HowDoYouGenerallyFeel}
          options={({ navigation }) => ({
            headerTitle: "",
            header: () => (
              <CustomHeader
                title="Nutrition Assessment"
                leftComponent={
                  <CustomButton
                    icon={CustomImages.blackDropDownIcon}
                    buttonStyle={styles.backButtonStyle}
                    iconStyle={styles.backArrowIcon}
                    onPress={() => navigation.goBack()}
                  />
                }
              />
            ),
          })}
        />
        <Stack.Screen
          name="LogStress"
          component={LogStress}
          options={({ navigation }) => ({
            headerTitle: "",
            header: () => (
              <CustomHeader
                title="Log Stress"
                leftComponent={
                  <CustomButton
                    icon={CustomImages.blackDropDownIcon}
                    buttonStyle={styles.backButtonStyle}
                    iconStyle={styles.backArrowIcon}
                    onPress={() => navigation.goBack()}
                  />
                }
              />
            ),
          })}
        />
        <Stack.Screen
          name="LogEmotion"
          component={LogEmotion}
          options={({ navigation }) => ({
            headerTitle: "",
            header: () => (
              <CustomHeader
                title="Log Emotion"
                leftComponent={
                  <CustomButton
                    icon={CustomImages.blackDropDownIcon}
                    buttonStyle={styles.backButtonStyle}
                    iconStyle={styles.backArrowIcon}
                    onPress={() => navigation.goBack()}
                  />
                }
              />
            ),
          })}
        />
        <Stack.Screen
          name="WhatsOneGoodThing"
          component={WhatsOneGoodThing}
          options={({ navigation }) => ({
            headerTitle: "",
            header: () => (
              <CustomHeader
                title="Log Journal"
                leftComponent={
                  <CustomButton
                    icon={CustomImages.blackDropDownIcon}
                    buttonStyle={styles.backButtonStyle}
                    iconStyle={styles.backArrowIcon}
                    onPress={() => navigation.goBack()}
                  />
                }
              />
            ),
          })}
        />
        <Stack.Screen
          name="LogFocus"
          component={LogFocus}
          options={({ navigation }) => ({
            headerTitle: "",
            header: () => (
              <CustomHeader
                title="Log Focus"
                leftComponent={
                  <CustomButton
                    icon={CustomImages.blackDropDownIcon}
                    buttonStyle={styles.backButtonStyle}
                    iconStyle={styles.backArrowIcon}
                    onPress={() => navigation.goBack()}
                  />
                }
              />
            ),
          })}
        />
        <Stack.Screen
          name='FreeSubscription'
          component={FreeSubscription}
          options={({ navigation }) => ({
            headerTitle: "",
            header: () => (
              <CustomHeader
              title=""
                leftComponent={
                  <CustomButton
                    icon={CustomImages.blackDropDownIcon}
                    buttonStyle={styles.backButtonStyle}
                    iconStyle={styles.backArrowIcon}
                    onPress={() => navigation.goBack()}
                  />
                }
              />
            ),
          })}
        />
      </Stack.Navigator>
    </>
  );
};

export default MainStack;

const styles = StyleSheet.create({
  headerTitleStyle: {
    fontFamily: CustomFont.Urbanist700,
    fontSize: 20,
    lineHeight: 24,
    color: colors.primary,
    textAlign: "left",
  },
  refreshIconStyle: {
    width: 24,
    height: 24,
  },
  btnRefreshIconStyle: {
    padding: 5,
    backgroundColor: "transparent",
  },
  skipText: {
    color: colors.primary,
    fontSize: 14,
    lineHeight: 16.8,
    fontFamily: CustomFont.Urbanist700,
  },
  skipButton: {
    paddingVertical: 5.5,
    backgroundColor: "#E4F0F0",
  },
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
  },
  backArrowIcon: {
    transform: [{ rotate: "90deg" }],
    height: 8,
    width: 11,
    resizeMode: "contain",
    tintColor: colors.primary,
  },
});
