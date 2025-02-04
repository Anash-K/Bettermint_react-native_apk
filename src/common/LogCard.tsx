import React, { memo } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";
import FastImage, { FastImageProps } from "react-native-fast-image";
import CustomFont from "../assets/fonts/customFonts";
import { CustomImages } from "../assets/CustomImages";

interface LogCardType {
  IconSrc: any;
  Title: string;
  color?: string;
  iconBoxColor: string;
  OnClick:() => void;
}

const LogCard: React.FC<LogCardType> = memo(
  ({ IconSrc, Title, color, iconBoxColor,OnClick }) => {
    return (
      <Pressable style={styles.container} onPress={OnClick}>
        <View style={[styles.iconBox, { backgroundColor: iconBoxColor }]}>
          <Image source={IconSrc} style={styles.iconStyle} tintColor={color} />
        </View>
        <View style={styles.rightPart}>
          <View style={styles.titleContent}>
            <Text style={styles.title}>{Title}</Text>
            <Text style={styles.contentText}>Add Log</Text>
          </View>
          <Image
            source={CustomImages.blackDropDownIcon}
            style={styles.forwardArrow}
            resizeMode="contain"
            tintColor={colors.primary}
          />
        </View>
      </Pressable>
    );
  }
);

export default LogCard;

const styles = StyleSheet.create({
  titleContent: {
    flex: 1,
    rowGap:8
  },
  rightPart: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  forwardArrow: {
    width: 20,
    height: 10,
    transform: [{ rotateZ: "-90deg" }],
  },
  contentText: {
    fontFamily: CustomFont.Urbanist600,
    fontSize: 16,
    lineHeight: 19.2,
    color: colors.secondaryLight,
  },
  iconBox: {
    padding: 20,
    borderRadius: 20,
  },
  iconStyle: {
    width: 24,
    height: 24,
  },
  container: {
    backgroundColor: colors.white,
    borderRadius: 30,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 16,
    marginVertical:8
  },
  title: {
    fontFamily: CustomFont.Urbanist700,
    fontSize: 20,
    lineHeight: 24,
    color: colors.primary,
  },
});
