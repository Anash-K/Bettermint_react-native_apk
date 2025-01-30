import {
  ImageSourcePropType,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useCustomStyle } from "../constants/CustomStyles";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ScreenProps } from "../navigator/Stack";
import FastImage from "react-native-fast-image";
import { CustomImages } from "../assets/CustomImages";
import { useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import {
  AdvanceContent,
  BeginnerContent,
  IntermediateContent,
  IntermediateTwoContent,
} from "../utils/BeginnerContent";
import LottieView from "lottie-react-native";
import CustomButton from "../common/CustomButton";
import { useFocusEffect } from "@react-navigation/native";

interface initialStateType {
  pageHeading: string;
  beginnerContent: React.FC;
  imageSource: any;
}

const YouAreBeginner: React.FC<ScreenProps<"YouAreBeginner">> = ({
  navigation,
}) => {
  const initialState: initialStateType = {
    pageHeading: "You are a Beginner in Movement!",
    beginnerContent: BeginnerContent,
    imageSource: require("../Lottie/Movement/MovementBeginner.json"),
  };
  const userDetails = useSelector((state: RootState) => state.userDetails);
  const [workoutMovement, setWorkoutMovement] =
    useState<initialStateType>(initialState);
  const CustomStyle = useCustomStyle();
  const animationRef = useRef<LottieView>(null);

  useFocusEffect(
    useCallback(() => {
      console.log("this is my tech");
      animationRef.current?.play();
      animationRef.current?.play(30, 140);
    }, [])
  );

  useEffect(() => {
    let updatedImageSource = require("../Lottie/Movement/MovementBeginner.json");
    let content = BeginnerContent;
    let heading = "You are a Beginner in Movement!"; // Default heading

    if (userDetails.numberOfWorkout > 5 && userDetails.steps >= 8) {
      updatedImageSource = require("../Lottie/Movement/MovementAdvanced.json");
      content = AdvanceContent;
      heading = "Congratulations! You are an Advanced Practitioner!";
    } else if (userDetails.numberOfWorkout > 5 && userDetails.steps < 8) {
      updatedImageSource = require("../Lottie/Movement/MovementIntermediate.json");
      content = IntermediateContent;
      heading = "You are an Intermediate Practitioner!";
    } else if (userDetails.numberOfWorkout <= 5 && userDetails.steps > 10) {
      updatedImageSource = require("../Lottie/Movement/MovementIntermediate.json");
      content = IntermediateTwoContent;
      heading = "You are an Intermediate Practitioner!";
    } else if (userDetails.numberOfWorkout <= 5 && userDetails.steps < 10) {
      updatedImageSource = require("../Lottie/Movement/MovementBeginner.json");
      content = BeginnerContent;
      heading = "You are a Beginner in Movement!";
    }

    setWorkoutMovement({
      pageHeading: heading, // Include pageHeading here
      beginnerContent: content,
      imageSource: updatedImageSource,
    });
  }, [userDetails.steps, userDetails.numberOfWorkout]);

  const handleNextNav = useCallback(() => {
    navigation.navigate("NutritionAssessmentDetails");
  }, []);

  return (
    <ScrollView
      style={[styles.container, CustomStyle.safeAreaMarginBottom]}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <Text style={[CustomStyle.title, styles.title]}>
        {workoutMovement.pageHeading}
      </Text>
      <View style={styles.shapeContainer}>
        <View style={styles.lottieContainer}>
          <LottieView
            ref={animationRef}
            source={workoutMovement.imageSource}
            autoPlay
            loop={false} // Play only once
            style={styles.lottieStyle}
            resizeMode="cover"
          />
        </View>
        {React.createElement(workoutMovement.beginnerContent)}
      </View>
      <CustomButton
        text="Continue"
        onPress={handleNextNav}
        buttonStyle={styles.buttonStyle}
      />
    </ScrollView>
  );
};

export default YouAreBeginner;

const styles = StyleSheet.create({
  title: {
    textAlign: "left",
    paddingHorizontal: 16,
  },
  buttonStyle: {
    marginHorizontal: 16,
    marginBottom: Platform.select({ ios: 15, android: 15 }),
  },
  container: {
    flex: 1,
  },
  lottieStyle: {
    resizeMode: "contain",
    width: 200,
    height: 200,
  },
  lottieContainer: {
    width: 200,
    height: 200,
    marginTop: 64,
    marginBottom: 48,
  },
  shapeContainer: {
    flex: 1,
    alignItems: "center",
  },
});
