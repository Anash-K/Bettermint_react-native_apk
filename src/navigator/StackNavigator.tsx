import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { memo, useCallback } from "react";
import { ScreenProps } from "./Stack";
import ProvideYourMobileNumber from "../screens/ProvideYourMobileNumber";
import TellUsALittleAboutYou from "../screens/TellUsALittleAboutYou";
import { colors } from "../constants/colors";
import { CustomImages } from "../assets/CustomImages";
import WhatsYourHeight from "../screens/WhatsYourHeight";
import WhatsYourWeight from "../screens/WhatsYourWeight";
import WhatBestDescribe from "../screens/WhatBestDescribe";
import AddYourPhoto from "../screens/AddYourPhoto";
import CustomFont from "../assets/fonts/customFonts";
import WhatsYourMeasurement from "../screens/WhatsYourMeasurement";
import { useNavigation } from "@react-navigation/native";
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
import ChangePassword from "../screens/ChangePassword";
import EditProfile from "../screens/EditProfile";
import ExclusiveFitness from "../screens/ExclusiveFitness";
import CustomButton from "../common/CustomButton";
import CustomHeader from "../common/CustomHeader";
//@ts-ignore
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
//@ts-ignore
import EvilIcons from "react-native-vector-icons/EvilIcons";
//@ts-ignore
import AntDesign from "react-native-vector-icons/AntDesign";
import { useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import LogSleep from "../screens/LogSleep";
import LogUnPlug from "../screens/LogUnPlug";
import LogMorningRoutine from "../screens/LogMorningRoutine";
import LogUnwind from "../screens/LogUnwind";
import LogWorkout from "../screens/LogWorkout";
import LogBalancedWorkout from "../screens/LogBalancedWorkout";
import BalancedWorkoutReason from "../screens/BalancedWorkoutReason";
import LogSteps from "../screens/LogSteps";
import LogHomeFuel from "../screens/LogHomeFuel";
import HomeFuelReason from "../screens/HomeFuelReason";
import LogStopEating from "../screens/LogStopEating";
import LogWaterConsumed from "../screens/LogWaterConsumed";
import LogBalancedMeals from "../screens/LogBalancedMeals";
import LogFixYourBasics from "../screens/LogFixYourBasics";
import SelfAssessment from "../screens/SelfAssessment";

export type StackParams = {
  TellUsALittleAboutYou: undefined;
  SelfAssessment: undefined;
  // ProvideYourMobileNumber: undefined;
  // WhatsYourHeight: undefined;
  // WhatsYourWeight: undefined;
  // WhatBestDescribe: undefined;
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
  FreeSubscription: undefined;
  ChangePassword: undefined;
  EditProfile: undefined;
  ExclusiveFitness: undefined;
  LogSleep: undefined;
  LogUnPlug: undefined;
  LogMorningRoutine: undefined;
  LogUnwind: undefined;
  LogWorkout: undefined;
  LogBalancedWorkout: undefined;
  BalancedWorkoutReason: undefined;
  LogSteps: undefined;
  LogHomeFuel: undefined;
  HomeFuelReason: undefined;
  LogStopEating: undefined;
  LogWaterConsumed: undefined;
  LogBalancedMeals: undefined;
  LogFixYourBasics: undefined;
};

const Stack = createNativeStackNavigator<StackParams>();

const MainStack: React.FC = () => {
  const { isProfileSetup } = useSelector(
    (state: RootState) => state.userDetails
  );

  return (
    <>
      <StatusBar
        barStyle={Platform.select({
          ios: "dark-content",
          android: "light-content",
        })}
        backgroundColor={colors.primary}
      />
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          contentStyle: styles.contentPagesStyle,
          headerStyle: styles.CommonHeaderStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerTitleAlign: "left",
          headerShadowVisible: false,
          orientation: "portrait",
          headerLeft: () => (
            <CustomButton
              icon={CustomImages.blackDropDownIcon}
              buttonStyle={styles.backButtonStyle}
              iconStyle={styles.backArrowIcon}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
        initialRouteName={
          isProfileSetup ? "BottomTabStack" : "TellUsALittleAboutYou"
        }
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
          name="SelfAssessment"
          component={SelfAssessment}
          options={({ navigation }) => ({
            headerTitle: "",
            header: () => (
              <CustomHeader
                title={isProfileSetup ? "" : "Self-Assessment"}
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
        {/* <Stack.Screen
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
        /> */}
        <Stack.Screen
          name="AddYourPhoto"
          component={AddYourPhoto}
          options={({ navigation }) => ({
            headerTitle: "",
            headerRight: () =>
              isProfileSetup ? null : (
                <CustomButton
                  text="Skip"
                  buttonStyle={styles.skipButton}
                  textStyle={styles.skipText}
                  onPress={() => navigation.navigate('SelfAssessment')}
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
        {/* <Stack.Screen
          name="WhatsYourMeasurement"
          component={WhatsYourMeasurement}
          options={({ navigation }) => ({
            headerTitle: "",
            header: () => (
              <CustomHeader
                title={isProfileSetup ? "" : "Self-Assessment"}
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
        /> */}
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
                title={isProfileSetup ? "" : "Self-Assessment"}
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
                title={isProfileSetup ? "" : "Self-Assessment"}
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
                title={isProfileSetup ? "" : "Self-Assessment"}
                leftComponent={
                  <CustomButton
                    icon={CustomImages.blackDropDownIcon}
                    buttonStyle={styles.backButtonStyle}
                    iconStyle={styles.backArrowIcon}
                    onPress={() => navigation.goBack()}
                  />
                }
                rightComponent={
                  isProfileSetup ? null : (
                    <CustomButton
                      text="Skip"
                      buttonStyle={styles.skipButton}
                      textStyle={styles.skipText}
                      onPress={() =>
                        navigation.navigate("DoYouHaveFamilyHistory")
                      }
                    />
                  )
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
          name="FreeSubscription"
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
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={({ navigation }) => ({
            headerTitle: "",
            header: () => (
              <CustomHeader
                title="Change Password"
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
          name="EditProfile"
          component={EditProfile}
          options={({ navigation }) => ({
            headerTitle: "",
            header: () => (
              <CustomHeader
                title="Edit Profile"
                leftComponent={
                  <CustomButton
                    icon={CustomImages.blackDropDownIcon}
                    buttonStyle={styles.backButtonStyle}
                    iconStyle={styles.backArrowIcon}
                    onPress={() => navigation.goBack()}
                  />
                }
                rightComponent={
                  <TouchableOpacity
                    style={styles.IconButton}
                    onPress={() => navigation.goBack()}
                  >
                    <MaterialIcons
                      name="done"
                      size={32}
                      color={colors.primary}
                    />
                  </TouchableOpacity>
                }
              />
            ),
          })}
        />
        <Stack.Screen
          name="ExclusiveFitness"
          component={ExclusiveFitness}
          options={({ navigation }) => ({
            headerTitle: "",
            header: () => (
              <CustomHeader
                title=""
                leftComponent={
                  <TouchableOpacity
                    style={styles.IconButton}
                    onPress={() => navigation.goBack()}
                  >
                    <AntDesign name="close" size={32} color={colors.primary} />
                  </TouchableOpacity>
                }
              />
            ),
          })}
        />
        <Stack.Screen
          name="LogSleep"
          component={LogSleep}
          options={({ navigation }) => ({
            headerTitle: "",
            header: () => (
              <CustomHeader
                title="Log Sleep"
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
          name="LogUnPlug"
          component={LogUnPlug}
          options={({ navigation }) => ({
            headerTitle: "",
            header: () => (
              <CustomHeader
                title="Log Unplug"
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
          name="LogMorningRoutine"
          component={LogMorningRoutine}
          options={({ navigation }) => ({
            headerTitle: "",
            header: () => (
              <CustomHeader
                title="Log Morning Routine"
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
          name="LogUnwind"
          component={LogUnwind}
          options={({ navigation }) => ({
            headerTitle: "",
            header: () => (
              <CustomHeader
                title="Log Unwind"
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
          name="LogWorkout"
          component={LogWorkout}
          options={({ navigation }) => ({
            headerTitle: "",
            header: () => (
              <CustomHeader
                title="Log Workout"
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
          name="LogBalancedWorkout"
          component={LogBalancedWorkout}
          options={({ navigation }) => ({
            headerTitle: "",
            header: () => (
              <CustomHeader
                title="Log Balanced Workout"
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
          name="BalancedWorkoutReason"
          component={BalancedWorkoutReason}
          options={({ navigation }) => ({
            headerTitle: "",
            header: () => (
              <CustomHeader
                title="Log Balanced Workout"
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
          name="LogSteps"
          component={LogSteps}
          options={({ navigation }) => ({
            headerTitle: "",
            header: () => (
              <CustomHeader
                title="Log Steps"
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
          name="LogHomeFuel"
          component={LogHomeFuel}
          options={({ navigation }) => ({
            headerTitle: "",
            header: () => (
              <CustomHeader
                title="Log Home Fuel"
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
          name="HomeFuelReason"
          component={HomeFuelReason}
          options={({ navigation }) => ({
            headerTitle: "",
            header: () => (
              <CustomHeader
                title="Log Home Fuel"
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
          name="LogStopEating"
          component={LogStopEating}
          options={({ navigation }) => ({
            headerTitle: "",
            header: () => (
              <CustomHeader
                title="Log Stop Eating By 8 p.m."
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
          name="LogWaterConsumed"
          component={LogWaterConsumed}
          options={({ navigation }) => ({
            headerTitle: "",
            header: () => (
              <CustomHeader
                title="Log Water Consumed"
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
          name="LogBalancedMeals"
          component={LogBalancedMeals}
          options={({ navigation }) => ({
            headerTitle: "",
            header: () => (
              <CustomHeader
                title="Log Balanced Meals"
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
          name="LogFixYourBasics"
          component={LogFixYourBasics}
          options={({ navigation }) => ({
            headerTitle: "",
            header: () => (
              <CustomHeader
                title="Log Fix Your Basics"
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

export default memo(MainStack);

const styles = StyleSheet.create({
  crossIcon: {
    width: 22,
    height: 22,
  },
  crossButton: {
    borderWidth: 0,
    backgroundColor: "transparent",
    padding: 5,
  },
  IconButton: {
    padding: 5,
  },
  tickIcon: {
    width: 25,
    height: 20,
    tintColor: colors.primary,
  },
  tickButtonStyle: {
    backgroundColor: "transparent",
  },
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
