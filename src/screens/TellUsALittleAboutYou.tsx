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
import { formatCase } from "../utils/formateCase";
import useUpdateUserProfile from "../hooks/useUpdateUserProfile";
import useUserDetails from "../hooks/useUserDetails";
import _ from "lodash";
import useMergeProfileInfo from "../hooks/useMergeProfileInfo";

interface Inputs {
  name: string;
  DOB: string;
  Gender: string;
  City: string;
  callingCode: string;
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
const weightUnit = [{ title: "kg" }, { title: "lbs" }];

const TellUsALittleAboutYou: React.FC<ScreenProps<"TellUsALittleAboutYou">> =
  memo(({ navigation }) => {
    const { isProfileSetup, profileInfo } = useUserDetails();

    console.log(profileInfo, "profile info");

    const [selectedCountry, setSelectedCountry] = useState<null | ICountry>(
      null
    );

    const [callingCode, setCallingCode] = useState("+91");

    const {
      handleSubmit,
      control,
      setValue,
      setError,
      formState: { errors },
    } = useForm<Inputs>({
      defaultValues: {
        name: profileInfo?.name,
        DOB: profileInfo.date_of_birth,
        Gender: formatCase({ str: profileInfo.gender, type: "capitalize" }),
        callingCode: profileInfo.callingCode,
        mobileNumber: profileInfo.mobile_number,
        City: profileInfo.city,
        height: profileInfo.height,
        weight: profileInfo.weight,
        status: formatCase({ str: profileInfo.status, type: "capitalize" }),
        height_unit: profileInfo.height_unit,
        weight_unit: profileInfo.weight_unit,
      },
    });

    useEffect(() => {
      if (profileInfo?.callingCode) {
        setCallingCode(profileInfo?.callingCode);
        setTimeout(() => {
          setValue("mobileNumber", profileInfo.mobile_number);
        }, 0);
      }
    }, [profileInfo, profileInfo.mobile_number]);

    const [isDatePickerVisible, setDatePickerVisibility] =
      useState<boolean>(false);

    const showDatePicker = useCallback(() => {
      setDatePickerVisibility(true);
    }, [isDatePickerVisible]);

    const hideDatePicker = useCallback(() => {
      setDatePickerVisibility(false);
    }, [isDatePickerVisible]);

    const handleSelectedCountry = useCallback(
      (country: ICountry) => {
        setSelectedCountry(country);
        if (country?.callingCode) {
          setCallingCode(country.callingCode);
        }
      },
      [callingCode, selectedCountry]
    );

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

    const { mutateAsync: updateUserProfile } = useUpdateUserProfile();
    const { mergeProfileInfo } = useMergeProfileInfo();

    const onSubmit = useCallback(
      async (data: Inputs) => {
        let DataObject = {
          name: data.name,
          date_of_birth: data.DOB,
          gender: formatCase({ str: data.Gender, type: "lower" }),
          callingCode: selectedCountry?.callingCode ?? "+91",
          mobile_number: data.mobileNumber,
          city: data.City,
          height: data.height,
          weight: data.weight,
          status: formatCase({ str: data.status, type: "lower" }),
          height_unit: data.height_unit,
          weight_unit: data.weight_unit,
        };

        try {
          await updateUserProfile({
            ...DataObject,
          });
        } catch (error) {
          console.error("Profile update failed", error);
          return;
        }
        mergeProfileInfo(DataObject);
        {
          isProfileSetup
            ? navigation.goBack()
            : navigation.navigate("AddYourPhoto");
        }
      },
      [selectedCountry, navigation, updateUserProfile, profileInfo, dispatch]
    );

    const handleFieldChange = useCallback(
      (fieldName: keyof Inputs, value: any) => {
        setValue(fieldName, value.title);
        setError(fieldName, { type: "manual", message: "" });
      },
      []
    );

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
                onChange={onChange}
                isPhoneInput={true}
                value={value}
                selectedCountry={selectedCountry}
                OnCountryChange={handleSelectedCountry}
                defaultCallingCode={callingCode}
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
              render={({ field: { value } }) => (
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
            text="Bottom Stack Mode"
            onPress={() => navigation.navigate("BottomTabStack")}
            buttonStyle={{ marginBottom: 15 }}
          />
        )}

        {__DEV__ && (
          <CustomButton
            text="Small Brief Mode"
            onPress={() => navigation.navigate("SmallBriefBettermint")}
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
