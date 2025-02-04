import React, { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ScreenProps } from "../navigator/Stack";
import CustomTextOptionSelector from "../common/CustomTextOptionSelector";
import CustomButton from "../common/CustomButton";
import { useCustomStyle } from "../constants/CustomStyles";
import CustomEmotionSelector from "../common/CustomEmotionSelector";

interface EmotionOption {
  id: number;
  src: any; // Can be `require` statement or image path
}

interface TextOption {
  id: number;
  label: string;
}

export const EmotionArray: EmotionOption[] = [
  { id: 1, src: require("../assets/Images/smile.png") },
  { id: 2, src: require("../assets/Images/sad.png") },
  { id: 3, src: require("../assets/Images/normal.png") },
  { id: 4, src: require("../assets/Images/happy.png") },
  { id: 5, src: require("../assets/Images/confuse.png") },
];

const LogEmotion: React.FC<ScreenProps<"LogEmotion">> = ({ navigation }) => {
  const CustomStyle = useCustomStyle();

  const textArray: TextOption[] = [
    { id: 1, label: "Me" },
    { id: 2, label: "Family" },
    { id: 3, label: "Friends" },
    { id: 4, label: "Workload" },
    { id: 5, label: "Relationships" },
    { id: 6, label: "Financial Concerns" },
    { id: 7, label: "Unexpected Events" },
    { id: 8, label: "Health Issues" },
  ];

  // State to store selected options per question
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});

  // Handle option selection for each question
  const handleSelect = useCallback((question: string, option: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [question]: option, // Store selected option for each question
    }));
  }, []);

  // Handle save button press (just logs selected options)
  const handlePress = useCallback(() => {
    console.log("Selected Responses:", selectedOptions);
  }, [selectedOptions]);

  const handleNextNav = useCallback(() => {
    navigation.navigate("WhatsOneGoodThing");
  }, []);

  return (
    <ScrollView
      style={[styles.container, CustomStyle.safeAreaMarginBottom]}
      contentContainerStyle={styles.contentStyle}
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
          question="What caused this emotion?"
          options={textArray.map((item) => item.label)} // Only the labels
          selectedOption={selectedOptions["What caused this emotion?"] || ""}
          onSelect={(option) =>
            handleSelect("What caused this emotion?", option)
          }
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

export default LogEmotion;

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
  },
});
