import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import TabLogo from "../../constants/TabLogo";
import LogCard from "../../common/LogCard";
import { CustomImages } from "../../assets/CustomImages";
import { colors } from "../../constants/colors";
import React, { useCallback, useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScreenProps } from "../../navigator/Stack";
import ProfileCard from "../../constants/ProfileCard";
import MenuTab from "../../common/MenuTabs";
import MenuWrapper from "../../constants/MenuWrapper";

const initialValues = [
  {
    id: 1,
    iconSrc: CustomImages.sleep,
    title: "Sleep",
    content: "",
    color: "#45c6f6", // Solid color (for text/icon)
    iconBoxColor: "#45c6f640", // Background color with opacity
  },
  {
    id: 2,
    iconSrc: CustomImages.workout,
    title: "Workout",
    content: "",
    color: "#ff5733",
    iconBoxColor: "#ff573360",
  },
  {
    id: 3,
    iconSrc: CustomImages.yellowSmile,
    title: "Stress Level",
    content: "",
    color: "",
    iconBoxColor: "#ffcf4840",
    navPage: "LogStress",
  },
  {
    id: 4,
    iconSrc: CustomImages.homeFuel,
    title: "Home Fuel",
    content: "",
    color: colors.lottieGreen,
    iconBoxColor: "#3bc58040",
  },
];

const ProfileTab: React.FC<ScreenProps<"ProfileTab">> = ({ navigation }) => {
  const [logCardData, setLogCardData] = useState(initialValues);
  const { top } = useSafeAreaInsets();
  useEffect(() => {
    setLogCardData(initialValues);
  }, []);

  const handleNextNav = useCallback(
    (page: any) => {
      if (page) {
        navigation.navigate(page);
      }
    },
    [navigation]
  );

  const handleNav = useCallback(({ screenName }: { screenName: string }) => {
    navigation.navigate(screenName);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor={colors.primary} />
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
          <ProfileCard />
          <MenuTab
            title={"Refer & Earn"}
            icon={CustomImages.refer}
            OnPressHandler={() => handleNav({ screenName: "FreeSubscription" })}
          />
          <MenuWrapper title="General">
            <MenuTab title={"Help & FAQ"} icon={CustomImages.help} />
            <MenuTab title={"About Us"} icon={CustomImages.details} />
            <MenuTab title={"Terms & Privacy"} icon={CustomImages.terms} />
          </MenuWrapper>
          <MenuWrapper title="Account">
            <MenuTab title={"Change Password"} icon={CustomImages.password} />
            <MenuTab title={"Delete Account"} icon={CustomImages.delete} />
            <MenuTab title={"Logout"} icon={CustomImages.logout} />
          </MenuWrapper>
        </View>
      </ScrollView>
    </View>
  );
};

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
