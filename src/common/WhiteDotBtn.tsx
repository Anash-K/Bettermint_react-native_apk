import { memo } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { colors } from "../constants/colors";

const WhiteDot = memo(
  ({
    isFocus,
    customStyle,
    innerDotStyle,
  }: {
    isFocus: boolean;
    customStyle?: ViewStyle | ViewStyle[];
    innerDotStyle?: ViewStyle | ViewStyle[];
  }) => {
    return (
      <View
        style={[
          styles.outerRing,
          isFocus && { borderColor: colors.white },
          customStyle,
        ]}
      >
        {isFocus && <View style={[styles.innerRing, innerDotStyle]}></View>}
      </View>
    );
  }
);

export default WhiteDot;

const styles = StyleSheet.create({
  outerRing: {
    borderColor: colors.primary,
    borderWidth: 2,
    width: 20,
    height: 20,
    borderRadius: 50,
    padding: 3,
  },
  innerRing: {
    backgroundColor: colors.white,
    flex: 1,
    borderRadius: 50,
  },
});
