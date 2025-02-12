import React, { memo, useCallback } from "react";
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

const EditProfile: React.FC<ScreenProps<"EditProfile">> = memo(
  ({ navigation }) => {
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
              sourceImage={""}
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
          <SimpleTabWrapper title="Personal Details">
            <SimpleTabs
              title="Basic Info"
              tabIcon={CustomImages.editIcon}
              HandlePress={handleActions.bind(this, {
                page: "TellUsALittleAboutYou",
              })}
            />
            <SimpleTabs
              title="Mobile No."
              tabIcon={CustomImages.mobileIcon}
              actionText="+1 123-4567"
              HandlePress={handleActions.bind(this, {
                page: "ProvideYourMobileNumber",
              })}
            />
            <SimpleTabs
              title="Height"
              tabIcon={CustomImages.height}
              actionText="5ft, 11in"
              HandlePress={handleActions.bind(this, {
                page: "WhatsYourHeight",
              })}
            />
            <SimpleTabs
              title="Weight"
              tabIcon={CustomImages.weight}
              actionText="72kg"
              HandlePress={handleActions.bind(this, {
                page: "WhatsYourWeight",
              })}
            />
            <SimpleTabs
              title="Status"
              tabIcon={CustomImages.status}
              actionText="Working"
              HandlePress={handleActions.bind(this, {
                page: "WhatBestDescribe",
              })}
            />
          </SimpleTabWrapper>
          <SimpleTabWrapper title="Wellness Details">
            <SimpleTabs
              title="Body Measurements"
              tabIcon={CustomImages.scale}
              HandlePress={handleActions.bind(this, {
                page: "WhatsYourMeasurement",
              })}
            />
            <SimpleTabs
              title="Disease"
              tabIcon={CustomImages.disease}
              HandlePress={handleActions.bind(this, {
                page: "DoYouHaveDiseases",
              })}
            />
            <SimpleTabs
              title="Health Reports"
              tabIcon={CustomImages.history}
              actionText="Add"
              HandlePress={handleActions.bind(this, {
                page: "PleaseShareYourMeasurement",
              })}
            />
            <SimpleTabs
              title="Family History"
              tabIcon={CustomImages.disease}
              HandlePress={handleActions.bind(this, {
                page: "DoYouHaveFamilyHistory",
              })}
            />
          </SimpleTabWrapper>
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
    // borderRadius:
  },
  container: {
    flex: 1,
    padding: 16,
    // marginBottom:Platform.select({android:40})
  },
});
