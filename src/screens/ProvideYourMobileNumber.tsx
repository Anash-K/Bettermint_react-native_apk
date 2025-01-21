import { StyleSheet, Text, View } from "react-native";
import { useCustomStyle } from "../constants/CustomStyles";
import React, { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CustomInput from "../common/CustomInput";
import CustomFont from "../assets/fonts/customFonts";
import { ICountry } from "react-native-international-phone-number";
import CustomButton from "../common/CustomButton";
import { ScreenProps } from "../navigator/Stack";

interface Inputs {
  phoneNumber: string;
}

const ProvideYourMobileNumber: React.FC<
  ScreenProps<"ProvideYourMobileNumber">
> = ({ navigation }) => {
  const {
    control,
    formState: { errors },
  } = useForm<Inputs>();
  const CustomStyle = useCustomStyle();
  const [selectedCountry, setSelectedCountry] = useState<null | ICountry>(null);

  const handleSelectedCountry = useCallback((country: ICountry) => {
    setSelectedCountry(country);
    console.log(country?.callingCode);
  }, []);

  const handleNextNav = useCallback(() => {
    navigation.navigate("WhatsYourHeight");
  }, []);

  
  return (
    <View style={[styles.container, CustomStyle.safeAreaMarginBottom]}>
      <View style={{ flex: 1 }}>
        <Text style={[CustomStyle.title, styles.title]}>
          Please Provide Your Mobile Number
        </Text>
        <Controller
          control={control}
          name="phoneNumber"
          rules={{
            required: "Phone number is required",
            maxLength: {
              value: 15,
              message: "Phone number cannot exceed 15 characters",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <CustomInput
              placeholderText="Enter phone number"
              onChange={onChange}
              isPhoneInput={true}
              selectedCountry={selectedCountry}
              OnCountryChange={handleSelectedCountry}
              inputConfigurations={{
                value: value,
                onChangeText: onChange,
              }}
            />
          )}
        />
        {errors.phoneNumber && (
          <Text style={CustomStyle.errorMessage}>
            {errors.phoneNumber.message}
          </Text>
        )}
      </View>
      <CustomButton text="Continue" onPress={handleNextNav} />
    </View>
  );
};

export default ProvideYourMobileNumber;

const styles = StyleSheet.create({
  title: {
    maxWidth: 300,
    marginHorizontal: "auto",
  },
  container: {
    flex: 1,
    padding: 16,
  },
});
