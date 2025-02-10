import React, { memo, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { useCustomStyle } from "../constants/CustomStyles";
import { dateToImageMapOfHomeFuel } from "../utils/dummyCalenderData";
import { colors } from "../constants/colors";
import HomeFuelDays from "../constants/HomeFuelDays";
import WeeksCalenderHeader from "./WeeklyCalenderHeader";
import HomeFuelCalenderHeader from "../constants/HomeFuelCalenderHeader";
import moment from "moment";
import { getWeeklyRanges } from "../utils/GetWeeklyRanges";

interface WeeklyCalenderType {
  currentMonth: string;
  title: string;
  headingText?: string;
  headerColor?: string;
  headerIcon?: any;
  icon?: any;
}

const WeeklyCalender: React.FC<WeeklyCalenderType> = memo(
  ({ currentMonth, title, headingText, headerColor, headerIcon, icon }) => {
    const { calenderDates } = useCustomStyle();
    const [weeklyRanges, setWeeklyRanges] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState<string[]>([]);

    useEffect(() => {
      if (!currentMonth) return;
      const year = moment(currentMonth).year();
      const month = moment(currentMonth).month() + 1;
      setWeeklyRanges(getWeeklyRanges(year, month));
      const results = checkRecordsInWeeklyRanges(
        weeklyRanges,
        dateToImageMapOfHomeFuel,
        year,
        month
      );
      setSelectedDate[results]
    }, [currentMonth]);

    useEffect(() =>{
        console.log(selectedDate,"selecyed")
    },[weeklyRanges])

    const checkRecordsInWeeklyRanges = (
      weeklyRanges: string[],
      dateToImageMap: Record<string, any>,
      currentYear: number,
      currentMonth: number
    ) => {
      return weeklyRanges.map((range) => {
        const [start, end] = range.split("-").map(Number);

        const startDate = moment(
          `${currentYear}-${currentMonth}-${start}`,
          "YYYY-M-D"
        );
        const endDate = moment(
          `${currentYear}-${currentMonth}-${end}`,
          "YYYY-M-D"
        );

        const hasRecord = Object.keys(dateToImageMap).some((date) => {
          const recordDate = moment(date, "YYYY-MM-DD");
          return recordDate.isBetween(startDate, endDate, undefined, "[]"); // Inclusive range check
        });

        return { range, hasRecord };
      });
    };

    console.log(weeklyRanges, "weekly Ranges");

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <HomeFuelCalenderHeader
            headingText={headingText}
            headerColor={headerColor}
            title={title}
            headerIcon={headerIcon}
            icon={icon}
          />
        </View>
        <View style={styles.contentBox}>
          <View style={styles.calenderBox}>
            <Calendar
              key={currentMonth + "homeFuel"}
              style={[styles.calender]}
              enableSwipeMonths
              current={currentMonth}
              renderHeader={() => {}}
              firstDay={1}
              dayComponent={({ date, state }: { date: any; state: string }) => (
                <>
                  {/* {console.log(date, state)} */}
                  <HomeFuelDays
                    date={date}
                    state={state}
                    imageSource={dateToImageMapOfHomeFuel}
                    themeColor={colors.lottieGreen}
                    eatenOutsideCount={5}
                  />
                </>
              )}
              customHeader={({ day, stats }: any) => <View></View>}
            />
          </View>
          <View style={styles.weekDays}>
            {weeklyRanges.map((week, index) => (
              <Text key={index} style={[calenderDates, styles.weekDaysText]}>
                {week}
              </Text>
            ))}
          </View>
        </View>
      </View>
    );
  }
);

export default WeeklyCalender;

const styles = StyleSheet.create({
  contentBox: {
    flexDirection: "row",
  },
  weekDays: {
    flex: 0.15,
    backgroundColor: colors.white,
    justifyContent: "flex-start",
  },
  weekDaysText: {
    color: colors.grayLight,
    marginVertical: 15,
  },
  calenderBox: {
    flex: 0.85,
  },
  calender: {
    borderRadius: 12,
    padding: 0,
    flex: 1,
    width: "100%",
  },
  container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {},
});
