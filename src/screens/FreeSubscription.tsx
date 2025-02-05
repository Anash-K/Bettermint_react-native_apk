import React, { memo, useCallback } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { ScreenProps } from "../navigator/Stack";
import { CustomImages } from "../assets/CustomImages";
import CustomFont from "../assets/fonts/customFonts";
import { colors } from "../constants/colors";
import CustomButton from "../common/CustomButton";

const FreeSubscription: React.FC<ScreenProps<"FreeSubscription">> = memo(() => {
  const handlePress = useCallback(() => {}, []);
  return (
    <View>
      <ImageBackground
        style={styles.bgImage}
        source={CustomImages.freeSubBackground}
      />
      <View style={styles.content}>
        <Text style={styles.title}>Free Subscription</Text>
        <Text style={styles.subTitle}>
          Share your unique referral code and earn a{" "}
          <Text style={styles.blueText}>free month </Text> for every friend who
          subscribes for at least 3 months.
        </Text>
        <View>
          <ImageBackground
            style={styles.referCodeBg}
            source={CustomImages.referCodeBg}
          />
        </View>
        <CustomButton text="Invite friends" onPress={handlePress} />
        <Text style={[styles.subTitle, styles.bottomText]}>
          Terms and Conditions apply.
        </Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  bottomText: {
    fontFamily: CustomFont.Urbanist600,
    marginTop: 16,
  },
  blueText: {
    color: colors.unitColor,
  },
  subTitle: {
    fontFamily: CustomFont.Urbanist500,
    fontSize: 16,
    lineHeight: 19.2,
    textAlign: "center",
    color: colors.secondary,
  },
  title: {
    fontSize: 24,
    lineHeight: 28.8,
    textAlign: "center",
    fontFamily: CustomFont.Urbanist800,
    color: colors.primary,
    marginBottom: 8,
  },
  content: {
    padding: 16,
  },
  referCodeBg: {
    width: "100%",
    height: 108,
  },
  bgImage: {
    width: "100%",
    height: 157,
    maxWidth: 300,
    margin: "auto",
  },
  container: {
    flex: 1,
  },
});

export default FreeSubscription;
