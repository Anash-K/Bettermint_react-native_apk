import React, { useCallback, useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { ScreenProps } from "../navigator/Stack";
import { EmotionArray } from "./LogEmotion";
import { useCustomStyle } from "../constants/CustomStyles";
import CustomEmotionSelector from "../common/CustomEmotionSelector";
import CustomTextOptionSelector from "../common/CustomTextOptionSelector";
import CustomButton from "../common/CustomButton";

const LogStress: React.FC<ScreenProps<"LogStress">> = ({ navigation }) => {
  const CustomStyle = useCustomStyle();

  const textArray = [
    "Me",
    "Family",
    "Friends",
    "Workload",
    "Relationships",
    "Financial Concerns",
    "Unexpected Events",
    "Health Issues",
  ];

  const lastArray = ["Not in my control", "Yes, it was in my control"];

  // State to store selected options per question
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});

  const handleSelect = useCallback((question: string, option: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [question]: option, // Store selected option for each question
    }));
  }, []);

  const handlePress = useCallback(() => {
    console.log("Selected Responses:", selectedOptions);
  }, [selectedOptions]);

  const handleNextNav = useCallback(() => {
    navigation.navigate("LogEmotion");
  }, []);

  return (
    <ScrollView
      style={[styles.container, CustomStyle.safeAreaMarginBottom]}
      contentContainerStyle={[styles.contentStyle]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>
        <CustomEmotionSelector
          question="How would you rate your emotional state today?"
          options={EmotionArray}
          selectedOption={
            selectedOptions["How would you rate your emotional state today?"] ||
            ""
          }
          onSelect={(option) =>
            handleSelect(
              "How would you rate your emotional state today?",
              option
            )
          }
        />

        <CustomTextOptionSelector
          question="What influenced your mood today?"
          options={textArray}
          selectedOption={
            selectedOptions["What influenced your mood today?"] || ""
          }
          onSelect={(option) =>
            handleSelect("What influenced your mood today?", option)
          }
        />

        <CustomTextOptionSelector
          question="Was your mood within your control?"
          options={lastArray}
          selectedOption={
            selectedOptions["Was your mood within your control?"] || ""
          }
          onSelect={(option) =>
            handleSelect("Was your mood within your control?", option)
          }
          optionStyle={{ width: "100%" }}
        />
      </View>

      <CustomButton
        text="Save"
        onPress={handleNextNav}
        buttonStyle={styles.buttonStyle}
      />
    </ScrollView>
  );
};

export default LogStress;

const styles = StyleSheet.create({
  contentStyle: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  buttonStyle: {
    marginHorizontal: 16,
    marginTop: 32,
    marginBottom: Platform.select({ ios: 20, android: 15 }),
  },
});
