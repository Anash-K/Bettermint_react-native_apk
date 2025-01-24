import {
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CustomButton from "../common/CustomButton";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScreenProps } from "../navigator/Stack";
import { gender, logout } from "../redux/slices/authSlice";
import { useCustomStyle } from "../constants/CustomStyles";
import CustomInput from "../common/CustomInput";
import { Controller, useForm } from "react-hook-form";
import { colors } from "../constants/colors";
import CustomFont from "../assets/fonts/customFonts";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import useTimeFormatter from "../utils/timeFormatter";

interface Inputs {
  name: string;
  DOB: string | null;
  Gender: string;
  City: string;
}

const dropdownItems = [
  { title: "Male" },
  { title: "Female" },
  { title: "Other" },
];

const TellUsALittleAboutYou: React.FC<ScreenProps<"TellUsALittleAboutYou">> = ({
  navigation,
}) => {
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
      setValue('DOB',SomeDate );
      setError('DOB',"");
      hideDatePicker();
    },
    [hideDatePicker]
  );

  const dispatch = useDispatch();
  const CustomStyle = useCustomStyle();

  const onSubmit = useCallback((data: any) => {
    dispatch(gender(data.Gender));
    navigation.navigate("ProvideYourMobileNumber");
  }, []);

  const handleGenderChange = useCallback((gender:any) =>{
    setValue('Gender',gender.title);
    setError('Gender',"");
  },[]);

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
          Tell us a little about you
        </Text>
        <Text style={[CustomStyle.subtitle, styles.subtitle]}>
          Please provide basic details about yourself to personalize your
          experience.
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
                value:value,
                onChange:onChange
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
      </View>
      <CustomButton text="Continue" onPress={handleSubmit(onSubmit)} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </ScrollView>
  );
};

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
