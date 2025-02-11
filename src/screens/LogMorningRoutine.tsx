import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import StatusBarWrapper from "../components/StatusBarWrapper";
import CustomTextOptionSelector from "../common/CustomTextOptionSelector";
import { TextOption } from "../Types/CommonTypes";
import { ScreenProps } from "../navigator/Stack";
import CommonSaveBtn from "../components/CommonSaveBtn";
import { useCustomStyle } from "../constants/CustomStyles";

const textArray: TextOption[] = [
  { id: 1, label: "Yes, I did" },
  { id: 2, label: "No, I missed" },
];

const optionsArray: TextOption[] = [
  { id: 1, label: "No Time" },
  { id: 2, label: "Forgot about it" },
  { id: 3, label: "Lazy" },
  { id: 4, label: "Overslept" },
];

const LogMorningRoutine: React.FC<ScreenProps<"LogMorningRoutine">> = () => {
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
          <CustomTextOptionSelector
            question="What was the reason you were unable to sleep for 7 hours?"
            options={textArray.map((item) => item.label)} // Only the labels
            selectedOption={selectedOptions["What caused this emotion?"] || ""}
            onSelect={(option) =>
              handleSelect("What caused this emotion?", option)
            }
            optionStyle={styles.optionStyle}
          />
          <CustomTextOptionSelector
            question="What was the reason you were unable to sleep for 7 hours?"
            options={optionsArray.map((item) => item.label)} // Only the labels
            selectedOption={selectedOptions["What caused this emotion?"] || ""}
            onSelect={(option) =>
              handleSelect("What caused this emotion?", option)
            }
          />
        </View>
        <CommonSaveBtn NavPage="LogUnwind" />
      </View>
    </StatusBarWrapper>
  );
};

export default LogMorningRoutine;

const styles = StyleSheet.create({
  optionStyle: {
    width: "100%",
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
