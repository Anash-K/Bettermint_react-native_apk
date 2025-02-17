import { Platform, TextStyle, ViewStyle } from "react-native";
import CustomFont from "../assets/fonts/customFonts";
import { colors } from "./colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const useCustomStyle = () => {
  const insets = useSafeAreaInsets();

  return {
    tagsStyle: {
      fontSize: 16,
      lineHeight: 19.2,
      fontFamily: CustomFont.Urbanist600,
      color: colors.primary,
      textAlign: "center",
    } as TextStyle,
    SelectQuestionStyle: {
      fontSize: 20,
      lineHeight: 24,
      fontFamily: CustomFont.Urbanist700,
      marginBottom: 24,
      color: colors.primary,
      textAlign: "center",
      paddingHorizontal: 16,
    } as TextStyle,
    cardStyle: {
      backgroundColor: "#fff",
      borderRadius: 20,
      paddingVertical: 24,
      paddingHorizontal: 16,
      marginVertical: 16,
      shadowColor: colors.gray,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 10,
      marginHorizontal: 16,
    } as ViewStyle,
    calenderDates: {
      textAlign: "center",
      alignSelf: "center",
      fontSize: 11,
      fontFamily: CustomFont.Urbanist700,
      lineHeight: 13.2,
      color: colors.secondary,
    } as TextStyle,
    commonText: {
      fontSize: 14,
      lineHeight: 16.8,
      color: colors.secondaryLight,
      fontFamily: CustomFont.Urbanist600,
    } as TextStyle,
    title: {
      fontFamily: CustomFont.Urbanist800,
      color: colors.primary,
      fontSize: 28,
      lineHeight: 33.6,
      textAlign: "center",
    } as TextStyle,
    subtitle: {
      fontFamily: CustomFont.Urbanist400,
      color: colors.secondaryLight,
      fontSize: 16,
      lineHeight: 19.2,
      textAlign: "center",
    } as TextStyle,
    safeAreaMarginBottom: {
      marginBottom: Platform.select({
        ios: insets.bottom,
        android: insets.bottom + 20,
      }),
    },
    safeAreaMarginTop: {
      marginTop: Platform.select({
        ios: insets.top,
        android: insets.top + 20,
      }),
    },
    errorMessage: {
      fontSize: 11,
      fontFamily: CustomFont.Urbanist400,
      color: colors.error,
      marginLeft: 10,
    } as TextStyle,
    contentParaStyle: {
      fontSize: 16,
      lineHeight: 19.2,
      fontFamily: CustomFont.Urbanist500,
      marginBottom: 16,
      color:colors.secondary
    } as TextStyle,
    CommonCardShadow: {
      shadowColor: colors.gray,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 10,
    } as ViewStyle,
  };
};
