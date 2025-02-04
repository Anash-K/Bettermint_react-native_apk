import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { colors } from "../constants/colors";
import CustomFont from "../assets/fonts/customFonts";

// Define the type for the options array item (each option in the list)
interface EmotionOption {
  id: number;
  src: any; // `require` or image URI, so `any` is appropriate here
}

// Define the props for the CustomEmotionSelector component
interface CustomSelectorProps {
  question: string;
  options: EmotionOption[]; // Array of EmotionOption
  onSelect: (selectedOption: string) => void; // Callback function to pass the selected option
  selectedOption: string;
  outerCardStyle?: ViewStyle;
  questionStyle?: TextStyle;
  optionContainer?: ViewStyle;
  outerBorderBoxStyle?: ViewStyle;
  buttonStyle?: ViewStyle;
  optionStyle?: TextStyle;
}

const CustomEmotionSelector: React.FC<CustomSelectorProps> = ({
  question,
  options = [], // Default to empty array if options are not provided
  onSelect,
  selectedOption,
  outerCardStyle,
  questionStyle,
  optionContainer,
  outerBorderBoxStyle,
  buttonStyle,
  optionStyle,
}) => {
  return (
    <View style={[styles.card, outerCardStyle]}>
      <Text style={[styles.question, questionStyle]}>
        {question ?? "Question?"}
      </Text>
      <View style={[styles.optionsContainer, optionContainer]}>
          {options.map((item) => (
            <View key={item.id} style={styles.optionItem}>
              <Image
                source={item.src}
                style={styles.imageStyle}
              />
            </View>
          ))}
      </View>
    </View>
  );
};

export default CustomEmotionSelector;


const styles = StyleSheet.create({
  scrollViewContent: {
    paddingVertical: 10, // optional padding
  },
  optionItem: {
    alignItems: "center", // center the items
  },
  imageStyle: {
    width: 40,
    height: 40,
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
    justifyContent: "center",
    columnGap: 20,
    paddingHorizontal: 8,
    rowGap: 6,
    alignItems:'center',
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
