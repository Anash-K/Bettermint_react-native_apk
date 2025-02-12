import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { ScreenProps } from "../navigator/Stack";
import { ScrollView } from "react-native-gesture-handler";
import StatusBarWrapper from "../components/StatusBarWrapper";
import { colors } from "../constants/colors";
import { useCustomStyle } from "../constants/CustomStyles";
import CommonSaveBtn from "../components/CommonSaveBtn";
import CustomFont from "../assets/fonts/customFonts";
import CommonFuelTracker from "../common/CommonFuelTracker";

const LogHomeFuel: React.FC<ScreenProps<"LogHomeFuel">> = () => {
  const { safeAreaMarginBottom, subtitle, tagsStyle } = useCustomStyle();
  return (
    <StatusBarWrapper>
      <ScrollView
        style={[styles.scrollContainer, safeAreaMarginBottom]}
        contentContainerStyle={styles.scrollableContent}
        bounces={false}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={[tagsStyle, styles.title]}></Text>
            <Text style={[tagsStyle, styles.title]}>Homemade?</Text>
            <Text style={[tagsStyle, styles.RightTitle]}>Fullness</Text>
          </View>
          <View style={styles.SelectBox}>
            <CommonFuelTracker />
            <CommonFuelTracker />
            <CommonFuelTracker />
            <CommonFuelTracker />
            <CommonFuelTracker />
          </View>
        </View>
        <CommonSaveBtn NavPage="HomeFuelReason" />
      </ScrollView>
    </StatusBarWrapper>
  );
};

export default memo(LogHomeFuel);

const styles = StyleSheet.create({
  SelectBox: {
    padding: 16,
    paddingTop: 20,
  },
  RightTitle: {
    width: "40.63%",
  },
  title: {
    width: "29.15%",
  },
  header: {
    flexDirection: "row",
    borderBottomColor: colors.appBackground,
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    paddingBottom: 7,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    marginBottom: 48,
    paddingVertical: 24,
  },
  scrollableContent: {
    flexGrow: 1,
  },
  scrollContainer: {
    flex: 1,
    marginTop: 8,
  },
});
