import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { colors } from "../constants/colors";

interface CustomSelectorProps {
  question: string;
  options: string[];
  onSelect: (selectedOption: string) => void; // Callback function to pass the selected option
  selectedOption: string;
}

const CustomSelector: React.FC<CustomSelectorProps> = ({
  question,
  options,
  onSelect,
  selectedOption,
}) => {
  console.log(selectedOption, "select");
  return (
    <View style={styles.card}>
      <Text style={styles.question}>{question ?? "Question?"}</Text>
      <View style={styles.optionsContainer}>
        {options.map((item, index) => (
          <View
            key={index}
            style={[
              styles.outerBox,
              selectedOption == item && { borderColor: colors.borderColor },
            ]}
          >
            <TouchableOpacity
              style={[
                styles.option,
                selectedOption == item && { backgroundColor: "#58A3A4" },
              ]}
              onPress={() => onSelect(item)} // Trigger callback with selected option
            >
              <Text
                style={[
                  styles.optionText,
                  selectedOption == item && {
                    color: "#fff",
                  },
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

export default CustomSelector;

const styles = StyleSheet.create({
  outerBox: {
    borderColor: "transparent",
    borderWidth: 4,
    borderRadius: 56,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    margin: 16,
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  optionsContainer: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderColor: "rgba(102, 112, 115, 0.15)",
    borderWidth: 1,
    borderRadius: 56,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#4caf50",
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
    color: "#555",
  },
});
