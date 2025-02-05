import React, { memo, useCallback, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { colors } from "../constants/colors";
import CustomFont from "../assets/fonts/customFonts";

interface CustomAddressBarType {
  height?: number;
}

const CustomAddressBar: React.FC<CustomAddressBarType> = memo(({ height }) => {
  const [isFocus, setIsFocus] = useState(false);

  const handleFocus = useCallback(() => {
    setIsFocus(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocus(false);
  }, []);
  return (
    <View style={[styles.outerBox,, isFocus && styles.focusBox]}>
      <TextInput
        style={[styles.textInput, { height: height ?? 160 }]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Write here..."
        placeholderTextColor={colors.gray}
        multiline={true}
      />
    </View>
  );
});
export default CustomAddressBar;

const styles = StyleSheet.create({
  focusBox: {
    borderColor: colors.primaryBlur,
  },
  outerBox: {
    borderWidth: 4,
    borderColor: "transparent",
    borderRadius: 18,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {},
  textInput: {
    borderWidth: 1,
    borderColor: colors.primaryBlur,
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: 13,
    padding: 16,
    fontSize: 16,
    lineHeight: 19.2,
    fontFamily: CustomFont.Urbanist400,
    color: colors.secondary,
    textAlignVertical: "top",
  },
});
