import { Image, StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { getTimeDifference } from "../../utils/GetTimeDifference";
import FastImage from "react-native-fast-image";
import { CustomImages } from "../../assets/CustomImages";
import { colors } from "../../constants/colors";
import { useCustomStyle } from "../../constants/CustomStyles";

const SleepDataLog = () => {
  const { sleepTrack } = useSelector((state: RootState) => state.userDetails);
  const { tagsStyle } = useCustomStyle();

  let sleepDuration;
  if (sleepTrack.bedTime && sleepTrack.wakeupTime) {
    sleepDuration = getTimeDifference(
      sleepTrack.bedTime,
      sleepTrack.wakeupTime
    );
  }

  console.log(sleepTrack.bedTime, sleepDuration, sleepTrack.wakeupTime);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={CustomImages.clockIcon}
          style={styles.icon}
          tintColor={colors.secondaryLight}
        />
        <Text
          style={[tagsStyle, styles.description]}
        >{`${sleepDuration} hrs (${sleepTrack.bedTime} - ${sleepTrack.wakeupTime})`}</Text>
      </View>
      {sleepTrack.reason ? (
        <View style={styles.header}>
          <Image
            source={CustomImages.questionMark}
            style={styles.icon}
            tintColor={colors.secondaryLight}
          />
          <Text style={[tagsStyle, styles.description]}>
            {sleepTrack.reason}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default memo(SleepDataLog);

const styles = StyleSheet.create({
  container: {
    rowGap: 12,
  },
  header: {
    flexDirection: "row",
    columnGap: 8,
    alignItems:'center'
  },
  icon: {
    width: 20,
    height: 20,
  },
  description: {
    marginBottom: 0,
    color: colors.secondaryLight,
  },
});
