import React, { memo, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useCustomStyle } from "../constants/CustomStyles";
import CustomFont from "../assets/fonts/customFonts";
import { colors } from "../constants/colors";
import FastImage from "react-native-fast-image";
import { CustomImages } from "../assets/CustomImages";

interface CustomOptions {
  startingNumber: number;
  endingNumber: number;
}

interface CustomSelectorProps {
  question: string;
  options?: string[];
  onSelect: (selectedOption: string | string[]) => void; // Callback function to pass the selected option
  selectedOption: string;
  outerCardStyle?: ViewStyle;
  questionStyle?: TextStyle;
  optionContainer?: ViewStyle;
  outerBorderBoxStyle?: ViewStyle;
  buttonStyle?: ViewStyle;
  optionStyle?: TextStyle;
  CustomOptions?: CustomOptions;
  isMultiSelect?: boolean;
}

interface CustomOptionsComponent {
  isSelected: boolean;
  item: string;
  buttonStyle: ViewStyle | undefined;
  onSelect: () => void;
  optionStyle: TextStyle | TextStyle[] | undefined;
  outerBorderBoxStyle: ViewStyle | undefined;
}

const CustomOptionsComponent = ({
  isSelected,
  item,
  buttonStyle,
  onSelect,
  optionStyle,
  outerBorderBoxStyle,
}: CustomOptionsComponent) => {
  return (
    <View
      style={[
        styles.outerBox,
        isSelected && styles.focusBox,
        outerBorderBoxStyle,
      ]}
    >
      <TouchableOpacity
        style={[
          styles.option,
          styles.textOption,
          isSelected && styles.buttonFocus,
          buttonStyle,
        ]}
        onPress={onSelect} // Trigger callback with selected option
      >
        <Text
          style={[
            styles.optionText,
            isSelected && styles.textFocus,
            optionStyle,
          ]}
        >
          {item}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const CustomTextOptionSelector: React.FC<CustomSelectorProps> = ({
  question,
  options = [],
  onSelect,
  outerCardStyle,
  questionStyle,
  optionContainer,
  outerBorderBoxStyle,
  buttonStyle,
  optionStyle,
  CustomOptions,
  isMultiSelect = false,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  let generatedOptions: string[] = [];
  if (
    CustomOptions?.startingNumber !== undefined &&
    CustomOptions.endingNumber !== undefined
  ) {
    for (
      let i = CustomOptions.startingNumber;
      i <= CustomOptions.endingNumber;
      i++
    ) {
      generatedOptions.push(i.toString());
    }
  } else {
    generatedOptions = options;
  }

  const handleSelect = (item: string) => {
    if (isMultiSelect) {
      setSelectedOptions((prev) => {
        let newSelection;

        if (item === "None Of These") {
          // If "None Of These" is selected, deselect all others
          newSelection = prev.includes(item) ? [] : [item];
        } else {
          // If another option is selected, remove "None Of These" if present
          newSelection = prev.includes("None Of These")
            ? [item]
            : prev.includes(item)
            ? prev.filter((opt) => opt !== item)
            : [...prev, item];
        }
        return newSelection;
      });
    } else {
      setSelectedOptions([item]);
    }
  };

  useEffect(() =>{
    onSelect(selectedOptions)
  },[selectedOptions]);

  return (
    <View style={[styles.card, outerCardStyle]}>
      <Text style={[styles.question, questionStyle]}>
        {question ?? "Question?"}
      </Text>
      {isMultiSelect && (
        <View style={styles.multiSelectBox}>
          <FastImage
            source={CustomImages.multiSelect}
            style={styles.multiSelect}
          />
          <Text style={styles.subTitle}>Multi-select</Text>
        </View>
      )}
      <View style={[styles.optionsContainer, optionContainer]}>
        {generatedOptions.map((item, index) => (
          <CustomOptionsComponent
            key={index}
            item={item}
            isSelected={selectedOptions.includes(item)}
            onSelect={() => handleSelect(item)}
            buttonStyle={buttonStyle}
            optionStyle={optionStyle}
            outerBorderBoxStyle={outerBorderBoxStyle}
          />
        ))}
      </View>
    </View>
  );
};

export default CustomTextOptionSelector;

const styles = StyleSheet.create({
  subTitle: {
    fontFamily: CustomFont.Urbanist700,
    fontSize: 16,
    lineHeight: 19.2,
    color: colors.secondaryLight,
  },
  multiSelectBox: {
    flexDirection: "row",
    columnGap: 8,
    justifyContent: "center",
    marginBottom: 24,
    alignItems: "center",
  },
  multiSelect: {
    width: 16,
    height: 16,
  },
  textOption: {
    width: "auto",
    height: "auto",
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  textFocus: {
    color: "#fff",
  },
  buttonFocus: { backgroundColor: "#58A3A4" },
  focusBox: {
    borderColor: "rgba(88, 163, 164, 0.25)",
  },
  outerBox: {
    borderColor: "transparent",
    borderWidth: 3,
    borderRadius: 56,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    margin: 8,
    marginHorizontal: 16,
    paddingVertical: 24,
  },
  question: {
    fontSize: 20,
    lineHeight: 24,
    fontFamily: CustomFont.Urbanist700,
    marginBottom: 24,
    color: colors.primary,
    textAlign: "center",
    paddingHorizontal: 16,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    columnGap: 6,
    paddingHorizontal: 8,
    rowGap: 6,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "rgba(102, 112, 115, 0.15)",
    borderWidth: 1,
    borderRadius: 56,
    width: 43,
    height: 43,
    justifyContent: "center",
  },
  optionText: {
    fontSize: 16,
    fontFamily: CustomFont.Urbanist600,
    lineHeight: 16.8,
    color: "rgba(102, 112, 115, 0.5)",
    textAlign: "center",
  },
});
