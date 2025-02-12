import React, { memo } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import CustomFont from "../assets/fonts/customFonts";
import { colors } from "./colors";
import FastImage from "react-native-fast-image";
import { CustomImages } from "../assets/CustomImages";

interface HomeFuelCalenderHeaderType {
  icon?: any;
  title: string;
  performanceRatio?: number;
  headerIcon?: any;
  headerColor?: string;
}

const HomeFuelCalenderHeader: React.FC<HomeFuelCalenderHeaderType> = memo(
  ({ icon, title, performanceRatio, headerIcon, headerColor }) => {
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Week"];

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
            {icon && <Image source={headerIcon ?? ""} />}
            {performanceRatio && (
              <View style={styles.headerTextBox}>
                <Text style={styles.headerText}>{performanceRatio}%</Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.iconDetails}>
          <View style={[styles.infoBox]}>
            <View style={[styles.iconBox, styles.redBox]}>
              <FastImage style={styles.icon} source={CustomImages.redSpoon} />
            </View>
            <Text style={styles.infoText}>Outside Meal</Text>
          </View>
          <View style={styles.infoBox}>
            <View style={[styles.iconBox, styles.greenBox]}>
              <FastImage style={styles.icon} source={CustomImages.greenSpoon} />
            </View>

            <Text style={styles.infoText}>Homemade Meal</Text>
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

export default HomeFuelCalenderHeader;

const styles = StyleSheet.create({
  headerTextBox: {
    backgroundColor: colors.white,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 36,
  },
  headerText: {
    fontSize: 16,
    lineHeight: 19.2,
    fontFamily: CustomFont.Urbanist700,
    color: colors.lottieGreen,
  },
  redBox: {
    backgroundColor: "#c53b3d26",
  },
  greenBox: {
    backgroundColor: "#3bc58026",
  },
  icon: {
    width: 14,
    height: 14,
  },
  iconBox: {
    padding: 3,
    borderRadius: 8,
  },
  infoText: {
    fontFamily: CustomFont.Urbanist600,
    fontSize: 12,
    lineHeight: 14.4,
    color: colors.secondary,
  },
  iconDetails: {
    flexDirection: "row",
    columnGap: 24,
    marginTop: 15,
    paddingBottom: 10,
    borderBottomColor: colors.appBackground,
    borderBottomWidth: 1,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 6,
  },
  infoBox2: {},
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
    // paddingVertical: 8,
    marginTop: 24,
    backgroundColor: colors.white,
  },
  weekText: {
    fontSize: 14,
    fontFamily: CustomFont.Urbanist600,
    lineHeight: 16.8,
    color: colors.grayLight,
  },
});
