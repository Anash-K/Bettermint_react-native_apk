import React, {memo} from 'react';
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
} from 'react-native';
import CustomFont from '../../assets/fonts/customFonts';
import { colors } from '../../constants/colors';

interface PermissionModal {
  isModalVisible: boolean;
  toggleModal: () => void;
  contentText: String;
}

const PermissionModal: React.FC<PermissionModal> = memo(
  ({isModalVisible, toggleModal, contentText}) => {
    const handlePress = () => {};
    return (
      <>
        {isModalVisible && (
          <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={toggleModal}>
            <Pressable style={styles.modalOverlay} onPress={toggleModal}>
              <View style={styles.modalContent}>
                <View
                  style={{
                    backgroundColor: colors.white,
                    borderColor:colors.primaryBlur,
                    borderWidth:2,
                    borderRadius: 15,
                    margin: 24,
                    paddingHorizontal: 16,
                  }}>
                  <View
                    style={{borderColor: colors.primaryBlur, borderBottomWidth: 1.5}}>
                    <Text style={styles.modalTitle}>{contentText}</Text>
                  </View>
                  {/* {ActionText && (
                    <TouchableOpacity
                      style={styles.button}
                      onPress={handleAction}>
                      <Text style={[styles.buttonText, {color: '#EF4355'}]}>
                        {ActionText}
                      </Text>
                    </TouchableOpacity>
                  )} */}

                  <TouchableOpacity style={styles.button} onPress={toggleModal}>
                    <Text style={styles.buttonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Pressable>
          </Modal>
        )}
      </>
    );
  },
);

export default PermissionModal;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    borderTopColor: colors.primaryBlur,
    borderTopWidth: 1,
  },
  buttonText: {
    fontFamily: CustomFont.Urbanist500,
    fontSize: 18,
    lineHeight: 21.6,
    color: '#8A909B',
    textAlign: 'center',
  },
  modalTitle: {
    fontFamily: CustomFont.Urbanist500,
    fontSize: 20,
    lineHeight: 24,
    color: colors.primary,
    margin: 16,
    letterSpacing: 0.5,
    textAlign: 'center',
    marginTop: 24,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '100%',
    borderRadius: 10,
    position: 'absolute',
    zIndex: 100,
  },
  closeButton: {
    alignSelf: 'center',
    backgroundColor: '#DD4247',
    padding: 10,
    borderRadius: 15,
  },
  closeIcon: {
    width: 44,
    height: 44,
  },
});
