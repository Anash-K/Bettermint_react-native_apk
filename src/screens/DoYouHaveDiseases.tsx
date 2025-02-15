import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useCustomStyle } from "../constants/CustomStyles";
import CustomFont from "../assets/fonts/customFonts";
import { colors } from "../constants/colors";
import FastImage from "react-native-fast-image";
import { CustomImages } from "../assets/CustomImages";
import { ScreenProps } from "../navigator/Stack";
import { useSelector } from "react-redux";
import DrawerButton from "../common/DrawerButton";
import WhiteDot from "../common/WhiteDotBtn";
import CustomButton from "../common/CustomButton";
import useProfileSetup from "../hooks/useProfileSetup";

type DiseaseState = {
  "Diabetes / Prediabetes": boolean;
  Cholesterol: boolean;
  "Blood Pressure": boolean;
  Thyroid: boolean;
  "Fatty Liver": boolean;
  "PCOD / PCOS"?: boolean;
  "None of Above": boolean;
};
const { width, height } = Dimensions.get("screen");

const DoYouHaveDiseases: React.FC<ScreenProps<"DoYouHaveDiseases">> = ({
  navigation,
}) => {
  const { gender } = useSelector((state: any) => state.auth);
  const CustomStyle = useCustomStyle();
  const isProfileSetup = useProfileSetup();

  const initialState: DiseaseState = {
    "Diabetes / Prediabetes": false,
    Cholesterol: false,
    "Blood Pressure": false,
    Thyroid: false,
    "Fatty Liver": false,
    "None of Above": false,
  };

  if (gender !== "Male") {
    initialState["PCOD / PCOS"] = false;
  }

  const [selectedDiseases, setSelectedDiseases] =
    useState<DiseaseState>(initialState);

  const handlePress = (disease: keyof DiseaseState) => {
    setSelectedDiseases((prevState) => ({
      ...prevState,
      [disease]: !prevState[disease], // Toggle the selected disease
    }));
  };

  console.log(height,"devide deight")

  const handleNextNav = useCallback(() => {
    isProfileSetup
      ? navigation.goBack()
      : navigation.navigate("PleaseShareYourMeasurement");
  }, []);

  return (
    <ScrollView
      style={[styles.container]}
      contentContainerStyle={styles.contentStyle}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <View style={[{ flex: 1 }]}>
        <Text style={CustomStyle.title}>
          Do you have any of these diseases.
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
          text={isProfileSetup ? "Update Health Conditions" : "Continue"}
          onPress={handleNextNav}
          buttonStyle={[
            styles.buttonStyle,
            // width < 400 && styles.responsiveButtonStyle,
            // height < 914 && styles.responsiveButtonStyle,
          ]}
        />
      </View>
    </ScrollView>
  );
};

export default DoYouHaveDiseases;

const styles = StyleSheet.create({
  responsiveButtonStyle: {
    marginBottom: Platform.select({ android: 40 }),
  },
  buttonStyle: {
    marginBottom: Platform.select({ ios: 30, android: 20 }),
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
