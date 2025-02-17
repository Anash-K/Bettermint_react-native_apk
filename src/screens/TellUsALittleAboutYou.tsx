import {
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import React, { memo, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScreenProps } from "../navigator/Stack";
import { gender, logout } from "../redux/slices/authSlice";
import { useCustomStyle } from "../constants/CustomStyles";
import { Controller, useForm } from "react-hook-form";
import { colors } from "../constants/colors";
import CustomFont from "../assets/fonts/customFonts";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import useTimeFormatter from "../utils/timeFormatter";
import CustomInput from "../common/CustomInput";
import CustomButton from "../common/CustomButton";
import { RootState } from "../redux/rootReducer";
import { ICountry } from "react-native-international-phone-number";

interface Inputs {
  name: string;
  DOB: string | null;
  Gender: string;
  City: string;
  mobileNumber: string;
  height: number;
  height_unit: string;
  weight: number;
  weight_unit: string;
  status: string;
}

const dropdownItems = [
  { title: "Male" },
  { title: "Female" },
  { title: "Other" },
];

const TellUsALittleAboutYou: React.FC<ScreenProps<"TellUsALittleAboutYou">> =
  memo(({ navigation, route }) => {
    const { token } = useSelector((state: any) => state.auth);
    const {
      register,
      handleSubmit,
      watch,
      getValues,
      control,
      setValue,
      setError,
      formState: { errors },
    } = useForm<Inputs>();

    const [isDatePickerVisible, setDatePickerVisibility] =
      useState<boolean>(false);
    const [selectedCountry, setSelectedCountry] = useState<null | ICountry>(
      null
    );
    const { isProfileSetup } = useSelector(
      (state: RootState) => state.userDetails
    );

    const showDatePicker = useCallback(() => {
      setDatePickerVisibility(true);
    }, [isDatePickerVisible]);

    const hideDatePicker = useCallback(() => {
      setDatePickerVisibility(false);
    }, [isDatePickerVisible]);

    const handleSelectedCountry = useCallback((country: ICountry) => {
      setSelectedCountry(country);
      console.log(country?.callingCode);
    }, []);

    const handleConfirm = useCallback(
      (date: Date) => {
        let SomeDate = useTimeFormatter({ date: date });
        setValue("DOB", SomeDate);
        setError("DOB", { type: "manual", message: "" });
        hideDatePicker();
      },
      [hideDatePicker]
    );

    console.log(isProfileSetup, "isProfileSetup");

    const dispatch = useDispatch();
    const CustomStyle = useCustomStyle();

    const onSubmit = useCallback((data: Inputs) => {
      dispatch(gender(data.Gender));
      {
        isProfileSetup
          ? navigation.goBack()
          : navigation.navigate("ProvideYourMobileNumber");
      }
    }, []);

    const handleGenderChange = useCallback((gender: any) => {
      setValue("Gender", gender.title);
      setError("Gender", { type: "manual", message: "" });
    }, []);

    const handleInputChange = useCallback((text: string) => {
      const formattedText = text.replace(/[^0-9]/g, "").slice(0, 15); // Allow only numbers & limit to 15 digits

      if (formattedText.length > 15) {
        setError("mobileNumber", {
          type: "manual",
          message: "Phone number cannot exceed 15 characters",
        });
        return;
      } else if (!/^[0-9]*$/.test(formattedText)) {
        setError("mobileNumber", {
          type: "manual",
          message: "Only numeric values are allowed",
        });
        return;
      } else {
        setError("mobileNumber", { type: "manual", message: undefined });
      }
      // setTouched(true); // Set touched when user types

      setValue("mobileNumber", formattedText); // Fix: Use formattedText instead of text
    }, []);

    return (
      <ScrollView
        style={[
          styles.container,
          CustomStyle?.safeAreaMarginBottom,
          CustomStyle.safeAreaMarginTop,
        ]}
        contentContainerStyle={styles.innerContent}
      >
        <View style={styles.topContainer}>
          <Text style={[CustomStyle.title, styles.title]}>
            {isProfileSetup
              ? "Update Your Details"
              : "Tell us a little about you"}
          </Text>
          <Text style={[CustomStyle.subtitle, styles.subtitle]}>
            {isProfileSetup
              ? "Update your information to personalize your experience further."
              : "Please provide basic details about yourself to personalize your experience."}
          </Text>

          {/* Register inputs using Controller */}
          <Controller
            control={control}
            name="name"
            rules={{ required: "Email is required" }}
            render={({ field: { onChange, value } }) => (
              <CustomInput
                label="Name"
                placeholderText="Enter name"
                onChange={onChange}
                value={value}
                inputConfigurations={{
                  value: value,
                  onChangeText: onChange,
                }}
              />
            )}
          />
          {errors.name && (
            <Text style={styles.errorMessage}>{errors?.name?.message}</Text>
          )}
          <Controller
            control={control}
            name="DOB"
            rules={{ required: "DOB is required" }}
            render={({ field: { value, onChange } }) => (
              <CustomInput
                label="DOB"
                placeholderText="Enter dOB"
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
          {errors.DOB && (
            <Text style={styles.errorMessage}>{errors?.DOB?.message}</Text>
          )}

          <Controller
            control={control}
            name="Gender"
            rules={{ required: "Gender is required" }}
            render={({ field: { value } }) => (
              <CustomInput
                label="Gender"
                placeholderText="Enter gender"
                onChange={handleGenderChange}
                value={value}
                isDropDown={true}
                dropdownItems={dropdownItems}
              />
            )}
          />
          {errors.Gender && (
            <Text style={styles.errorMessage}>{errors?.Gender?.message}</Text>
          )}

          <Controller
            control={control}
            name="City"
            rules={{ required: "City is required" }}
            render={({ field: { value, onChange } }) => (
              <CustomInput
                label="City"
                placeholderText="Enter city"
                onChange={onChange}
                value={value}
                inputConfigurations={{
                  value: value,
                  onChangeText: onChange,
                }}
              />
            )}
          />
          {errors.City && (
            <Text style={styles.errorMessage}>{errors?.City?.message}</Text>
          )}
          <Controller
            control={control}
            name="mobileNumber"
            rules={{ required: "mobile number is required" }}
            render={({ field: { value, onChange } }) => (
              <CustomInput
                label="Mobile Number"
                placeholderText="Enter mobile number"
                onChange={handleInputChange}
                isPhoneInput={true}
                value={value}
                selectedCountry={selectedCountry}
                OnCountryChange={handleSelectedCountry}
              />
            )}
          />
          {errors.City && (
            <Text style={styles.errorMessage}>{errors?.City?.message}</Text>
          )}

          <Controller
            control={control}
            name="height"
            rules={{ required: "height is required" }}
            render={({ field: { value, onChange } }) => (
              <CustomInput
                label="Height"
                placeholderText="Enter Height"
                onChange={onChange}
                value={value}
                inputConfigurations={{
                  value: value as any,
                  onChangeText: onChange,
                }}
              />
            )}
          />
          {errors.height && (
            <Text style={styles.errorMessage}>{errors?.height?.message}</Text>
          )}
        </View>
        {__DEV__ && (
          <CustomButton
            text="Dev Mode"
            onPress={() => navigation.navigate("BottomTabStack")}
            buttonStyle={{ marginBottom: 15 }}
          />
        )}

        <CustomButton
          text={isProfileSetup ? "Save Changes" : "Continue"}
          onPress={handleSubmit(onSubmit)}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </ScrollView>
    );
  });

export default TellUsALittleAboutYou;

const styles = StyleSheet.create({
  title: {
    textAlign: "left",
    fontFamily: CustomFont.Urbanist800,
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 32,
    textAlign: "left",
  },
  innerContent: {
    flexGrow: 1,
  },
  topContainer: {
    flex: 1,
    marginBottom: 20,
  },
  errorMessage: {
    fontSize: 11,
    fontFamily: CustomFont.Urbanist400,
    color: colors.error,
  },
  container: {
    flex: 1,
    padding: 16,
  },
});
