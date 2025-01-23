import { Platform, TextStyle } from "react-native";
import CustomFont from "../assets/fonts/customFonts";
import { colors } from "./colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const useCustomStyle = () => {
  const insets = useSafeAreaInsets();

  return {
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
      marginLeft:10
    } as TextStyle,
  };
};
