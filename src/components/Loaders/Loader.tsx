import React, { forwardRef, memo, useImperativeHandle, useState } from "react";
import { Modal, View, StyleSheet, ActivityIndicator, Text } from "react-native";
import { LoaderType } from "../../Types/CommonTypes";

const Loader = memo(
  forwardRef<LoaderType>((_, ref) => {
    const [isLoader, setIsLoader] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
      start() {
        setIsLoader(true);
      },
      stop() {
        setIsLoader(false);
      },
    }));

    return (
      <Modal
        transparent={true}
        visible={isLoader}
        onRequestClose={setIsLoader.bind(null, false)}
      >
        <View style={styles.overlay}>
          <ActivityIndicator
            style={styles.loader}
            size={80}
            color="rgba(32, 201, 151, 1)"
          />
        </View>
      </Modal>
    );
  })
);

const styles = StyleSheet.create({
  pleaseWait: {
    color: "rgba(32, 201, 151, 0.5)",
    textAlign: "center",
    fontSize: 16,
    position: "absolute",
    top: "55%",
    left: 0,
    right: 0,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  loader: {
    width: 250,
    height: 250,
    color: "#20C997",
  },
});

export default Loader;
