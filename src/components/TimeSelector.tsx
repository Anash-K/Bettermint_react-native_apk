import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { memo } from "react";
import { useCustomStyle } from "../constants/CustomStyles";
import TimePicker from "./TimePicker";

interface TimeSelectorType {
  SelectorBoxStyle?: ViewStyle;
  Question: string;
  SelectedTime: string;
  GetTimeStamp: (time: string) => void;
  ExpTimePickerStyle?: ViewStyle;
}

const TimeSelector: React.FC<TimeSelectorType> = memo(
  ({
    Question,
    SelectedTime,
    GetTimeStamp,
    SelectorBoxStyle,
    ExpTimePickerStyle,
  }) => {
    const { cardStyle, SelectQuestionStyle } = useCustomStyle();

    return (
      <View style={[cardStyle, SelectorBoxStyle]}>
        <Text style={[SelectQuestionStyle]}>{Question ?? "Question"}</Text>
        <TimePicker
          SelectedTime={SelectedTime}
          GetTimeStamp={(time) => GetTimeStamp(time)}
          TimePickerStyle={ExpTimePickerStyle}
        />
      </View>
    );
  }
);

export default TimeSelector;

const styles = StyleSheet.create({
  container: {},
});
