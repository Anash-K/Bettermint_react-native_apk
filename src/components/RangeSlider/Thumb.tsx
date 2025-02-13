import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

const Thumb = () => {
  return <View style={styles.thumb} />;
};

export default Thumb;

const styles = StyleSheet.create({
  thumb: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
});
