import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useCustomStyle } from "../constants/CustomStyles";
import { colors } from "../constants/colors";
import CustomFont from "../assets/fonts/customFonts";
import { useCallback, useState } from "react";
import CustomAddressBar from "../common/CustomAddressBar";
import CustomSelector from "../common/CustomSelector";
import { handleOptionSelectType } from "./NutritionAssessmentDetails";
import CustomButton from "../common/CustomButton";

const LogFocus = () => {
  const CustomStyle = useCustomStyle();
  const initialState = {
    WhatDidYouDo: "",
    timeSpend: "",
  };
  const [dailyActivity, setDailyActivity] = useState(initialState);

  const handleOptionSelect = useCallback(
    ({ fieldName, text }: handleOptionSelectType) => {
      setDailyActivity((prevState) => ({
        ...prevState,
        [fieldName]: text,
      }));
    },
    [dailyActivity]
  );

  const handleNextNav = useCallback(() => {}, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        style={[styles.container]}
        contentContainerStyle={[
          styles.innerScrollContent,
          CustomStyle.safeAreaMarginBottom,
        ]}
      >
        <Text style={[CustomStyle.title, styles.title]}>
          Taking time out for doing things that make you feel like you lived a
          fuller life.
        </Text>
        <View style={styles.contentWrapper}>
          <View style={[styles.content, CustomStyle.CommonCardShadow]}>
            <Text style={styles.addressQuestion}>What did you do today?</Text>
            <CustomAddressBar height={108} />
          </View>

          <CustomSelector
            question="How much time did you spend on this?"
            outerCardStyle={styles.card}
            CustomOptions={{ startingNumber: 1, endingNumber: 20 }}
            onSelect={(text) =>
              handleOptionSelect({ fieldName: "timeSpend", text })
            }
            selectedOption={dailyActivity.timeSpend}
          />
        </View>
        <CustomButton text="Save" onPress={handleNextNav} />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default LogFocus;

const styles = StyleSheet.create({
  innerScrollContent: {
    flexGrow: 1,
  },
  contentWrapper: {
    flex: 1,
  },
  card: {
    marginHorizontal: 0,
    marginTop: 16,
  },
  addressQuestion: {
    fontFamily: CustomFont.Urbanist700,
    fontSize: 18,
    lineHeight: 21.6,
    color: colors.primary,
    textAlign: "center",
    marginBottom: 24,
  },
  content: {
    backgroundColor: colors.white,
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderColor: colors.commonInputBorderColor,
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
    fontFamily: CustomFont.Urbanist700,
    fontSize: 24,
    lineHeight: 24,
    marginBottom: 48,
    textAlign: "left",
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
