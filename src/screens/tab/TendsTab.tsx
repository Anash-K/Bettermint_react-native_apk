import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/colors";
import React from "react";
import { ScreenProps } from "../../navigator/Stack";
import TabLogo from "../../constants/TabLogo";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TrendsTab: React.FC<ScreenProps<"TrendsTab">> = () => {
  const { top } = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor={colors.primary} />
      <TabLogo
        Boxstyle={[
          { height: Platform.select({ ios: top + 70, android: top + 70 }) },
        ]}
        titleStyle={styles.headerTitle}
        title="Trends"
      />
      <Text style={styles.title}>Working</Text>
    </View>
  );
};

export default TrendsTab;

const styles = StyleSheet.create({
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
