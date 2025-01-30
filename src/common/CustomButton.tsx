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

interface CustomButtonProps {
  text?: string;
  onPress: () => void;
  icon?: ImageSourcePropType; // For handling images (local or remote)
  iconPosition?: "left" | "right"; // Icon position
  buttonStyle?: ViewStyle | ViewStyle[]; // Custom button style
  textStyle?: TextStyle | TextStyle[]; // Custom text style
  iconStyle?:ImageStyle | ImageStyle[] | ""; // Custom icon style
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onPress,
  icon,
  iconPosition = "left",
  buttonStyle,
  textStyle,
  iconStyle,
}) => {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      {icon && iconPosition === "left" && (
        <Image source={icon} style={[styles.icon, iconStyle]} />
      )}
      {text && <Text style={[styles.text, textStyle]}>{text}</Text>}

      {icon && iconPosition === "right" && (
        <Image source={icon} style={[styles.icon, iconStyle]} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 13,
    backgroundColor: colors.primary,
    borderRadius: 48,
  },
  text: {
    color: colors.white,
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

export default CustomButton;
