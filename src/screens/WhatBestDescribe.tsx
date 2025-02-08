import { StyleSheet, Text, View } from "react-native";
import { useCustomStyle } from "../constants/CustomStyles";
import { CustomImages } from "../assets/CustomImages";
import React, { useCallback, useState } from "react";
import { ScreenProps } from "../navigator/Stack";
import DrawerButton from "../common/DrawerButton";
import WhiteDot from "../common/WhiteDotBtn";
import CustomButton from "../common/CustomButton";

const WhatBestDescribe:React.FC<ScreenProps<'WhatBestDescribe'>> = ({navigation}) => {
  const CustomStyle = useCustomStyle();
  const initialState = {
    working: true,
    studying: false,
    neither: false,
  };

  const [radioButton, setRadioButton] = useState(initialState);

  const handlePress = useCallback(
    (action: string) => {
      setRadioButton({
        working: false,
        studying: false,
        neither: false,
        [action]: true, // Set only the selected option to true
      });
    },
    [radioButton]
  );

  const handleNextNav = useCallback(() => {
    navigation.navigate('AddYourPhoto')
  }, []);

  return (
    <View style={[styles.container, CustomStyle.safeAreaMarginBottom]}>
      <Text style={CustomStyle.title}>
        What best describes your current status?
      </Text>
      <View style={styles.radioButtonBox}>
        <DrawerButton
          text="Working"
          buttonStyle={styles.commonButtonStyle}
          textStyle={styles.btnText}
          customIcon={<WhiteDot isFocus={radioButton.working}/>}
          onPress={handlePress.bind(this, "working")}
          customIconPosition="right"
          isFocus={radioButton.working}
        />
        <DrawerButton
          text="Studying"
          buttonStyle={styles.commonButtonStyle}
          textStyle={styles.btnText}
          customIcon={<WhiteDot isFocus={radioButton.studying} />}
          onPress={handlePress.bind(this, "studying")}
           customIconPosition="right"
          isFocus={radioButton.studying}
        />
        <DrawerButton
          text="Neither"
          buttonStyle={styles.commonButtonStyle}
          textStyle={styles.btnText}
          customIcon={<WhiteDot isFocus={radioButton.neither}/>}
          onPress={handlePress.bind(this, "neither")}
          customIconPosition="right"
          isFocus={radioButton.neither}
        />
      </View>
      <CustomButton text="Continue" onPress={handleNextNav} />
    </View>
  );
};

export default WhatBestDescribe;

const styles = StyleSheet.create({
  radioButtonBox: {
    rowGap: 9,
    marginTop: 48,
    flex: 1,
  },
  btnText: {
    fontSize: 16,
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 40,
  },
  commonButtonStyle: {
    width: "100%",
    justifyContent: "space-between",
    paddingVertical: 18.5,
    paddingRight:18,

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
