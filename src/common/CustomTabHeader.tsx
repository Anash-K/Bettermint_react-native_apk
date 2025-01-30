import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageStyle,
  Image,
  ViewStyle,
} from "react-native";
import FastImage from "react-native-fast-image";
import { colors } from "../constants/colors"; // Import colors from your project
import CustomFont from "../assets/fonts/customFonts";
import { useCustomStyle } from "../constants/CustomStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
  leftIconStyle?: ImageStyle | ImageStyle[];
  rightIconStyle?: ImageStyle | ImageStyle[];
  leftButtonStyle?: ViewStyle | ViewStyle[];
  rightButtonStyle?: ViewStyle | ViewStyle[];
}
const CustomTabHeader: React.FC<CustomHeaderProps> = ({
  title,
  leftIcon,
  leftComponent,
  rightComponent,
  rightIcon,
  onLeftPress,
  onRightPress,
  style,
  titleStyle,
  leftIconStyle = [], // Ensure it's an array
  rightIconStyle = [],
  rightButtonStyle,
  leftButtonStyle,
}) => {
  const CustomStyle = useCustomStyle();

  return (
    <View style={styles.mainContainer}>
      <View style={[styles.container, CustomStyle.safeAreaMarginTop, style]}>
        {/* Left Section */}

        {leftComponent}
        {leftIcon && (
          <TouchableOpacity
            onPress={onLeftPress}
            style={[styles.leftIconContainer, leftButtonStyle]}
          >
            <Image
              source={leftIcon}
              style={[styles.icon, leftIconStyle]}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>
        )}

        {/* Title */}
        <Text style={[styles.title, titleStyle]}>{title}</Text>

        {/* Right Section */}

        {rightComponent}
        {rightIcon && (
          <TouchableOpacity
            onPress={onRightPress}
            style={[styles.rightIconContainer, rightButtonStyle]}
          >
            <Image
              source={rightIcon}
              style={[styles.icon, rightIconStyle]}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.primary,
    borderEndEndRadius: 25,
    borderBottomLeftRadius: 25,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 56,
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

export default CustomTabHeader;
