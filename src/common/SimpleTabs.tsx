import React, { memo } from "react";
import {
  Image,
  ImageProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FastImage, { FastImageProps } from "react-native-fast-image";
import { colors } from "../constants/colors";
import { CustomImages } from "../assets/CustomImages";
import CustomFont from "../assets/fonts/customFonts";

interface SimpleTabsType {
  tabIcon: ImageProps;
  actionText?: string;
  title: string;
  HandlePress?:() => void;
}

const SimpleTabs: React.FC<SimpleTabsType> = memo(
  ({ title, tabIcon, actionText = "Edit" ,HandlePress}) => {
    return (
      <TouchableOpacity style={styles.container} onPress={HandlePress}>
        <Image
          source={tabIcon}
          style={styles.tabIcon}
          // tintColor={colors.secondary}
        />
        <Text style={[styles.commonText, styles.title]}>{title}</Text>
        <Text style={[styles.commonText, styles.editText]}>{actionText}</Text>
        <Image
          source={CustomImages.calenderArrow}
          style={styles.sideArrow}
          tintColor={colors.secondary}
        />
      </TouchableOpacity>
    );
  }
);

export default SimpleTabs;

const styles = StyleSheet.create({
  editText: {},
  commonText: {
    fontFamily: CustomFont.Urbanist400,
    lineHeight: 19.2,
    fontSize: 16,
    color: colors.secondary,
    marginLeft: 8,
  },
  title: {
    textTransform: "capitalize",
    flex: 1,
  },
  sideArrow: {
    width: 17,
    height: 25,
    transform: [{ rotateZ: "180deg" }],
    marginLeft:12
  },
  container: {
    flexDirection: "row",
    alignItems:'center',
    marginVertical:11
  },
  tabIcon: {
    width: 24,
    height: 24,
  },
});
