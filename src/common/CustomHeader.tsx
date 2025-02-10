import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomFont from "../assets/fonts/customFonts";
import { colors } from "../constants/colors";
import { useCustomStyle } from "../constants/CustomStyles";

interface CustomHeaderProps {
  title?: string;
  leftIcon?: any;
  rightIcon?: any;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  style?: object;
  titleStyle?: object;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title = "Header",
  leftIcon,
  leftComponent,
  rightComponent,
  rightIcon,
  onLeftPress,
  onRightPress,
  style,
  titleStyle,
}) => {
  const CustomStyle = useCustomStyle();
  const { top } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { marginTop: top }, style]}>
      {leftComponent}
      {/* Left Icon */}
      <TouchableOpacity onPress={onLeftPress} style={styles.leftIconContainer}>
        {leftIcon && (
          <FastImage
            source={leftIcon}
            style={styles.icon}
            resizeMode={FastImage.resizeMode.contain}
          />
        )}
      </TouchableOpacity>

      {/* Title */}
      <Text style={[styles.title, titleStyle]}>{title}</Text>

      {/* Right Icon */}
      <TouchableOpacity
        onPress={onRightPress}
        style={styles.rightIconContainer}
      >
        {rightIcon && (
          <FastImage
            source={rightIcon}
            style={styles.icon}
            resizeMode={FastImage.resizeMode.contain}
          />
        )}
      </TouchableOpacity>

      {rightComponent}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: 'colors.appBackground', // Customize as needed
    columnGap: 12,
  },
  leftIconContainer: {
    position: "absolute",
    left: 16,
  },
  rightIconContainer: {
    position: "absolute",
    right: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
  title: {
    fontFamily: CustomFont.Urbanist700,
    fontSize: 20,
    lineHeight: 24,
    color: colors.primary,
    textAlign: "left",
    flex: 1,
  },
});

export default CustomHeader;
