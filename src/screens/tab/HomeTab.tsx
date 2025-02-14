import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from "react-native";
import FastImage from "react-native-fast-image";
import * as Progress from "react-native-progress";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import TabLogo from "../../constants/TabLogo";
import { CustomImages } from "../../assets/CustomImages";
import { colors } from "../../constants/colors";
import CustomFont from "../../assets/fonts/customFonts";
import { RootState } from "../../redux/rootReducer";
import { ScreenProps } from "../../navigator/Stack";
import EmojiOrImageCard from "../../common/EmojiCard";
import LinearProgressBar from "../../common/LinearProgressBar";
import * as ProgressBar from "react-native-progress";

interface initialValues {
  week: number;
  month: number;
}

interface ToxicStateType {
  movementText?: TextStyle;
  nourishText?: TextStyle;
  wellbeingText?: TextStyle;
  titleLottieText?: TextStyle;
  sleepText?: TextStyle;
}

const HomeTab: React.FC<ScreenProps<"HomeTab">> = () => {
  const { steps, numberOfWorkout } = useSelector(
    (state: RootState) => state.userDetails
  );

  const [toxicState, setToxicState] = useState<ToxicStateType>({});
  const initialValues: initialValues = {
    week: 90,
    month: 75,
  };
  const [fill, setFill] = useState<initialValues>(initialValues);

  const data = {
    data: [0.5], // 70% progress (Ensure values are between 0 and 1)
  };

  const chartConfig = {
    backgroundGradientFrom: "white", // Remove background
    backgroundGradientTo: "white", // Remove background
    color: (opacity = 0.5) => `rgba(102, 112, 115, ${opacity})`, // Chart color
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  setTimeout(() => {
    setToxicState({
      movementText: {
        top: 10,
        right: -17,
        transform: [{ rotateZ: "45deg" }],
        color: colors.lottiePink,
        opacity: 1,
      },
      nourishText: {
        bottom: 13,
        right: -7,
        transform: [{ rotateZ: "-46deg" }],
        color: colors.lottieGreen,
        opacity: 1,
      },
      wellbeingText: {
        bottom: 10,
        left: -15,
        transform: [{ rotateZ: "45deg" }],
        color: colors.lottieYellow,
        opacity: 1,
      },
      titleLottieText: {
        fontSize: 14,
        lineHeight: 16.8,
        fontFamily: CustomFont.Urbanist700,
        position: "absolute",
      },
      sleepText: {
        top: 10,
        left: -5,
        transform: [{ rotateZ: "-45deg" }],
        color: colors.lottieBlue,
        opacity: 1,
      },
    });
    // ToxicStyle = ;
  }, 0);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor={colors.primary} />
      <TabLogo isLogo={true} />
      <View style={styles.innerContainer}>
        <View style={styles.topHeader}>
          <View style={styles.bankImageBox}>
            <FastImage
              source={CustomImages.bankIcon}
              style={styles.bankIcon}
              resizeMode="contain"
            />
          </View>
          <View style={styles.rightHeader}>
            <View style={styles.scoresDataPart}>
              <Text style={styles.scoreTitle}>Bank of Wellness</Text>
              <View style={styles.score}>
                <Text style={[styles.scoreNumber, styles.points]}>800</Text>
                <Text style={styles.scoreNumber}>/2800</Text>
              </View>
            </View>
            <View style={{ borderRadius: 100 }}>
              <Progress.Bar
                progress={0.4}
                animated={true}
                color={colors.primary}
                unfilledColor={colors.commonInputBorderColor}
                borderColor="transparent"
                width={null} // Takes full width inside a flex container
                borderRadius={50}
              />
            </View>
          </View>
        </View>
      </View>
      <ScrollView
        style={styles.scrollableContainer}
        contentContainerStyle={styles.innerScroallableContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          <View style={styles.topBoxes}>
            {/* Begginer Box */}
            <View style={{ flex: 1 , backgroundColor:'white' ,borderRadius:20 }}>
              <View style={styles.beginnerBox}>
                <View style={styles.beginnerBoxHeader}>
                  <FastImage
                    source={CustomImages.star}
                    style={styles.starIcon}
                  />
                  <Text style={styles.beginnerBoxTitle}>Beginner</Text>
                </View>

                {/* <View style={styles.LottieBox}> */}
                {/* <Image
                    style={{ width: "100%", height: "100%" }}
                    source={CustomImages.HomeBar}
                    resizeMode="contain"
                  /> */}
                {/* <View>
                  <Text style={[styles.titleLottieText, toxicState.sleepText]}>
                    Sleep
                  </Text>
                  <FastImage
                    source={CustomImages.SleepBeginner}
                    style={styles.SleepStyle}
                  />
                </View>
                <View>
                  <Text
                    style={[styles.titleLottieText, toxicState.movementText]}
                  >
                    Movement
                  </Text>
                  <FastImage
                    source={CustomImages.MovementBeginner}
                    style={styles.MovementStyle}
                  />
                </View>
                <View>
                  <Text
                    style={[styles.titleLottieText, toxicState.wellbeingText]}
                  >
                    Wellbeing
                  </Text>
                  <FastImage
                    source={CustomImages.WellbeingBeginner}
                    style={styles.WellBeingStyle}
                  />
                </View>
                <View>
                  <Text
                    style={[styles.titleLottieText, toxicState.nourishText]}
                  >
                    Nourish
                  </Text>

                  <FastImage
                    source={CustomImages.NutritionBeginner}
                    style={styles.NutritionStyle}
                  />
                </View> */}
                {/* </View> */}
              </View>
              <View style={styles.LottieBox}>
                <Image
                  style={{ width: "100%", height: 220 }}
                  source={CustomImages.HomeBar}
                  resizeMode="contain"
                />
                {/* <View>
                  <Text style={[styles.titleLottieText, toxicState.sleepText]}>
                    Sleep
                  </Text>
                  <FastImage
                    source={CustomImages.SleepBeginner}
                    style={styles.SleepStyle}
                  />
                </View>
                <View>
                  <Text
                    style={[styles.titleLottieText, toxicState.movementText]}
                  >
                    Movement
                  </Text>
                  <FastImage
                    source={CustomImages.MovementBeginner}
                    style={styles.MovementStyle}
                  />
                </View>
                <View>
                  <Text
                    style={[styles.titleLottieText, toxicState.wellbeingText]}
                  >
                    Wellbeing
                  </Text>
                  <FastImage
                    source={CustomImages.WellbeingBeginner}
                    style={styles.WellBeingStyle}
                  />
                </View>
                <View>
                  <Text
                    style={[styles.titleLottieText, toxicState.nourishText]}
                  >
                    Nourish
                  </Text>

                  <FastImage
                    source={CustomImages.NutritionBeginner}
                    style={styles.NutritionStyle}
                  />
                </View> */}
              </View>
            </View>

            {/* Habit Mastery Box */}
            <View style={styles.habitMastery}>
              <Text style={[styles.progressText, styles.habitTitle]}>
                Habit Mastery
              </Text>
              <View style={styles.habitBox}>
                <AnimatedCircularProgress
                  size={75}
                  width={8}
                  fill={fill.week}
                  tintColor={colors.secondaryLight}
                  backgroundColor={colors.progressBarBackground}
                  lineCap="round"
                  rotation={0}
                  duration={0}
                >
                  {(fill) => <Text style={styles.progressText}>{fill}%</Text>}
                </AnimatedCircularProgress>
                <Text style={[styles.progressText, styles.progressTitle]}>
                  Week
                </Text>
              </View>
              <View style={[styles.habitBox, styles.habitBottomBox]}>
                <AnimatedCircularProgress
                  size={75}
                  width={8}
                  fill={fill.month}
                  tintColor={colors.secondaryLight}
                  backgroundColor={colors.progressBarBackground}
                  lineCap="round"
                  rotation={0}
                  duration={0}
                >
                  {(fill) => <Text style={styles.progressText}>{fill}%</Text>}
                </AnimatedCircularProgress>
                <Text style={[styles.progressText, styles.progressTitle]}>
                  Month
                </Text>
              </View>
            </View>
          </View>
          <Text style={styles.toDoTitle}>To do list</Text>
          <View style={styles.todoList}>
            <EmojiOrImageCard
              title="Workout"
              cardStyle={styles.workoutCard}
              iconSrc={CustomImages.workout}
              src={CustomImages.pinkLoader}
            />
            <EmojiOrImageCard
              title="Stress"
              cardStyle={styles.stressCard}
              iconSrc={CustomImages.sleep}
              src={CustomImages.circleLoader}
            />
            <EmojiOrImageCard
              title="Stress"
              iconSrc={CustomImages.smileBold}
              src={CustomImages.smileBold}
              isCompleted={true}
            />
          </View>
          <LinearProgressBar
            iconSrc={CustomImages.homeFuel}
            title={"Home Fuel"}
            content={"Outside meals this week"}
            score={2}
            totalPoints={4}
          />
          <Text style={styles.toDoTitle}>You have 1 new lesson</Text>
          <View style={styles.brainContainer}>
            <FastImage
              source={CustomImages.brain}
              style={styles.brainIcon}
              resizeMode="contain"
            />
            <View style={styles.brainRightPart}>
              <Text style={styles.brainTitle}>
                Impact of repetitions on building habits
              </Text>
              <View style={styles.brainLowerPart}>
                <Text style={styles.videoLength}>5 mins</Text>
                <View style={styles.playIconBox}>
                  <FastImage
                    source={CustomImages.play}
                    style={styles.playIconStyle}
                    resizeMode="contain"
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeTab;

const styles = StyleSheet.create({
  innerScroallableContainer: {},
  scrollableContainer: {
    flex: 1,
  },
  stressCard: {
    backgroundColor: colors.lottieBlue,
  },
  workoutCard: {
    backgroundColor: colors.lottiePink,
  },
  videoLength: {
    fontSize: 16,
    lineHeight: 19.2,
    fontFamily: CustomFont.Urbanist600,
    color: "#626D6F",
  },
  brainTitle: {
    fontSize: 18,
    lineHeight: 21.6,
    fontFamily: CustomFont.Urbanist700,
    color: colors.secondary,
  },
  brainLowerPart: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
  },
  brainRightPart: {
    flex: 1,
  },
  brainContainer: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    columnGap: 16,
  },
  playIconBox: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primaryBlur,
    borderRadius: 28,
  },
  playIconStyle: {
    width: 15,
    height: 20,
    marginLeft: 2,
  },
  brainIcon: {
    width: 48,
    height: 48,
  },
  todoList: {
    flexDirection: "row",
    columnGap: 12,
    justifyContent: "center",
    marginBottom: 32,
  },
  habitBottomBox: {
    borderTopColor: "#F2F6F7",
    borderTopWidth: 1,
    paddingTop: 16,
    marginTop: 16,
  },
  habitBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  habitTitle: {
    color: colors.primary,
    marginBottom: 20,
  },
  progressTitle: {
    marginTop: 8,
  },
  progressText: {
    fontSize: 14,
    fontFamily: CustomFont.Urbanist700,
    color: colors.secondaryLight,
    lineHeight: 16.8,
    textAlign: "center",
  },
  toDoTitle: {
    fontSize: 16,
    lineHeight: 19.2,
    fontFamily: CustomFont.Urbanist700,
    color: colors.secondary,
    paddingTop: 32,
    marginBottom: 16,
  },
  nourishText: {
    bottom: 13,
    right: -7,
    transform: [{ rotateZ: "-46deg" }],
    color: colors.lottieGreen,
  },
  wellbeingText: {
    bottom: 10,
    left: -15,
    transform: [{ rotateZ: "45deg" }],
    color: colors.lottieYellow,
  },
  titleLottieText: {
    fontSize: 14,
    lineHeight: 16.8,
    fontFamily: CustomFont.Urbanist700,
    position: "absolute",
    opacity: 0,
  },
  sleepText: {
    top: 10,
    left: -5,
    transform: [{ rotateZ: "-45deg" }],
    color: colors.lottieBlue,
  },
  movementText: {
    top: 10,
    right: -17,
    transform: [{ rotateZ: "45deg" }],
    color: colors.lottiePink,
  },
  contentContainer: {
    padding: 16,
    marginBottom: 100,
  },
  habitMastery: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 16,
    paddingHorizontal: 10,
  },
  topBoxes: {
    flexDirection: "row",
    columnGap: 13,
  },
  LottieBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    // width: 190,
    // height: 190,
    // gap: 7,
    margin: "auto",
    flex: 1,

    //
    width: "100%",
  },
  SleepStyle: {
    width: 180 / 2,
    height: 180 / 2,
  },
  MovementStyle: {
    width: 180 / 2,
    height: 180 / 2,
  },
  WellBeingStyle: {
    width: 180 / 2,
    height: 180 / 2,
  },
  NutritionStyle: {
    width: 180 / 2,
    height: 180 / 2,
  },
  beginnerBoxTitle: {
    fontSize: 16,
    fontFamily: CustomFont.Urbanist700,
    lineHeight: 19.2,
    color: colors.primary,
  },
  beginnerBoxHeader: {
    flexDirection: "row",
    justifyContent: "center",
    columnGap: 8,
    // marginBottom: 40,
    alignItems: "center",
  },
  starIcon: {
    width: 16,
    height: 16,
  },
  beginnerBox: {
    backgroundColor: colors.white,
    flex: 1,
    borderRadius: 20,
    paddingTop: 16,
    // paddingHorizontal: 20,
    paddingBottom: 28,
    //
  },
  points: {
    fontFamily: CustomFont.Urbanist700,
  },
  scoreNumber: {
    fontSize: 16,
    lineHeight: 19.2,
    color: colors.secondary,
  },
  scoreTitle: {
    fontFamily: CustomFont.Urbanist700,
    fontSize: 16,
    color: colors.primary,
    lineHeight: 19.2,
  },
  innerContainer: {
    padding: 16,
    paddingTop: 0,
  },
  rightHeader: {
    flex: 1,
    rowGap: 12,
  },
  scoresDataPart: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  score: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  topHeader: {
    backgroundColor: colors.white,
    flexDirection: "row",
    columnGap: 12,
    padding: 12,
    borderRadius: 10,
    marginTop: -30,
  },
  bankImageBox: {
    backgroundColor: "#DDECF1",
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  bankIcon: {
    width: 28,
    height: 28,
  },
  container: {
    flex: 1,
    backgroundColor: colors.appBackground,
  },
  imageStyle: {
    width: 187,
    height: 34,
  },
  LogoBox: {
    backgroundColor: colors.primary,
    height: 150,
  },
});
