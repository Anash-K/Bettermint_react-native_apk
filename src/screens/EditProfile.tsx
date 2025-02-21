import React, { memo, useCallback, useEffect } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FastImage from "react-native-fast-image";
import { CustomImages } from "../assets/CustomImages";
import CustomImageHandler from "../common/CustomImageHandler";
import SimpleTabWrapper from "../common/SimpleTabWrapper";
import SimpleTabs from "../common/SimpleTabs";
import { colors } from "../constants/colors";
import { ScreenParams, ScreenProps } from "../navigator/Stack";
import { useCustomStyle } from "../constants/CustomStyles";
import StatusBarWrapper from "../components/StatusBarWrapper";
import { useMutation } from "@tanstack/react-query";
import { GetProfileInfo } from "../axious/GetApis";
import { AppLoaderRef } from "../../App";
import { ErrorHandler } from "../utils/ErrorHandler";
import { MutationKey } from "../Types/MutationKeys";
import { useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";

const EditProfile: React.FC<ScreenProps<"EditProfile">> = memo(
  ({ navigation }) => {
    const { profileInfo, profilePicture } = useSelector(
      (state: RootState) => state.userDetails
    );
    const CustomStyle = useCustomStyle();
    const handleActions = useCallback(({ page }: { page: any }) => {
      navigation.navigate(page);
    }, []);

    return (
      <StatusBarWrapper>
        <ScrollView
          style={[CustomStyle.safeAreaMarginBottom, styles.container]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.editImageBox}>
            <CustomImageHandler
              sourceImage={profilePicture ?? ""}
              placeholderImage={CustomImages.profilePic}
              imageStyle={styles.profilePic}
            />
            <TouchableOpacity
              style={styles.editBox}
              onPress={handleActions.bind(this, { page: "AddYourPhoto" })}
            >
              <Image
                style={styles.editIconStyle}
                source={CustomImages.editIcon}
                tintColor={colors.white}
              />
            </TouchableOpacity>
          </View>
          <SimpleTabs
            title="Personal Details"
            tabIcon={CustomImages.status}
            actionText=""
            HandlePress={handleActions.bind(this, {
              page: "TellUsALittleAboutYou",
            })}
          />
          <SimpleTabs
            title="Wellness Details"
            tabIcon={CustomImages.wellBeing}
            actionText=""
            HandlePress={handleActions.bind(this, {
              page: "SelfAssessment",
            })}
          />
          <SimpleTabs
            title="Health Reports"
            tabIcon={CustomImages.history}
            actionText=""
            HandlePress={handleActions.bind(this, {
              page: "PleaseShareYourMeasurement",
            })}
          />
        </ScrollView>
      </StatusBarWrapper>
    );
  }
);

export default EditProfile;

const styles = StyleSheet.create({
  editIconStyle: {
    width: 16,
    height: 16,
    alignSelf: "center",
  },

  editImageBox: {
    alignSelf: "center",
    borderWidth: 0.5,
    borderColor: colors.primary,
    borderRadius: 100,
    marginBottom: 32,
  },
  editBox: {
    width: 34,
    height: 34,
    position: "absolute",
    borderRadius: 32,
    borderWidth: 2,
    borderColor: colors.white,
    bottom: 10,
    right: 5,
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  profilePic: {
    width: 175,
    height: 175,
    margin: "auto",
    borderRadius: 175 / 2,
  },
  container: {
    flex: 1,
    padding: 16,
    // marginBottom:Platform.select({android:40})
  },
});
