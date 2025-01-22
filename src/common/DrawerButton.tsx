import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ViewStyle,
  TextStyle,
  ImageSourcePropType,
  ImageStyle,
  TouchableOpacity,
} from "react-native";
import CustomFont from "../assets/fonts/customFonts";
import { colors } from "../constants/colors";

interface DrawerButtonProps {
  text?: string;
  onPress: () => void;
  icon?: ImageSourcePropType; // For handling images (local or remote)
  iconPosition?: "left" | "right"; // Icon position
  buttonStyle?: ViewStyle; // Custom button style
  textStyle?: TextStyle; // Custom text style
  iconStyle?: ImageStyle | ""; // Custom icon style
  isFocus?: boolean;
  outBoxStyle?: ViewStyle;
  customIconPosition?:"left" | "right";
  customIcon?: React.ReactNode
}

const DrawerButton: React.FC<DrawerButtonProps> = ({
  text,
  onPress,
  icon,
  iconPosition = "left",
  buttonStyle,
  textStyle,
  iconStyle,
  isFocus,
  outBoxStyle,
  customIcon,
  customIconPosition = "left",
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.outerBorderBox,
        isFocus && { borderColor: colors.primaryBlur },
        outBoxStyle,
      ]}
      onPress={onPress}
    >
      <View
        style={[
          styles.button,
          isFocus && { backgroundColor: colors.primaryLight },
          buttonStyle,
        ]}
      >
        {customIcon && customIconPosition === "left" && (
          customIcon
        )}

        {icon && iconPosition === "left" && (
          <Image source={icon} style={[styles.icon, iconStyle]} />
        )}
        {text && (
          <Text style={[styles.text, isFocus && { color: "white" }, textStyle]}>
            {text}
          </Text>
        )}

        {icon && iconPosition === "right" && (
          <Image source={icon} style={[styles.icon, iconStyle]} />
        )}
        {customIcon && customIconPosition === "right" && (
          customIcon
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  outerBorderBox: {
    borderWidth: 4,
    borderColor: "transparent",
    borderRadius: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 13,
    backgroundColor: colors.white,
    borderRadius: 48,
  },
  text: {
    color: colors.primary,
    fontSize: 18,
    fontFamily: CustomFont.Urbanist600,
    marginHorizontal: 5,
    lineHeight: 21.6,
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default DrawerButton;
