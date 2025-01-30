import { memo } from "react";
import { Platform, StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";
import { CustomImages } from "../assets/CustomImages";
import { colors } from "./colors";

const TabLogo = memo(() => {
  return (
    <View style={styles.container}>
      <FastImage source={CustomImages.TabLogo} style={styles.imageStyle} />
    </View>
  );
});

export default TabLogo;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: colors.primary,
    height:Platform.select({ios:150,android:150}),
    borderBottomEndRadius:25,
    borderBottomStartRadius:25,
    alignItems:'center'
  },
  imageStyle: {
    width: 187,
    height: 34,
    marginTop:Platform.select({ios:10})
  },
});
