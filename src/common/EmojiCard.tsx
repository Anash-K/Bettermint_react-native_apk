import {
  ImageProps,
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import FastImage from "react-native-fast-image";
import { CustomImages } from "../assets/CustomImages";
import CustomFont from "../assets/fonts/customFonts";
import React from "react";
import { colors } from "../constants/colors";

interface EmojiOrImageCard {
  title: string;
  src: ImageProps | ImageProps[];
  iconSrc: ImageProps | ImageProps[];
  cardStyle?: ViewStyle | ViewStyle[];
  headerStyle?: ViewStyle | ViewStyle[];
  CustomIconStyle?: ImageStyle | ImageStyle[];
  titleStyle?: TextStyle | TextStyle[];
  customImageStyle?: ImageStyle | ImageStyle[];
  isCompleted?: boolean;
}

const EmojiOrImageCard: React.FC<EmojiOrImageCard> = ({
  title,
  src,
  iconSrc,
  cardStyle,
  headerStyle,
  CustomIconStyle,
  titleStyle,
  customImageStyle,
  isCompleted,
}) => {
  return (
    <View style={[styles.container, cardStyle]}>
      <View style={[styles.header, headerStyle]}>
        <FastImage
          style={[styles.iconStyle, CustomIconStyle as any]}
          source={iconSrc as any}
          resizeMode="contain"
        />
        <Text style={[styles.title, titleStyle]}>{title}</Text>
      </View>

      {isCompleted ? (
        <View style={styles.doneOutterCircle}>
          <View style={styles.doneInnerCircle}>
            <FastImage source={CustomImages.tick} style={styles.tick} />
          </View>
        </View>
      ) : (
        <FastImage
          style={[styles.ImageStyle, customImageStyle as any]}
          source={src as any}
        />
      )}
    </View>
  );
};

export default EmojiOrImageCard;

const styles = StyleSheet.create({
  tick: {
    width: 24,
    height: 16,
  },
  doneInnerCircle: {
    backgroundColor: "#ffffff26",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  doneOutterCircle: {
    backgroundColor: "#ffffff26",
    width: 82,
    height: 82,
    borderRadius: 82,
    justifyContent: "center",
    alignItems: "center",
    alignSelf:'center'
  },
  header: {
    flexDirection: "row",
    columnGap: 8,
    alignItems: "center",
    marginBottom: 12,
    justifyContent: "center",
  },
  iconStyle: {
    width: 16,
    height: 16,
  },
  container: {
    backgroundColor: colors.lottieYellow,
    borderRadius: 20,
    padding: 12,
    alignSelf: "center",
    flex: 1,
    justifyContent: "center",

    // Shadow for iOS
    shadowColor: "#000", // Black shadow
    shadowOffset: {
      width: 0,
      height: 9, // Vertical shadow offset
    },
    shadowOpacity: 0.15, // Shadow transparency
    shadowRadius: 10, // Blur radius

    // Elevation for Android
    elevation: 10, // Higher value gives a more pronounced shadow
  },

  ImageStyle: {
    width: 82,
    height: 82,
    alignSelf: "center",
  },
  title: {
    fontFamily: CustomFont.Urbanist700,
    fontSize: 14,
    lineHeight: 16.8,
    color: colors.white,
    textAlign: "center",
    // paddingLeft:10
  },
});
