import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import TabLogo from "../../constants/TabLogo";
import { CustomImages } from "../../assets/CustomImages";
import { colors } from "../../constants/colors";
import React, { useCallback, useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScreenProps } from "../../navigator/Stack";
import LogCard from "../../common/LogCard";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import SleepDataLog from "../../components/logTabSubComponent/SleepDataLog";
import WorkoutDataLog from "../../components/logTabSubComponent/WorkoutDataLog";

interface LogCardItem {
  id: number;
  iconSrc: any;
  title: string;
  content: string;
  color: string;
  iconBoxColor: string;
  navPage: string;
  Details: JSX.Element | null;
}

const initialValues: LogCardItem[] = [
  {
    id: 1,
    iconSrc: CustomImages.sleep,
    title: "Sleep",
    content: "",
    color: colors.lottieBlue, // Solid color (for text/icon)
    iconBoxColor: colors.lightBlue, // Background color with opacity
    navPage: "LogSleep",
    Details: null,
  },
  {
    id: 2,
    iconSrc: CustomImages.workout,
    title: "Workout",
    content: "",
    color: colors.lottiePink,
    iconBoxColor: colors.lightPink,
    navPage: "LogWorkout",
    Details: null,
  },
  {
    id: 3,
    iconSrc: CustomImages.yellowSmile,
    title: "Stress Level",
    content: "",
    color: "",
    iconBoxColor: colors.lightYellow,
    navPage: "LogStress",
    Details: null,
  },
  {
    id: 4,
    iconSrc: CustomImages.homeFuel,
    title: "Home Fuel",
    content: "",
    color: colors.lottieGreen,
    iconBoxColor: colors.lightGreen,
    navPage: "LogHomeFuel",
    Details: null,
  },
];

const LogTab: React.FC<ScreenProps<"LogTab">> = ({ navigation }) => {
  const [logCardData, setLogCardData] = useState(initialValues);
  const { sleepTrack, isWorkout } = useSelector(
    (state: RootState) => state.userDetails
  );

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

  useEffect(() => {
    if (sleepTrack?.bedTime) {
      setLogCardData((prev) =>
        prev.map((item) =>
          item.id === 1 ? { ...item, Details: <SleepDataLog /> } : item
        )
      );
    }

    if (isWorkout) {
      setLogCardData((prev) =>
        prev.map((item) =>
          item.id === 2 ? { ...item, Details: <WorkoutDataLog /> } : item
        )
      );
    }
  }, [sleepTrack, isWorkout]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor={colors.primary} />
      <TabLogo
        Boxstyle={[
          { height: Platform.select({ ios: top + 70, android: top + 70 }) },
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
            OnClick={() => handleNextNav(item.navPage)}
            Details={item.Details}
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
    backgroundColor: colors.appBackground,
  },
  content: {
    flex: 1,
    padding: 16,
  },
});
