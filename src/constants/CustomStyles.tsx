import { TextStyle } from "react-native";
import CustomFont from "../assets/fonts/customFonts";
import { colors } from "./colors";

export const CustomStyle = {
  title: {
    fontFamily: CustomFont.Urbanist700,
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
};
