import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useCustomStyle } from "../constants/CustomStyles";
import { colors } from "../constants/colors";
import CustomFont from "../assets/fonts/customFonts";
import React, { useCallback, useState } from "react";
import { ScreenProps } from "../navigator/Stack";
import CustomAddressBar from "../common/CustomAddressBar";
import CustomButton from "../common/CustomButton";

const WhatsOneGoodThing: React.FC<ScreenProps<"WhatsOneGoodThing">> = ({
  navigation,
}) => {
  const CustomStyle = useCustomStyle();

  const handleNextNav = useCallback(() => {
    navigation.navigate("LogFocus");
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container, CustomStyle.safeAreaMarginBottom]}>
        <Text style={[CustomStyle.title, styles.title]}>
          What's one good thing that happened today?
        </Text>
        <View style={styles.content}>
          <CustomAddressBar />
        </View>

        <CustomButton text="Save" onPress={handleNextNav} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default WhatsOneGoodThing;

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
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
