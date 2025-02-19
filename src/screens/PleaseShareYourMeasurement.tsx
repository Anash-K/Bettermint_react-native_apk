import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useCustomStyle } from "../constants/CustomStyles";
import CustomFont from "../assets/fonts/customFonts";
import { colors } from "../constants/colors";
import FastImage from "react-native-fast-image";
import { CustomImages } from "../assets/CustomImages";
import { ScreenProps } from "../navigator/Stack";
import { Controller, useForm } from "react-hook-form";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import useTimeFormatter from "../utils/timeFormatter";
import CustomInput from "../common/CustomInput";
import CustomButton from "../common/CustomButton";
import useProfileSetup from "../hooks/useProfileSetup";
import { useMutation } from "@tanstack/react-query";
import { MutationKey } from "../Types/MutationKeys";
import { UpdateProfile } from "../axious/PostApis";
import { AppLoaderRef } from "../../App";
import { useDispatch } from "react-redux";
import { setFieldAction } from "../redux/slices/workoutDetailsSlice";
import { validations } from "../utils/Validations";

interface Inputs {
  "Fasting blood sugar/glucose (mg / DL)": number;
  "Total Cholesterol (mg / DL)": number;
  "HDL Chol (mg / DL)": number;
  "LDL Chol (mg / DL)": number;
  "Avg SBP": number;
  "Avg DBP": number;
  "Date of report": string;
}

const PleaseShareYourMeasurement: React.FC<
  ScreenProps<"PleaseShareYourMeasurement">
> = ({ navigation }) => {
  const isProfileSetup = useProfileSetup();
  const dispatch = useDispatch();
  const { errorMessage } = useCustomStyle();
  const initialValues: Inputs = {
    "Fasting blood sugar/glucose (mg / DL)": 0,
    "Total Cholesterol (mg / DL)": 0,
    "HDL Chol (mg / DL)": 0,
    "LDL Chol (mg / DL)": 0,
    "Avg SBP": 0,
    "Avg DBP": 0,
    "Date of report": "25 Dec, 2024",
  };

  const {
    handleSubmit,
    control,
    setValue,
    setError,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: initialValues,
  });

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = useCallback(() => {
    setDatePickerVisibility(true);
  }, [isDatePickerVisible]);

  const hideDatePicker = useCallback(() => {
    setDatePickerVisibility(false);
  }, [isDatePickerVisible]);

  const handleConfirm = useCallback(
    (date: Date) => {
      let SomeDate = useTimeFormatter({ date: date });
      setValue("Date of report", SomeDate ?? "");
      setError("Date of report", { type: "manual", message: "" });
      hideDatePicker();
    },
    [hideDatePicker]
  );

  const CustomStyle = useCustomStyle();

  const handleNextNav = useCallback(() => {
    isProfileSetup
      ? navigation.goBack()
      : navigation.navigate("SmallBriefBettermint");
  }, [navigation]);

  const inputFields = [
    {
      name: "Fasting blood sugar/glucose (mg / DL)",
      label: "Fasting blood sugar/glucose (mg / DL)",
      placeholder: "74",
    },
    {
      name: "Total Cholesterol (mg / DL)",
      label: "Total Cholesterol (mg / DL)",
      placeholder: "184",
    },
    {
      name: "HDL Chol (mg / DL)",
      label: "HDL Chol (mg / DL)",
      placeholder: "264",
    },
    {
      name: "LDL Chol (mg / DL)",
      label: "LDL Chol (mg / DL)",
      placeholder: "12",
    },
  ];

  const onSubmit = useCallback((data: Inputs) => {
    console.log("Submitted Data:", data);
    console.log("Errors:", errors); // Log errors
    dispatch(
      setFieldAction({
        field: "medicalMeasurements",
        value: {
          blood_glucose: data["Fasting blood sugar/glucose (mg / DL)"],
          total_cholesterol: data["Total Cholesterol (mg / DL)"],
          hdl_cholesterol: data["HDL Chol (mg / DL)"],
          ldl_cholesterol: data["LDL Chol (mg / DL)"],
          systolic_blood_pressure: data["Avg SBP"],
          diastolic_blood_pressure: data["Avg DBP"],
          date_of_report: data["Date of report"],
        },
      })
    );
    handleNextNav();
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.keyboardStyle}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView
          style={[styles.container, CustomStyle.safeAreaMarginBottom]}
          contentContainerStyle={styles.contentStyle}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={styles.innerContainer}>
            <Text style={[CustomStyle.title, styles.title]}>
              Please share your last measurement for the following
            </Text>

            <View style={styles.radioButtonBox}>
              {inputFields.map(({ name, label, placeholder }) => {
                const fieldName = name as keyof Inputs; // Explicitly assert type
                return (
                  <View key={name}>
                    <Controller
                      control={control}
                      name={fieldName}
                      rules={{
                        required: `${label} is required`,
                        validate: validations.nonZeroNumber.validate,
                      }}
                      render={({ field: { onChange, value } }) => (
                        <CustomInput
                          label={label}
                          placeholderText={placeholder}
                          onChange={onChange}
                          value={value}
                          inputConfigurations={{
                            value: value as any,
                            onChangeText: onChange,
                            keyboardType: "number-pad",
                          }}
                        />
                      )}
                    />
                    {errors[name as keyof Inputs] && (
                      <Text style={errorMessage}>{fieldName} is required</Text>
                    )}
                  </View>
                );
              })}
              <View style={styles.doubleInputs}>
                <Controller
                  control={control}
                  name="Avg SBP"
                  rules={{
                    required: `Avg BP (120/ 80) is required`,
                    validate: validations.nonZeroNumber.validate,
                  }}
                  render={({ field: { value, onChange } }) => (
                    <CustomInput
                      label="Avg BP (120/ 80)"
                      placeholderText="120"
                      onChange={onChange}
                      value={value}
                      inputConfigurations={{
                        value: value as any,
                        onChangeText: onChange,
                        onChange: onChange,
                        keyboardType: "number-pad",
                      }}
                      inputBoxStyle={styles.subInputs}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="Avg DBP"
                  rules={{
                    required: `Avg BP (120/ 80) is required`,
                    validate: validations.nonZeroNumber.validate,
                  }}
                  render={({ field: { value, onChange } }) => (
                    <CustomInput
                      placeholderText="80"
                      onChange={onChange}
                      value={value}
                      inputConfigurations={{
                        value: value as any,
                        onChangeText: onChange,
                        onChange: onChange,
                        keyboardType: "number-pad",
                      }}
                      inputBoxStyle={styles.subInputs}
                    />
                  )}
                />
              </View>
              {(errors["Avg SBP"] || errors["Avg DBP"]) && (
                <Text style={errorMessage}>Avg BP (120/ 80) is required</Text>
              )}

              <Controller
                control={control}
                name="Date of report"
                rules={{ required: `Date of report is required` }}
                render={({ field: { value, onChange } }) => (
                  <CustomInput
                    label="Date of report"
                    placeholderText="Enter Date of report"
                    onChange={onChange}
                    value={value}
                    onFocusAction={showDatePicker}
                    inputConfigurations={{
                      value: value ?? "",
                      onChange: onChange,
                    }}
                  />
                )}
              />
            </View>
            {errors["Date of report"] && (
              <Text style={errorMessage}> Date of report is required</Text>
            )}
            <CustomButton
              text={isProfileSetup ? "Update Reports" : "Continue"}
              onPress={handleSubmit(onSubmit)}
            />
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default PleaseShareYourMeasurement;

const styles = StyleSheet.create({
  keyboardStyle: {
    flex: 1,
  },
  subInputs: {
    flex: 1,
  },
  doubleInputs: {
    flexDirection: "row",
    alignItems: "center",
  },
  innerContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 15, android: 40 }),
  },
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
