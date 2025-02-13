import { StyleSheet, Text, View } from "react-native";
import React, { memo, useCallback, useState } from "react";
import FastImage from "react-native-fast-image";
import { CustomImages } from "../assets/CustomImages";
import { colors } from "../constants/colors";
import CustomFont from "../assets/fonts/customFonts";
import { useCustomStyle } from "../constants/CustomStyles";
import RangeSlider from "rn-range-slider";
import Thumb from "../components/RangeSlider/Thumb";
import Rail from "../components/RangeSlider/Rail";
import RailSelected from "../components/RangeSlider/RailSelector";
import Label from "../components/RangeSlider/Label";
import Notch from "../components/RangeSlider/Notch";

interface RangleSelectorType {
  icon: any;
  title: string;
  setValue: (percentage: number) => void;
  value: number;
  removeBottomBorder?: boolean;
}

const RangeSelector: React.FC<RangleSelectorType> = ({
  icon,
  title,
  value,
  setValue,
  removeBottomBorder,
}) => {
  const { tagsStyle } = useCustomStyle();
  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(
    (percentage: number) => <Label text={percentage} />,
    []
  );
  const renderNotch = useCallback(() => <Notch />, []);
  const handleValueChange = useCallback((percentage: number) => {
    setValue(percentage);
  }, []);


  return (
    <View style={[styles.container, removeBottomBorder && styles.bottomBorder]}>
      <View style={styles.header}>
        <View style={styles.iconBox}>
          <FastImage source={icon} style={styles.icon} />
        </View>
        <Text style={[tagsStyle, styles.title]}>{title}</Text>
        <View style={styles.percentageBox}>
          <Text style={styles.percentage}>{value}%</Text>
        </View>
      </View>
      <View style={styles.rangeBox}>
        <RangeSlider
          style={styles.slider}
          min={0}
          max={100}
          low={value}
          step={1}
          floatingLabel
          disableRange
          renderThumb={renderThumb}
          renderRail={renderRail}
          renderRailSelected={renderRailSelected}
          renderLabel={renderLabel}
          renderNotch={renderNotch}
          onValueChanged={handleValueChange}
        />
      </View>
    </View>
  );
};

export default memo(RangeSelector);

const styles = StyleSheet.create({
  bottomBorder: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  rangeBox: {
    flex: 1,
    flexDirection: "row",
    marginTop: 16,
  },
  slider: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    columnGap: 8,
    alignItems: "center",
  },
  container: {
    paddingVertical: 24,
    marginHorizontal: 16,
    borderBottomColor: colors.appBackground,
    borderBottomWidth: 1,
  },
  title: {
    flex: 1,
    textAlign: "left",
  },
  percentage: {
    fontFamily: CustomFont.Urbanist700,
    fontSize: 12,
    lineHeight: 14.4,
    color: colors.primary,
  },
  percentageBox: {
    backgroundColor: colors.lightblue,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 20,
    height: 20,
  },
  iconBox: {
    backgroundColor: colors.lightblue,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
});
