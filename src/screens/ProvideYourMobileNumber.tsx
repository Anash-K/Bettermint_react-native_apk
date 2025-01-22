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
    setValue,
    formState: { errors },
  } = useForm<Inputs>();
  const CustomStyle = useCustomStyle();
  const [selectedCountry, setSelectedCountry] = useState<null | ICountry>(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSelectedCountry = useCallback((country: ICountry) => {
    setSelectedCountry(country);
    console.log(country?.callingCode);
  }, []);

  const handleNextNav = useCallback(() => {
    navigation.navigate("WhatsYourHeight");
  }, []);

  const handleInputChange = useCallback((text: string) => {
    console.log(text)
    // Filter out non-numeric characters
    setValue("phoneNumber", text.replace(/[^0-9]/g, ""));
  }, [setValue]);

  
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
            pattern: {
              value: /^[0-9]*$/,
              message: "Only numeric values are allowed",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <CustomInput
              placeholderText="Enter phone number"
              onChange={(text) => {
                // Remove non-numeric characters and limit input length
                const formattedText = text.replace(/[^0-9]/g, "").slice(0, 15);
                console.log(text)
                onChange(formattedText);
              }}
              isPhoneInput={true}
              selectedCountry={selectedCountry}
              OnCountryChange={handleSelectedCountry}
              inputConfigurations={{
                value: value,
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
