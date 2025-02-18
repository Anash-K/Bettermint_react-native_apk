import { ScrollView, StyleSheet, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import { CustomImages } from "../assets/CustomImages";
import { useSelector } from "react-redux";
import { useCustomStyle } from "../constants/CustomStyles";
import CustomFont from "../assets/fonts/customFonts";
import { colors } from "../constants/colors";
import { RootState } from "../redux/rootReducer";
import React, { memo } from "react";
import { ScreenProps } from "../navigator/Stack";

const Guide:React.FC<ScreenProps<'Guide'>> = () => {
  const { profileInfo } = useSelector((state: RootState) => state.userDetails);

  return (
    <ScrollView
      style={[styles.container]}
      contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <FastImage
        source={
          profileInfo.gender == "Male"
            ? CustomImages.maleBody
            : CustomImages.femaleBody
        }
        resizeMode="contain"
        style={styles.bodyStyle}
      />
      <Text style={styles.content}>
        The best time to measure yourself is in the morning after you have
        emptied your bowels & before you have eaten anything. For now you can
        give us approximates & update this later from Profile. Please use the
        image for measurement reference Insert image reference
      </Text>
    </ScrollView>
  );
};

export default memo(Guide);

const styles = StyleSheet.create({
  content: {
    fontFamily: CustomFont.Urbanist500,
    fontSize: 16,
    lineHeight: 19.2,
    marginTop: 40,
    marginBottom: 30,
    color: colors.secondary,
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 40,
  },
  bodyStyle: {
    width: 197,
    height: 400,
    marginHorizontal: "auto",
  },
});
