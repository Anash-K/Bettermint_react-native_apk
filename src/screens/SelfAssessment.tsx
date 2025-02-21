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
import useUpdateUserProfile from "../hooks/useUpdateUserProfile";
import useUserDetails from "../hooks/useUserDetails";
export interface handleOptionSelectType {
  fieldName: string;
  text: string | string[];
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
    "None Of These",
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
  const { isProfileSetup } = useUserDetails();

  const handleOptionSelect = useCallback(
    ({ fieldName, text }: handleOptionSelectType) => {
      setPhysicalInfo((prevState) => ({
        ...prevState,
        [fieldName]: text,
      }));
    },
    [physicalInfo]
  );

  const { mutateAsync: updateUserProfile } = useUpdateUserProfile(
    "Great job! Your self-assessment is successfully completed."
  );

  const handlePress = useCallback(async () => {
    if (!isFormValid(physicalInfo)) {
      validationAlert();
      return;
    }

    let DataObject = {
      chest: physicalInfo.chestSize,
      waist: physicalInfo.waist,
      hip: physicalInfo.hip,
      thigh: physicalInfo.thigh,
      user_diseases: physicalInfo.disease,
      user_family_diseases: physicalInfo.familyHistory,
    };

    try {
      await updateUserProfile({
        ...DataObject,
      });
    } catch (error) {
      console.error("Profile update failed", error);
      return;
    }

    dispatch(
      setFieldAction({
        field: "physicalMeasurements",
        value: {
          ...DataObject,
        },
      })
    );

    {
      isProfileSetup
        ? navigation.goBack()
        : navigation.navigate("PleaseShareYourMeasurement");
    }
  }, [navigation, physicalInfo]);

  return (
    <ScrollView style={[styles.container, CustomStyle.safeAreaMarginBottom]}>
      <CustomSelector
        question="What’s your chest measurement? (inches)"
        CustomOptions={{ startingNumber: 1, endingNumber: 50 }}
        onSelect={(text) =>
          handleOptionSelect({
            fieldName: "chestSize",
            text,
          })
        }
        selectedOption={physicalInfo.chestSize}
      />
      <CustomSelector
        question="What’s your waist measurement? (inches)"
        CustomOptions={{ startingNumber: 1, endingNumber: 50 }}
        onSelect={(text) =>
          handleOptionSelect({
            fieldName: "waist",
            text,
          })
        }
        selectedOption={physicalInfo.waist}
      />
      <CustomSelector
        question="What’s your hip measurement? (inches)"
        CustomOptions={{ startingNumber: 1, endingNumber: 50 }}
        onSelect={(text) =>
          handleOptionSelect({
            fieldName: "hip",
            text,
          })
        }
        selectedOption={physicalInfo.hip}
      />
      <CustomSelector
        question="What’s your thigh measurement? (inches)"
        CustomOptions={{ startingNumber: 1, endingNumber: 50 }}
        onSelect={(text) =>
          handleOptionSelect({
            fieldName: "thigh",
            text,
          })
        }
        selectedOption={physicalInfo.thigh}
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
        selectedOption={physicalInfo.disease}
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

export default memo(SelfAssessment);

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
