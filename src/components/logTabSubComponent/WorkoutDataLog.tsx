import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomFont from "../../assets/fonts/customFonts";
import { colors } from "../../constants/colors";

const WorkoutDataLog = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.commonBg}>
          <Text style={styles.innerText}>Walking</Text>
        </View>
        <View style={styles.commonBg}>
          <Text style={styles.innerText}>Moderate Sweat</Text>
        </View>
      </View>

      <View style={[styles.commonBg, styles.lowerBox]}>
        <Text style={styles.innerText}>5 km</Text>
        <View style={styles.dot} />
        <Text style={styles.innerText}>60 mins</Text>
        <View style={styles.dot} />
        <Text style={styles.innerText}>12 m/km</Text>
      </View>
    </View>
  );
};

export default WorkoutDataLog;

const styles = StyleSheet.create({
  dot: {
    width: 2,
    height: 2,
    borderRadius: 2,
    backgroundColor: colors.secondary,
  },
  lowerBox: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
    alignSelf: "flex-start",
    marginTop: 12,
  },
  innerText: {
    fontFamily: CustomFont.Urbanist600,
    fontSize: 14,
    lineHeight: 16.8,
    textAlign: "center",
    color: colors.secondaryLight,
  },
  container: {
    marginTop: 5,
  },
  header: {
    flexDirection: "row",
    gap: 12,
  },
  commonBg: {
    backgroundColor: "#66707312",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 28,
  },
});
