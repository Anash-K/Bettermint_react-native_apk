import React, { memo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../constants/colors";
import CustomFont from "../../assets/fonts/customFonts";

export interface CommonPlansType {
  title: string;
  price: string;
  tag?: string;
  isSelected: boolean;
  OnSelectPlan: () => void;
}

const CommonPlans: React.FC<CommonPlansType> = memo(
  ({ title, price, tag, isSelected, OnSelectPlan }) => {
    return (
      <TouchableOpacity
        style={[styles.container, isSelected && styles.focusPlan]}
        onPress={OnSelectPlan}
      >
        <View style={styles.leftPart}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.price}>{price}</Text>
        </View>
        {tag && (
          <View style={styles.tagBox}>
            <Text style={styles.tag}>{tag}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }
);

export default CommonPlans;

const styles = StyleSheet.create({
  focusPlan: {
    borderColor: colors.primary,
    paddingVertical: 16,
  },
  tagBox: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 58,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  leftPart: {},
  price: {
    fontFamily: CustomFont.Urbanist600,
    fontSize: 16,
    lineHeight: 19.2,
    color: colors.blackPrimary,
  },
  title: {
    fontFamily: CustomFont.Urbanist400,
    fontSize: 14,
    lineHeight: 16.8,
    color: colors.blackPrimary,
    marginBottom: 8,
  },
  container: {
    backgroundColor: colors.lightblue,
    flexDirection: "row",
    padding: 16,
    borderRadius: 15,
    justifyContent: "space-between",
    marginVertical: 6,
    borderWidth: 2,
    borderColor: "transparent",
    paddingVertical: 12,
  },
  tag: {
    fontFamily: CustomFont.Urbanist500,
    fontSize: 12,
    lineHeight: 14.4,
    color: colors.white,
    textTransform: "uppercase",
  },
});
