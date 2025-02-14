import { StyleSheet, Text, View } from "react-native";
import { useCustomStyle } from "../constants/CustomStyles";
import CustomFont from "../assets/fonts/customFonts";
import React, { useCallback, useState } from "react";
import { ScreenProps } from "../navigator/Stack";
import DrawerButton from "../common/DrawerButton";
import WhiteDot from "../common/WhiteDotBtn";
import CustomButton from "../common/CustomButton";
import { colors } from "../constants/colors";

const DoYouWorkOut: React.FC<ScreenProps<"DoYouWorkOut">> = ({
  navigation,
}) => {
  const CustomStyle = useCustomStyle();
  const initialState = {
    Yes: true,
    No: false,
  };

  const [radioButton, setRadioButton] = useState(initialState);

  const handlePress = useCallback(
    (action: string) => {
      setRadioButton({
        Yes: false,
        No: false,
        [action]: true, // Set only the selected option to true
      });
    },
    [radioButton]
  );

  const handleNextNav = useCallback(() => {
    navigation.navigate("WhatFormOfWorkout");
  }, []);

  return (
    <View style={[styles.container, CustomStyle.safeAreaMarginBottom]}>
      <Text style={[CustomStyle.title, styles.title]}>
        Do you work out for at least 50 mins a day for 5 days a week?
      </Text>
      <Text style={styles.subTitle}>
        This could be 50 minutes of brisk walking at a pace where talking is
        manageable but not comfortable. This doesn’t count a regular walk, brisk
        walk only. Any other form of workout is also great - swimming, yoga,
        cycling, a sport or even dancing! Anything that gets your heart rate
        going.
      </Text>
      <View style={styles.radioButtonBox}>
        <DrawerButton
          text="Yes"
          buttonStyle={styles.commonButtonStyle}
          textStyle={styles.btnText}
          customIcon={<WhiteDot isFocus={radioButton.Yes} />}
          onPress={handlePress.bind(this, "Yes")}
          customIconPosition="right"
          isFocus={radioButton.Yes}
        />
        <DrawerButton
          text="No"
          buttonStyle={styles.commonButtonStyle}
          textStyle={styles.btnText}
          customIcon={<WhiteDot isFocus={radioButton.No} />}
          onPress={handlePress.bind(this, "No")}
          customIconPosition="right"
          isFocus={radioButton.No}
        />
      </View>
      <CustomButton
        text="Continue"
        onPress={handleNextNav}
      />
    </View>
  );
};

export default DoYouWorkOut;

const styles = StyleSheet.create({
  subTitle: {
    textAlign: "center",
    fontFamily: CustomFont.Urbanist500,
    fontSize: 16,
    lineHeight: 19.2,
    marginTop: 24,
    color:colors.secondaryLight
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 0,
    paddingBottom:15
  },
  title: {
    maxWidth: 343,
    marginHorizontal: "auto",
    marginTop: 21,
  },
  commonButtonStyle: {
    width: "100%",
    justifyContent: "space-between",
    paddingVertical: 18.5,
    paddingRight: 18,
    paddingHorizontal: 16,

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
  radioButtonBox: {
    rowGap: 9,
    marginTop: 48,
    flex: 1,
  },
  btnText: {
    fontSize: 16,
  },
});
