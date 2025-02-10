import React, { memo } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import CustomFont from "../assets/fonts/customFonts";
import { colors } from "../constants/colors";

interface WeeksCalenderHeaderType {
  icon?: any;
  title: string;
  headingText?: string;
  headerIcon?: any;
  headerColor?: string;
}

const WeeksCalenderHeader: React.FC<WeeksCalenderHeaderType> = memo(
  ({ icon, title, headingText, headerIcon, headerColor }) => {
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    return (
      <View style={styles.container}>
        <View
          style={[
            styles.header,
            headerColor && { backgroundColor: headerColor },
          ]}
        >
          <Text style={styles.title}>{title ?? "title"}</Text>
          <View style={styles.innerContainer}>
            {icon && <Image source={headerIcon ?? ""} />}
            {headingText && <Text>{headingText}</Text>}
          </View>
        </View>
        <View style={styles.weekBox}>
          {weekDays.map((day, index) => (
            <Text key={index} style={styles.weekText}>
              {day}
            </Text>
          ))}
        </View>
      </View>
    );
  }
);

export default WeeksCalenderHeader;

const styles = StyleSheet.create({
  innerContainer: {
    flexDirection: "row",
  },
  title: {
    fontFamily: CustomFont.Urbanist800,
    fontSize: 18,
    lineHeight: 21.8,
    textTransform: "capitalize",
    color: colors.white,
  },
  header: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 15,
    backgroundColor: colors.lottieYellow,
    // margin: -5,
    // marginTop: -8,
    marginBottom: 10,
    justifyContent: "space-between",
  },
  weekBox: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  container: {
    paddingVertical: 8,
  },
  weekText: {
    fontSize: 14,
    fontFamily: CustomFont.Urbanist600,
    lineHeight: 16.8,
    color: colors.grayLight,
  },
});
