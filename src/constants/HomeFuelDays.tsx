import React from "react";
import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";
import { CustomImages } from "../assets/CustomImages";
import { colors } from "../constants/colors";
import CustomFont from "../assets/fonts/customFonts";
import { useCustomStyle } from "./CustomStyles";

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
  const { image, text, levelup, outsideCount } = dayData;
  const { calenderDates } = useCustomStyle();

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

      {outsideCount >= 0 ? (
        <View style={styles.dayDetailsBox}>
          <Image
            source={
              outsideCount ? CustomImages.redSpoon : CustomImages.greenSpoon
            }
            style={[styles.icon]}
            resizeMode="contain"
          />
          {levelup && (
            <Image
              source={image}
              style={[styles.icon, levelup && styles.levelup]}
              resizeMode="contain"
            />
          )}
          {outsideCount ? (
            <Text style={[styles.outsideCount]}> x{String(outsideCount)}</Text>
          ) : null}
        </View>
      ) : null}
    </View>
  );
};

export default HomeFuelDays;

const styles = StyleSheet.create({
  outsideCount: {
    fontSize: 12,
    lineHeight: 14.4,
    color: colors.darkRed,
    fontFamily: CustomFont.Urbanist700,
    marginTop: 12,
  },
  levelup: {
    width: 30,
    height: 30,
    marginTop: 3,
  },
  detailText: {},
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
    alignItems: "center",
  },
  container: {
    alignItems: "center",
    width: "100%",
    padding: 8,
    flexGrow: 1,
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
    width: 15,
    height: 15,
    marginTop: 12,
  },
});
