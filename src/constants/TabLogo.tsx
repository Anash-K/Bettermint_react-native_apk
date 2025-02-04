import React, { memo } from "react";
import { Platform, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import FastImage, { FastImageProps } from "react-native-fast-image";
import { CustomImages } from "../assets/CustomImages";
import { colors } from "./colors";
import CustomFont from "../assets/fonts/customFonts";

interface TabLogoType {
  Boxstyle?: ViewStyle | ViewStyle[];
  title?: string;
  isLogo?: boolean;
  titleStyle? : TextStyle| TextStyle[];
}

const TabLogo: React.FC<TabLogoType> = memo(({ Boxstyle, title, isLogo ,titleStyle }) => {
  return (
    <View style={[styles.container, Boxstyle]}>
      {title && <Text style={[styles.title,titleStyle]}>{title}</Text>}
      {isLogo && (
        <FastImage source={CustomImages.TabLogo} style={styles.imageStyle} />
      )}
    </View>
  );
});

export default TabLogo;

const styles = StyleSheet.create({
  title: {
    fontFamily: CustomFont.Urbanist800,
    fontSize: 24,
    lineHeight: 28.8,
    textAlign: "center",
    color: colors.white,
  },
  container: {
    justifyContent: "center",
    backgroundColor: colors.primary,
    height: Platform.select({ ios: 150, android: 150 }),
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
    alignItems: "center",
  },
  imageStyle: {
    width: 187,
    height: 34,
    marginTop: Platform.select({ ios: 10 }),
  },
});
