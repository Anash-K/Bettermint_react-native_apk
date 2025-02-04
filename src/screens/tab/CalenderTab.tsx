import { Text, View, StyleSheet, ScrollView, Image } from "react-native";
import TabLogo from "../../constants/TabLogo";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useEffect, useState } from "react";
import { CustomImages } from "../../assets/CustomImages";
import { colors } from "../../constants/colors";
import CustomFont from "../../assets/fonts/customFonts";
import CustomDay from "../../common/CustomDay";
import {
  dateToImageMapOfSleep,
  dateToImageMapOfStress,
  dateToImageMapOfWorkout,
} from "../../utils/dummyCalenderData";
import Weeks from "../../constants/Weeks";

// Setup LocaleConfig if you're using custom date formatting
LocaleConfig.locales["en"] = {
  monthNames: [
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
  ],
  monthNamesShort: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  today: "Today",
};
LocaleConfig.defaultLocale = "en";

const CalenderTab = () => {
  const [selectedMonth, setSelectedMonth] = useState("2024-2"); // Format: 'yyyy-mm'

  const handleMonthChange = (month) => {
    console.log(month, "month");
    setSelectedMonth(month.dateString.slice(0, 7)); // Format month as 'yyyy-mm'
  };

  useEffect(() => {
    console.log(selectedMonth, "selected");
  }, [selectedMonth]);

  return (
    <View style={styles.container}>
      <TabLogo title="Habit Tracking" />

      <Text>Calendar Screen</Text>

      <ScrollView
        style={styles.calenderBox}
        showsVerticalScrollIndicator={false}
      >
        {/* Render additional Calendar components here if needed */}
        <Calendar
          style={styles.calendar}
          current={selectedMonth}
          renderHeader={() => null}
          firstDay={1}
          dayComponent={({ date, state }: { date: any; state: string }) => (
            <CustomDay
              date={date}
              state={state}
              imageSource={dateToImageMapOfStress}
            />
          )}
          customHeader={({ day, stats }) => <Weeks title="Stress Levels" />}
        />

        <Calendar
          style={styles.calendar}
          current={selectedMonth}
          renderHeader={() => null}
          firstDay={1}
          dayComponent={({ date, state }: { date: any; state: string }) => (
            <CustomDay
              date={date}
              state={state}
              imageSource={dateToImageMapOfWorkout}
              themeColor={colors.lottiePink}
            />
          )}
          customHeader={({ day, stats }) => (
            <Weeks title="Workout - 10 mins" headerColor={colors.lottiePink} />
          )}
        />

        <Calendar
          style={styles.calendar}
          current={selectedMonth}
          renderHeader={() => null}
          firstDay={1}
          dayComponent={({ date, state }: { date: any; state: string }) => (
            <CustomDay
              date={date}
              state={state}
              imageSource={dateToImageMapOfSleep}
              themeColor={colors.lottieBlue}
            />
          )}
          customHeader={({ day, stats }) => (
            <Weeks title="Sleep - 7 hrs" headerColor={colors.lottieBlue} />
          )}
        />
        <Calendar
          style={styles.calendar}
          current={selectedMonth}
          renderHeader={() => null}
          firstDay={1}
          dayComponent={({ date, state }: { date: any; state: string }) => (
            <CustomDay
              date={date}
              state={state}
              imageSource={dateToImageMapOfSleep}
              themeColor={colors.lottieGreen}
            />
          )}
          customHeader={({ day, stats }) => (
            <Weeks
              title="Home Fuel - 3 outside meals/wk"
              headerColor={colors.lottieGreen}
            />
          )}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  dateText: {
    fontFamily: CustomFont.Urbanist400,
    fontSize: 14,
    lineHeight: 14.4,
    marginBottom: 10,
  },
  dateBox: {
    alignItems: "center",
    borderColor: colors.secondaryWhite,
    borderWidth: 1,
    width: "100%",
    height: 82,
    justifyContent: "center",
  },
  emotionIcon: {
    width: 32,
    height: 32,
  },
  calendarHeader: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  calenderBox: {},
  container: {
    flex: 1, // Make the container take up all available space
  },
  calendar: {
    // ...StyleSheet.absoluteFillObject,
    marginTop: 20,
    borderRadius: 12,
    padding: 0,
  },
});

export default CalenderTab;
