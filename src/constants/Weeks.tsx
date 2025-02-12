import React, { memo } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import CustomFont from "../assets/fonts/customFonts";
import { colors } from "./colors";

interface WeeksType {
  icon: any;
  title: string;
  performanceRatio?: number;
  headerIcon?: any;
  headerColor?: string;
}

const Weeks: React.FC<WeeksType> = memo(
  ({ icon, title, performanceRatio, headerIcon, headerColor }) => {
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
          <View
            style={[
              styles.innerContainer,
              headerIcon || performanceRatio
                ? { borderColor: "rgba(255, 255, 255, 0.25)" }
                : null,
            ]}
          >
            {headerIcon && (
              <Image style={styles.headerIcon} source={headerIcon ?? ""} />
            )}
            {performanceRatio && (
              <View style={styles.headerTextBox}>
                <Text
                  style={[
                    styles.performanceRatio,
                    performanceRatio < 50 ? { color: colors.red } : {},
                    performanceRatio >= 50 && performanceRatio < 90
                      ? { color: colors.orange }
                      : {},
                      performanceRatio >= 90 ? { color: colors.lottieGreen } : {},
                  ]}
                >
                  {performanceRatio}%
                </Text>
              </View>
            )}
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

export default Weeks;

const styles = StyleSheet.create({
  headerIcon: {
    width: 27,
    height: 27,
  },
  headerTextBox: {
    backgroundColor: colors.white,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 36,
  },
  performanceRatio: {
    fontSize: 16,
    lineHeight: 19.2,
    fontFamily: CustomFont.Urbanist700,
    color: colors.red,
  },
  innerContainer: {
    flexDirection: "row",
    borderRadius: 36,
    borderColor: "transparent",
    borderWidth: 2,
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
    margin: -5,
    marginTop: -8,
    marginBottom: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    paddingRight: 20,
    alignItems:'center'
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
