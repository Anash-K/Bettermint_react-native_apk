import { StyleSheet, Text, View } from "react-native";
import { useCustomStyle } from "../constants/CustomStyles";

const ProvideYourMobileNumber = () => {
  const CustomStyle = useCustomStyle();
  return (
    <View style={styles.container}>
      <Text style={[CustomStyle.title]}>Please Provide Your Mobile Number</Text>
    </View>
  );
};

export default ProvideYourMobileNumber;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
