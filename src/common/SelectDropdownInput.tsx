import React, { memo } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import FastImage from "react-native-fast-image";
import { CustomImages } from "../assets/CustomImages";
import { colors } from "../constants/colors";
import CustomFont from "../assets/fonts/customFonts";
import { useCustomStyle } from "../constants/CustomStyles";

interface SelectDropdownInputType {
  options: string[] | any;
  onChange: any;
  suffix?: string;
  SelectedTextStyle?: StyleProp<TextStyle>;
  SelectBoxStyle?: StyleProp<ViewStyle>;
  isDisabled?: boolean;
}

const SelectDropdownInput: React.FC<SelectDropdownInputType> = memo(
  ({
    options,
    onChange,
    suffix,
    SelectedTextStyle,
    SelectBoxStyle,
    isDisabled = false,
  }) => {
    const { CommonCardShadow } = useCustomStyle();
    return (
      <View style={styles.container}>
        <SelectDropdown
          data={options ? options : []}
          defaultValueByIndex={0}
          disabled={isDisabled}
          dropdownOverlayColor="transparent"
          onSelect={(selectedItem, index) => {
            onChange(selectedItem);
          }}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={[styles.dropDownBoxInnerContainer, SelectBoxStyle]}>
                <Text
                  style={[
                    styles.SelectInputText,
                    !selectedItem?.title && styles.SelectInputTextEmpty,
                    SelectedTextStyle && SelectedTextStyle,
                  ]}
                >
                  {selectedItem?.title ?? "Select"}
                  {suffix}
                </Text>
                <FastImage
                  source={CustomImages.calenderArrow}
                  style={[
                    styles.dropdownButtonArrowStyle,
                    isOpened && { transform: [{ rotate: "90deg" }] },
                  ]}
                  tintColor={isDisabled ? colors.secondaryLight : ""}
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
      </View>
    );
  }
);

export default SelectDropdownInput;

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
  },
  dropDown: {
    borderRadius: 12,
    padding: 5,
    marginTop: 8,
    minWidth: 163,
    backgroundColor: colors.white,
    // iOS shadow properties
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2, // Adjusted for a softer look
    shadowRadius: 6, // Increased for a more natural shadow

    // Android elevation
    elevation: 5,

    // Prevents shadow clipping
    overflow: "visible",
  },
  dropdownItemStyle: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: colors.white,
  },
  dropdownItemTxtStyle: {
    fontSize: 16,
    lineHeight: 19.2,
    fontFamily: CustomFont.Urbanist500,
    color: colors.secondaryLight,
  },
  dropdownFocusItemTxtStyle: {
    color: colors.primary,
  },
  dropdownButtonArrowStyle: {
    width: 18,
    height: 16,
    transform: [{ rotate: "-90deg" }],
  },
  SelectInputText: {
    fontSize: 14,
    lineHeight: 16.8,
    fontFamily: CustomFont.Urbanist600,
    color: colors.primary,
  },
  dropDownBoxInnerContainer: {
    backgroundColor: colors.menuTabBackground,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    columnGap: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 31,
  },
  SelectInputTextEmpty: {},
});
