import { StatusBar, Text, View } from "react-native";
import { colors } from "../../constants/colors";

const TrendsTab = () => {
  return (
    <View>
      <StatusBar barStyle={"light-content"} backgroundColor={colors.primary} />
      <Text>Trends Screen</Text>
    </View>
  );
};

export default TrendsTab;
