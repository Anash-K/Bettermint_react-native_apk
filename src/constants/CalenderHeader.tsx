import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from "react-native";
import { CustomImages } from "../assets/CustomImages";
import CustomFont from "../assets/fonts/customFonts";
import { colors } from "./colors";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import useTimeFormatter from "../utils/timeFormatter";
import moment from "moment";

interface MonthYearPickerType {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>; // Function to update date
}

const MonthYearPicker: React.FC<MonthYearPickerType> = ({ date, setDate }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  // Function to move forward or backward
  const changeMonth = (step: number) => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + step);
    setDate(newDate);
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const hideDatePicker = useCallback(() => {
    setDatePickerVisibility(false);
  }, []);

  const handleConfirm = useCallback(
    (selectedDate: Date) => {
      console.log(selectedDate);

      // Format the selected date to display the month name and year
      const formattedDate = moment(selectedDate).format("MMMM YYYY");
      console.log(formattedDate); // Example: "March 2025"

      setDate(selectedDate); // Update state with the selected date
      hideDatePicker();
    },
    [hideDatePicker]
  );

  // Format the month and year directly in the render
  const formattedDate = `${months[date.getMonth()]} ${date.getFullYear()}`;

  return (
    <View style={styles.container}>
      {/* Left Arrow */}
      <TouchableOpacity onPress={() => changeMonth(-1)} style={styles.arrow}>
        <Image
          style={styles.leftArrow}
          source={CustomImages.calenderArrow}
          resizeMode="contain"
          tintColor={colors.primary}
        />
      </TouchableOpacity>

      {/* Display Month and Year */}
      <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
        <Text style={styles.text}>
          {formattedDate}{" "}
          {/* This will dynamically show the updated month/year */}
        </Text>
      </TouchableOpacity>

      {/* Right Arrow */}
      <TouchableOpacity onPress={() => changeMonth(1)} style={styles.arrow}>
        <Image
          style={styles.rightArrow}
          source={CustomImages.calenderArrow}
          resizeMode="contain"
          tintColor={colors.primary}
        />
      </TouchableOpacity>

      {/* Date Picker Button */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date" // Show full date picker with year and month
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        date={date} // Pass the current date as the initial value
        minimumDate={new Date(2000, 0, 1)} // Optional: set a minimum date limit
        maximumDate={new Date(2099, 11, 31)} // Optional: set a maximum date limit
      />
    </View>
  );
};

export default MonthYearPicker;

const styles = StyleSheet.create({
  rightArrow: {
    width: 22,
    height: 22,
    transform: [{ rotateZ: "180deg" }],
  },
  leftArrow: {
    width: 22,
    height: 22,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    borderRadius: 50,
    marginTop: Platform.select({ ios: -60, android: -70 }),
    marginHorizontal: 16,
    paddingHorizontal: 12,
    paddingVertical: 9,
    height: 44,
  },
  text: {
    fontFamily: CustomFont.Urbanist700,
    fontSize: 16,
    lineHeight: 19.2,
    textAlign: "center",
    color: colors.primary,
  },
  arrow: {
    padding: 5,
  },
});
