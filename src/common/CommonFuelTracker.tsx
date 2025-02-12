import { StyleSheet, Text, View } from "react-native";
import React, { memo, useCallback } from "react";
import { useCustomStyle } from "../constants/CustomStyles";
import FastImage from "react-native-fast-image";
import { CustomImages } from "../assets/CustomImages";
import { colors } from "../constants/colors";
import CheckBox from "./CheckBox";
import CircularCheckBox from "./CircularCheckBox";
import SelectDropdownInput from "./SelectDropdownInput";

const CommonFuelTracker = () => {
  const { tagsStyle } = useCustomStyle();
  const options = [
    { title: "Stomach half full" },
    { title: "Almost full" },
    { title: "Ate a little extra" },
    { title: "Can't move" },
  ];

  const handleSelect = useCallback((selectedItem: any) => {
    console.log(selectedItem, "selectedItem");
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.leftPart}>
        <Text style={[tagsStyle, styles.title]}>Breakfast</Text>
        <CheckBox />
      </View>
      <View style={styles.middlePart}>
        <CircularCheckBox size={32} isTitleVisible={false} />
      </View>
      <View style={styles.rightPart}>
        <SelectDropdownInput
          options={options}
          onChange={handleSelect}
          textSize={12}
        />
      </View>
    </View>
  );
};

export default memo(CommonFuelTracker);

const styles = StyleSheet.create({
  rightPart: {
    width: "40.63%",
  },
  middlePart: {
    width: "29.15%",
    justifyContent: "center",
    alignItems: "center",
  },
  tickBox: {
    borderColor: colors.grayTertiary,
    borderWidth: 1,
    width: 32,
    height: 32,
    borderRadius: 32,
  },
  tickIcon: {},
  leftPart: {
    rowGap: 12,
    width: "29.15%",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    textAlign: "left",
  },
});
