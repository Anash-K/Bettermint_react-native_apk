import { StyleSheet, Text, View } from "react-native";
import { useCustomStyle } from "../constants/CustomStyles";
import CustomFont from "../assets/fonts/customFonts";
import DrawerButton from "../common/DrawerButton";
import React, { useCallback, useState } from "react";
import WhiteDot from "../common/WhiteDotBtn";
import CustomButton from "../common/CustomButton";
import { ScreenProps } from "../navigator/Stack";

const HowDoYouGenerallyFeel: React.FC<ScreenProps<"HowDoYouGenerallyFeel">> = ({
  navigation,
}) => {
  const CustomStyle = useCustomStyle();
  const initialState = {
    CanPayAttention: true,
    NeedTeaOrCoffee: false,
  };

  const [radioButton, setRadioButton] = useState(initialState);

  const handlePress = useCallback(
    (action: string) => {
      setRadioButton({
        CanPayAttention: false,
        NeedTeaOrCoffee: false,
        [action]: true, // Set only the selected option to true
      });
    },
    [radioButton]
  );

  const handleNextNav = useCallback(() => {
    navigation.navigate("BottomTabStack");
  }, []);

  return (
    <View style={[styles.container, CustomStyle.safeAreaMarginBottom]}>
      <Text style={[CustomStyle.title, styles.title]}>
        How do you generally feel after a meal outside or ordered-in meal?
      </Text>
      <View style={styles.radioButtonBox}>
        <DrawerButton
          text="Can pay attention to work / read without falling asleep"
          buttonStyle={styles.commonButtonStyle}
          textStyle={styles.btnText}
          customIcon={<WhiteDot isFocus={radioButton.CanPayAttention} />}
          onPress={() => handlePress("CanPayAttention")}
          customIconPosition="right"
          isFocus={radioButton.CanPayAttention}
        />
        <DrawerButton
          text="Need tea or coffee to stay awake"
          buttonStyle={styles.commonButtonStyle}
          textStyle={styles.btnText}
          customIcon={<WhiteDot isFocus={radioButton.NeedTeaOrCoffee} />}
          onPress={() => handlePress("NeedTeaOrCoffee")}
          customIconPosition="right"
          isFocus={radioButton.NeedTeaOrCoffee}
        />
      </View>
      <CustomButton text="Continue" onPress={handleNextNav} />
    </View>
  );
};

export default HowDoYouGenerallyFeel;

const styles = StyleSheet.create({
  subTitle: {
    textAlign: "center",
    fontFamily: CustomFont.Urbanist500,
    fontSize: 16,
    lineHeight: 19.2,
    marginTop: 24,
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 0,
    paddingBottom: 15,
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
    flex: 1,
  },
});
