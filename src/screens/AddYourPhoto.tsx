import React, { memo, useCallback, useState } from "react";
import {
  Image,
  InteractionManager,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
} from "react-native";
import { PERMISSIONS } from "react-native-permissions";

import ImagePicker from "react-native-image-crop-picker";
import { useDispatch, useSelector } from "react-redux";
import { ScreenProps } from "../navigator/Stack";

import { CustomImages } from "../assets/CustomImages";
import CustomFont from "../assets/fonts/customFonts";
import { colors } from "../constants/colors";
import { useCustomStyle } from "../constants/CustomStyles";
import { AppLoaderRef } from "../../App";

import {
  getFileNameFromUri,
  getMimeTypeFromUri,
} from "../utils/MimeTypePicker";
import { CheckPermission } from "../common/HandlePermission";
import CustomImageHandler from "../common/CustomImageHandler";
import CustomButton from "../common/CustomButton";
import { handlePermission } from "../utils/PermissionHandler";
import { setFieldAction } from "../redux/slices/workoutDetailsSlice";
import { RootState } from "../redux/rootReducer";
import useUpdateUserProfile from "../hooks/useUpdateUserProfile";
import useMergeProfileInfo from "../hooks/useMergeProfileInfo";

const AddYourPhoto: React.FC<ScreenProps<"AddYourPhoto">> = ({
  navigation,
}) => {
  const { profileInfo } = useSelector((state: RootState) => state.userDetails);

  const [isModalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const CustomStyle = useCustomStyle();

  const toggleModal = useCallback(() => {
    setModalVisible((prev) => !prev);
  }, []);

  const [profileImage, setProfileImage] = useState<string | null>(
    profileInfo.profile_picture ?? null
  );

  const handleNextNav = useCallback(() => {
    navigation.navigate("SelfAssessment");
  }, [navigation]);

  const cameraPermission =
    Platform.OS === "ios" ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;
  // Request and check for camera permission when the component mounts
  const checkCameraPermission = useCallback(async () => {
    handlePermission(
      [
        Platform.OS === "ios"
          ? PERMISSIONS.IOS.CAMERA
          : PERMISSIONS.ANDROID.CAMERA,
      ],
      "Camera"
    )
      .then((result) => {})
      .catch((error) => {});
  }, []);

  const galleryPermission =
    Platform.OS === "ios"
      ? PERMISSIONS.IOS.PHOTO_LIBRARY
      : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;

  const checkGalleryPermission = useCallback(async () => {
    handlePermission([galleryPermission], "gallery")
      .then((result) => {})
      .catch((error) => {
        return;
      });
  }, []);

  const handleGalleryModal = useCallback(() => {
    setModalVisible(false);
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        handleGallery();
      }, 700);
    });
  }, []);

  const handleCameraModal = useCallback(() => {
    setModalVisible(false);
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        handleCamera();
      }, 700);
    });
  }, []);

  const handleCamera = useCallback(async (isClose?: Boolean) => {
    checkCameraPermission();
    const res = await CheckPermission({ permission: cameraPermission });
    if (!res) {
      return;
    }

    try {
      let response = await ImagePicker.openCamera({
        mediaType: "photo",
        width: 300,
        height: 300,
        quality: 1,
        includeBase64: true,
        cropping: true,
      });

      // Process the image if the path exists
      if (response.path) {
        getMimeTypeFromUri(response.path);
        console.log(response.path, "path");
        setProfileImage(response.path);
        6;
      }
    } catch (error) {
      // console.error("Camera error:", error);
    } finally {
      AppLoaderRef.current?.stop();
    }
  }, []);

  const handleGallery = useCallback(async (isClose?: Boolean) => {
    checkGalleryPermission();
    const res = await CheckPermission({ permission: galleryPermission });
    if (!res) {
      return;
    }

    try {
      let response = await ImagePicker.openPicker({
        mediaType: "photo",
        width: 300,
        height: 300,
        quality: 1,
        includeBase64: true,
        cropping: true,
      });

      if (response.path) {
        setProfileImage(response.path);
      }
    } catch (error) {
      console.error("Gallery error:", error);
    } finally {
      AppLoaderRef.current?.stop();
    }
  }, []);

  const { mutateAsync: updateUserProfile } = useUpdateUserProfile(
    "Profile picture updated successfully"
  );
  const { mergeProfileInfo } = useMergeProfileInfo();

  const handleSubmit = useCallback(async () => {
    let ImageType = "";
    let ImageName = "";

    if (profileImage) {
      ImageType = getMimeTypeFromUri(profileImage);
      ImageName = getFileNameFromUri(profileImage);
    }

    const data = {
      profile: {
        uri: profileImage,
        type: ImageType,
        name: ImageName,
      },
    };

    let DataObjectForApi = {
      profile_picture: data.profile.name,
    };

    let DataObjectForLocal = {
      profile_picture: profileImage,
    };

    try {
      await updateUserProfile({
        ...DataObjectForApi,
      });
    } catch (error) {
      console.error("Profile update failed", error);
      return;
    }
    mergeProfileInfo(DataObjectForLocal as any);
    handleNextNav();
  }, [profileImage, updateUserProfile, mergeProfileInfo]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.keyboardStyle}
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
        keyboardVerticalOffset={60}
      >
        <ScrollView
          contentContainerStyle={styles.commonFlexGrow}
          style={[styles.container, CustomStyle.safeAreaMarginBottom]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.commonFlexGrow}>
            <Text style={[CustomStyle.title]}>Add your photo</Text>
            <View style={styles.imageBoxContainer}>
              <View style={styles.imageBox}>
                <CustomImageHandler
                  sourceImage={profileImage}
                  placeholderImage={CustomImages.profilePic}
                  imageStyle={styles.profilePicture}
                />
              </View>
            </View>
          </View>
          {profileImage ? (
            <View>
              <CustomButton
                text="Try again"
                buttonStyle={styles.tryAgainBtn}
                textStyle={styles.tryAgainText}
                onPress={toggleModal}
              />
              <CustomButton text="Looks perfect" onPress={handleSubmit} />
            </View>
          ) : (
            <CustomButton text="Upload photo" onPress={toggleModal} />
          )}

          {isModalVisible ? (
            <Modal
              visible={isModalVisible}
              animationType="slide"
              transparent={true}
              onRequestClose={toggleModal}
            >
              <Pressable style={styles.modalOverlay} onPress={toggleModal}>
                <View style={styles.modalContent}>
                  <TouchableOpacity
                    onPress={() => {
                      toggleModal();
                    }}
                    style={styles.closeButton}
                  >
                    <View style={styles.closeIconBox}>
                      <Image
                        source={CustomImages.closeIcon}
                        style={styles.closeIcon}
                        resizeMode="contain"
                      />
                    </View>
                  </TouchableOpacity>
                  <View style={styles.modalBackGround}>
                    <CustomButton
                      text="Choose from Gallery"
                      onPress={handleGalleryModal}
                      textStyle={styles.menuItemText}
                      buttonStyle={styles.menuItemStyle}
                      icon={CustomImages.photoGallery}
                      iconStyle={styles.modalIconStyle}
                    />
                    <CustomButton
                      text="Snap a Picture"
                      onPress={handleCameraModal}
                      textStyle={styles.menuItemText}
                      buttonStyle={styles.menuItemStyleBottom}
                      icon={CustomImages.cameraIcon}
                      iconStyle={styles.modalIconStyle}
                    />
                  </View>
                </View>
              </Pressable>
            </Modal>
          ) : (
            <></>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default memo(AddYourPhoto);

const styles = StyleSheet.create({
  commonFlexGrow: {
    flexGrow: 1,
  },
  keyboardStyle: {
    flex: 1,
  },
  imageBoxContainer: {
    borderWidth: 4,
    borderColor: colors.lightBorderColor,
    alignSelf: "center",
    marginTop: 48,
    marginBottom: 22,
    borderRadius: 200,
  },
  tryAgainBtn: {
    backgroundColor: "transparent",
    borderColor: colors.primary,
    borderWidth: 1,
    marginBottom: 12,
  },
  modalIconStyle: {
    width: 25,
    height: 25,
  },
  modalBackGround: {
    backgroundColor: colors.white,
    borderRadius: 20,
    paddingHorizontal: 16,
  },
  closeIconBox: {
    backgroundColor: "#2F2F37",
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  ActionIconBox: {
    position: "absolute",
    backgroundColor: "rgba(32, 201, 151, 1)",
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: "rgba(24, 23, 28, 1)",
    padding: 10,
    right: 0,
    bottom: 0,
  },
  picAction: {
    width: 16,
    height: 16,
  },
  tryAgainButton: {
    backgroundColor: "transparent",
    borderColor: "rgba(56, 57, 62, 1)",
    borderWidth: 1,
    marginBottom: 12,
  },
  tryAgainText: {
    color: colors.primary,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontFamily: CustomFont.Urbanist600,
    fontSize: 24,
    lineHeight: 28.8,
    textAlign: "center",
    color: "rgba(250, 250, 250, 1)",
  },
  subTitle: {
    color: "rgba(147, 150, 157, 1)",
    fontFamily: CustomFont.Urbanist400,
    fontSize: 16,
    lineHeight: 19.2,
    textAlign: "center",
    letterSpacing: 0.5,
    marginTop: 8,
  },
  profilePicture: {
    width: 150,
    height: 150,
    alignSelf: "center",
  },
  imageBox: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 125,
    overflow: "hidden",
  },
  closeIcon: {
    width: 16,
    height: 16,
  },

  menuItemStyle: {
    paddingVertical: 17,
    borderBottomColor: "#F5F6FB",
    backgroundColor: "transparent",
    borderBottomWidth: 1.5,
    marginHorizontal: 0,
    justifyContent: "flex-start",
    borderRadius: 0,
    padding: 0,
  },
  menuItemStyleBottom: {
    borderBottomWidth: 0,
    paddingVertical: 17,
    borderBottomColor: "rgba(29, 30, 35, 1)",
    backgroundColor: "transparent",
    marginHorizontal: 0,
    justifyContent: "flex-start",
    borderRadius: 0,
    padding: 0,
  },
  menuItemText: {
    fontFamily: CustomFont.Urbanist500,
    lineHeight: 21.6,
    color: "#18171C",
    textAlign: "left",
    marginHorizontal: 0,
    marginVertical: 0,
    marginLeft: 12,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "100%",
    padding: 16,
    borderRadius: 10,
    position: "absolute",
    bottom: Platform.select({ ios: 27, android: 10 }),
    zIndex: 100,
  },
  closeButton: {
    alignSelf: "center",
    marginBottom: 16,
  },
});
