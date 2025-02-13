import { memo, useCallback, useMemo, useState } from "react";
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
  { id: 1, label: "I was hungry" },
  { id: 2, label: "Late-night snack" },
  { id: 3, label: "Craving" },
  { id: 4, label: "Sweet tooth" },
  { id: 5, label: "Slept late" },
];

const LogStopEating: React.FC<ScreenProps<"LogStopEating">> = memo(() => {
  const { safeAreaMarginBottom } = useCustomStyle();
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});

  const handleSelect = useCallback(
    (question: string, option: string) => {
      console.log(option, "option");
      setSelectedOptions((prev) => ({
        ...prev,
        [question]: option,
      }));
    },
    [selectedOptions]
  );

  // Check if the selected time is after 20:00 (8:00 PM)
  const isLateMeal = useMemo(() => {
    const selectedTime = selectedOptions["When was your last meal?"];
    if (!selectedTime) return false;

    const [hour] = selectedTime.split(":").map(Number); // Extract hour

    return hour >= 20 ||  hour <= 5; // True if 8:00 PM (20:00) or later
  }, [selectedOptions]);

  return (
    <StatusBarWrapper>
      <View style={[styles.container, safeAreaMarginBottom]}>
        <View style={styles.content}>
          <TimeSelector
            Question="When was your last meal?"
            SelectedTime={selectedOptions["When was your last meal?"] || ""}
            GetTimeStamp={(option) =>
              handleSelect("When was your last meal?", option)
            }
            ExpTimePickerStyle={styles.timeSelector}
          />
          {isLateMeal ? (
            <CustomTextOptionSelector
              question="What was the reason you couldn’t stop eating on time?"
              options={textArray.map((item) => item.label)} // Only the labels
              selectedOption={
                selectedOptions[
                  "What was the reason you couldn’t stop eating on time?"
                ] || ""
              }
              onSelect={(option) =>
                handleSelect(
                  "What was the reason you couldn’t stop eating on time?",
                  option
                )
              }
            />
          ) : null}
        </View>
        <CommonSaveBtn NavPage="LogWaterConsumed" />
      </View>
    </StatusBarWrapper>
  );
});

export default LogStopEating;

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
