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
import { Controller, useForm } from "react-hook-form";
import CustomInput from "../common/CustomInput";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Inputs {
  "Fasting blood sugar/glucose (mg / DL)": string;
  "Total Cholesterol (mg / DL)": string | null;
  "HDL Chol (mg / DL)": string;
  "LDL Chol (mg / DL)": string;
  "Avg BP": string;
  "Date of report": string;
}

const PleaseShareYourMeasurement: React.FC<
  ScreenProps<"PleaseShareYourMeasurement">
> = ({ navigation }) => {
  const initialValues: Inputs = {
    "Fasting blood sugar/glucose (mg / DL)": "74",
    "Total Cholesterol (mg / DL)": "184",
    "HDL Chol (mg / DL)": "264",
    "LDL Chol (mg / DL)": "12",
    "Avg BP": "32",
    "Date of report": "25 Dec, 2024",
  };
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    control,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({ defaultValues: initialValues });

  const CustomStyle = useCustomStyle();

  const handlePress = useCallback(() => {}, []);

  const handleNextNav = useCallback(() => {
    navigation.navigate("DoYouHaveFamilyHistory");
  }, []);

  const Insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={[styles.container, CustomStyle.safeAreaMarginBottom]}
      contentContainerStyle={styles.contentStyle}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <View style={[{ flex: 1, marginBottom: 15 }]}>
        <Text style={[CustomStyle.title, styles.title]}>
          Please share your last measurement for the following
        </Text>

        <View style={styles.radioButtonBox}>
          {/* Register inputs using Controller */}
          <Controller
            control={control}
            name="Fasting blood sugar/glucose (mg / DL)"
            render={({ field: { onChange, value } }) => (
              <CustomInput
                label="Fasting blood sugar/glucose (mg / DL)"
                placeholderText="Enter Fasting blood sugar/glucose (mg / DL)"
                onChange={onChange}
                value={value}
                inputConfigurations={{
                  value: value,
                  onChangeText: onChange,
                }}
              />
            )}
          />

          <Controller
            control={control}
            name="Total Cholesterol (mg / DL)"
            render={({ field: { value, onChange } }) => (
              <CustomInput
                label="Total Cholesterol (mg / DL)"
                placeholderText="Enter Total Cholesterol (mg / DL)"
                onChange={onChange}
                value={value}
                inputConfigurations={{
                  value: value,
                  onChangeText: onChange,
                }}
              />
            )}
          />

          <Controller
            control={control}
            name="HDL Chol (mg / DL)"
            render={({ field: { value, onChange } }) => (
              <CustomInput
                label="HDL Chol (mg / DL)"
                placeholderText="Enter HDL Chol (mg / DL)"
                onChange={onChange}
                value={value}
                inputConfigurations={{
                  value: value,
                  onChangeText: onChange,
                }}
              />
            )}
          />

          <Controller
            control={control}
            name="LDL Chol (mg / DL)"
            render={({ field: { value, onChange } }) => (
              <CustomInput
                label="LDL Chol (mg / DL)"
                placeholderText="Enter LDL Chol (mg / DL)"
                onChange={onChange}
                value={value}
                inputConfigurations={{
                  value: value,
                  onChangeText: onChange,
                }}
              />
            )}
          />

          <Controller
            control={control}
            name="Avg BP"
            render={({ field: { value, onChange } }) => (
              <CustomInput
                label="Avg BP"
                placeholderText="Enter Avg BP"
                onChange={onChange}
                value={value}
                inputConfigurations={{
                  value: value,
                  onChangeText: onChange,
                }}
              />
            )}
          />

          <Controller
            control={control}
            name="Date of report"
            render={({ field: { value, onChange } }) => (
              <CustomInput
                label="Date of report"
                placeholderText="Enter Date of report"
                onChange={onChange}
                value={value}
                inputConfigurations={{
                  value: value,
                  onChangeText: onChange,
                }}
              />
            )}
          />
        </View>
        <CustomButton text="Continue" onPress={handleNextNav} />
      </View>
    </ScrollView>
  );
};

export default PleaseShareYourMeasurement;

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
    flex: 1,
    marginBottom: 20,
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
