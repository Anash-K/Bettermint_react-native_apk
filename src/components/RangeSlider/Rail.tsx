import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

const Rail = () => {
  return <View style={styles.rail} />;
};

export default Rail;

const styles = StyleSheet.create({
  rail: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.lightblue,
  },
});
