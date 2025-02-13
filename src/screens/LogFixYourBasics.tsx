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
  { id: 1, label: "I was hungry" },
  { id: 2, label: "Late-night snack" },
  { id: 3, label: "Craving" },
  { id: 4, label: "Sweet tooth" },
  { id: 5, label: "Slept late" },
];
const waterAmount = ["1", "1.5", " 2", "2.5", "3", "3.5", "4",'4.5','5','5.5'];

const LogFixYourBasics: React.FC<ScreenProps<"LogFixYourBasics">> = memo(() => {
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
          <TimeSelector
            Question="When was your last meal?"
            SelectedTime={selectedOptions["When was your last meal?"] || ""}
            GetTimeStamp={(option) =>
              handleSelect("When was your last meal?", option)
            }
            ExpTimePickerStyle={styles.timeSelector}
          />
        </View>
        <CommonSaveBtn NavPage="BottomTabStack" />
      </View>
    </StatusBarWrapper>
  );
});

export default LogFixYourBasics;

const styles = StyleSheet.create({
  timeSelector: {
    alignSelf: "center",
    minWidth: 144,
  },
  container: {
    flex: 1,
    paddingTop:8
  },
  content: {
    flex: 1,
  },
});
