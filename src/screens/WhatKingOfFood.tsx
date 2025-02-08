import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import React, { useCallback, useState } from "react";

import { useCustomStyle } from "../constants/CustomStyles";
import CustomFont from "../assets/fonts/customFonts";
import { colors } from "../constants/colors";
import FastImage from "react-native-fast-image";
import { CustomImages } from "../assets/CustomImages";
import { ScreenProps } from "../navigator/Stack";
import { useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import WhiteDot from "../common/WhiteDotBtn";
import DrawerButton from "../common/DrawerButton";
import CustomButton from "../common/CustomButton";

type FoodYouEatState = {
  "Junk, fried, MSG - yummy in my tummy!": boolean;
  "Milkshake, cold coffee, desserts": boolean;
  "Mocktails & aerated beverages": boolean;
  Alcohol: boolean;
};

const { width, height } = Dimensions.get("screen");

const WhatKingOfFoodYouEat: React.FC<ScreenProps<"WhatKingOfFoodYouEat">> = ({
  navigation,
}) => {
  const { gender } = useSelector((state: RootState) => state.auth);
  const CustomStyle = useCustomStyle();
  const initialState: FoodYouEatState = {
    "Junk, fried, MSG - yummy in my tummy!": false,
    "Milkshake, cold coffee, desserts": false,
    "Mocktails & aerated beverages": false,
    Alcohol: false,
  };

  const [selectedFood, setSelectedFood] =
    useState<FoodYouEatState>(initialState);
  const [isSimpleMeal, setIsSimpleMeal] = useState<boolean>(false);

  console.log(height);

  const handlePress = useCallback(
    (food: keyof FoodYouEatState) => {
      // If "Simple, homely meals" is selected, set it to false
      if (isSimpleMeal) {
        setIsSimpleMeal(false);
      }

      // Toggle the selected food item
      setSelectedFood((prevState) => ({
        ...prevState,
        [food]: !prevState[food],
      }));
    },
    [isSimpleMeal]
  );

  const handleNextNav = useCallback(() => {
    navigation.navigate("HowDoYouGenerallyFeel");
  }, []);

  const simpleMealHandler = useCallback(() => {
    // If "Simple, homely meals" is selected, set all selected foods to false
    if (!isSimpleMeal) {
      setSelectedFood({
        "Junk, fried, MSG - yummy in my tummy!": false,
        "Milkshake, cold coffee, desserts": false,
        "Mocktails & aerated beverages": false,
        Alcohol: false,
      });
    }

    setIsSimpleMeal(!isSimpleMeal);
  }, [isSimpleMeal]);

  return (
    <ScrollView
      style={[styles.container, CustomStyle.safeAreaMarginBottom]}
      contentContainerStyle={styles.contentStyle}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <View style={{ flex: 1 }}>
        <Text style={CustomStyle.title}>
          What kind of food do you usually eat?
        </Text>

        <View style={styles.radioButtonBox}>
          <TouchableOpacity
            style={[styles.checkBox, isSimpleMeal && styles.focusCheckBox]}
            onPress={simpleMealHandler}
          >
            <View style={styles.checkBoxHeader}>
              <Text
                style={[
                  styles.checkBoxHeading,
                  isSimpleMeal && { color: colors.white },
                ]}
              >
                Simple, homely meals
              </Text>
              <WhiteDot isFocus={isSimpleMeal} />
            </View>
            <Text
              style={[
                styles.textContent,
                isSimpleMeal && { color: colors.white },
              ]}
            >
              Mostly salads, coffee with little to no sugar or very simple, home
              like food with very less oil (if you can see a layer of oil on
              top, that’s not less)
            </Text>
          </TouchableOpacity>
          <View style={styles.BottomCheckBox}>
            <View style={styles.checkBoxTitleBox}>
              <Text style={styles.checkBoxHeading}>Living my life</Text>
              <View style={styles.multiSelectBox}>
                <Text style={styles.subTitle}>Multi-select</Text>
                <FastImage
                  source={CustomImages.multiSelect}
                  style={styles.multiSelect}
                />
              </View>
            </View>
            {Object.keys(initialState).map((food) => (
              <DrawerButton
                key={food}
                text={food}
                outBoxStyle={styles.outterBox}
                buttonStyle={styles.commonButtonStyle}
                textStyle={
                  [
                    styles.btnText,
                    selectedFood[food as keyof FoodYouEatState] && {
                      color: colors.primaryLight,
                    },
                  ] as any
                }
                customIcon={
                  <WhiteDot
                    customStyle={[
                      !!selectedFood[food as keyof FoodYouEatState] && {
                        borderColor: colors.primaryLight,
                      },
                    ] as any}
                    innerDotStyle={[
                      !!selectedFood[food as keyof FoodYouEatState] && {
                        backgroundColor: colors.primaryLight,
                      },
                    ] as any}
                    isFocus={!!selectedFood[food as keyof FoodYouEatState]}
                  />
                }
                onPress={() => handlePress(food as keyof FoodYouEatState)}
                customIconPosition="right"
                isFocus={selectedFood[food as keyof FoodYouEatState]}
              />
            ))}
          </View>
        </View>
        <CustomButton
          text="Continue"
          onPress={handleNextNav}
          buttonStyle={[
            styles.bottomButton,
            ...(height < 840 ? [styles.smallDeviceStyle] : []),
          ]}
        />
      </View>
    </ScrollView>
  );
};

export default WhatKingOfFoodYouEat;

const styles = StyleSheet.create({
  outterBox:{
    borderWidth:0,
    paddingHorizontal:16
  },
  smallDeviceStyle: {
    marginBottom: Platform.select({ ios: 15, android: 40 }),
  },
  bottomButton: {
    marginBottom: Platform.select({ ios: 15 }),
  },
  focusCheckBox: {
    backgroundColor: colors.primaryLight,
  },
  BottomCheckBox: {
    backgroundColor: colors.white,
    paddingVertical: 24,
    borderRadius: 20,
  },
  checkBoxTitleBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomColor: "#F2F7F6",
    borderBottomWidth: 1,
  },
  textContent: {
    color: colors.secondaryLight,
    fontSize: 14,
    fontFamily: CustomFont.Urbanist500,
  },
  checkBoxHeading: {
    fontSize: 18,
    lineHeight: 21.6,
    fontFamily: CustomFont.Urbanist700,
    color: colors.primary,
  },
  checkBoxHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  checkBox: {
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 16,
    paddingVertical: 24,
    borderWidth: 4,
    borderColor: "transparent",
    borderRadius: 20,
    marginBottom: 8,
  },
  ringBorder: {
    borderColor: colors.primary,
    borderWidth: 2,
    width: 20,
    height: 20,
    borderRadius: 50,
  },
  contentStyle: {
    flexGrow: 1,
  },
  multiSelectBox: {
    flexDirection: "row-reverse",
    columnGap: 8,
    justifyContent: "center",
  },
  multiSelect: {
    width: 14,
    height: 14,
  },
  subTitle: {
    fontFamily: CustomFont.Urbanist600,
    fontSize: 14,
    lineHeight: 16.8,
    color: colors.secondaryLight,
  },
  radioButtonBox: {
    rowGap: 9,
    marginTop: 48,
    flex: 1,
    marginBottom: 48,
  },
  btnText: {
    fontSize: 16,
    lineHeight: 19.2,
    fontFamily: CustomFont.Urbanist700,
    color: colors.secondaryLight,
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 25,
  },
  commonButtonStyle: {
    width: "100%",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 0,
    columnGap: 19,
    backgroundColor: "transparent",
    borderBottomColor:colors.appBackground,
    borderBottomWidth:0.5,
    borderRadius:0
  },
});
