import React, { memo } from "react";
import {
  Image,
  ImageProps,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomFont from "../assets/fonts/customFonts";
import { colors } from "../constants/colors";

interface Mode {
  LightTheme: boolean;
  DarkTheme: boolean;
  DeviceTheme: boolean;
}

interface ActionModalProps {
  isModalVisible: boolean;
  toggleModal: () => void;
  handleAction: () => void;
  Logo: ImageProps;
  ActionText: String;
  contentText: String;
}

const ActionModal: React.FC<ActionModalProps> = memo(
  ({
    isModalVisible,
    toggleModal,
    handleAction,
    Logo,
    ActionText,
    contentText,
  }) => {
    const handlePress = () => {};
    return (
      <>
        {isModalVisible && (
          <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={toggleModal}
          >
            <Pressable style={styles.modalOverlay} onPress={toggleModal}>
              <View style={styles.modalContent}>
                <View style={styles.modalBox}>
                  <View style={styles.closeButton}>
                    <Image
                      source={Logo}
                      style={styles.closeIcon}
                      resizeMode="contain"
                      tintColor={colors.white}
                    />
                  </View>
                  <View style={styles.contentTextBox}>
                    <Text style={styles.modalTitle}>{contentText}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleAction}
                  >
                    <Text style={[styles.buttonText, styles.actionText]}>
                      {ActionText}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={toggleModal}>
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Pressable>
          </Modal>
        )}
      </>
    );
  }
);

export default ActionModal;

const styles = StyleSheet.create({
  actionText: {
    color: "#EF4355",
  },
  contentTextBox: {},
  modalBox: {
    backgroundColor: colors.white,
    borderRadius: 25,
    margin: 24,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  button: {
    paddingVertical: 16,
    borderTopColor: colors.borderColor,
    borderTopWidth: 1,
  },
  buttonText: {
    fontFamily: CustomFont.Urbanist600,
    fontSize: 18,
    lineHeight: 21.6,
    color: colors.silver,
    textAlign: "center",
  },
  modalTitle: {
    fontFamily: CustomFont.Urbanist600,
    fontSize: 20,
    lineHeight: 24,
    color: colors.blackPrimary,
    margin: 16,
    letterSpacing: 0.5,
    textAlign: "center",
    marginTop: 24,
    marginBottom: 24,
    marginHorizontal: 0,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000080",
  },
  modalContent: {
    width: "100%",
    borderRadius: 25,
    position: "absolute",
    zIndex: 100,
  },
  closeButton: {
    alignSelf: "center",
    backgroundColor: "#DD4247",
    padding: 10,
    borderRadius: 15,
  },
  closeIcon: {
    width: 44,
    height: 44,
  },
});
