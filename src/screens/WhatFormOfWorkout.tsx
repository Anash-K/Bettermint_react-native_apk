import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
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

type DiseaseState = {
  "Brisk Walking": boolean;
  Swimming: boolean;
  Cycling: boolean;
  Thyroid: boolean;
  "Yoga at home": boolean;
  Gym: boolean;
  Dance: boolean;
  "Functional training at home": boolean;
  "Functional training in a class": boolean;
  Kickboxing: boolean;
  MMA: boolean;
  //   "PCOD / PCOS"?: boolean;
};

const WhatFormOfWorkout: React.FC<ScreenProps<"WhatFormOfWorkout">> = ({
  navigation,
}) => {
  const { gender } = useSelector((state: any) => state.auth);
  const CustomStyle = useCustomStyle();
  const initialState: DiseaseState = {
    "Brisk Walking": false,
    Swimming: true,
    Cycling: false,
    Thyroid: false,
    "Yoga at home": false,
    Gym: true,
    Dance: false,
    "Functional training at home": false,
    "Functional training in a class": false,
    Kickboxing: false,
    MMA: false,
  };

  if (gender !== "Male") {
    // initialState["PCOD / PCOS"] = false;
  }

  const [selectedDiseases, setSelectedDiseases] =
    useState<DiseaseState>(initialState);

  const handlePress = (disease: keyof DiseaseState) => {
    setSelectedDiseases((prevState) => ({
      ...prevState,
      [disease]: !prevState[disease], // Toggle the selected disease
    }));
  };

  const handleNextNav = useCallback(() => {
    // navigation.navigate("");
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
          What form of workout do you usually do?
        </Text>
        <View style={styles.multiSelectBox}>
          <FastImage
            source={CustomImages.multiSelect}
            style={styles.multiSelect}
          />
          <Text style={styles.subTitle}>Multi-select</Text>
        </View>

        <View style={styles.radioButtonBox}>
          {Object.keys(initialState).map((disease) => (
            <DrawerButton
              key={disease}
              text={disease}
              buttonStyle={styles.commonButtonStyle}
              textStyle={styles.btnText}
              customIcon={
                <WhiteDot
                  isFocus={!!selectedDiseases[disease as keyof DiseaseState]}
                />
              }
              onPress={() => handlePress(disease as keyof DiseaseState)}
              customIconPosition="right"
              isFocus={selectedDiseases[disease as keyof DiseaseState]}
            />
          ))}
        </View>
        <CustomButton
          text="Continue"
          onPress={handleNextNav}
          buttonStyle={styles.button}
        />
      </View>
    </ScrollView>
  );
};

export default WhatFormOfWorkout;

const styles = StyleSheet.create({
  button: {
    marginBottom: Platform.select({ios:10, android: 45 }),
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
    marginVertical: 48,
    flex: 1,
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
