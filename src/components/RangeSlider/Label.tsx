import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

const Label = ({ text }: { text: number }) => {
  return (
    <View style={styles.labelContainer}>
      <Text style={styles.label}>{text}</Text>
    </View>
  );
};

export default Label;

const styles = StyleSheet.create({
  labelContainer: {
    alignItems: "center",
    padding: 5,
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  label: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});
