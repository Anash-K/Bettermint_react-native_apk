import React, { memo } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { CustomImages } from "../assets/CustomImages";
import CustomFont from "../assets/fonts/customFonts";
import { colors } from "../constants/colors";
import { useCustomStyle } from "../constants/CustomStyles";

interface ProfileTab {
  title: String;
  icon: any;
  customStyle?: ViewStyle;
  otherText?: String;
  wantBottomBorder?: boolean;
  OnPressHandler?: () => void;
}

const MenuTab: React.FC<ProfileTab> = memo(
  ({
    title,
    icon,
    customStyle,
    otherText,
    wantBottomBorder,
    OnPressHandler,
  }) => {
    const CustomStyle = useCustomStyle();

    return (
      <TouchableOpacity
        onPress={OnPressHandler}
        style={[
          styles.container,
          wantBottomBorder && styles.bottomBorderStyle,
          CustomStyle.CommonCardShadow,
          customStyle,
        ]}
      >
        <View style={styles.innerContainer}>
          <View style={styles.iconBox}>
            <Image source={icon} style={styles.icon} />
          </View>

          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.rightBox}>
          {otherText && <Text style={styles.otherTextStyle}>{otherText}</Text>}
          <Image
            source={CustomImages.blackDropDownIcon}
            style={styles.tabIcon}
            resizeMode="contain"
            tintColor={colors.primary}
          />
        </View>
      </TouchableOpacity>
    );
  }
);

export default MenuTab;

const styles = StyleSheet.create({
  bottomBorderStyle: {
    borderBottomColor: "rgba(47, 47, 55, 1)",
    borderBottomWidth: 1,
  },
  rightBox: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
  },
  otherTextStyle: {
    fontSize: 14,
    lineHeight: 16.8,
    fontFamily: CustomFont.Urbanist500,
    color: "rgba(149, 149, 157, 1)",
    marginRight: 19,
  },
  tabIcon: {
    width: 18,
    height: 18,
    transform: [{ rotateZ: "-90deg" }],
  },
  innerContainer: {
    flexDirection: "row",
    columnGap: 12,
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    lineHeight: 19.2,
    color: colors.secondary,
    fontFamily: CustomFont.Urbanist600,
  },
  icon: {
    width: 20,
    height: 20,
  },
  iconBox: {
    backgroundColor: colors.menuTabBackground,
    paddingHorizontal: 9,
    paddingVertical: 9,
    borderRadius: 28,
  },
  container: {
    backgroundColor: colors.white,
    padding: 12,
    paddingRight: 17,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    marginVertical: 4,
  },
});
