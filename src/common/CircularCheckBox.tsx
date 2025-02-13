import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo, useCallback, useState } from "react";
import FastImage from "react-native-fast-image";
import { colors } from "../constants/colors";
import { CustomImages } from "../assets/CustomImages";
import CustomFont from "../assets/fonts/customFonts";
interface CircularCheckBoxProps {
  title?: string;
  isTitleVisible?: boolean;
  size?: number;
  isChecked: boolean;
  setIsChecked: (isChecked: boolean) => void;
}

const CircularCheckBox: React.FC<CircularCheckBoxProps> = ({
  title,
  isTitleVisible = true,
  size = 18,
  isChecked,
  setIsChecked,
}) => {
  const handlePress = useCallback(() => {
    setIsChecked(!isChecked);
  }, [isChecked]);

  let tintColor = isChecked ? colors.white : colors.grayTertiary;

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View
        style={[
          styles.checkBox,
          isChecked ? styles.checked : styles.unchecked,
          size ? { width: size, height: size } : null,
        ]}
      >
        <Image
          style={styles.icon}
          source={CustomImages.tick}
          tintColor={tintColor}
        />
      </View>
      {isTitleVisible && <Text style={styles.title}>{title ?? "Skipped"}</Text>}
    </TouchableOpacity>
  );
};

export default memo(CircularCheckBox);

const styles = StyleSheet.create({
  unchecked: {
    borderColor: colors.grayTertiary,
  },
  title: {
    fontSize: 14,
    lineHeight: 16.8,
    fontFamily: CustomFont.Urbanist600,
    color: colors.secondaryLight,
  },
  checked: {
    backgroundColor: colors.primary,
  },
  icon: {
    width: 14,
    height: 10,
  },
  container: {
    flexDirection: "row",
    columnGap: 6,
    alignItems: "center",
  },
  checkBox: {
    width: 32,
    height: 32,
    borderRadius: 100,
    borderColor: colors.secondaryLight,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
