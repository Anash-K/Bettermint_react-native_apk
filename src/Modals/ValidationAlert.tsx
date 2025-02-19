import React from "react";
import { Text, StyleSheet } from "react-native";
import { Dialog, ALERT_TYPE } from "react-native-alert-notification";
import { colors } from "../constants/colors";

interface ValidationAlertProps {
  permissionName: string;
  openSettingHandler: () => void;
}

export const validationAlert = () => {
  Dialog.show({
    title: (<Text style={styles.title}>Incomplete Information</Text>) as any,
    autoClose: true,
    type: ALERT_TYPE.WARNING,
    button: (<Text style={styles.buttonText}>Got It</Text>) as any,
    closeOnOverlayTap: true,
    onPressButton: () => Dialog.hide(),
    textBody: (
      <Text style={styles.body}>
        Please make sure all required fields are filled in before proceeding.
      </Text>
    ) as any,
  });
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#D9534F",
  },
  body: {
    fontSize: 16,
    color: colors.secondaryLight,
    textAlign: "center",
  },
  buttonText: {
    color: colors.white,
  },
});
