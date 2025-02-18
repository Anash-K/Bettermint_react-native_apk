import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useCustomStyle } from "../constants/CustomStyles";
import React, { useCallback, useState } from "react";
import { ICountry } from "react-native-international-phone-number";
import { ScreenProps } from "../navigator/Stack";
import CustomButton from "../common/CustomButton";
import CustomInput from "../common/CustomInput";
import { useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";

const ProvideYourMobileNumber: React.FC<
  ScreenProps<"ProvideYourMobileNumber">
> = ({ navigation, route }) => {
  const CustomStyle = useCustomStyle();
  const [selectedCountry, setSelectedCountry] = useState<null | ICountry>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState<boolean>(false); // Track if input has been touched
  const { isProfileSetup } = useSelector(
    (state: RootState) => state.userDetails
  );

  const handleSelectedCountry = useCallback((country: ICountry) => {
    setSelectedCountry(country);
    console.log(country?.callingCode);
  }, []);

  const handleInputChange = useCallback(
    (text: string) => {
      const formattedText = text.replace(/[^0-9]/g, "").slice(0, 15); // Allow only numbers & limit to 15 digits

      if (formattedText.length > 15) {
        setError("Phone number cannot exceed 15 characters");
        return;
      } else if (!/^[0-9]*$/.test(formattedText)) {
        setError("Only numeric values are allowed");
        return;
      } else {
        setError(null);
      }
      setTouched(true); // Set touched when user types

      setPhoneNumber(formattedText); // Fix: Use formattedText instead of text
    },
    [phoneNumber, touched, error]
  );

  const handleNextNav = useCallback(() => {
    // Check if phone number is required
    // if (!phoneNumber) {
    //   setError("Phone number is required");
    //   setTouched(true); // Show error on submit attempt
    //   return; // Return early to prevent navigation
    // }

    if (!error) {
      {
        isProfileSetup
          ? navigation.goBack()
          : navigation.navigate("WhatsYourHeight");
      }
    }
  }, [phoneNumber, setError, setTouched, navigation]);

  console.log("phone", phoneNumber);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container, CustomStyle.safeAreaMarginBottom]}>
        <View style={styles.content}>
          <Text style={[CustomStyle.title, styles.title]}>
            Please Provide Your Mobile Number
          </Text>
          <CustomInput
            placeholderText="Enter phone number"
            onChange={handleInputChange}
            isPhoneInput={true}
            value={phoneNumber}
            selectedCountry={selectedCountry}
            OnCountryChange={handleSelectedCountry}
          />
          {error && <Text style={CustomStyle.errorMessage}>{error}</Text>}
        </View>
        <CustomButton
          text={isProfileSetup ? "Update Mobile No." : "Continue"}
          onPress={handleNextNav}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProvideYourMobileNumber;

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  title: {
    maxWidth: 300,
    marginHorizontal: "auto",
  },
  container: {
    flex: 1,
    padding: 16,
  },
});
