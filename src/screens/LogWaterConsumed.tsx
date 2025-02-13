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
import CustomSelector from "../common/CustomSelector";

const textArray: TextOption[] = [
  { id: 1, label: "Too busy" },
  { id: 2, label: "Not thirsty" },
  { id: 3, label: "Forgot" },
];

const waterAmount = ["1", "1.5", " 2", "2.5", "3", "3.5", "4"];

const LogWaterConsumed: React.FC<ScreenProps<"LogWaterConsumed">> = memo(() => {
  const { safeAreaMarginBottom , safeAreaMarginTop} = useCustomStyle();
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
  const isNotEnoughWater = useMemo(() => {
    const selectedAmount =
      selectedOptions["How many liters of water do you drink daily?"];

    if (!selectedAmount) return false;

    return parseInt(selectedAmount) < 3; // True if 8:00 PM (20:00) or later
  }, [selectedOptions]);

  return (
    <StatusBarWrapper>
      <View style={[styles.container, safeAreaMarginBottom]}>
        <View style={styles.content}>
          <CustomSelector
            question="How many liters of water do you drink daily?"
            options={waterAmount}
            onSelect={(option) =>
              handleSelect(
                "How many liters of water do you drink daily?",
                option
              )
            }
            selectedOption={
              selectedOptions["How many liters of water do you drink daily?"]
            }
            buttonStyle={{ width: 43, height: 43 }}
          />
          {isNotEnoughWater ? (
            <CustomTextOptionSelector
              question="What stopped you from reaching 3 litres today?"
              options={textArray.map((item) => item.label)} // Only the labels
              selectedOption={
                selectedOptions[
                  "What stopped you from reaching 3 litres today?"
                ] || ""
              }
              onSelect={(option) =>
                handleSelect(
                  "What stopped you from reaching 3 litres today?",
                  option
                )
              }
            />
          ) : null}
        </View>
        <CommonSaveBtn NavPage="LogBalancedMeals" />
      </View>
    </StatusBarWrapper>
  );
});

export default LogWaterConsumed;

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
    paddingTop:8
  },
});
