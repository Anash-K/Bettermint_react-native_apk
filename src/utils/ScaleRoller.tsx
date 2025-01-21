import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";

const ScaleRoller = ({ firstDigit, selectedHeight }) => {
  const heightData = [];
  if (firstDigit != 250) {
    for (let i = 1; i <= 4; i++) {
      heightData.push({ key: `${i}` });
    }
  }

  const SmallLine = () => {
    return <View style={styles.smallLine}></View>;
  };

  return (
    <View style={styles.container}>
      <View style={styles.digitLine}>
        <View
          style={[
            styles.bigLine,
            firstDigit == selectedHeight && styles.focusHeight,
          ]}
        ></View>
        <Text style={styles.digits}>{firstDigit}</Text>
      </View>
      {firstDigit != 250 &&
        heightData.map((item) => <SmallLine key={item.key} />)}
    </View>
  );
};

export default ScaleRoller;

const styles = StyleSheet.create({
  innerSmallContent: {
    flexDirection: "row",
  },
  digits: {
    // position: "absolute",
  },
  digitLine: {
    rowGap: 16,
    alignItems: "center",
  },
  container: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  bigLine: {
    height: 42,
    width: 8,
    borderRadius: 8,
    backgroundColor: colors.rollerBigLineColor,
  },
  smallLine: {
    height: 24,
    width: 4,
    borderRadius: 4,
    backgroundColor: colors.rollerSmallLineColor,
    marginTop: 9,
    marginHorizontal: 5,
  },
  focusHeight: {
    backgroundColor: "#58A3A4",
  },
});
