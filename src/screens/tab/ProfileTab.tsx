import {
  ImageProps,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import TabLogo from "../../constants/TabLogo";
import { CustomImages } from "../../assets/CustomImages";
import { colors } from "../../constants/colors";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScreenProps } from "../../navigator/Stack";
import ProfileCard from "../../constants/ProfileCard";
import MenuWrapper from "../../constants/MenuWrapper";
import ActionModal from "../../Modals/ActionModal";
import MenuTab from "../../common/MenuTabs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { logout } from "../../redux/slices/authSlice";
import { useMutation } from "@tanstack/react-query";
import { MutationKey } from "../../Types/MutationKeys";
import { AppLoaderRef } from "../../../App";
import { CustomToaster } from "../../common/CustomToaster";
import { ALERT_TYPE } from "react-native-alert-notification";
import { deleteApi, logoutApi } from "../../axious/PostApis";
import { ErrorHandler } from "../../utils/ErrorHandler";
import { GetProfileInfo } from "../../axious/GetApis";
import _ from "lodash";
import useMergeProfileInfo from "../../hooks/useMergeProfileInfo";

interface modalDetailsType {
  contentText: string;
  actionText: string;
  logo: ImageProps | null;
  handle: () => void;
}

const initialModalDetails: modalDetailsType = {
  contentText: "",
  actionText: "",
  logo: null,
  handle: () => {},
};

const ProfileTab: React.FC<ScreenProps<"ProfileTab">> = memo(
  ({ navigation }) => {
    const { top } = useSafeAreaInsets();
    const dispatch = useDispatch();
    const { isProfileSetup, profileInfo } = useSelector(
      (state: RootState) => state.userDetails
    );

    const { email, token } = useSelector((state: RootState) => state.auth);
    const [isModalVisible, setIsModalVisible] = useState<
      "delete" | "logout" | null
    >(null);
    const [modalDetails, SetModalDetails] =
      useState<modalDetailsType>(initialModalDetails);

    const closeModal = useCallback(() => {
      setIsModalVisible(null);
    }, [isModalVisible]);

    const handleNav = useCallback(({ screenName }: { screenName: any }) => {
      navigation.navigate(screenName);
    }, []);

    const { mutate: logoutUser } = useMutation({
      mutationKey: [MutationKey.LogoutKey],
      mutationFn: logoutApi,
      onMutate: () => AppLoaderRef.current?.start(),
      onError: (error) => {
        ErrorHandler(error);
      },
      onSuccess(data) {
        console.log(data);
        if (data.status === 200) {
          CustomToaster({
            type: ALERT_TYPE.SUCCESS,
            message: "Logout Successfully",
          });
          setTimeout(() => {
            dispatch(logout());
          }, 500);
        }
      },
      onSettled: () => {
        closeModal();
        AppLoaderRef.current?.stop();
      },
    });

    const { mutate: deleteUser } = useMutation({
      mutationKey: [MutationKey.deleteKey],
      mutationFn: deleteApi,
      onMutate: () => AppLoaderRef.current?.start(),
      onError: (error) => {
        ErrorHandler(error);
      },
      onSuccess(data) {
        if (data?.status === 200) {
          CustomToaster({
            type: ALERT_TYPE.SUCCESS,
            message: "Account deleted successfully",
          });
          setTimeout(() => {
            dispatch(logout());
          }, 500);
        }
      },
      onSettled: () => {
        closeModal();
        AppLoaderRef.current?.stop();
      },
    });

    const { mergeProfileInfo } = useMergeProfileInfo();

    const { mutate: getUserProfile } = useMutation({
      mutationKey: [MutationKey.getProfileInfo],
      onMutate: () => AppLoaderRef.current?.start,
      mutationFn: async () => await GetProfileInfo(),
      onError(error) {
        console.log(error);
        ErrorHandler(error);
      },
      onSuccess(data) {
        if (data.payload) {
          mergeProfileInfo(data.payload);
        }
      },
      onSettled: () => AppLoaderRef.current?.stop(),
    });

    useEffect(() => {
      getUserProfile();
    }, []);

    const ActionsDataSet = {
      delete: {
        contentText: "Are you sure? Your journey doesn’t have to end!",
        actionText: "Delete account",
        logo: CustomImages.trashIcon,
        handle: () => {
          deleteUser();
        },
      },
      logout: {
        contentText: "Taking a pause? We’ll be here when you’re back!",
        actionText: "Logout",
        logo: CustomImages.logout,
        handle: () => {
          logoutUser();
        },
      },
    };

    const handleModal = useCallback(({ modalType }: { modalType: string }) => {
      if (modalType == "delete") {
        setIsModalVisible("delete");
        SetModalDetails(ActionsDataSet.delete);
      } else if (modalType == "logout") {
        setIsModalVisible("logout");
        SetModalDetails(ActionsDataSet.logout);
      }
    }, []);

    return (
      <View style={styles.container}>
        <StatusBar
          barStyle={"light-content"}
          backgroundColor={colors.primary}
        />
        <TabLogo
          Boxstyle={[
            { height: Platform.select({ ios: top + 70, android: top + 70 }) },
          ]}
          titleStyle={styles.headerTitle}
          title="Profile"
        />
        <ScrollView
          style={styles.scrollStyle}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <ProfileCard
              onPressEdit={handleNav.bind(this, {
                screenName: "EditProfile",
              })}
            />
            <MenuTab
              title={"Go Premium"}
              icon={CustomImages.premium}
              OnPressHandler={handleNav.bind(this, {
                screenName: "ExclusiveFitness",
              })}
            />
            <MenuTab
              title={"Refer & Earn"}
              icon={CustomImages.refer}
              OnPressHandler={handleNav.bind(this, {
                screenName: "FreeSubscription",
              })}
            />
            <MenuWrapper title="General">
              <MenuTab title={"Help & FAQ"} icon={CustomImages.help} />
              <MenuTab title={"About Us"} icon={CustomImages.details} />
              <MenuTab title={"Terms & Privacy"} icon={CustomImages.terms} />
            </MenuWrapper>
            <MenuWrapper title="Account">
              <MenuTab
                title={"Change Password"}
                icon={CustomImages.password}
                OnPressHandler={handleNav.bind(this, {
                  screenName: "ChangePassword",
                })}
              />
              <MenuTab
                title={"Delete Account"}
                icon={CustomImages.delete}
                OnPressHandler={handleModal.bind(this, { modalType: "delete" })}
              />
              <MenuTab
                title={"Logout"}
                icon={CustomImages.logout}
                OnPressHandler={handleModal.bind(this, { modalType: "logout" })}
              />
            </MenuWrapper>
          </View>
        </ScrollView>
        {isModalVisible === "delete" && (
          <ActionModal
            isModalVisible={isModalVisible === "delete"}
            toggleModal={closeModal}
            contentText={modalDetails.contentText}
            ActionText={modalDetails.actionText}
            Logo={modalDetails.logo as ImageProps}
            handleAction={modalDetails.handle}
          />
        )}
        {isModalVisible === "logout" && (
          <ActionModal
            isModalVisible={isModalVisible === "logout"}
            toggleModal={closeModal}
            contentText={modalDetails.contentText}
            ActionText={modalDetails.actionText}
            Logo={modalDetails.logo as ImageProps}
            handleAction={modalDetails.handle}
          />
        )}
      </View>
    );
  }
);

export default ProfileTab;

const styles = StyleSheet.create({
  scrollStyle: {
    flex: 1,
  },
  profileCard: {},
  headerTitle: {
    marginTop: Platform.select({ ios: 40, android: 0 }),
  },
  headerStyle: {},
  container: {
    flex: 1,
    backgroundColor: colors.appBackground,
  },
  content: {
    flex: 1,
    padding: 16,
    marginBottom: 100,
  },
});
