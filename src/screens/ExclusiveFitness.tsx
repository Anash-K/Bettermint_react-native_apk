import React, { memo, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FastImage from "react-native-fast-image";
import { CustomImages } from "../assets/CustomImages";
import CustomFont from "../assets/fonts/customFonts";
import { colors } from "../constants/colors";
import CommonPlans from "../common/CommonPlans";
import { ScalingDot } from "react-native-animated-pagination-dots";
import { useCustomStyle } from "../constants/CustomStyles";
import CustomButton from "../common/CustomButton";

const ExclusiveFitness: React.FC = memo(() => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);
  const CustomStyle = useCustomStyle();

  const PLANS_DATA = [
    { id: "1", title: "1 Year", price: "$99.99", tag: "Best Value" },
    { id: "2", title: "6 Months", price: "$59.99", tag: "Save 25%" },
    { id: "3", title: "1 Month", price: "$19.99", tag: "" },
  ];

  const handleSelectPlan = ({ id }: { id: string }) => {
    setSelectedPlan(id);
  };

  const handleDotPress = (index: number) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({
        offset: index * 250, // 250 should match snapToInterval
        animated: true,
      });
    }
  };

  return (
    <View style={[styles.container, CustomStyle.safeAreaMarginBottom]}>
      <View style={styles.content}>
        <FastImage source={CustomImages.exclusiveIcon} style={styles.icon} />
        <Text style={styles.title}>Exclusive fitness insights</Text>
        <Text style={styles.subTitle}>
          Get premium access to Exclusive content & bonuses before anyone else
        </Text>
        <View>
          <ScalingDot
            data={PLANS_DATA}
            expandingDotWidth={20}
            scrollX={scrollX}
            inActiveDotOpacity={0.6}
            dotStyle={{
              width: 8,
              height: 8,
              backgroundColor: colors.secondary,
              borderRadius: 5,
              marginHorizontal: 5,
            }}
            containerStyle={{
              top: 0,
              flexDirection: "row",
              alignSelf: "center",
              marginTop: 2,
              backgroundColor: colors.secondary,
            }}
            onDotPress={handleDotPress}
          />
        </View>
        <View style={styles.plansBox}>
          {PLANS_DATA.map((item) => (
            <CommonPlans
              key={item.id}
              title={item.title}
              price={item.price}
              tag={item.tag}
              isSelected={item.id == selectedPlan}
              OnSelectPlan={handleSelectPlan.bind(this, { id: item.id })}
            />
          ))}

          {/* FlatList */}
          {/* <FlatList
          style={{ marginTop: 48 }}
          ref={flatListRef}
          data={PLANS_DATA}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          pagingEnabled
          snapToInterval={300} // Ensures full-screen scrolling
          decelerationRate="fast"
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectPlan(item.id)}>
              <CommonPlans
                title={item.title}
                price={item.price}
                tag={item.tag}
                isSelected={selectedPlan === item.id}
                style={{ width: "100%", alignItems: "center" }} // Ensures full-screen plan display
              />
            </TouchableOpacity>
          )}
        /> */}
        </View>

        {/* Pagination Dots */}

        <Text style={styles.Details}>
          Your payment account will be charged 29.99 USD for 3 months Bettermint
          Premium. <Text style={styles.underLine}>Terms & Conditions</Text>
        </Text>
      </View>
      <CustomButton
        text="Subscribe"
        iconPosition="right"
        icon={CustomImages.linearArrow}
        textStyle={styles.subscribeText}
        iconStyle={styles.subsIcon}
        onPress={() => {}}
      />
      <CustomButton
        text="Restore"
        textStyle={styles.restoreText}
        buttonStyle={styles.restoreBtn}
        onPress={() => {}}
      />
    </View>
  );
});

export default ExclusiveFitness;

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },
  restoreText: {
    color: colors.blackPrimary,
    fontFamily: CustomFont.Urbanist500,
  },
  restoreBtn: {
    backgroundColor: "transparent",
  },
  subsIcon: {
    width: 25,
    position: "absolute",
    right: 16,
  },
  subscribeBtn: {},
  subscribeText: {
    flex: 1,
    textAlign: "center",
  },
  underLine: {
    textDecorationLine: "underline",
  },
  Details: {
    fontSize: 12,
    lineHeight: 14.4,
    fontFamily: CustomFont.Urbanist400,
    color: colors.blackPrimary,
    textAlign: "center",
    marginTop: 24,
  },
  plansBox: {
    marginTop: 48,
  },
  subTitle: {
    fontFamily: CustomFont.Urbanist400,
    fontSize: 14,
    lineHeight: 16.8,
    color: colors.blackPrimary,
    textAlign: "center",
    maxWidth: 275,
    marginHorizontal: "auto",
    marginVertical: 12,
  },
  title: {
    fontFamily: CustomFont.Urbanist600,
    fontSize: 20,
    lineHeight: 24,
    color: colors.blackSecondary,
    textAlign: "center",
    marginTop: 12,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  icon: {
    width: 50,
    height: 50,
    marginHorizontal: "auto",
  },
});
