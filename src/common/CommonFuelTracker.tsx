import { StyleSheet, Text, View } from "react-native";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useCustomStyle } from "../constants/CustomStyles";
import FastImage from "react-native-fast-image";
import { CustomImages } from "../assets/CustomImages";
import { colors } from "../constants/colors";
import CheckBox from "./CheckBox";
import CircularCheckBox from "./CircularCheckBox";
import SelectDropdownInput from "./SelectDropdownInput";

interface CommonFuelTrackerType {
  title: string;
}

const CommonFuelTracker: React.FC<CommonFuelTrackerType> = ({ title }) => {
  const [isSkipped, setIsSkipped] = useState<boolean>(false);
  const [isHomeMade, setIsHomeMade] = useState<boolean>(false);
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

  useEffect(() => {
    if (isSkipped) {
      setIsHomeMade(false);
    }
  }, [isSkipped, isHomeMade]);

  return (
    <View style={styles.container}>
      <View style={styles.leftPart}>
        <Text style={[tagsStyle, styles.title]}>{title}</Text>
        <CheckBox isChecked={isSkipped} setIsChecked={setIsSkipped} />
      </View>
      <View style={styles.middlePart}>
        <CircularCheckBox
          isChecked={isHomeMade}
          setIsChecked={setIsHomeMade}
          size={32}
          isTitleVisible={false}
        />
      </View>
      <View style={styles.rightPart}>
        <SelectDropdownInput
          options={options}
          onChange={handleSelect}
          isDisabled={isSkipped}
          SelectedTextStyle={[
            styles.innerTextStyle,
            isSkipped ? styles.skippedSelect : null,
          ]}
          SelectBoxStyle={[
            styles.selectBox,
            isSkipped ? styles.skippedSelectBox : null,
          ]}
        />
      </View>
    </View>
  );
};

export default memo(CommonFuelTracker);

const styles = StyleSheet.create({
  selectBox: {
    minWidth: 150,
  },
  skippedSelect: {
    color: colors.secondaryLight,
  },
  skippedSelectBox: {
    backgroundColor: "#EDEFEF",
  },
  innerTextStyle: {
    fontSize: 12,
  },
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
    paddingVertical: 20,
    borderTopColor: colors.appBackground,
    borderTopWidth: 1,
  },
  title: {
    textAlign: "left",
  },
});
