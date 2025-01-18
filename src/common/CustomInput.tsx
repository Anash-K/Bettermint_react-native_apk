import React, { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  ImageSourcePropType,
  TextStyle,
  ImageStyle,
  TextInputProps,
  Platform,
  TextInput,
} from "react-native";
import { CustomImages } from "../assets/CustomImages";
import CustomFont from "../assets/fonts/customFonts";
import { colors } from "../constants/colors";

interface CustomInputProps {
  value?: string;
  inputConfigurations?: TextInputProps;
  labelStyle?: TextStyle;
  inputBoxStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  label?: string;
  onChange: (text: string) => void;
  isPassword?: boolean;
  isPhoneInput?: boolean;
  placeholderText?: string;
  handleIconAction?: () => void;
  showIcon?: boolean;
  iconSource?: ImageSourcePropType;
  iconStyle?: ImageStyle;
  customPressableStyle?: ViewStyle;
  customInputContentStyle?: ViewStyle;
  isDisabled?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  value,
  inputConfigurations,
  labelStyle,
  inputBoxStyle,
  inputStyle,
  label,
  onChange,
  isPassword,
  isPhoneInput,
  placeholderText,
  handleIconAction,
  showIcon,
  iconSource,
  iconStyle,
  customPressableStyle,
  customInputContentStyle,
  isDisabled = false,
}) => {
  const [isSecure, setIsSecure] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const toggleSecurity = () => {
    setIsSecure(!isSecure);
  };

  const InputStyle = isDisabled ? styles.disabledInputStyle : styles.input;
  const InputContentStyle = isDisabled
    ? styles.disabledInputContentStyle
    : styles.inputContent;

  return (
    <View style={[styles.container, inputBoxStyle]}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{label}</Text>
        <View>
          <TextInput
            style={[styles.input, isFocused && styles.focusInput, inputStyle]}
            placeholder={placeholderText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            secureTextEntry={isPassword && isSecure}
            editable={!isDisabled}
            {...inputConfigurations}
          />

          {isPassword && (
            <Pressable
              onPress={toggleSecurity}
              style={({ pressed }) => [
                styles.pressableButton,
                customPressableStyle,
                pressed && styles.pressed,
              ]}
            >
              <Image
                source={
                  isSecure ? CustomImages.secureEye : CustomImages.unSecureEye
                }
                style={[styles.iconEye, !isSecure && { width: 18 }, iconStyle]}
                resizeMode="contain"
              />
            </Pressable>
          )}

          {showIcon && (
            <Pressable
              onPress={handleIconAction}
              style={({ pressed }) => [
                styles.pressableButton,
                customPressableStyle,
                pressed && styles.pressed,
              ]}
            >
              <Image
                source={iconSource}
                style={[styles.iconEye, iconStyle]}
                resizeMode="contain"
              />
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  focusInput: {
    shadowColor: "rgba(28, 101, 124, 0.2)",
    shadowOffset: { width: 2, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 54, 
    elevation: 2,
  },
  openEyeStyle: {
    width: 19,
    marginRight: 22,
  },
  disabledInputStyle: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#38393E",
    backgroundColor: "#18171C",
    paddingLeft: 2,
    borderRadius: 12,
    paddingVertical: Platform.select({ ios: 3, android: 2 }),
    height: 56,
    marginBottom: 17,
  },
  outlineInput: {
    borderRadius: 10,
    borderColor: "rgba(56, 57, 62, 1)",
    borderWidth: 1,
    // fontFamily: CustomFont.Urbanist400,
  },
  container: {
    marginVertical: 10,
  },
  input: {
    fontFamily: CustomFont.Urbanist400,
    fontSize: 16,
    lineHeight: 19.2,
    color: colors.secondary,
    borderWidth: 1,
    borderRadius: 54,
    borderColor: colors.primary,
    height: 48,
  },
  disabledInputContentStyle: {},
  inputContent: {},
  label: {
    fontFamily: CustomFont.Urbanist600,
    lineHeight: 16.8,
    fontSize: 14,
    color: colors.primary,
  },
  iconEye: {
    width: 24,
    height: 24,
    marginRight: 19,
  },
  passwordButton: {
    marginRight: 19,
  },
  pressableButton: {
    position: "absolute",
    top: "50%",
    right: 12,
    transform: [{ translateY: -19 }],
  },
  pressed: {
    opacity: 0.7,
  },
  inputContainer: {},
});
