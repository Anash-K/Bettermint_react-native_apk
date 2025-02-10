import React, { memo } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  FlatList,
} from "react-native";
import { colors } from "../constants/colors";
import CustomFont from "../assets/fonts/customFonts";

interface CustomOptions {
  startingNumber: number;
  endingNumber: number;
}

interface CustomSelectorProps {
  question: string;
  options?: string[];
  onSelect: (selectedOption: string) => void; // Callback function to pass the selected option
  selectedOption: string;
  outerCardStyle?: ViewStyle;
  questionStyle?: TextStyle;
  optionContainer?: ViewStyle;
  outerBorderBoxStyle?: ViewStyle;
  buttonStyle?: ViewStyle;
  optionStyle?: TextStyle;
  CustomOptions?: CustomOptions;
}

interface CustomOptionsComponent {
  customOptions: number | undefined;
  selectedOption: string;
  item: string;
  buttonStyle: ViewStyle | undefined;
  onSelect: (text: string) => void;
  optionStyle: TextStyle | undefined;
  outerBorderBoxStyle: ViewStyle | undefined;
}

const CustomOptionsComponent = ({
  customOptions,
  selectedOption,
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
        selectedOption == item && styles.focusBox,
        outerBorderBoxStyle,
      ]}
    >
      <TouchableOpacity
        style={[
          styles.option,
          !customOptions && styles.textOption,
          selectedOption == item && styles.buttonFocus,
          buttonStyle,
        ]}
        onPress={() => onSelect(item)} // Trigger callback with selected option
      >
        <Text
          style={[
            styles.optionText,
            selectedOption == item && styles.textFocus,
            optionStyle,
          ]}
        >
          {item}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const CustomSelector: React.FC<CustomSelectorProps> = ({
  question,
  options = [],
  onSelect,
  selectedOption,
  outerCardStyle,
  questionStyle,
  optionContainer,
  outerBorderBoxStyle,
  buttonStyle,
  optionStyle,
  CustomOptions,
}) => {
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
  return (
    <View style={[styles.card, outerCardStyle]}>
      <Text style={[styles.question, questionStyle]}>
        {question ?? "Question?"}
      </Text>
      <View style={[styles.optionsContainer, optionContainer]}>
        <FlatList
          data={generatedOptions}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={[styles.optionsContainer, optionContainer]}
          horizontal={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <CustomOptionsComponent
              customOptions={CustomOptions?.startingNumber}
              optionStyle={optionStyle}
              outerBorderBoxStyle={outerBorderBoxStyle}
              selectedOption={selectedOption}
              buttonStyle={buttonStyle}
              onSelect={onSelect}
              item={item}
            />
          )}
        />
      </View>
    </View>
  );
};

export default CustomSelector;

const styles = StyleSheet.create({
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
    borderColor: colors.borderColor,
  },
  outerBox: {
    borderColor: "transparent",
    borderWidth: 3,
    borderRadius: 56,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: colors.gray,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    margin: 8,
    marginHorizontal: 16,
    paddingVertical: 24,
  },
  question: {
    fontSize: 18,
    lineHeight: 21.6,
    fontFamily: CustomFont.Urbanist700,
    marginBottom: 24,
    color: colors.primary,
    textAlign: "center",
    paddingHorizontal: 16,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    columnGap: 8,
    paddingHorizontal: 8,
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
