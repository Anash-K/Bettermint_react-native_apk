import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
} from "react-native";
import TabLogo from "../../constants/TabLogo";
import {
  Calendar,
  CalendarContext,
  CalendarProvider,
  ExpandableCalendar,
  LocaleConfig,
} from "react-native-calendars";
import { useEffect, useState } from "react";
import { CustomImages } from "../../assets/CustomImages";
import { colors } from "../../constants/colors";
import CustomFont from "../../assets/fonts/customFonts";
import CustomDay from "../../common/CustomDay";
import {
  dateToImageMapOfHomeFuel,
  dateToImageMapOfSleep,
  dateToImageMapOfStress,
  dateToImageMapOfWorkout,
} from "../../utils/dummyCalenderData";
import Weeks from "../../constants/Weeks";
import CalendarHeader from "react-native-calendars/src/calendar/header";
import MonthYearPicker from "../../constants/CalenderHeader";

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
  const [date, setDate] = useState(new Date());

  const currentMonth = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`;

  console.log(currentMonth,"current month")
  useEffect(() => {
    console.log(currentMonth, "selected");
  }, [currentMonth]);

  return (
    <View style={styles.container}>
      <TabLogo
        title="Habit Tracking"
        Boxstyle={styles.tabBarStyle}
        titleStyle={styles.title}
      />

      <MonthYearPicker date={date} setDate={setDate} />

      <ScrollView
        style={styles.calenderBox}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.innerContent}>
          <Calendar
            style={styles.calendar}
            current={currentMonth}
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
            current={currentMonth}
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
              <Weeks
                title="Workout - 10 mins"
                headerColor={colors.lottiePink}
              />
            )}
          />

          <Calendar
            style={styles.calendar}
            current={currentMonth}
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
            current={currentMonth}
            renderHeader={() => null}
            firstDay={1}
            dayComponent={({ date, state }: { date: any; state: string }) => (
              <CustomDay
                date={date}
                state={state}
                imageSource={dateToImageMapOfHomeFuel}
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
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: Platform.select({ android: 30 }),
  },
  tabBarStyle: {
    height: Platform.select({ ios: 170, android: 150 }),
    justifyContent: Platform.select({ ios: "center", android: 'flex-start' }),
  },
  calendarTitleBox: {
    backgroundColor: colors.white,
    marginHorizontal: 16,
    paddingHorizontal: 12,
    paddingVertical: 13,
    marginTop: -30,
  },
  calendarTitle: {},
  innerContent: {
    marginBottom: 100,
  },
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
  calenderBox: {
    marginTop: 24,
  },
  container: {
    flex: 1, // Make the container take up all available space
    backgroundColor: colors.appBackground,
  },
  calendar: {
    // ...StyleSheet.absoluteFillObject,
    marginTop: 20,
    borderRadius: 12,
    padding: 0,
  },
});

export default CalenderTab;
