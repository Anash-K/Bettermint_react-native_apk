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
import { useDispatch, useSelector } from "react-redux";
import { setFieldAction } from "../redux/slices/workoutDetailsSlice";
import CustomButton from "../common/CustomButton";

const { width, height } = Dimensions.get("screen");

const MovementAssesment: React.FC<ScreenProps<"MovementAssesment">> = ({
  navigation,
}) => {
  const gender = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const customStyle = useCustomStyle();

  const heightData: { key: any }[] = Array.from({ length: 250 }, (_, i) => ({
    key: `${1 + i}`,
  }));

  const [selectedHeight, setSelectedHeight] = useState<number | null>(null);
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
    dispatch(setFieldAction({ field: "steps", value: selectedHeight ?? 0 }));
    navigation.navigate("DoYouWorkOut");
  }, [dispatch, selectedHeight, navigation]);


  return (
    <ScrollView
      nestedScrollEnabled={true}
      style={[styles.container]}
      overScrollMode="never"
      bounces={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentStyle}
    >
      <View style={{ flex: 1 }}>
        <Text style={[customStyle.title, styles.title]}>
          How many steps do you do in a day on an average?
        </Text>

        {selectedHeight && (
          <View style={styles.selectedValueBox}>
            <Text style={styles.selectedHeightText}>{selectedHeight}K</Text>
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

export default MovementAssesment;

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
    marginBottom: Platform.select({ android: 35, ios: 45 }),
  },
  title: {
    marginBottom: 48,
    maxWidth: 343,
    marginHorizontal: "auto",
    marginTop: 21,
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
