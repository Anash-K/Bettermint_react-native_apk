import { ScrollView, StyleSheet, Text, View } from "react-native";
import DrawerButton from "../common/DrawerButton";
import React, { useCallback, useState } from "react";
import WhiteDot from "../common/WhiteDotBtn";
import { useCustomStyle } from "../constants/CustomStyles";
import CustomFont from "../assets/fonts/customFonts";
import { colors } from "../constants/colors";
import FastImage from "react-native-fast-image";
import { CustomImages } from "../assets/CustomImages";
import CustomButton from "../common/CustomButton";
import { ScreenProps } from "../navigator/Stack";
import { useSelector } from "react-redux";

type FoodYouEatState = {
  "I eat my veggies": boolean;
  "I eat my protein": boolean;
  "I have my fiber": boolean;
  "I’m not really eating a balanced meal": boolean;
};

const WhatKingOfFoodYouEat: React.FC<ScreenProps<"WhatKingOfFoodYouEat">> = ({
  navigation,
}) => {
  const { gender } = useSelector((state: any) => state.auth);
  const CustomStyle = useCustomStyle();
  const initialState: FoodYouEatState = {
    "I eat my veggies": false,
    "I eat my protein": false,
    "I have my fiber": false,
    "I’m not really eating a balanced meal": false,
  };

  if (gender !== "Male") {
    // initialState["PCOD / PCOS"] = false;
  }

  const [selectedDiseases, setSelectedDiseases] =
    useState<FoodYouEatState>(initialState);

  const handlePress = (disease: keyof FoodYouEatState) => {
    setSelectedDiseases((prevState) => ({
      ...prevState,
      [disease]: !prevState[disease], // Toggle the selected disease
    }));
  };

  const handleNextNav = useCallback(() => {
    navigation.navigate("PleaseShareYourMeasurement");
  }, []);

  return (
    <ScrollView
      style={[styles.container, CustomStyle.safeAreaMarginBottom]}
      contentContainerStyle={styles.contentStyle}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <View style={{ flex: 1 }}>
        <Text style={CustomStyle.title}>
          What kind of food do you usually eat?
        </Text>
        <View style={styles.multiSelectBox}>
          <FastImage
            source={CustomImages.multiSelect}
            style={styles.multiSelect}
          />
          <Text style={styles.subTitle}>Multi-select</Text>
        </View>

        <View style={styles.radioButtonBox}>
          <View style={styles.checkBox}>
            <Text>Simple, homely meals</Text>
            <WhiteDot isFocus={false} />
          </View>
          {Object.keys(initialState).map((disease) => (
            <DrawerButton
              key={disease}
              text={disease}
              buttonStyle={styles.commonButtonStyle}
              textStyle={styles.btnText}
              customIcon={
                <WhiteDot
                  isFocus={!!selectedDiseases[disease as keyof FoodYouEatState]}
                />
              }
              onPress={() => handlePress(disease as keyof FoodYouEatState)}
              customIconPosition="right"
              isFocus={selectedDiseases[disease as keyof FoodYouEatState]}
            />
          ))}
        </View>
        <CustomButton text="Continue" onPress={handleNextNav} />
      </View>
    </ScrollView>
  );
};

export default WhatKingOfFoodYouEat;

const styles = StyleSheet.create({
  checkBox: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor:'#fff',
  },
  ringBorder: {
    borderColor: colors.primary,
    borderWidth: 2,
    width: 20,
    height: 20,
    borderRadius: 50,
  },
  contentStyle: {
    flexGrow: 1,
  },
  multiSelectBox: {
    flexDirection: "row",
    columnGap: 8,
    justifyContent: "center",
    marginTop: 24,
  },
  multiSelect: {
    width: 18,
    height: 18,
  },
  subTitle: {
    fontFamily: CustomFont.Urbanist700,
    fontSize: 18,
    lineHeight: 21.6,
    color: colors.secondaryLight,
  },
  radioButtonBox: {
    rowGap: 9,
    marginTop: 48,
    flex: 1,
    marginBottom: 48,
  },
  btnText: {
    fontSize: 16,
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 25,
  },
  commonButtonStyle: {
    width: "100%",
    justifyContent: "space-between",
    paddingVertical: 18.5,
    paddingRight: 18,
    // iOS Shadow
    shadowColor: "rgba(28, 101, 124, 0.2)",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // Android Shadow
    elevation: 5,
  },
});
