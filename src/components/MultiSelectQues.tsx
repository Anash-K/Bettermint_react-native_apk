import { StyleSheet, Text, View } from "react-native";
import React, { memo, useState } from "react";
import { useCustomStyle } from "../constants/CustomStyles";
import CustomFont from "../assets/fonts/customFonts";
import { colors } from "../constants/colors";
import FastImage from "react-native-fast-image";
import { CustomImages } from "../assets/CustomImages";
import DrawerButton from "../common/DrawerButton";
import WhiteDot from "../common/WhiteDotBtn";

interface MultiSelectQuesProps<T extends Record<string, boolean>> {
  Question: string;
  optionsList: (keyof T)[]; // Array of option keys
  initialState: T; // Initial state with options
  isMultiSelect?: boolean; // Controls selection behavior
  GetSelectedValues: (values: T) => void;
}

const MultiSelectQues = <T extends Record<string, boolean>>({
  Question,
  optionsList,
  initialState,
  isMultiSelect = true, // Default: Multi-select enabled
  GetSelectedValues,
}: MultiSelectQuesProps<T>) => {
  const CustomStyle = useCustomStyle();
  const [selectedOptions, setSelectedOptions] = useState<T>(initialState);

  const handlePress = (option: keyof T) => {
    setSelectedOptions((prevState) => {
      if (isMultiSelect) {
        // Multi-select: Toggle selection
        return { ...prevState, [option]: !prevState[option] };
      } else {
        // Single-select: Reset all except the selected option
        const updatedState = Object.fromEntries(
          Object.keys(prevState).map((key) => [key, key === option])
        ) as T; // Explicitly cast as T
        GetSelectedValues(updatedState);

        return updatedState;
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={CustomStyle.title}>{Question ?? "Question ?"}</Text>
      {isMultiSelect ? (
        <View style={styles.multiSelectBox}>
          <FastImage
            source={CustomImages.multiSelect}
            style={styles.multiSelect}
          />

          <Text style={styles.subTitle}>Multi-select</Text>
        </View>
      ) : null}

      <View style={styles.radioButtonBox}>
        {optionsList.map((optionText) => (
          <DrawerButton
            key={optionText as string}
            text={optionText as string}
            buttonStyle={styles.commonButtonStyle}
            textStyle={styles.btnText}
            customIcon={<WhiteDot isFocus={!!selectedOptions[optionText]} />}
            onPress={() => handlePress(optionText)}
            customIconPosition="right"
            isFocus={selectedOptions[optionText]}
          />
        ))}
      </View>
    </View>
  );
};

export default memo(MultiSelectQues);

const styles = StyleSheet.create({
  buttonStyle: {
    // marginBottom: width < 400 ? Platform.select({ android: 40 }): '',
  },
  contentStyle: {
    flexGrow: 1,
  },
  multiSelectBox: {
    flexDirection: "row",
    columnGap: 8,
    justifyContent: "center",
    marginTop: 24,
  },
  multiSelect: {
    width: 18,
    height: 18,
  },
  subTitle: {
    fontFamily: CustomFont.Urbanist700,
    fontSize: 18,
    lineHeight: 21.6,
    color: colors.secondaryLight,
  },
  radioButtonBox: {
    rowGap: 9,
    marginTop: 48,
    flex: 1,
    marginBottom: 48,
  },
  btnText: {
    fontSize: 16,
    fontFamily: CustomFont.Urbanist700,
  },
  container: {
    flex: 1,
  },
  commonButtonStyle: {
    width: "100%",
    justifyContent: "space-between",
    paddingVertical: 18.5,
    paddingRight: 18,
    // iOS Shadow
    shadowColor: "rgba(28, 101, 124, 0.2)",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // Android Shadow
    elevation: 5,
  },
});
