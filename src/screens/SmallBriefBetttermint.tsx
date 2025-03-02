import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { useCustomStyle } from "../constants/CustomStyles";
import FastImage from "react-native-fast-image";
import React, { memo, useCallback, useEffect } from "react";
import { ScreenProps } from "../navigator/Stack";
import { CustomImages } from "../assets/CustomImages";
import CustomFont from "../assets/fonts/customFonts";
import CustomButton from "../common/CustomButton";
import { colors } from "../constants/colors";
import { useDispatch } from "react-redux";
import { setFieldAction } from "../redux/slices/workoutDetailsSlice";
import { useMutation } from "@tanstack/react-query";
import { GetQuestions } from "../axious/GetApis";
import { ErrorHandler } from "../utils/ErrorHandler";
import { AppLoaderRef } from "../../App";
import { MutationKey } from "../Types/MutationKeys";
import { setQnA } from "../redux/slices/qnaSlice";

const SmallBriefBettermint: React.FC<ScreenProps<"SmallBriefBettermint">> = ({
  navigation,
}) => {
  const CustomStyle = useCustomStyle();
  const dispatch = useDispatch();
  const handleNextNav = useCallback(() => {
    dispatch(setFieldAction({ field: "isProfileSetup", value: true }));
    navigation.navigate("MovementAssesment");
  }, []);

  const { mutate : getQuest} = useMutation({
    mutationKey:[MutationKey.questions],
    onMutate:() => AppLoaderRef.current?.start(),
    mutationFn:async() => await GetQuestions(),
    onError(error) {
      console.log("error", error);
      ErrorHandler(error);
    },
    onSuccess(data) {
      dispatch(setQnA(data.payload.data))
    },
    onSettled:() => AppLoaderRef.current?.stop(),
  });

  useEffect(() =>{
    getQuest();
  },[]);

  return (
    <ScrollView
      style={[styles.container, CustomStyle.safeAreaMarginBottom]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={[CustomStyle.title, styles.title]}>
          A small brief of Bettermint
        </Text>
        <Text style={[styles.para, styles.paraOne]}>
          Great! Now that we have your basics, let’s tell you a little about how
          Bettermint works. At Bettermint we believe good health is a balance
          between 4 key pillars:
        </Text>
        <FastImage source={CustomImages.movementIcon} style={styles.icon} />
        <Text style={[styles.para, styles.paraTwo]}>
          Every human is different, someone mostly eats home cooked food but
          barely moves their body. Another person is quite active but has no
          control on their food! And so at Bettermint we work with you to
          identify your strengths & areas of improvement & work back with you to
          gradually improve on your problem areas! We use behavioral science to
          slowly & steadily build habits that are best for you! First you change
          your habits & then your habits will change you! We believe that
          consistency is the best tool to live a fitter life. So all habit
          suggestions at Bettermint are built around this principle. What you
          can’t keep up with, we won’t do!
        </Text>
        <Text style={styles.para}>
          We use an expertly designed assessment framework to determine whether
          you’re a Beginner / Intermediate / Master in each of these four
          pillars & accordingly come up with a plan on what you can prioritize
          to get fitter basis your health goals! Everyone’s habits look
          different.
        </Text>
        <Text style={styles.para}>So let’s get to know where you stand.</Text>
      </View>
      <CustomButton
        text="Continue"
        onPress={handleNextNav}
        buttonStyle={styles.button}
      />
    </ScrollView>
  );
};

export default memo(SmallBriefBettermint);

const styles = StyleSheet.create({
  button: {
    marginTop: 48,
    marginVertical: Platform.select({ android: 15, ios: 10 }),
  },
  header: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: Platform.select({ android: 30 }),
  },
  para: {
    marginBottom: 16,
    fontFamily: CustomFont.Urbanist500,
    fontSize: 16,
    lineHeight: 19.2,
    color: colors.secondary,
  },
  paraTwo: {
    marginTop: 32,
    color: colors.secondary,
  },
  paraOne: {
    marginTop: 16,
    marginBottom: 32,
    color: colors.secondary,
  },
  icon: {
    width: 220,
    height: 212,
    marginHorizontal: "auto",
  },
  title: {
    textAlign: "left",
  },
  container: {
    flex: 1,
    paddingTop: 30,
    padding: 16,
  },
});
