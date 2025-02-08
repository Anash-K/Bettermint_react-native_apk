import {
  Dimensions,
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ScaleRoller from "../utils/ScaleRoller";
import { useCustomStyle } from "../constants/CustomStyles";
import React, { useState, useCallback, useRef, useEffect } from "react";
import CustomFont from "../assets/fonts/customFonts";
import { colors } from "../constants/colors";
import { ScreenProps } from "../navigator/Stack";
import { useSelector } from "react-redux";
import DrawerButton from "../common/DrawerButton";
import CustomButton from "../common/CustomButton";

const { width, height } = Dimensions.get("screen");

const WhatsYourMeasurement: React.FC<ScreenProps<"WhatsYourMeasurement">> = ({
  navigation,
}) => {
  const gender = useSelector((state: any) => state.auth);
  const customStyle = useCustomStyle();

  const heightData: { key: any }[] = Array.from({ length: 201 }, (_, i) => ({
    key: `${50 + i}`,
  }));

  const [selectedHeight, setSelectedHeight] = useState(null);
  const [activeDrawer, setActiveDrawer] = useState("Chest");
  const flatListRef = useRef<any>(null);
  const screenWidth = Dimensions.get("screen").width;
  const itemWidth = 80;

  useEffect(() => {
    if (flatListRef.current) {
      setTimeout(() => {
        flatListRef.current.scrollToOffset({
          offset:
            (heightData.length / 2) * itemWidth -
            screenWidth / 2 +
            itemWidth / 4,
          animated: false,
        });
      }, 100);
    }
  }, []);

  const onViewableItemsChanged = useCallback(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      const centerIndex = Math.round(
        viewableItems[0].index + viewableItems.length / 2.2
      );
      setSelectedHeight(heightData[centerIndex]?.key);
    }
  }, []);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const handlePress = useCallback((btnText: string) => {
    setActiveDrawer(btnText);
  }, []);

  const handleNextNav = useCallback(() => {
    navigation.navigate('DoYouHaveDiseases');
  }, []);

  console.log(width, "screen width");

  return (
    <ScrollView
      nestedScrollEnabled={true}
      style={[customStyle.safeAreaMarginBottom, styles.container]}
      overScrollMode="never"
      bounces={false}
      contentContainerStyle={styles.contentStyle}
    >
      <View style={{ flex: 1 }}>
        <Text style={[customStyle.title, styles.title]}>
          What’s your measurement?
        </Text>
        <View style={styles.buttonBox}>
          <DrawerButton
            text={gender == "Male" ? "Chest" : "Bust"}
            buttonStyle={styles.commonButtonStyle}
            isFocus={activeDrawer == "Chest"}
            outBoxStyle={{ flex: 1 }}
            onPress={handlePress.bind(this, "Chest")}
            isRadioButton={true}
          />
          <DrawerButton
            text="Waist"
            outBoxStyle={{ flex: 1 }}
            isFocus={activeDrawer == "Waist"}
            buttonStyle={styles.commonButtonStyle}
            onPress={handlePress.bind(this, "Waist")}
            isRadioButton={true}
          />
          <DrawerButton
            text="Hip"
            outBoxStyle={{ flex: 1 }}
            isFocus={activeDrawer == "Hip"}
            buttonStyle={styles.commonButtonStyle}
            onPress={handlePress.bind(this, "Hip")}
            isRadioButton={true}
          />
          <DrawerButton
            text="Thigh"
            outBoxStyle={{ flex: 1 }}
            isFocus={activeDrawer == "Thigh"}
            buttonStyle={styles.commonButtonStyle}
            onPress={handlePress.bind(this, "Thigh")}
            isRadioButton={true}
          />
        </View>

        {selectedHeight && (
          <View style={styles.selectedValueBox}>
            <Text style={styles.selectedHeightText}>{selectedHeight}</Text>
            <Text style={styles.unit}>in</Text>
          </View>
        )}
        <FlatList
          ref={flatListRef}
          data={heightData}
          renderItem={({ item }) => (
            <ScaleRoller
              firstDigit={item.key}
              selectedHeight={selectedHeight}
            />
          )}
          keyExtractor={(item) => item.key}
          contentContainerStyle={{
            ...styles.contentRoller,
            paddingHorizontal: screenWidth / 1 - itemWidth / 2,
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          snapToInterval={itemWidth}
          decelerationRate="fast"
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          // pagingEnabled
        />
      </View>
      <View style={styles.bottomBtn}>
        <CustomButton
          buttonStyle={styles.submitButton}
          text="Continue"
          onPress={handleNextNav}
        />
      </View>
    </ScrollView>
  );
};

export default WhatsYourMeasurement;

const styles = StyleSheet.create({
  contentStyle: {
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
  bottomBtn: {
    width: "100%",
    paddingHorizontal: 16,
  },
  submitButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  commonButtonStyle: {
    flex: 1,
    // width:'33%'
  },
  buttonBox: {
    flexDirection: "row",
    backgroundColor: colors.white,
    marginHorizontal: 16,
    borderRadius: 54,
    marginBottom: 68,
    flexWrap: "wrap",
  },
  selectedValueBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
    columnGap: 4,
    marginBottom: 48,
  },
  unit: {
    fontFamily: CustomFont.Urbanist600,
    fontSize: 36,
    lineHeight: 44,
    color: colors.secondaryLight,
  },
  contentRoller: {
    flexDirection: "row",
  },
  container: {
    flex: 1,
    marginBottom: Platform.select({ ios: 50, android: 35 }),
  },
  title: {
    marginBottom: 48,
    maxWidth:343,
    marginHorizontal:'auto',
    marginTop:21
  },
  selectedHeightText: {
    marginTop: 20,
    fontSize: 96,
    lineHeight: 96,
    fontFamily: CustomFont.Urbanist800,
    color: colors.primary,
    fontWeight: Platform.select({ ios: 800 }),
  },
});
