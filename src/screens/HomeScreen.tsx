import { ScrollView, StyleSheet, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import { CustomImages } from "../assets/CustomImages";
import { colors } from "../constants/colors";
import TabLogo from "../constants/TabLogo";
import * as Progress from "react-native-progress";
import CustomFont from "../assets/fonts/customFonts";
import React, { useRef } from "react";
import { ScreenProps } from "../navigator/Stack";

const HomeScreen: React.FC<ScreenProps<"Home">> = () => {
  return (
    <View style={styles.container}>
      <TabLogo />
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
            <Progress.Bar
              progress={0.4}
              animated={true}
              color={colors.primary}
              unfilledColor={colors.commonInputBorderColor}
              borderColor="transparent"
              width={null} // Takes full width inside a flex container
              borderRadius={12}
            />
          </View>
        </View>
      </View>
      <ScrollView>
        <View style={styles.contentContainer}>
          <View style={styles.topBoxes}>
            <View style={styles.beginnerBox}>
              <View style={styles.beginnerBoxHeader}>
                <FastImage source={CustomImages.star} style={styles.starIcon} />
                <Text style={styles.beginnerBoxTitle}>Beginner</Text>
              </View>

              <View style={styles.LottieBox}>
                <FastImage
                  source={CustomImages.SleepBeginner}
                  style={styles.SleepStyle}
                />
                <FastImage
                  source={CustomImages.MovementBeginner}
                  style={styles.MovementStyle}
                />
                <FastImage
                  source={CustomImages.NutritionBeginner}
                  style={styles.NutritionStyle}
                />
                <FastImage
                  source={CustomImages.WellbeingBeginner}
                  style={styles.WellBeingStyle}
                />
              </View>
            </View>
            <View style={styles.habitMastery}></View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  contentContainer: {
    padding: 16,
  },
  habitMastery: {
    backgroundColor: colors.white,
    borderRadius: 20,
    flex: 4,
  },
  topBoxes: {
    flexDirection: "row",
    columnGap: 13,
  },
  LottieBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 180,
    height: 180,
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
    transform: [{ rotateY: "180deg" }],
  },
  NutritionStyle: {
    width: 180 / 2,
    height: 180 / 2,
    transform: [{ rotateY: "180deg" }],
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
    marginBottom: 20,
  },
  starIcon: {
    width: 16,
    height: 16,
  },
  beginnerBox: {
    backgroundColor: colors.white,
    flex: 6,
    borderRadius: 20,
    paddingTop: 16,
    paddingHorizontal: 20,
    paddingBottom: 28,
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
