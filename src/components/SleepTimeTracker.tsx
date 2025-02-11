import React, { memo } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useCustomStyle } from "../constants/CustomStyles";
import FastImage from "react-native-fast-image";
import { CustomImages } from "../assets/CustomImages";
import { colors } from "../constants/colors";
import CustomFont from "../assets/fonts/customFonts";
import TimePicker from "./TimePicker";
import { TimeTrackerType } from "../Types/CommonTypes";

export interface SleepTimeTrackerType {
  SelectedTime: TimeTrackerType;
  GetTimeStamp: (type: "sleepTime" | "wakeupTime", time: string) => void;
}

const SleepTimeTracker: React.FC<SleepTimeTrackerType> = memo(
  ({ SelectedTime, GetTimeStamp }) => {
    const { cardStyle, contentParaStyle } = useCustomStyle();

    return (
      <View style={[cardStyle, styles.container]}>
        <View style={styles.ContentBox}>
          <View style={styles.titleBox}>
            <FastImage
              style={styles.iconStyle}
              source={CustomImages.nightIcon}
            />
            <Text style={[contentParaStyle, styles.title]}> Bed time</Text>
          </View>
          <TimePicker
            SelectedTime={SelectedTime.sleepTime}
            GetTimeStamp={(time) => GetTimeStamp("sleepTime", time)}
          />
        </View>
        <View style={styles.ContentBox}>
          <View style={styles.titleBox}>
            <FastImage
              style={styles.iconStyle}
              source={CustomImages.weatherIcon}
            />
            <Text style={[contentParaStyle, styles.title]}>Wake-up time</Text>
          </View>
          <TimePicker
            SelectedTime={SelectedTime.wakeupTime}
            GetTimeStamp={(time) => GetTimeStamp("wakeupTime", time)}
          />
        </View>
      </View>
    );
  }
);

export default SleepTimeTracker;

const styles = StyleSheet.create({
  titleBox: {
    flexDirection: "row",
    columnGap: 8,
  },
  title: {
    color: colors.primary,
    fontFamily: CustomFont.Urbanist600,
    marginBottom: 0,
  },
  container: {
    flexDirection: "row",
    columnGap: 24,
    justifyContent: "space-between",
    marginVertical: 8,
  },
  ContentBox: {
    flex: 1,
    rowGap: 12,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
