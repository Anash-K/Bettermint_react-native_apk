import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import FastImage from "react-native-fast-image";
import { CustomImages } from "../assets/CustomImages";
import { colors } from "../constants/colors";
import CustomFont from "../assets/fonts/customFonts";

interface SelectDropdownInputType {
  options: string[] | any;
  onChange: any;
  suffix?:string;
}

const SelectDropdownInput: React.FC<SelectDropdownInputType> = memo(
  ({ options, onChange ,suffix}) => {
    return (
      <View style={styles.container}>
        <SelectDropdown
          data={options ? options : []}
          defaultValueByIndex={0}
          dropdownOverlayColor="transparent"
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index, "selectinput");
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
                  {selectedItem?.title ?? "Select"}{suffix}
                </Text>
                <FastImage
                  source={CustomImages.calenderArrow}
                  style={[
                    styles.dropdownButtonArrowStyle,
                    isOpened && { transform: [{ rotate: "90deg" }] },
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
    marginTop: 5,
  },
  dropdownItemStyle: {
    backgroundColor: colors.borderColor,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  dropdownItemTxtStyle: {
    fontSize: 14,
    lineHeight: 16.8,
    fontFamily: CustomFont.Urbanist500,
  },
  dropdownFocusItemTxtStyle: {},
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
