import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useCustomStyle } from "../constants/CustomStyles";
import React, { useCallback, useState } from "react";
import CustomInput from "../common/CustomInput";
import { ICountry } from "react-native-international-phone-number";
import CustomButton from "../common/CustomButton";
import { ScreenProps } from "../navigator/Stack";

const ProvideYourMobileNumber: React.FC<
  ScreenProps<"ProvideYourMobileNumber">
> = ({ navigation }) => {
  const CustomStyle = useCustomStyle();
  const [selectedCountry, setSelectedCountry] = useState<null | ICountry>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false); // Track if input has been touched

  const handleSelectedCountry = useCallback((country: ICountry) => {
    setSelectedCountry(country);
    console.log(country?.callingCode);
  }, []);

  const handleInputChange = useCallback(
    (text: string) => {
      const formattedText = text.replace(/[^0-9]/g, "").slice(0, 15);

      if (formattedText.length > 15) {
        setError("Phone number cannot exceed 15 characters");
        return
      } else if (!/^[0-9]*$/.test(formattedText)) {
        setError("Only numeric values are allowed");
        return
      } else {
        setError(null);
      }
      setTouched(true); // Set touched when user types

      setPhoneNumber(text);
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
      // If all checks pass, navigate to the next screen
      navigation.navigate("WhatsYourHeight");
    }
  }, [phoneNumber, setError, setTouched, navigation]);
  
  console.log('phone', phoneNumber)

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container, CustomStyle.safeAreaMarginBottom]}>
        <View style={{ flex: 1 }}>
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
          {error && (
            <Text style={CustomStyle.errorMessage}>{error}</Text>
          )}
        </View>
        <CustomButton text="Continue" onPress={handleNextNav} />
      </View>
    </TouchableWithoutFeedback>
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
