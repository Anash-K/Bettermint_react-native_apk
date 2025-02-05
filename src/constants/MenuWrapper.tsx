import React, { memo } from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import CustomFont from "../assets/fonts/customFonts";
import { colors } from "./colors";

interface MenuWrapperType {
  children: React.ReactNode;
  title: string;
  WrapperBoxStyle?: ViewStyle | ViewStyle[];
}

const MenuWrapper: React.FC<MenuWrapperType> = memo(
  ({ children, title, WrapperBoxStyle }) => {
    return (
      <View style={[styles.container, WrapperBoxStyle]}>
        <Text style={styles.title}>{title}</Text>
        {children}
      </View>
    );
  }
);

export default MenuWrapper;

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
  },
  title: {
    fontFamily: CustomFont.Urbanist700,
    fontSize: 16,
    lineHeight: 19.2,
    color: colors.primary,
    marginBottom: 16,
  },
});
