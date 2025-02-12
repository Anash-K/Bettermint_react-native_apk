import { StyleSheet, Text, View } from "react-native";
import React, { memo, useCallback, useEffect, useState } from "react";
import CommonSaveBtn from "../components/CommonSaveBtn";
import MultiSelectQues from "../components/MultiSelectQues";
import { ScreenProps } from "../navigator/Stack";
import { useCustomStyle } from "../constants/CustomStyles";

const options = {
  choices: ["Lazy", "No time", "Tired", "Difficult"],
};

const BalancedWorkoutReason: React.FC<
  ScreenProps<"BalancedWorkoutReason">
> = () => {
  const { safeAreaMarginBottom } = useCustomStyle();
  const [selectedValues, setSelectedValues] = useState<Record<string, boolean>>(
    options.choices.reduce((acc, choice) => {
      acc[choice] = false;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const handleSelectedValues = (values: Record<string, boolean>) => {
    setSelectedValues(values); // ✅ Update state
    console.log("Selected Options:", values);
  };


  return (
    <View style={[styles.container, safeAreaMarginBottom]}>
      <MultiSelectQues
        Question="What was the reason you failed to complete this week?"
        optionsList={options.choices as (keyof typeof selectedValues)[]}
        initialState={selectedValues}
        isMultiSelect={true}
        GetSelectedValues={handleSelectedValues}
      />
      <CommonSaveBtn NavPage="LogSteps" />
    </View>
  );
};

export default memo(BalancedWorkoutReason);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom:0
  },
});
