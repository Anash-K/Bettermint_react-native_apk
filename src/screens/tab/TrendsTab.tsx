import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors } from "../../constants/colors";
import React from "react";
import { ScreenProps } from "../../navigator/Stack";
import TabLogo from "../../constants/TabLogo";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomFont from "../../assets/fonts/customFonts";
import GraphHandler from "../../common/GraphHandler";
import EmotionGraph from "../../common/EmotionGraph";

const TrendsTab: React.FC<ScreenProps<"TrendsTab">> = () => {
  const { top } = useSafeAreaInsets();
  const lineData = [
    { value: 0, id: 1 },
    { value: 7, id: 2 },
    { value: 3, id: 3 },
    { value: 2, id: 4 },
    { value: 5, id: 5 },
    { value: 3.8, id: 6 },
    { value: 2.4, id: 7 },
    { value: 7, id: 8 },
    { value: 4.5, id: 9 },
    { value: 6.3, id: 10 },
    { value: 8.1, id: 11 },
    { value: 5.7, id: 12 },
  ];

  const lineData2 = [
    { value: 5, id: 1 },
    { value: 1, id: 2 },
    { value: 4.8, id: 3 },
    { value: 4, id: 4 },
    { value: 1, id: 5 },
    { value: 1, id: 6 },
    { value: 1, id: 7 },
    { value: 8.5, id: 8 },
    { value: 3.2, id: 9 },
    { value: 7.1, id: 10 },
    { value: 2.9, id: 11 },
    { value: 6.4, id: 12 },
  ];

  const emotionData = [
    { value: 5, id: 1 },
    { value: 1, id: 2 },
    { value: 4, id: 3 },
    { value: 4, id: 4 },
    { value: 1, id: 5 },
    { value: 1, id: 6 },
    { value: 1, id: 7 },
    { value: 3, id: 8 },
    { value: 3, id: 9 },
    { value: 4, id: 10 },
    { value: 2, id: 11 },
    { value: 4, id: 12 },
  ];

  return (
    <View style={[styles.container]}>
      <StatusBar barStyle={"light-content"} backgroundColor={colors.primary} />
      <TabLogo
        Boxstyle={[
          { height: Platform.select({ ios: top + 70, android: top + 70 }) },
        ]}
        titleStyle={styles.headerTitle}
        title="Trends"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollableContainer}
        // contentContainerStyle={}
      >
        <View style={styles.scrollableContent}>
          <GraphHandler
            title="Steps"
            dataSet1={lineData}
            color1={colors.lottiePink}
            suffix="k"
            feedback="Your average steps have been improving every month. You've also clocked 8 strength training workouts this month, which you've never done before! You're crushing it!"
          />
          <EmotionGraph
            title="Stress Levels"
            dataSet1={emotionData}
            color1={colors.lottieYellow}
            feedback="You’ve been reporting an increased stress level largely due to work."
          />
          <GraphHandler
            title="Home Fuels"
            dataSet1={lineData}
            dataSet2={lineData2}
            suffix="k"
            color1={"#CEDF8A"}
            color2="#43C47C"
            feedback="Your eating habits have improved drastically. You are now eating better than ever. You've saved INR 8,000 this month on meal expenses alone this month!"
          />
          <GraphHandler
            title="Avg. Sleep Hrs"
            dataSet1={lineData}
            color1={colors.lottieBlue}
            feedback="You've been sleeping lesser hours due to longer work timings."
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default TrendsTab;

const styles = StyleSheet.create({
  scrollableContent: {
    marginBottom: 120,
    flexGrow: 1,
  },
  scrollableContainer: {
    padding: 16,
  },
  title: {
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: colors.appBackground,
  },
  headerTitle: {
    marginTop: Platform.select({ ios: 40, android: 0 }),
  },
});
