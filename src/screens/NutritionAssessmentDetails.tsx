import { StyleSheet, Text, View } from "react-native";
import CustomSelector from "../common/CustomSelector";
import { useCallback, useState } from "react";

const NutritionAssessmentDetails = () => {
  const dataArray = ["15", "16", "17", "18", "19"];
  const initialState = {
    ofterYouEat: "0",
  };
  const [nutritionInfo, setNutritionInfo] = useState(initialState);
  const handleOptionSelect = useCallback(
    ({ fieldName, text }) => {
      console.log(text);
      setNutritionInfo((prevState) => ({
        ...prevState,
        [fieldName]: text,
      }));
    },
    [nutritionInfo]
  );
  return (
    <View style={styles.container}>
      <Text> Nutrition Assessment Details </Text>
      <CustomSelector
        question="What is your favorite color?"
        options={dataArray}
        onSelect={
          (text) => handleOptionSelect({ fieldName: "ofterYouEat", text }) // Pass fieldName and selected text
        }
        selectedOption={nutritionInfo.ofterYouEat}
      />
    </View>
  );
};

export default NutritionAssessmentDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
