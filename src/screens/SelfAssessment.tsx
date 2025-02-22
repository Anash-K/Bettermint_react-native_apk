import { Platform, ScrollView, StyleSheet } from "react-native";
import React, { memo, useCallback, useEffect, useState } from "react";

import { ScreenProps } from "../navigator/Stack";
import { useCustomStyle } from "../constants/CustomStyles";
import CustomSelector from "../common/CustomSelector";
import CustomTextOptionSelector from "../common/CustomTextOptionSelector";
import CustomButton from "../common/CustomButton";
import { validationAlert } from "../Modals/ValidationAlert";
import { isFormValid } from "../utils/isFormValid";
import useUpdateUserProfile from "../hooks/useUpdateUserProfile";
import useUserDetails from "../hooks/useUserDetails";
import useMergeProfileInfo from "../hooks/useMergeProfileInfo";
export interface handleOptionSelectType {
  fieldName: string;
  text: string | string[];
}

const SelfAssessment: React.FC<ScreenProps<"SelfAssessment">> = ({
  navigation,
}) => {
  const { isProfileSetup, profileInfo } = useUserDetails();
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
    chestSize: profileInfo.chest ?? 0,
    waist: profileInfo.waist ?? 0,
    hip: profileInfo.hip ?? 0,
    thigh: profileInfo.thigh ?? 0,
    disease: profileInfo.user_diseases?.length ? profileInfo.user_diseases : [],
    familyHistory: profileInfo.user_family_diseases?.length
      ? profileInfo.user_family_diseases
      : [],
  };

  useEffect(() => {
    setPhysicalInfo((prevState) => ({
      ...prevState,
      disease: profileInfo?.user_diseases?.length
        ? profileInfo.user_diseases
        : [],
      familyHistory: profileInfo?.user_family_diseases?.length
        ? profileInfo.user_family_diseases
        : [],
    }));
  }, []);

  const [physicalInfo, setPhysicalInfo] = useState(initialState);
  const CustomStyle = useCustomStyle();

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
    `Great job! Your self-assessment is successfully ${
      isProfileSetup ? "updated" : "completed"
    }.`
  );
  const { mergeProfileInfo } = useMergeProfileInfo();

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

    mergeProfileInfo(DataObject);

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
        defaultValues={physicalInfo.disease}
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
        defaultValues={physicalInfo.familyHistory}
      />
      <CustomButton
        text={isProfileSetup ? "Update Measurements" : "Continue"}
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
