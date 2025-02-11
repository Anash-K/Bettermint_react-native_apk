import { memo, useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomTextOptionSelector from "../common/CustomTextOptionSelector";
import { TextOption } from "../Types/CommonTypes";
import { ScreenProps } from "../navigator/Stack";
import TimeSelector from "../components/TimeSelector";
import CustomButton from "../common/CustomButton";
import CommonSaveBtn from "../components/CommonSaveBtn";
import { useCustomStyle } from "../constants/CustomStyles";
import StatusBarWrapper from "../components/StatusBarWrapper";

const textArray: TextOption[] = [
  { id: 1, label: "Binge Watching" },
  { id: 2, label: "Doom Scrolling" },
  { id: 3, label: "Social Outing" },
  { id: 4, label: "Working Late" },
];

const LogUnPlug: React.FC<ScreenProps<"LogUnPlug">> = memo(() => {
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
          <TimeSelector
            Question="What time did you cut off from devices last  night?"
            SelectedTime={
              selectedOptions[
                "What time did you cut off from devices last  night?"
              ] || ""
            }
            GetTimeStamp={(option) =>
              handleSelect(
                "What time did you cut off from devices last  night?",
                option
              )
            }
            ExpTimePickerStyle={styles.timeSelector}
          />
          <TimeSelector
            Question="What time did you go to bed last night?"
            SelectedTime={
              selectedOptions["What time did you go to bed last night?"] || ""
            }
            GetTimeStamp={(option) =>
              handleSelect("What time did you go to bed last night?", option)
            }
            ExpTimePickerStyle={styles.timeSelector}
          />
          <CustomTextOptionSelector
            question="What was the reason you were unable to sleep for 7 hours?"
            options={textArray.map((item) => item.label)} // Only the labels
            selectedOption={selectedOptions["What caused this emotion?"] || ""}
            onSelect={(option) =>
              handleSelect("What caused this emotion?", option)
            }
          />
        </View>
        <CommonSaveBtn NavPage="LogMorningRoutine" />
      </View>
    </StatusBarWrapper>
  );
});

export default LogUnPlug;

const styles = StyleSheet.create({
  timeSelector: {
    alignSelf: "center",
    minWidth: 144,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
