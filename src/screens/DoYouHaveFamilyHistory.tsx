import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import { useCustomStyle } from "../constants/CustomStyles";
import CustomFont from "../assets/fonts/customFonts";
import { colors } from "../constants/colors";
import FastImage from "react-native-fast-image";
import { CustomImages } from "../assets/CustomImages";
import { ScreenProps } from "../navigator/Stack";
import DrawerButton from "../common/DrawerButton";
import WhiteDot from "../common/WhiteDotBtn";
import CustomButton from "../common/CustomButton";
import { useDispatch } from "react-redux";
import { setBooleanFieldAction } from "../redux/slices/workoutDetailsSlice";

type DiseaseState = {
  Diabetes: boolean;
  Cholesterol: boolean;
  "Blood Pressure": boolean;
  Cancer: boolean;
  "Heart Attack": boolean;
};

const DoYouHaveFamilyHistory: React.FC<
  ScreenProps<"DoYouHaveFamilyHistory">
> = ({ navigation }) => {
  const CustomStyle = useCustomStyle();
  const dispatch = useDispatch();
  const initialState: DiseaseState = {
    Diabetes: false,
    Cholesterol: false,
    "Blood Pressure": false,
    Cancer: false,
    "Heart Attack": false,
  };

  const [selectedDiseases, setSelectedDiseases] =
    useState<DiseaseState>(initialState);

  const handlePress = (disease: keyof DiseaseState) => {
    setSelectedDiseases((prevState) => ({
      ...prevState,
      [disease]: !prevState[disease], // Toggle the selected disease
    }));
  };

  const handleNextNav = useCallback(() => {
    dispatch(setBooleanFieldAction({ field: "isProfileSetup", value: true }));
    navigation.navigate("SmallBriefBettermint");
  }, []);

  return (
    <ScrollView
      style={[styles.container, CustomStyle.safeAreaMarginBottom]}
      contentContainerStyle={styles.contentStyle}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <View style={{ flex: 1 }}>
        <Text style={[CustomStyle.title, styles.title]}>
          Do you have a family history of any of the following?
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
                  isFocus={selectedDiseases[disease as keyof DiseaseState]}
                />
              }
              onPress={() => handlePress(disease as keyof DiseaseState)}
              customIconPosition="right"
              isFocus={selectedDiseases[disease as keyof DiseaseState]}
            />
          ))}
        </View>
        <CustomButton text="Update Family History" onPress={handleNextNav} />
      </View>
    </ScrollView>
  );
};

export default DoYouHaveFamilyHistory;

const styles = StyleSheet.create({
  title: {
    maxWidth: 343,
    marginHorizontal: "auto",
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
    marginBottom: 48,
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
