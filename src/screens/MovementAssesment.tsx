import { Platform, ScrollView, StyleSheet } from "react-native";
import React, { memo, useCallback, useEffect, useState } from "react";

import { ScreenProps } from "../navigator/Stack";
import { useCustomStyle } from "../constants/CustomStyles";
import CustomSelector from "../common/CustomSelector";
import CustomTextOptionSelector from "../common/CustomTextOptionSelector";
import CustomButton from "../common/CustomButton";
import { validationAlert } from "../Modals/ValidationAlert";
import { isFormValid } from "../utils/isFormValid";
import useFilteredQuestions from "../hooks/useFilteredQuestions";
import { questData, Question } from "../utils/questData";

export interface handleOptionSelectType {
  fieldName: string;
  text: string | string[];
}

const MovementAssessment: React.FC<ScreenProps<"MovementAssesment">> = ({
  navigation,
}) => {
  const filteredQuestions = useFilteredQuestions(questData.MovementAssessment);
  console.log(filteredQuestions, "quest");

  const DiseasesOption = ["Yes", "No"];

  const FamilyHistory = [
    "Diabetes",
    "Blood Pressure",
    "Cholesterol",
    "Cancer",
    "Heart Attack",
    "None Of These",
  ];

  const initialState = {
    chestSize: 0,
    waist: 0,
    hip: 0,
    thigh: 0,
    disease: [],
    familyHistory: [],
  };

  const [physicalInfo, setPhysicalInfo] = useState(initialState);
  const CustomStyle = useCustomStyle();

  const handleOptionSelect = useCallback(
    ({ fieldName, text }: handleOptionSelectType) => {
      setPhysicalInfo((prevState) => ({
        ...prevState,
        [fieldName]: text,
      }));
    },
    []
  );

  const handlePress = useCallback(() => {
    if (!isFormValid(physicalInfo)) {
      validationAlert();
      return;
    }
    // dispatch(
    //   setFieldAction({
    //     field: "physicalMeasurements",
    //     value: {
    //       chest: physicalInfo.chestSize,
    //       waist: physicalInfo.waist,
    //       hip: physicalInfo.hip,
    //       thigh: physicalInfo.thigh,
    //       user_diseases: physicalInfo.disease,
    //       user_family_diseases: physicalInfo.familyHistory,
    //     },
    //   })
    // );
    navigation.navigate("PleaseShareYourMeasurement");
  }, []);

  console.log("test");

  return (
    <ScrollView style={[styles.container, CustomStyle.safeAreaMarginBottom]}>
      {filteredQuestions.map((question: Question) => {
        switch (question.view_type) {
          case "scroll_number":
            return (
              <CustomSelector
                key={question.id}
                question={question?.text}
                CustomOptions={{
                  startingNumber: question.options.min,
                  endingNumber: question.options.max,
                }}
                onSelect={(text) =>
                  handleOptionSelect({
                    fieldName: "chestSize",
                    text,
                  })
                }
                selectedOption={physicalInfo.chestSize}
                buttonStyle={{ width: 43, height: 43 }}
              />
            );
          case "single_select_text":
            
            return (
              <CustomTextOptionSelector
                key={question.id}
                question={question?.text}
                options={DiseasesOption}
                onSelect={(text) =>
                  handleOptionSelect({
                    fieldName: "disease",
                    text,
                  })
                }
                defaultValues={physicalInfo.disease}
              />
            );
          case "multi_select_text":
            console.log(question?.options,'option')
            return (
              <CustomTextOptionSelector
                key={question.id}
                question="What form of workout do you usually do?"
                options={FamilyHistory}
                onSelect={(text) =>
                  handleOptionSelect({
                    fieldName: "familyHistory",
                    text,
                  })
                }
                isMultiSelect
                defaultValues={physicalInfo.familyHistory}
              />
            );
          default:
            return null;
        }
      })}

      <CustomButton
        text="Continue"
        onPress={handlePress}
        buttonStyle={styles.buttonStyle}
      />
    </ScrollView>
  );
};

export default memo(MovementAssessment);

const styles = StyleSheet.create({
  title: {
    fontSize: 12,
  },
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
