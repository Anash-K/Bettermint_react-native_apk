import React, { memo, useCallback, useEffect, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import CustomTextOptionSelector from "../common/CustomTextOptionSelector";
import SleepTimeTracker from "../components/SleepTimeTracker";
import { TextOption, TimeTrackerType } from "../Types/CommonTypes";
import { getTimeDifference } from "../utils/GetTimeDifference";
import CustomButton from "../common/CustomButton";
import { ScreenProps } from "../navigator/Stack";
import { useCustomStyle } from "../constants/CustomStyles";
import StatusBarWrapper from "../components/StatusBarWrapper";
import { useDispatch } from "react-redux";
import { setFieldAction } from "../redux/slices/workoutDetailsSlice";

export type TimeUpdate = {
  type: "sleepTime" | "wakeupTime";
  time: string;
};

const LogSleep: React.FC<ScreenProps<"LogSleep">> = memo(({ navigation }) => {
  //code started
  const { safeAreaMarginBottom } = useCustomStyle();
  const dispatch = useDispatch();

  const textArray: TextOption[] = [
    { id: 1, label: "Binge Watching" },
    { id: 2, label: "Doom Scrolling" },
    { id: 3, label: "Social Outing" },
    { id: 4, label: "Working Late" },
  ];

  const initialData: TimeTrackerType = {
    sleepTime: "23:00",
    wakeupTime: "10:00",
  };
  const [selectedTime, setSelectedTime] =
    useState<TimeTrackerType>(initialData);
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});

  const handleSelect = useCallback(
    (question: string, option: string) => {
      setSelectedOptions((prev) => ({
        ...prev,
        [question]: option, // Store selected option for each question
      }));
    },
    [selectedOptions]
  );

  const handleTimeTracker = useCallback(
    (type: "sleepTime" | "wakeupTime", time: string) => {
      setSelectedTime((prev) => ({
        ...prev,
        [type]: time,
      }));
    },
    []
  );

  const handleNext = useCallback(() => {
    let reasonOfLack =
      selectedOptions[
        "What was the reason you were unable to sleep for 7 hours?"
      ];

    dispatch(
      setFieldAction({
        field: "sleepTrack",
        value: {
          bedTime: selectedTime.sleepTime,
          wakeupTime: selectedTime.wakeupTime,
          reason: reasonOfLack,
        },
      })
    );

    navigation.navigate("LogUnPlug");
  }, [selectedOptions, navigation, selectedTime]);

  const sleepDuration = getTimeDifference(
    selectedTime.sleepTime,
    selectedTime.wakeupTime
  );
  const showQuestion = sleepDuration < 7;

  return (
    <StatusBarWrapper>
      <View style={[styles.container, safeAreaMarginBottom]}>
        <View style={styles.content}>
          <SleepTimeTracker
            SelectedTime={selectedTime}
            GetTimeStamp={handleTimeTracker}
          />
          {showQuestion ? (
            <CustomTextOptionSelector
              question="What was the reason you were unable to sleep for 7 hours?"
              options={textArray.map((item) => item.label)} // Only the labels
              selectedOption={
                selectedOptions[
                  "What was the reason you were unable to sleep for 7 hours?"
                ] || ""
              }
              onSelect={(option) =>
                handleSelect(
                  "What was the reason you were unable to sleep for 7 hours?",
                  option
                )
              }
            />
          ) : null}
        </View>
        <CustomButton
          text="Save"
          onPress={handleNext}
          buttonStyle={styles.button}
        />
      </View>
    </StatusBarWrapper>
  );
});

export default LogSleep;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  button: {
    marginHorizontal: 16,
    marginBottom: Platform.select({ ios: 20, android: 10 }),
  },
});
