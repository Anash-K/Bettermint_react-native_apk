import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

const Notch = () => {
  return <View style={styles.notch} />;
};

export default Notch;

const styles = StyleSheet.create({
  notch: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
});
