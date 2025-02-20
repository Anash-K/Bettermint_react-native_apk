import { Platform, ScrollView, StyleSheet } from "react-native";
import React, { memo, useCallback, useState } from "react";

import { ScreenProps } from "../navigator/Stack";
import { useCustomStyle } from "../constants/CustomStyles";
import CustomSelector from "../common/CustomSelector";
import CustomTextOptionSelector from "../common/CustomTextOptionSelector";
import CustomButton from "../common/CustomButton";
import { validationAlert } from "../Modals/ValidationAlert";
import { isFormValid } from "../utils/isFormValid";
import { useDispatch } from "react-redux";
import { setFieldAction } from "../redux/slices/workoutDetailsSlice";
export interface handleOptionSelectType {
  fieldName: string;
  text: string | string[];
}

const MovementAssessment: React.FC<ScreenProps<"MovementAssessment">> = ({
  navigation,
}) => {
  const DiseasesOption = [
    'Yes','No'
  ];

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
    disease: "",
    familyHistory: "",
  };

  const [physicalInfo, setPhysicalInfo] = useState(initialState);
  const CustomStyle = useCustomStyle();
  const dispatch = useDispatch();

  const handleOptionSelect = useCallback(
    ({ fieldName, text }: handleOptionSelectType) => {
      setPhysicalInfo((prevState) => ({
        ...prevState,
        [fieldName]: text,
      }));
    },
    [physicalInfo]
  );

  const handlePress = useCallback(() => {
    if (!isFormValid(physicalInfo)) {
      validationAlert();
      return;
    }
    dispatch(
      setFieldAction({
        field: "physicalMeasurements",
        value: {
          chest: physicalInfo.chestSize,
          waist: physicalInfo.waist,
          hip: physicalInfo.hip,
          thigh: physicalInfo.thigh,
          user_diseases: physicalInfo.disease,
          user_family_diseases: physicalInfo.familyHistory,
        },
      })
    );
    navigation.navigate("PleaseShareYourMeasurement");
  }, [navigation, physicalInfo]);

  return (
    <ScrollView style={[styles.container, CustomStyle.safeAreaMarginBottom]}>
      <CustomSelector
        question="How many steps do you do in a day on an average?"
        CustomOptions={{ startingNumber: 1, endingNumber: 50 }}
        onSelect={(text) =>
          handleOptionSelect({
            fieldName: "chestSize",
            text,
          })
        }
        selectedOption={physicalInfo.chestSize}
      />
      <CustomTextOptionSelector
        question="Do you work out for at least 50 mins a day for 5 days a week?"
        options={DiseasesOption}
        onSelect={(text) =>
          handleOptionSelect({
            fieldName: "disease",
            text,
          })
        }
        isMultiSelect
        selectedOption={physicalInfo.disease}
      />
      <CustomTextOptionSelector
        question="What form of workout do you usually do?"
        options={FamilyHistory}
        onSelect={(text) =>
          handleOptionSelect({
            fieldName: "familyHistory",
            text,
          })
        }
        isMultiSelect
        selectedOption={physicalInfo.familyHistory}
      />
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
