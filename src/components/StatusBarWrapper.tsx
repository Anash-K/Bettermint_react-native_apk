import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../constants/colors";

interface StatusBarWrapperType {
  children: React.ReactNode;
}

const StatusBarWrapper: React.FC<StatusBarWrapperType> = ({ children }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={Platform.select({ ios: "dark-content" })} />
      {children}
    </View>
  );
};

export default StatusBarWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
