import { StyleSheet, Text, TextInput, View } from "react-native";
import { useCustomStyle } from "../constants/CustomStyles";
import { colors } from "../constants/colors";
import CustomFont from "../assets/fonts/customFonts";
import { useState } from "react";
import CustomAddressBar from "../common/CustomAddressBar";

const LogFocus = () => {
  const CustomStyle = useCustomStyle();

  return (
    <View style={styles.container}>
      <Text style={[CustomStyle.title, styles.title]}>
        Taking time out for doing things that make you feel like you lived a
        fuller life.
      </Text>
      <CustomAddressBar />
    </View>
  );
};

export default LogFocus;

const styles = StyleSheet.create({
  outerBox: {
    borderWidth: 4,
    borderColor: "transparent",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 48,
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.primaryBlur,
    marginTop: 48,
    height: 160,
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: 13,
    padding: 16,
    fontSize: 16,
    lineHeight: 19.2,
    fontFamily: CustomFont.Urbanist400,
    color: colors.secondary,
  },
});
