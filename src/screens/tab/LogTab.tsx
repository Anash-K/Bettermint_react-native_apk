import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import TabLogo from "../../constants/TabLogo";
import LogCard from "../../common/LogCard";
import { CustomImages } from "../../assets/CustomImages";
import { colors } from "../../constants/colors";
import React, { useCallback, useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScreenProps } from "../../navigator/Stack";

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

const LogTab: React.FC<ScreenProps<"LogTab">> = ({ navigation }) => {
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

  return (
    <View style={styles.container}>
            <StatusBar barStyle={'light-content'} backgroundColor={colors.primary}/>
      <TabLogo
        Boxstyle={[
          { height: Platform.select({ ios: top + 51, android: top + 61 }) },
        ]}
        titleStyle={styles.headerTitle}
        title="Log"
      />
      <View style={styles.content}>
        {logCardData.map((item) => (
          <LogCard
            key={item.id}
            Title={item.title}
            IconSrc={item.iconSrc}
            color={item.color ?? ""}
            iconBoxColor={item.iconBoxColor} // Passing separately
            OnClick={() => handleNextNav("LogStress")}
          />
        ))}
      </View>
    </View>
  );
};

export default LogTab;

const styles = StyleSheet.create({
  headerTitle: {
    marginTop: Platform.select({ ios: 40, android: 0 }),
  },
  headerStyle: {},
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
});
