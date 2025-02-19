import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import CustomFont from "../assets/fonts/customFonts";
import { colors } from "../constants/colors";
import FastImage from "react-native-fast-image";
import { CustomImages } from "../assets/CustomImages";
import { useCustomStyle } from "../constants/CustomStyles";
import CustomButton from "../common/CustomButton";

type EmailVerificationModal = {
  isVisible: boolean;
  closeModal: () => void;
  OnConfirm: () => void;
};

const ImportantNoticeModal: React.FC<EmailVerificationModal> = ({
  isVisible,
  closeModal,
  OnConfirm,
}) => {
  const CustomStyle = useCustomStyle();
  return (
    <Modal
      visible={isVisible}
      transparent={true} // Makes the background transparent
      animationType="fade" // Optional animation for modal appearance
      onRequestClose={closeModal} // Handles the back button on Android
    >
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <FastImage source={CustomImages.mailIcon} style={styles.icon} />
              <Text style={styles.title}>Verification Email Sent!</Text>
              <Text style={[CustomStyle.subtitle, styles.subTitle]}>
                Verify your email to complete signup. Don’t forget to check
                spam!
              </Text>
              <CustomButton
                text="Resend verification email"
                buttonStyle={styles.confirmButton}
                textStyle={styles.confirmText}
                onPress={OnConfirm}
              />
              <CustomButton
                text="Cancel"
                buttonStyle={styles.cancelButton}
                textStyle={styles.cancelText}
                onPress={closeModal}
              />
              {/* Add more content as needed */}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ImportantNoticeModal;

const styles = StyleSheet.create({
  icon: {
    width: 80,
    height: 80,
  },
  confirmText: {
    color: colors.primary,
    fontSize: 16,
    lineHeight: 19.2,
  },
  subTitle: {
    marginBottom: 24,
    maxWidth: 295,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "92%",
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 16,
    paddingTop: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    lineHeight: 24,
    fontFamily: CustomFont.Urbanist700,
    color: colors.black,
    marginBottom: 12,
    textAlign: "center",
    marginTop: 24,
  },
  confirmButton: {
    borderRadius: 0,
    margin: 0,
    width: "100%",
    backgroundColor: "transparent",
    borderTopColor: colors.borderColor,
    borderTopWidth: 1,
  },
  cancelButton: {
    borderRadius: 0,
    margin: 0,
    width: "100%",
    backgroundColor: "transparent",
    borderTopColor: colors.borderColor,
    borderTopWidth: 1,
    paddingBottom: 0,
  },
  cancelText: {
    color: "#8A909B",
    fontSize: 16,
    lineHeight: 19.2,
  },
});
