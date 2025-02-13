import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { memo, useCallback, useState } from "react";
import { ScreenProps } from "../navigator/Stack";
import { colors } from "../constants/colors";
import { useCustomStyle } from "../constants/CustomStyles";
import RangeSelector from "../common/RangeSelector";
import { CustomImages } from "../assets/CustomImages";
import CommonSaveBtn from "../components/CommonSaveBtn";

const MealsArray = [
  {
    title: "Veggies",
    image: CustomImages.veggies,
    amount: 40,
  },
  {
    title: "Protein",
    image: CustomImages.protein,
    amount: 30,
  },
  {
    title: "Carbs",
    image: CustomImages.carbs,
    amount: 20,
  },
  {
    title: "Sugary Foods",
    image: CustomImages.sugar,
    amount: 5,
  },
  {
    title: "Fried Foods",
    image: CustomImages.friedFood,
    amount: 5,
    removeBottomBorder: true,
  },
];

const LogBalancedMeals: React.FC<ScreenProps<"LogBalancedMeals">> = () => {
  const { SelectQuestionStyle, safeAreaMarginBottom } = useCustomStyle();
  const [meals, setMeals] = useState(MealsArray);
  const handleValueChange = useCallback((title: string, value: number) => {
    setMeals((prevMeals) =>
      prevMeals.map((meal) =>
        meal.title === title ? { ...meal, amount: value } : meal
      )
    );
  }, []);
  return (
    <View style={[styles.container, safeAreaMarginBottom]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[SelectQuestionStyle, styles.title]}>Meals</Text>
          <Text style={[SelectQuestionStyle, styles.title]}>100%</Text>
        </View>
        <FlatList
          data={meals}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <RangeSelector
              value={item.amount}
              setValue={(value) => handleValueChange(item.title, value)}
              title={item.title}
              icon={item.image}
              removeBottomBorder={item.removeBottomBorder}
            />
          )}
          bounces={false}
        />
      </View>
      <CommonSaveBtn NavPage="LogFixYourBasics" />
    </View>
  );
};

export default memo(LogBalancedMeals);

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    paddingTop:16,
    paddingBottom: 0,
    justifyContent: "space-between",
  },
  content: {
    backgroundColor: colors.white,
    borderRadius: 14,
    paddingVertical: 24,
    marginHorizontal: 16,
  },
  title: {
    marginBottom: 0,
    textAlign: "left",
  },
});
