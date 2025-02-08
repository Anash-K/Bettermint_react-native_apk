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

const NutritionAssessmentDetails: React.FC<
  ScreenProps<"NutritionAssessmentDetails">
> = ({ navigation }) => {
  const SnakesPackage = [
    "Very rarely",
    "Once or twice a week",
    "3-4 times a week",
    "More than 4 times a week",
  ];

  const FeelAfterHomemadeMead = [
    "Can pay attention to work or read without falling asleep",
    "Need tea or coffee to stay awake",
  ];

  const timeBeforeBed = ["1", "1.5", "2", "2.5", "3", "3.5", "4"];

  const initialState = {
    ofterYouEat: "0",
    youOrderFood: "0",
    litersOfWaterDrink: "0",
  };
  const [nutritionInfo, setNutritionInfo] = useState(initialState);
  const [selectedOption, setSelectedOption] = useState({});
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
        question="How often do you eat out in a week?"
        CustomOptions={{ startingNumber: 1, endingNumber: 28 }}
        onSelect={(text) =>
          handleOptionSelect({ fieldName: "ofterYouEat", text })
        }
        selectedOption={nutritionInfo.ofterYouEat}
      />
      <CustomSelector
        question="How many times do you order food in a week?"
        CustomOptions={{ startingNumber: 1, endingNumber: 28 }}
        onSelect={(text) =>
          handleOptionSelect({ fieldName: "youOrderFood", text })
        }
        selectedOption={nutritionInfo.youOrderFood}
      />
      <CustomSelector
        question="How many liters of water do you drink daily?"
        CustomOptions={{ startingNumber: 1, endingNumber: 7 }}
        onSelect={(text) =>
          handleOptionSelect({ fieldName: "litersOfWaterDrink", text })
        }
        selectedOption={nutritionInfo.litersOfWaterDrink}
      />
      <CustomTextOptionSelector
        question="How often do you snack on packaged foods (chips, chocolates, biscuits)?"
        options={SnakesPackage}
        onSelect={(text) =>
          handleOptionSelect({ fieldName: "litersOfWaterDrink", text })
        }
        selectedOption={nutritionInfo.litersOfWaterDrink}
        optionStyle={{ fontSize: 14 }}
      />
      <CustomTextOptionSelector
        question="How do you generally feel after a homemade meal?"
        options={FeelAfterHomemadeMead}
        onSelect={(text) =>
          handleOptionSelect({ fieldName: "litersOfWaterDrink", text })
        }
        selectedOption={nutritionInfo.litersOfWaterDrink}
        optionStyle={styles.litersOfWaterOption}
      />
      <CustomSelector
        question="What is the gap between finishing your dinner & going to bed?"
        options={timeBeforeBed}
        onSelect={(text) =>
          handleOptionSelect({ fieldName: "ofterYouEat", text })
        }
        selectedOption={nutritionInfo.ofterYouEat}
        buttonStyle={{ width: 43, height: 43 }}
      />
      <CustomButton
        text="Continue"
        onPress={handlePress}
        buttonStyle={styles.buttonStyle}
      />
    </ScrollView>
  );
};

export default NutritionAssessmentDetails;

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
