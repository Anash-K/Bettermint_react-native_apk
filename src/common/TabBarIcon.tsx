import { StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";

const TabBarIcon = ({ iconSrc, TabTintColor }) => {
  return (
    <View style={styles.container}>
      <FastImage
        source={iconSrc}
        style={styles.icon}
        tintColor={TabTintColor}
      />
    </View>
  );
};

export default TabBarIcon;

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  icon: {
    width: 16,
    height: 16,
  },
});
