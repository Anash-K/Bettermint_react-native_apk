import { Image, ImageBackground, StyleSheet, View } from "react-native";
import { colors } from "./colors";

const LabTabBar = ({ focused, TabStyle, color, size, icon }) => {
  return (
    <ImageBackground>
      <View>
        <View
          style={[styles.tabIconBox, focused && styles.focusedIcon, TabStyle]}
        >
          <Image
            tintColor={color}
            style={{ height: size, width: size }}
            source={icon}
            resizeMode="contain"
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default LabTabBar;

const styles = StyleSheet.create({
  focusedIcon: {
    backgroundColor: colors.tabIconBackground,
  },
  tabIconBox: {
    padding: 12,
    borderRadius: 40,
  },
});
