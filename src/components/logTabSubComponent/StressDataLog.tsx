import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import FastImage from "react-native-fast-image";
import { colors } from "../../constants/colors";
import { CustomImages } from "../../assets/CustomImages";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";

const StressDataLog:React.FC = () => {
    const {} = useSelector((state:RootState) => state.userDetails)
  return (
    <View style={styles.container}>
        <FastImage source={CustomImages.smileBold} style={styles.icon}  />
      <Text>StressDataLog</Text>
      <View style={styles.dot} />
      <Text>StressDataLog</Text>
    </View>
  );
};

export default memo(StressDataLog);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  dot: {
    width: 2,
    height: 2,
    borderRadius: 2,
    color: colors.secondaryLight,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
