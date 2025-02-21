import React, { memo, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "./colors";
import { CustomImages } from "../assets/CustomImages";
import CustomFont from "../assets/fonts/customFonts";
import { useCustomStyle } from "./CustomStyles";
import CustomImageHandler from "../common/CustomImageHandler";
import CustomButton from "../common/CustomButton";
import { useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";

interface ProfileCardType {
  onPressEdit: () => void;
}

const ProfileCard: React.FC<ProfileCardType> = memo(({ onPressEdit }) => {
  const CustomStyle = useCustomStyle();
  const { profilePicture, profileInfo } = useSelector(
    (state: RootState) => state.userDetails
  );
  // console.log(profileInfo.profile_picture,"test")
  return (
    <View style={[styles.container, CustomStyle.CommonCardShadow]}>
      <View style={styles.topView}>
        <CustomImageHandler
          sourceImage={profilePicture ?? ''}
          placeholderImage={CustomImages.profilePic}
          imageStyle={styles.imageStyle}
        />
        <View style={styles.profileDetails}>
          <Text style={styles.userName}>{profileInfo.name ?? ""}</Text>
          <CustomButton
            text="Edit profile"
            textStyle={styles.editProfileText}
            buttonStyle={styles.editProfileButton}
            onPress={onPressEdit}
          />
        </View>
      </View>
      <View style={styles.bottomView}>
        <View style={styles.innerBlock}>
          <Text style={styles.categoryText}>Obese</Text>
          <Text style={styles.category}>BMI</Text>
        </View>
        <View style={styles.innerBlock}>
          <Text style={styles.categoryText}>
            {profileInfo.height ?? ""}
            <Text style={styles.unit}>{profileInfo.height_unit ?? ""}</Text>
          </Text>
          <Text style={styles.category}>Height</Text>
        </View>
        <View style={[styles.innerBlock, styles.lastBlock]}>
          <Text style={styles.categoryText}>
            {profileInfo.weight ?? ""}
            <Text style={styles.unit}>{profileInfo.weight_unit ?? ""}</Text>
          </Text>
          <Text style={styles.category}>Weight</Text>
        </View>
      </View>
    </View>
  );
});

export default ProfileCard;

const styles = StyleSheet.create({
  lastBlock: {
    borderRightWidth: 0,
  },
  unit: {
    color: colors.unitColor,
  },
  category: {
    fontFamily: CustomFont.Urbanist500,
    fontSize: 14,
    lineHeight: 16.8,
    color: colors.secondaryLight,
    textAlign: "center",
    marginTop: 4,
  },
  categoryText: {
    fontFamily: CustomFont.Urbanist700,
    fontSize: 18,
    lineHeight: 21.6,
    color: colors.primary,
    textAlign: "center",
  },
  innerBlock: {
    borderRightColor: colors.silverGray,
    borderRightWidth: 1,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  userName: {
    fontSize: 20,
    lineHeight: 24,
    fontFamily: CustomFont.Urbanist700,
    color: colors.primary,
    marginBottom: 8,
  },
  editProfileText: {
    color: colors.primary,
  },
  editProfileButton: {
    width: "auto",
    alignSelf: "flex-start",
    backgroundColor: "transparent",
    borderColor: colors.primary,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  profileDetails: {
    flex: 1,
  },
  imageStyle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 0.5,
    borderColor: colors.primary,
  },
  container: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 20,
    marginBottom: 26,
  },
  topView: {
    flexDirection: "row",
    columnGap: 16,
    alignItems: "center",
    marginBottom: 32,
  },
  bottomView: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 27,
  },
});
