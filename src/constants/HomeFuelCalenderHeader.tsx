import React, { memo } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import CustomFont from "../assets/fonts/customFonts";
import { colors } from "./colors";
import FastImage from "react-native-fast-image";
import { CustomImages } from "../assets/CustomImages";

interface HomeFuelCalenderHeaderType {
  icon: any;
  title: string;
  headingText?: string;
  headerIcon?: any;
  headerColor?: string;
}

const HomeFuelCalenderHeader: React.FC<HomeFuelCalenderHeaderType> = memo(
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
        <View style={styles.iconDetails}>
          <View style={[styles.infoBox]}>
            <View style={[styles.iconBox, styles.greenBox]}>
              <FastImage style={styles.icon} source={CustomImages.greenSpoon} />
            </View>
            <Text style={styles.infoText}>Outside Meal</Text>
          </View>
          <View style={styles.infoBox}>
            <View style={[styles.iconBox, styles.redBox]}>
              <FastImage style={styles.icon} source={CustomImages.redSpoon} />
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
    justifyContent: "space-between",
  },
  weekBox: { flexDirection: "row", justifyContent: "space-around" },
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
