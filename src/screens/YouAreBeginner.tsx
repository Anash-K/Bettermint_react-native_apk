import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
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

const YouAreBeginner: React.FC<ScreenProps<"YouAreBeginner">> = ({
  navigation,
}) => {
  const initialState = {
    beginnerContent: BeginnerContent,
    imageSource: CustomImages.beginnerSteps,
  };
  const userDetails = useSelector((state: RootState) => state.userDetails);
  const [workoutMovement, setWorkoutMovement] = useState(initialState);
  const CustomStyle = useCustomStyle();
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    animationRef.current?.play();

    // Or set a specific startFrame and endFrame with:
    animationRef.current?.play(30, 120);
  }, []);

  console.log(userDetails.steps, userDetails.numberOfWorkout);

  useEffect(() => {
    let updatedImageSource = CustomImages.beginnerSteps;
    let content = BeginnerContent;

    if (userDetails.numberOfWorkout > 5 && userDetails.steps >= 8) {
      updatedImageSource = CustomImages.advanceSteps;
      content = AdvanceContent;
    } else if (userDetails.numberOfWorkout > 5 && userDetails.steps < 8) {
      updatedImageSource = CustomImages.intermediateSteps;
      content = IntermediateContent;
    } else if (userDetails.numberOfWorkout <= 5 && userDetails.steps > 10) {
      updatedImageSource = CustomImages.intermediateSteps;
      content = IntermediateTwoContent;
    } else if (userDetails.numberOfWorkout <= 5 && userDetails.steps < 10) {
      updatedImageSource = CustomImages.beginnerSteps;
      content = BeginnerContent;
    }

    setWorkoutMovement({
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
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <Text style={[CustomStyle.title, styles.title]}>
        You are a Beginner in Movement!
      </Text>
      <View style={styles.shapeContainer}>
        <View style={styles.lottieContainer}>
          <LottieView
            ref={animationRef}
            source={require("../Lottie/ssssss.json")}
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
    marginBottom: Platform.select({ ios: 10, android: 20 }),
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
  },
  shapeContainer: {
    flex: 1,
    alignItems: "center",
  },
});
