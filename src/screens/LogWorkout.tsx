import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import StatusBarWrapper from "../components/StatusBarWrapper";
import CustomTextOptionSelector from "../common/CustomTextOptionSelector";
import { TextOption } from "../Types/CommonTypes";
import { ScreenProps } from "../navigator/Stack";
import CommonSaveBtn from "../components/CommonSaveBtn";
import { useCustomStyle } from "../constants/CustomStyles";

const textArray: TextOption[] = [
  { id: 1, label: "Not at all" },
  { id: 2, label: "Barely" },
  { id: 3, label: "Moderately" },
  { id: 4, label: "Dripping" },
];

const optionsArray: TextOption[] = [
  { id: 1, label: "Brisk Walking" },
  { id: 2, label: "Bodyweight Training" },
  { id: 3, label: "Cardio" },
  { id: 4, label: "Sports & Recreational Activities" },
  { id: 5, label: "High-Intensity Training" },
  { id: 6, label: "Strength Training" },
  { id: 7, label: "Flexibility & Mobility" },
  { id: 8, label: "Martial Arts" },
];

const textBArray: TextOption[] = [
  { id: 1, label: "Lazy" },
  { id: 2, label: "No time" },
  { id: 3, label: "Tired" },
  { id: 4, label: "Difficult" },
];

const LogWorkout: React.FC<ScreenProps<"LogWorkout">> = () => {
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
      <ScrollView
        style={[styles.container, safeAreaMarginBottom]}
        contentContainerStyle={styles.scrollableContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <CustomTextOptionSelector
            question="What type of workout did you do?"
            options={optionsArray.map((item) => item.label)}
            selectedOption={
              selectedOptions["What type of workout did you do?"] || ""
            }
            onSelect={(option) =>
              handleSelect("What type of workout did you do?", option)
            }
          />
          <CustomTextOptionSelector
            question="How much did you sweat during workout?"
            options={textArray.map((item) => item.label)}
            selectedOption={
              selectedOptions["How much did you sweat during workout?"] || ""
            }
            onSelect={(option) =>
              handleSelect("How much did you sweat during workout?", option)
            }
          />
          <CustomTextOptionSelector
            question="Why didn’t you complete your workout goal today?"
            options={textBArray.map((item) => item.label)}
            selectedOption={
              selectedOptions[
                "Why didn’t you complete your workout goal today?"
              ] || ""
            }
            onSelect={(option) =>
              handleSelect(
                "Why didn’t you complete your workout goal today?",
                option
              )
            }
          />
        </View>
        <CommonSaveBtn
          NavPage="LogBalancedWorkout"
          ButtonStyle={styles.buttonStyle}
        />
      </ScrollView>
    </StatusBarWrapper>
  );
};

export default LogWorkout;

const styles = StyleSheet.create({
  buttonStyle: {},
  optionStyle: {
    width: "100%",
  },
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 48, // Keep padding for last item visibility
  },
  scrollableContent: {
    flexGrow: 1, // Ensure content expands beyond screen height
  },
});
