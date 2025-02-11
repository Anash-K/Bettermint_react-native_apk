import { memo, useState } from "react";
import { StyleSheet, TextInput, View, TouchableOpacity, ViewStyle } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { colors } from "../constants/colors";
import FastImage from "react-native-fast-image";
import { CustomImages } from "../assets/CustomImages";
import CustomFont from "../assets/fonts/customFonts";
import { SleepTimeTrackerType } from "./SleepTimeTracker";

interface TimePickerType {
  SelectedTime: string;
  GetTimeStamp: (time: string) => void;
  TimePickerStyle?:ViewStyle;
}

const TimePicker: React.FC<TimePickerType> = memo(
  ({ SelectedTime, GetTimeStamp ,TimePickerStyle }) => {
    const [isDatePickerVisible, setDatePickerVisible] =
      useState<boolean>(false);

    const showDatePicker = (): void => setDatePickerVisible(true);
    const hideDatePicker = (): void => setDatePickerVisible(false);

    const handleConfirm = (date: Date): void => {
      let time = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      });
      GetTimeStamp(time);

      hideDatePicker();
    };

    return (
      <View style={[styles.container,TimePickerStyle]}>
        <TouchableOpacity style={styles.contentBox} onPress={showDatePicker}>
          <TextInput
            value={SelectedTime}
            placeholder="-- --"
            placeholderTextColor={colors.secondary}
            editable={false} // Prevent manual input
            style={styles.input}
          />
          <TouchableOpacity onPress={showDatePicker}>
            <FastImage style={styles.icon} source={CustomImages.clockIcon} />
          </TouchableOpacity>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    );
  }
);

export default TimePicker;

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
    marginLeft: 8,
  },
  contentBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  container: {
    backgroundColor: colors.appBackground,
    padding: 3,
    paddingHorizontal: 16,
    borderRadius: 54,
  },
  input: {
    flex: 1,
    fontSize: 18,
    lineHeight: 21.6,
    fontFamily: CustomFont.Urbanist500,
    color: colors.secondary,
    padding: 0,
  },
});
