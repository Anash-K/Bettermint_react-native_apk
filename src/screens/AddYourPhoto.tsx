import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
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

import CustomButton from "../common/CustomButton";
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  checkMultiple,
} from "react-native-permissions";
import CustomInput from "../common/CustomInput";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ImagePicker from "react-native-image-crop-picker";
import { useDispatch, useSelector } from "react-redux";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { ScreenProps } from "../navigator/Stack";
import CustomImageHandler from "../common/CustomImageHandler";
import { CustomImages } from "../assets/CustomImages";
import CustomFont from "../assets/fonts/customFonts";
import { colors } from "../constants/colors";
import { useCustomStyle } from "../constants/CustomStyles";
import { ErrorHandler } from "../utils/ErrorHandler";
import { AppLoaderRef } from "../../App";
import PermissionModal from "../common/PermissionModal";
import {
  getFileNameFromUri,
  getMimeTypeFromUri,
} from "../utils/MimeTypePicker";

const AddYourPhoto: React.FC<ScreenProps<"AddYourPhoto">> = ({
  navigation,
}) => {
  // const userData = useSelector((state: any) => state.auth);
  // const nameValidation = {
  //   text: userData.name ? userData.name : '',
  //   error: '',
  //   isValid: false,
  // };

  const [isModalVisible, setModalVisible] = useState(false);
  const [permissionError, setPermissionError] = useState("");
  // const [name, setName] = useState(nameValidation);
  // const [email, setEmail] = useState(userData.email);
  const buttonRef = useRef<boolean>(false);
  const dispatch = useDispatch();
  const CustomStyle = useCustomStyle();

  const toggleModal = useCallback(() => {
    setModalVisible((prev) => !prev);
  }, []);

  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [isPermissionModalVisible, setPermissionModalVisible] = useState(false);
  const lastSubmittedImageRef = useRef<string | null>(null);
  const lastSubmittedNameRef = useRef<string | null>(null);

  const handleConfirm = () => {};

  const handleNextNav = useCallback(() => {
    navigation.navigate("WhatsYourMeasurement");
  }, [navigation]);

  // Request and check for camera permission when the component mounts
  const checkCameraPermission = useCallback(async () => {
    const cameraPermission =
      Platform.OS === "ios"
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA;
    try {
      const status = await check(cameraPermission);
      console.log(status);
      if (status === "granted") {
        return;
      }
      if (status === "denied") {
        if (Platform.OS == "ios") {
          const requestStatus = await request(cameraPermission);
        } else {
          setPermissionError("Permission Needed to Access Camera");
          setPermissionModalVisible(true);
        }
        return;
      } else if (status === "blocked") {
        setPermissionError("Permission Needed to Access Camera");
        setPermissionModalVisible(true);
      }
    } catch (error) {
      ErrorHandler(error);
    }
  }, []);

  const checkGalleryPermission = useCallback(async () => {
    const galleryPermission =
      Platform.OS === "ios"
        ? PERMISSIONS.IOS.PHOTO_LIBRARY
        : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;
    try {
      const status = await check(galleryPermission);
      console.log(status, "status");
      if (status === "granted") {
        return;
      }
      if (status === "denied") {
        const requestStatus = await request(galleryPermission);
        if (requestStatus !== RESULTS.GRANTED) {
        }
      } else if (status === "blocked") {
        setPermissionError("Permission Needed to Access Album");
        setPermissionModalVisible(true);
      }
    } catch (error) {
      ErrorHandler(error);
    }
  }, []);

  useEffect(() => {
    checkCameraPermission();
    if (Platform.OS === "ios") {
      checkGalleryPermission();
    }
  }, [checkCameraPermission, checkGalleryPermission]);

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

        setProfileImage(response.path);
      }
    } catch (error) {
      console.error("Camera error:", error);
    } finally {
      AppLoaderRef.current?.stop();
    }
  }, []);

  const handleGallery = useCallback(async (isClose?: Boolean) => {
    if (Platform.OS === "ios") {
      checkGalleryPermission();
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

  const handleChangeName = useCallback(() => {}, []);

  const handleChangeEmail = useCallback(() => {}, []);

  const togglePermissionModal = useCallback(() => {
    setPermissionModalVisible((prevState) => !prevState);
  }, []);

  const insets = useSafeAreaInsets();

  const handleSubmit = useCallback(async () => {
    if (buttonRef?.current) {
      return;
    }

    //   if (!name.text || !name.isValid) {
    //     return;
    //   }

    if (
      lastSubmittedImageRef.current === profileImage
      // lastSubmittedNameRef.current === name.text
    ) {
      handleNextNav();
      return;
    }

    buttonRef.current = true;

    AppLoaderRef.current?.start();

    let ImageType = "";
    let ImageName = "";

    if (profileImage) {
      ImageType = getMimeTypeFromUri(profileImage);
      ImageName = getFileNameFromUri(profileImage);
    }

    //   const data = {
    //     // name: name.text,
    //     profile: {
    //       uri: profileImage,
    //       type: ImageType,
    //       name: ImageName,
    //     },
    //   };

    try {
      // const response = await UpdateProfile(data);
      // Check if response is valid and status is success
      // if (response && response?.status === 200) {
      //   lastSubmittedImageRef.current = profileImage;
      //   lastSubmittedNameRef.current = name.text;
      //   dispatch(updateProfile(response?.data?.payload));
      //   CustomToaster({
      //     type: ALERT_TYPE.SUCCESS,
      //     title: 'Success',
      //     message: 'Profile Updated Successfully!',
      //   });
      //   setTimeout(() => {
      //     handleNextNav();
      //   }, 2000);
      // } else {
      // Handle unexpected response status
      //   CustomToaster({
      //     type: ALERT_TYPE.DANGER,
      //     title: 'Error',
      //     message: 'Something went wrong, please try again.',
      //   });
      // }
    } catch (error) {
      ErrorHandler(error);
    } finally {
      buttonRef.current = false;
      AppLoaderRef.current?.stop();
    }
  }, [profileImage]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
        keyboardVerticalOffset={60}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          style={[styles.container, CustomStyle.safeAreaMarginBottom]}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ flexGrow: 1 }}>
            <Text style={[CustomStyle.title]}>Add your photo</Text>
            <View style={styles.imageBox}>
              <CustomImageHandler
                sourceImage={profileImage}
                placeholderImage={CustomImages.profilePic}
                imageStyle={styles.profilePicture}
              />
              {/* 

              {/* <View style={styles.ActionIconBox}>
                <Image
                  source={
                    profileImage
                      ? CustomImages.profilePic
                      : CustomImages.blackDropDownIcon
                  }
                  style={styles.picAction}
                />
              </View> */}
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
              <CustomButton text="Looks perfect" onPress={handleNextNav} />
            </View>
          ) : (
            <CustomButton text="Upload photo" onPress={toggleModal} />
          )}

          {/* Modal for photo selection */}
          <PermissionModal
            isModalVisible={isPermissionModalVisible}
            toggleModal={togglePermissionModal}
            contentText={permissionError}
          />
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

export default AddYourPhoto;

const styles = StyleSheet.create({
  tryAgainBtn: {
    backgroundColor: "transparent",
    borderColor: colors.primary,
    borderWidth: 1,
    marginBottom: 12,
  },
  modalIconStyle: { width: 25, height: 25 },
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
    width: 154,
    height: 154,
    alignSelf: "center",
    borderRadius: 154,
    borderWidth: 4,
    borderColor: colors.lightBorderColor,
  },
  imageBox: {
    marginTop: 48,
    marginBottom: 22,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
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
