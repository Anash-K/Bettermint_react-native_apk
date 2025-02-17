import { ImageSourcePropType, StyleSheet, Text, View } from "react-native";
import FastImage from "react-native-fast-image";

import React from "react";
import { useCustomStyle } from "../constants/CustomStyles";
import { colors } from "../constants/colors";
import CustomFont from "../assets/fonts/customFonts";


interface LinearProgressBarProps {
  iconSrc: ImageSourcePropType; // Type for the image source (FastImage)
  title: string;
  score: number;
  content: string;
  totalPoints: number;
  fillColor?: string; // Customizable fill color
  unfillColor?: string; // Customizable unfill color
}

const LinearProgressBar: React.FC<LinearProgressBarProps> = ({
  iconSrc,
  title,
  score,
  content,
  totalPoints,
}) => {
  const CustomStyle = useCustomStyle();
  // Create an array to map over for filled/unfilled views
  const filledBlocks = Array(score).fill(1); // Array of filled blocks
  const unfilledBlocks = Array(totalPoints - score).fill(1); // Array of unfilled blocks

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <FastImage
          style={styles.iconStyle}
          source={iconSrc as any}
          resizeMode="contain"
        />
        <Text style={[CustomStyle.cardTitle, styles.title]}>{title}</Text>
        <View style={styles.scoreBox}>
          <Text style={[CustomStyle.cardTitle, styles.scoreText]}>
            {score}/{totalPoints}
          </Text>
        </View>
      </View>

      {/* Content */}
      <Text style={[CustomStyle.cardContent, styles.content]}>{content}</Text>

      {/* Progress Bar */}
      <View style={styles.progressBar}>
        {/* Render filled blocks */}
        {filledBlocks.map((_, index) => (
          <View key={`filled-${index}`} style={styles.progressFill} />
        ))}

        {/* Render unfilled blocks */}
        {unfilledBlocks.map((_, index) => (
          <View key={`unfilled-${index}`} style={styles.progressUnfilled} />
        ))}
      </View>
    </View>
  );
};

export default LinearProgressBar;

const styles = StyleSheet.create({
  scoreBox: {
    backgroundColor: colors.white,
    borderRadius: 28,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
  },
  container: {
    backgroundColor: colors.lottieGreen,
    padding: 16,
    borderRadius: 20,
  },
  iconStyle: {
    width: 16,
    height: 16,
  },
  title: {
    flex: 1,
    fontFamily: CustomFont.Urbanist700,
    lineHeight: 16.8,
    fontSize: 14,
    textAlign: "left",
    color: colors.white,
  },
  scoreText: {
    color: colors.lottieGreen,
    fontFamily: CustomFont.Urbanist700,
    lineHeight: 16.8,
    fontSize: 14,
  },
  content: {
    marginTop: 8,
    marginBottom: 16,
    fontFamily: CustomFont.Urbanist500,
    lineHeight: 19.2,
    fontSize: 16,
    color: colors.white,
  },
  progressBar: {
    flexDirection: "row",
    marginTop: 10,
  },
  progressFill: {
    backgroundColor: colors.white,
    width: 20, // Each block's width
    height: 4,
    marginRight: 8,
    borderRadius: 56,
    flex: 1,
  },
  progressUnfilled: {
    backgroundColor: colors.white,
    opacity: 0.25,
    width: 20, // Each block's width
    height: 4,
    marginRight: 8,
    borderRadius: 56,
    flex: 1,
  },
});
