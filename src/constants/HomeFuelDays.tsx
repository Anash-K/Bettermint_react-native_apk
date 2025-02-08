import React from "react";
import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";
import { CustomImages } from "../assets/CustomImages";
import { colors } from "../constants/colors";
import CustomFont from "../assets/fonts/customFonts";

interface HomeFuelDaysProps {
  date: any;
  state: string;
  imageSource: Record<string, any>;
  details?: string;
  themeColor?: string;
  eatenOutsideCount: number;
}
const HomeFuelDays: React.FC<HomeFuelDaysProps> = ({
  date,
  state,
  imageSource,
  themeColor,
}) => {
  const dayData = imageSource[date.dateString] || {};
  const { image, text, levelup } = dayData;

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.text,
          state === "disabled" && styles.disabledText,
          state === "today" && styles.todayText,
        ]}
      >
        {date.day}
      </Text>

      {/* Show Image or Text */}
      <View style={styles.dayDetailsBox}>
        {image ? (
          <Image
            source={image}
            style={[styles.icon, levelup && styles.levelup]}
            resizeMode="contain"
            tintColor={levelup ? "" : themeColor ?? ""}
          />
        ) : text ? (
          <ImageBackground
            source={CustomImages.calenderTextRing}
            style={styles.imageBackground}
            tintColor={themeColor ?? colors.lottieYellow}
          >
            <Text style={styles.detailText}>{text}</Text>
          </ImageBackground>
        ) : null}
      </View>
    </View>
  );
};

export default HomeFuelDays;

const styles = StyleSheet.create({
  levelup: {
    width: 45,
    height: 45,
    marginTop: 5,
  },
  detailText: {
    textAlign: "center",
    alignSelf: "center",
    fontSize: 11,
    fontFamily: CustomFont.Urbanist700,
    lineHeight: 13.2,
    color: colors.secondary,
  },
  imageBackground: {
    width: 48,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  dayDetailsBox: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  container: {
    alignItems: "center",
    // borderColor: colors.secondaryWhite,
    // borderWidth: 1,
    width: "100%",
    padding: 8,
    flexGrow: 1,
    // justifyContent: "center",
  },
  text: {
    color: colors.secondaryLight,
    fontFamily: CustomFont.Urbanist400,
    fontSize: 12,
    lineHeight: 14.4,
  },
  disabledText: {
    color: colors.grayLight,
  },
  todayText: {},
  icon: {
    width: 32,
    height: 32,
    marginTop: 10,
  },
});
