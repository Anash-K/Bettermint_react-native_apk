import {
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import React, { memo, useCallback, useEffect, useState } from "react";
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
import { setFieldAction } from "../redux/slices/workoutDetailsSlice";

interface Inputs {
  name: string;
  DOB: string;
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

const statusOptions = [
  { title: "Working" },
  { title: "Studying" },
  { title: "Neither" },
];

const heightUnit = [{ title: "cm" }, { title: "ft, in" }];
const weightUnit = [{ title: "Kg" }, { title: "lbs" }];

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
      "+91"
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
    }, []);

    const handleConfirm = useCallback(
      (date: Date) => {
        let SomeDate = useTimeFormatter({ date: date });
        setValue("DOB", SomeDate ?? "");
        setError("DOB", { type: "manual", message: "" });
        hideDatePicker();
      },
      [hideDatePicker]
    );

    console.log(isProfileSetup, "isProfileSetup");

    const dispatch = useDispatch();
    const CustomStyle = useCustomStyle();

    const onSubmit = useCallback(
      (data: Inputs) => {
        if (data.mobileNumber.length < 10) {
          setError("mobileNumber", {
            type: "required",
            message: "Mobile number must contain 10 digit",
          });
          return;
        }
        let mobileNumber = `${selectedCountry?.callingCode}${data.mobileNumber}`;

        dispatch(
          setFieldAction({
            field: "profileInfo",
            value: {
              name: data.name,
              date_of_birth: data.DOB,
              gender: data.Gender,
              mobile_number: mobileNumber,
              city: data.City,
              height: data.height,
              weight: data.weight,
              status: data.status,
              height_unit: data.height_unit,
              weight_unit: data.weight_unit,
              profile_picture: "",
            },
          })
        );
        {
          isProfileSetup
            ? navigation.goBack()
            : navigation.navigate("AddYourPhoto");
        }
      },
      [selectedCountry]
    );

    const handleFieldChange = useCallback(
      (fieldName: keyof Inputs, value: any) => {
        setValue(fieldName, value.title);
        setError(fieldName, { type: "manual", message: "" });
      },
      []
    );

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

      setValue("mobileNumber", formattedText); 
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
            rules={{ required: "name is required" }}
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
                placeholderText="Enter date of birth"
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
                onChange={(text) => handleFieldChange("Gender", text)}
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
            rules={{ required: "Mobile number is required" }}
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
          {errors.mobileNumber && (
            <Text style={styles.errorMessage}>
              {errors?.mobileNumber?.message}
            </Text>
          )}
          <View style={styles.doubleInputs}>
            <Controller
              control={control}
              name="height"
              rules={{ required: "Height is required" }}
              render={({ field: { value, onChange } }) => (
                <CustomInput
                  label="Height"
                  placeholderText="Enter height"
                  onChange={onChange}
                  value={value}
                  inputBoxStyle={styles.largeInput}
                  inputConfigurations={{
                    value: value as any,
                    onChangeText: onChange,
                    keyboardType: "number-pad",
                    maxLength: 4,
                  }}
                />
              )}
            />

            <Controller
              control={control}
              name="height_unit"
              rules={{ required: "Height unit is required" }}
              render={({ field: { value, onChange } }) => (
                <CustomInput
                  placeholderText="unit"
                  onChange={(text) => handleFieldChange("height_unit", text)}
                  inputBoxStyle={styles.smallInput}
                  value={value}
                  isDropDown={true}
                  dropdownItems={heightUnit}
                />
              )}
            />
          </View>
          <View style={styles.doubleInputs}>
            {errors.height && (
              <Text style={styles.errorMessage}>{errors?.height?.message}</Text>
            )}
            {errors.height_unit && (
              <Text style={styles.errorMessage}>
                {errors?.height_unit?.message}
              </Text>
            )}
          </View>

          <View style={styles.doubleInputs}>
            <Controller
              control={control}
              name="weight"
              rules={{ required: "Weight is required" }}
              render={({ field: { value, onChange } }) => (
                <CustomInput
                  label="Weight"
                  placeholderText="Enter weight"
                  onChange={onChange}
                  inputBoxStyle={styles.largeInput}
                  value={value}
                  inputConfigurations={{
                    value: value as any,
                    onChangeText: onChange,
                    keyboardType: "number-pad",
                    maxLength: 4,
                  }}
                />
              )}
            />

            <Controller
              control={control}
              name="weight_unit"
              rules={{ required: "Weight unit is required" }}
              render={({ field: { value } }) => (
                <CustomInput
                  placeholderText="unit"
                  onChange={(text) => handleFieldChange("weight_unit", text)}
                  inputBoxStyle={styles.smallInput}
                  value={value}
                  isDropDown={true}
                  dropdownItems={weightUnit}
                />
              )}
            />
          </View>
          <View style={styles.doubleInputs}>
            {errors.weight && (
              <Text style={styles.errorMessage}>{errors?.weight?.message}</Text>
            )}
            {errors.weight_unit && (
              <Text style={styles.errorMessage}>
                {errors?.weight_unit?.message}
              </Text>
            )}
          </View>

          <Controller
            control={control}
            name="status"
            rules={{ required: "Status is required" }}
            render={({ field: { value } }) => (
              <CustomInput
                label="Current Status"
                placeholderText="Enter status"
                onChange={(text) => handleFieldChange("status", text)}
                value={value}
                isDropDown={true}
                dropdownItems={statusOptions}
              />
            )}
          />
          {errors.status && (
            <Text style={styles.errorMessage}>{errors?.status?.message}</Text>
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

export default memo(TellUsALittleAboutYou);

const styles = StyleSheet.create({
  largeInput: {
    flex: 0.95,
  },
  smallInput: {
    flex: 0.5,
  },
  doubleInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
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
    marginBottom: Platform.select({ android: 40 }),
  },
  topContainer: {
    flexGrow: 1,
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
