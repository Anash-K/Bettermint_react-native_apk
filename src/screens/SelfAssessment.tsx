import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";

import { ScreenProps } from "../navigator/Stack";
import { useCustomStyle } from "../constants/CustomStyles";
import CustomSelector from "../common/CustomSelector";
import CustomTextOptionSelector from "../common/CustomTextOptionSelector";
import CustomButton from "../common/CustomButton";
export interface handleOptionSelectType {
  fieldName: string;
  text: string;
}

const SelfAssessment: React.FC<ScreenProps<"SelfAssessment">> = ({
  navigation,
}) => {
  const DiseasesOption = [
    "Diabetes / Prediabetes",
    "Cholesterol",
    "Blood Pressure",
    "Thyroid",
    "Fatty Liver",
  ];

  const FamilyHistory = [
    "Diabetes",
    "Blood Pressure",
    "Cholesterol",
    "Cancer",
    "Heart Attack",
  ];

  const initialState = {
    ofterYouEat: "0",
    youOrderFood: "0",
    litersOfWaterDrink: "0",
    chestSize: "0",
    waist: "0",
    hip: "0",
    thigh: "0",
    disease: "",
    familyHistory: "",
  };

  const [nutritionInfo, setNutritionInfo] = useState(initialState);
  const CustomStyle = useCustomStyle();

  const handleOptionSelect = useCallback(
    ({ fieldName, text }: handleOptionSelectType) => {
      setNutritionInfo((prevState) => ({
        ...prevState,
        [fieldName]: text,
      }));
    },
    [nutritionInfo]
  );

  const handlePress = useCallback(() => {
    navigation.navigate("AddingColorfullVeggies");
  }, []);

  return (
    <ScrollView style={[styles.container, CustomStyle.safeAreaMarginBottom]}>
      <CustomSelector
        question="What’s your chest measurement? (inches)"
        CustomOptions={{ startingNumber: 1, endingNumber: 28 }}
        onSelect={(text) =>
          handleOptionSelect({
            fieldName: "chestSize",
            text,
          })
        }
        selectedOption={nutritionInfo.chestSize}
      />
      <CustomSelector
        question="What’s your waist measurement? (inches)"
        CustomOptions={{ startingNumber: 1, endingNumber: 28 }}
        onSelect={(text) =>
          handleOptionSelect({
            fieldName: "waist",
            text,
          })
        }
        selectedOption={nutritionInfo.waist}
      />
      <CustomSelector
        question="What’s your hip measurement? (inches)"
        CustomOptions={{ startingNumber: 1, endingNumber: 7 }}
        onSelect={(text) =>
          handleOptionSelect({
            fieldName: "hip",
            text,
          })
        }
        selectedOption={nutritionInfo.hip}
      />
      <CustomSelector
        question="What’s your thigh measurement? (inches)"
        CustomOptions={{ startingNumber: 1, endingNumber: 7 }}
        onSelect={(text) =>
          handleOptionSelect({
            fieldName: "thigh",
            text,
          })
        }
        selectedOption={nutritionInfo.thigh}
      />
      <CustomTextOptionSelector
        question="Do you have any of these diseases."
        options={DiseasesOption}
        onSelect={(text) =>
          handleOptionSelect({
            fieldName: "disease",
            text,
          })
        }
        isMultiSelect
        selectedOption={nutritionInfo.disease}
      />
      <CustomTextOptionSelector
        question="Do you have a family history of any of the following?"
        options={FamilyHistory}
        onSelect={(text) =>
          handleOptionSelect({
            fieldName: "familyHistory",
            text,
          })
        }
        isMultiSelect
        selectedOption={nutritionInfo.familyHistory}
      />
      <CustomButton
        text="Continue"
        onPress={handlePress}
        buttonStyle={styles.buttonStyle}
      />
    </ScrollView>
  );
};

export default SelfAssessment;

const styles = StyleSheet.create({
  buttonStyle: {
    marginHorizontal: 16,
    marginTop: 48,
    marginBottom: Platform.select({ ios: 15, android: 30 }),
  },
  litersOfWaterOption: {
    width: "100%",
    fontSize: 14,
  },
  container: {
    flex: 1,
    paddingTop: 15,
  },
});
