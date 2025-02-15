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

interface Inputs {
  "Fasting blood sugar/glucose (mg / DL)": string;
  "Total Cholesterol (mg / DL)": string | null;
  "HDL Chol (mg / DL)": string;
  "LDL Chol (mg / DL)": string;
  "Avg BP (120/ 80)": string;
  "Date of report": string;
}

const PleaseShareYourMeasurement: React.FC<
  ScreenProps<"PleaseShareYourMeasurement">
> = ({ navigation }) => {
  const isProfileSetup = useProfileSetup();
  const initialValues: Inputs = {
    "Fasting blood sugar/glucose (mg / DL)": "74",
    "Total Cholesterol (mg / DL)": "184",
    "HDL Chol (mg / DL)": "264",
    "LDL Chol (mg / DL)": "12",
    "Avg BP (120/ 80)": "120/80",
    "Date of report": "25 Dec, 2024",
  };

  const {
    register,
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
  const Insets = useSafeAreaInsets();

  const handleNextNav = useCallback(() => {
    isProfileSetup
      ? navigation.goBack()
      : navigation.navigate("DoYouHaveFamilyHistory");
  }, [navigation]);

  const inputFields = [
    {
      name: "Fasting blood sugar/glucose (mg / DL)",
      label: "Fasting blood sugar/glucose (mg / DL)",
      placeholder: "Enter Fasting blood sugar/glucose (mg / DL)",
    },
    {
      name: "Total Cholesterol (mg / DL)",
      label: "Total Cholesterol (mg / DL)",
      placeholder: "Enter Total Cholesterol (mg / DL)",
    },
    {
      name: "HDL Chol (mg / DL)",
      label: "HDL Chol (mg / DL)",
      placeholder: "Enter HDL Chol (mg / DL)",
    },
    {
      name: "LDL Chol (mg / DL)",
      label: "LDL Chol (mg / DL)",
      placeholder: "Enter LDL Chol (mg / DL)",
    },
    {
      name: "Avg BP (120/ 80)",
      label: "Avg BP (120/ 80)",
      placeholder: "Enter Avg BP (120/ 80)",
    },
  ];

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
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
              {inputFields.map(({ name, label, placeholder }) => (
                <Controller
                  key={name}
                  control={control}
                  name={name as any}
                  render={({ field: { onChange, value } }) => (
                    <CustomInput
                      label={label}
                      placeholderText={placeholder}
                      onChange={onChange}
                      value={value}
                      inputConfigurations={{
                        value: value,
                        onChangeText: onChange,
                        keyboardType:
                          label == "Avg BP (120/ 80)"
                            ? "default"
                            : "number-pad",
                      }}
                    />
                  )}
                />
              ))}

              <Controller
                control={control}
                name="Date of report"
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

            <CustomButton
              text={isProfileSetup ? "Update Reports" : "Continue"}
              onPress={handleNextNav}
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
