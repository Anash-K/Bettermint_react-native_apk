import { Platform, StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { useCallback } from "react";
import CustomButton from "../common/CustomButton";
import { useNavigation } from "@react-navigation/native";

interface CommonSaveBtnType {
  Title?: string;
  BtnStyle?: ViewStyle | ViewStyle[];
  NavPage: string;
  ButtonStyle?: ViewStyle | ViewStyle[];
  HandleOnPress?: () => void;
}

const CommonSaveBtn: React.FC<CommonSaveBtnType> = ({
  Title,
  BtnStyle,
  NavPage,
  ButtonStyle,
  HandleOnPress,
}) => {
  const { navigate } = useNavigation();

  const HandleAction = useCallback(() => {
    if (HandleOnPress) {
      HandleOnPress();
    }
    navigate(NavPage);
  }, []);

  return (
    <View style={[styles.container, BtnStyle]}>
      <CustomButton
        text={Title ?? "Save"}
        onPress={HandleAction}
        buttonStyle={ButtonStyle}
      />
    </View>
  );
};

export default CommonSaveBtn;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: Platform.select({ ios: 20, android: 10 }),
  },
});
