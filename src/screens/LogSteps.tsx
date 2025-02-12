import { StyleSheet, Text, View } from "react-native";
import React, { memo, useCallback, useState } from "react";
import StatusBarWrapper from "../components/StatusBarWrapper";
import CustomTextOptionSelector from "../common/CustomTextOptionSelector";
import { TextOption } from "../Types/CommonTypes";
import { ScreenProps } from "../navigator/Stack";
import CommonSaveBtn from "../components/CommonSaveBtn";
import { useCustomStyle } from "../constants/CustomStyles";
import CustomFont from "../assets/fonts/customFonts";
import { colors } from "../constants/colors";

const textArray: TextOption[] = [
  { id: 1, label: "Lazy" },
  { id: 2, label: "No time" },
];

const optionsArray: TextOption[] = [
  { id: 1, label: "No Time" },
  { id: 2, label: "Barely" },
  { id: 3, label: "Moderately" },
  { id: 4, label: "Dripping" },
];

const LogSteps: React.FC<ScreenProps<"LogSteps">> = () => {
  const { safeAreaMarginBottom } = useCustomStyle();
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});
  const handleSelect = useCallback(
    (question: string, option: string) => {
      setSelectedOptions((prev) => ({
        ...prev,
        [question]: option,
      }));
    },
    [selectedOptions]
  );

  return (
    <StatusBarWrapper>
      <View style={[styles.container, safeAreaMarginBottom]}>
        <View style={styles.content}>
          <View style={styles.stepsCountBox}>
            <Text style={styles.steps}>956</Text>
            <Text style={styles.stepsUnit}>steps</Text>
          </View>
          <View style={styles.titleBox}>
            <View style={styles.Line} />
            <Text style={styles.title}>Today</Text>
            <View style={styles.Line} />
          </View>

          <CustomTextOptionSelector
            question="Why didn’t you hit 8k steps today?"
            options={textArray.map((item) => item.label)} // Only the labels
            selectedOption={
              selectedOptions["Why didn’t you hit 8k steps today?"] || ""
            }
            onSelect={(option) =>
              handleSelect("Why didn’t you hit 8k steps today?", option)
            }
            optionStyle={styles.optionStyle}
          />
          <CustomTextOptionSelector
            question="How much did you sweat during workout?"
            options={optionsArray.map((item) => item.label)} // Only the labels
            selectedOption={selectedOptions["What caused this emotion?"] || ""}
            onSelect={(option) =>
              handleSelect("What caused this emotion?", option)
            }
          />
        </View>
        <CommonSaveBtn NavPage="BottomTabStack" />
      </View>
    </StatusBarWrapper>
  );
};

export default memo(LogSteps);

const styles = StyleSheet.create({
  stepsUnit: {
    fontSize: 24,
    lineHeight: 28.8,
    color: colors.primaryLight,
    letterSpacing: -1.2,
    fontFamily: CustomFont.Urbanist600,
    marginBottom: 10,
  },
  steps: {
    fontSize: 56,
    lineHeight: 56,
    color: colors.primary,
    fontFamily: CustomFont.Urbanist800,
  },
  Line: {
    height: 1,
    borderColor: "#6670731a",
    width: 44,
    borderTopWidth: 1,
  },
  titleBox: {
    flexDirection: "row",
    marginHorizontal: "auto",
    alignItems: "center",
    columnGap: 4,
    marginTop: 4,
    marginBottom: 16,
  },
  stepsCountBox: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginHorizontal: "auto",
    columnGap: 4,
  },
  title: {
    fontFamily: CustomFont.Urbanist600,
    fontSize: 20,
    lineHeight: 24,
    color: colors.secondaryLight,
  },
  optionStyle: {
    width: "100%",
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 24,
  },
});
