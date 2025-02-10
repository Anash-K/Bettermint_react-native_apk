import React, { memo } from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import CustomFont from "../assets/fonts/customFonts";
import { colors } from "../constants/colors";


interface SimpleTabWrapperType {
  children: React.ReactNode;
  title: string;
  customBoxStyle?: ViewStyle;
}

const SimpleTabWrapper: React.FC<SimpleTabWrapperType> = memo(
  ({ title, children, customBoxStyle }) => {
    return (
      <View style={[styles.container, customBoxStyle]}>
        <Text style={styles.title}>{title}</Text>
        {children}
      </View>
    );
  }
);

export default SimpleTabWrapper;

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
  },
  title: {
    fontFamily: CustomFont.Urbanist700,
    fontSize: 24,
    lineHeight: 28.8,
    color: colors.primary,
    marginBottom: 15,
  },
});
