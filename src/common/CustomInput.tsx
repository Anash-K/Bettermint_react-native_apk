import React, { memo, useCallback, useState } from "react";
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
import FastImage from "react-native-fast-image";
import SelectDropdown from "react-native-select-dropdown";
// import PhoneInput from "react-native-phone-number-input";
import PhoneInput, { ICountry } from "react-native-international-phone-number";
import { colors } from "../constants/colors";
import { CustomImages } from "../assets/CustomImages";
import CustomFont from "../assets/fonts/customFonts";

interface CustomInputProps {
  value?: string | null ;
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
  isDropDown?: boolean;
  dropdownItems?: any[];
  onFocusAction?: () => void;
  onBlurAction?: () => void;
  isPhoneNumber?: boolean;
  OnCountryChange?: (country: ICountry) => void;
  selectedCountry?: any;
}

const CustomInput: React.FC<CustomInputProps> = memo(({
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
  isDropDown,
  dropdownItems,
  onFocusAction,
  onBlurAction,
  OnCountryChange,
  selectedCountry,
}) => {
  const [isSecure, setIsSecure] = useState(true);
  const [textInputFocused, setTextInputFocused] = useState(false);
  const [dropDownFocused, setDropDownFocused] = useState(false);


  const handleTextInputFocus = useCallback(() => {
    setTextInputFocused(true);
    setDropDownFocused(false);
  }, [textInputFocused, dropDownFocused]);

  const handleDropDownFocus = useCallback(() => {
    setDropDownFocused(true);
    setTextInputFocused(false);
  }, [textInputFocused, dropDownFocused]);

  const handleBlur = useCallback(() => {
    console.log("blur");
    setTextInputFocused(false);
    setDropDownFocused(false);
  }, [textInputFocused, dropDownFocused]);

  const toggleSecurity = useCallback(() => {
    setIsSecure(!isSecure);
  }, [isSecure]);

  return (
    <View style={[styles.container, inputBoxStyle]}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{label}</Text>
        <View
          style={[
            styles.inputBox,
            textInputFocused || dropDownFocused
              ? styles.focusInputBox
              : { borderColor: "transparent" },
          ]}
        >
          {isPhoneInput ? (
            <PhoneInput
              onChangePhoneNumber={onChange}
              selectedCountry={selectedCountry}
              value={value ?? ""}
              onChangeSelectedCountry={OnCountryChange as any}
              onFocus={handleTextInputFocus}
              placeholder={placeholderText ?? "Enter Phone Number"}
              placeholderTextColor="rgba(102, 112, 115, 0.5)"
              phoneInputStyles={{
                container: [
                  styles.phoneInputBox,
                  textInputFocused && styles.focusBorder,
                ],
                flagContainer: styles.flagContainerStyle,
                divider: { backgroundColor: "rgba(197, 200, 201, 0.25)" },
                caret: styles.caretStyle,
                callingCode: styles.callingCode,
                input: [styles.callingCode, styles.inputPhoneText],
                flag: styles.flagStyle,
              }}
              style={styles.inputTextPhone}
              defaultValue="+91"
              keyboardType="phone-pad"
            />
          ) : (
            <>
              {!isDropDown ? (
                <TextInput
                  style={[
                    styles.input,
                    isPassword && { paddingRight: 50 },
                    textInputFocused && styles.focusBorder,
                    inputStyle,
                  ]}
                  placeholder={placeholderText}
                  onFocus={onFocusAction ?? handleTextInputFocus}
                  placeholderTextColor={colors.gray}
                  onBlur={onBlurAction ?? handleBlur}
                  secureTextEntry={isPassword && isSecure}
                  editable={!isDisabled}
                  autoCapitalize="none"
                  autoCorrect={false}
                  multiline={false}
                  numberOfLines={1}
                  textAlign="left"
                  {...inputConfigurations}
                />
              ) : (
                <SelectDropdown
                  data={dropdownItems ? dropdownItems : []}
                  dropdownOverlayColor="transparent"
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                    onChange(selectedItem);
                  }}
                  renderButton={(selectedItem, isOpened) => {
                    return (
                      <View style={[styles.dropDownBoxInnerContainer]}>
                        <Text
                          style={[
                            styles.SelectInputText,
                            !selectedItem?.title && styles.SelectInputTextEmpty,
                          ]}
                        >
                          {selectedItem?.title ?? "Select your gender"}
                        </Text>
                        <FastImage
                          source={CustomImages.blackDropDownIcon}
                          style={[
                            styles.dropdownButtonArrowStyle,
                            isOpened && { transform: [{ rotate: "180deg" }] },
                          ]}
                          resizeMode="contain"
                        />
                      </View>
                    );
                  }}
                  renderItem={(item, index, isSelected) => {
                    return (
                      <View
                        style={{
                          ...styles.dropdownItemStyle,
                        }}
                      >
                        <Text
                          style={[
                            styles.dropdownItemTxtStyle,
                            isSelected && styles.dropdownFocusItemTxtStyle,
                          ]}
                        >
                          {item.title}
                        </Text>
                      </View>
                    );
                  }}
                  showsVerticalScrollIndicator={false}
                  dropdownStyle={styles.dropDown}
                />
              )}
            </>
          )}

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
                tintColor={"#C9C7C5"}
                style={[
                  styles.iconEye,
                  !isSecure && { width: 18, marginRight: 8 },
                  iconStyle,
                ]}
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
});

export default CustomInput;

const styles = StyleSheet.create({
  flagStyle: {
    // resizeMode: "cover",
  },
  inputPhoneText: {
    padding: 0,
    textAlign: "left",
  },
  callingCode: {
    fontFamily: CustomFont.Urbanist400,
    fontSize: 16,
    lineHeight: 19.2,
    color: colors.secondary,
  },
  caretStyle: {
    color: "rgba(197, 200, 201, 1)",
    width: 14,
    height: 12,
  },
  flagContainerStyle: {
    borderTopLeftRadius: 54,
    borderBottomLeftRadius: 54,
    backgroundColor: colors.white,
  },
  phoneInputBox: {
    borderWidth: 1,
    borderRadius: 54,
    borderColor: colors.commonInputBorderColor,
    backgroundColor: colors.white,
  },
  inputTextPhone: {
    flex:1,
    fontFamily: CustomFont.Urbanist400,
    fontSize: 16,
    lineHeight: 19.2,
    color: colors.secondary,
    paddingHorizontal: 10,
  },
  focusBorder: { borderColor: colors.primary },
  phoneInputContainer: {
    borderWidth: 1,
    borderRadius: 54,
    borderColor: colors.commonInputBorderColor,
    backgroundColor: colors.white,
    width: "100%",
  },
  phoneTextContainer: {
    padding: 0,
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: 54,
  },
  phoneTextInput: {
    backgroundColor: "colors.white",
  },
  dropdownFocusItemTxtStyle: {
    backgroundColor: colors.appBackground,
    color: colors.primary,
    fontFamily: CustomFont.Urbanist600,
  },
  SelectInputTextEmpty: {
    color: "rgba(102, 112, 115, 0.5)",
  },
  dropdownItemStyle: {},
  dropdownItemTxtStyle: {
    fontFamily: CustomFont.Urbanist400,
    fontSize: 16,
    lineHeight: 19.2,
    color: colors.secondary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  dropdownButtonArrowStyle: {
    width: 18,
    height: 16,
  },
  SelectInputText: {
    fontFamily: CustomFont.Urbanist400,
    fontSize: 16,
    lineHeight: 19.2,
    color: colors.secondary,
  },
  dropDown: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    marginTop: 8,
    borderColor: "rgba(28, 101, 124, 0.15)",
    borderWidth: 1,
    shadowColor: "transparent",
  },
  dropDownBoxInnerContainer: {
    fontFamily: CustomFont.Urbanist400,
    fontSize: 16,
    lineHeight: 19.2,
    color: colors.secondary,
    borderWidth: 1,
    borderRadius: 54,
    borderColor: colors.commonInputBorderColor,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    textAlignVertical: "center",
    paddingVertical: 14.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputBox: {
    borderWidth: 4,
    borderRadius: 54,
  },
  focusInputBox: {
    borderColor: colors.primaryBlur,
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
  container: {
    marginVertical: 7,
  },
  input: {
    fontFamily: CustomFont.Urbanist400,
    fontSize: 16,
    lineHeight: 19.2,
    color: colors.secondary,
    borderWidth: 1,
    borderRadius: 54,
    borderColor: colors.commonInputBorderColor,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    textAlignVertical: "center",
    paddingVertical: Platform.select({ ios: 14.5 }),
  },
  disabledInputContentStyle: {},
  inputContent: {},
  label: {
    fontFamily: CustomFont.Urbanist600,
    lineHeight: 16.8,
    fontSize: 14,
    color: colors.primary,
    marginBottom: 5,
  },
  iconEye: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  passwordButton: {
    marginRight: 20,
  },
  pressableButton: {
    position: "absolute",
    top: "50%",
    right: 12,
    transform: [{ translateY: -12 }],
  },
  pressed: {
    opacity: 0.7,
  },
  inputContainer: {},
});
