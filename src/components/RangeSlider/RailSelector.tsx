import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

const RailSelected = () => {
  return <View style={styles.railSelected} />;
};

export default RailSelected;

const styles = StyleSheet.create({
  railSelected: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
});
