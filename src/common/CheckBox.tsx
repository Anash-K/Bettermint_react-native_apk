import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo, useCallback, useState } from "react";
import FastImage from "react-native-fast-image";
import { colors } from "../constants/colors";
import { CustomImages } from "../assets/CustomImages";
import CustomFont from "../assets/fonts/customFonts";
interface CheckBoxProps {
  title?: string;
  isTitleVisible?: boolean;
  isCircular?: boolean;
  size?: number;
  color?: string;
  isChecked: boolean;
  setIsChecked: (isChecked: boolean) => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  title,
  isTitleVisible = true,
  isCircular,
  size = 18,
  isChecked,
  setIsChecked,
}) => {
  const handlePress = useCallback(() => {
    setIsChecked(!isChecked);
  }, [isChecked]);

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View
        style={[
          styles.checkBox,
          isChecked && styles.checked,
          size ? { width: size, height: size } : null,
          isCircular ? { borderRadius: size / 2 } : null,
        ]}
      >
        {isChecked && (
          <FastImage style={styles.icon} source={CustomImages.tick} />
        )}
      </View>
      {isTitleVisible && <Text style={styles.title}>{title ?? "Skipped"}</Text>}
    </TouchableOpacity>
  );
};

export default memo(CheckBox);

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    lineHeight: 16.8,
    fontFamily: CustomFont.Urbanist600,
    color: colors.secondaryLight,
  },
  checked: {
    backgroundColor: colors.secondaryLight,
  },
  icon: {
    width: 10,
    height: 7,
  },
  container: {
    flexDirection: "row",
    columnGap: 6,
    alignItems: "center",
  },
  checkBox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    borderColor: colors.secondaryLight,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
