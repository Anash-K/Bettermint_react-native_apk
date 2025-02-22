import React, { memo, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScreenProps } from "../navigator/Stack";
import { CustomImages } from "../assets/CustomImages";
import CustomFont from "../assets/fonts/customFonts";
import { colors } from "../constants/colors";
import FastImage from "react-native-fast-image";
import Share from "react-native-share";
import CustomButton from "../common/CustomButton";

const FreeSubscription: React.FC<ScreenProps<"FreeSubscription">> = memo(() => {
  const handlePress = useCallback(() => {
    const options = {
      title: "Invite Friends",
      message: "Join now and get a free month! Use my referral code: R2E1MFS",
    };
    Share.open(options)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });
  }, []);

  return (
    <View style={styles.container}>
      <FastImage
        style={styles.bgImage}
        source={CustomImages.freeSubBackground}
      />
      <FastImage style={styles.circularTop} source={CustomImages.circularTop} />
      <View style={styles.content}>
        <View style={styles.titleBox}>
          <FastImage
            style={styles.gradient}
            source={CustomImages.liearGradientLine}
          />
          <Text style={styles.title}>Free Subscription</Text>
          <FastImage
            style={[styles.gradient, styles.gradientRight]}
            source={CustomImages.liearGradientLine}
          />
        </View>

        <Text style={styles.subTitle}>
          Share your unique referral code and earn a{" "}
          <Text style={styles.blueText}>free month </Text> for every friend who
          subscribes for at least 3 months.
        </Text>

        <FastImage
          style={styles.referCodeBg}
          source={CustomImages.referCodeBg}
          resizeMode="contain"
        >
          <Text style={styles.referCodeText}>Your referral code</Text>
          <Text style={styles.referCode}>R 2 E 1 M F S</Text>
          <View style={styles.copyCodeBox}>
            <Text style={[styles.referCodeText, styles.tapToCopyText]}>
              Tap to copy
            </Text>
            <FastImage style={styles.copyIcon} source={CustomImages.copyIcon} />
          </View>
        </FastImage>
        <CustomButton text="Invite friends" onPress={handlePress} />
        <Text style={[styles.subTitle, styles.bottomText]}>
          Terms and Conditions <Text style={styles.bottomTextPart}>apply.</Text>
        </Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  bottomTextPart: {
    color: colors.secondary,
  },
  gradientRight: {
    transform: [{ rotateZ: "180deg" }],
  },
  titleBox: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
    marginBottom: 8,
  },
  gradient: {
    height: 1.5, // Ensure it covers the entire screen
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  circularTop: {
    width: "100%",
    height: 40,

    marginTop: 21,
  },
  tapToCopyText: {
    color: colors.secondary,
  },
  copyCodeBox: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 9,
  },
  referCode: {
    fontSize: 24,
    lineHeight: 28.8,
    fontFamily: CustomFont.Urbanist800,
    color: colors.primary,
    marginTop: 4,
    marginBottom: 12,
  },
  referCodeText: {
    fontSize: 14,
    lineHeight: 16.8,
    fontFamily: CustomFont.Urbanist500,
  },
  copyIcon: {
    width: 16,
    height: 16,
  },
  referCodeBox: {},
  bottomText: {
    fontFamily: CustomFont.Urbanist600,
    marginTop: 16,
    color: colors.primary,
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
    fontStyle: "italic",
  },
  content: {
    padding: 16,
    backgroundColor: colors.white,
    paddingTop: 5,
    flexGrow: 1,
  },
  referCodeBg: {
    width: "100%",
    aspectRatio: 5 / 1.6,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 24,
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
