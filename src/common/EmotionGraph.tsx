import React, { memo, useCallback } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import CustomSelector from "./CustomSelector";
import CustomInput from "./CustomInput";
import SelectDropdownInput from "./SelectDropdownInput";
import FastImage from "react-native-fast-image";
import { CustomImages } from "../assets/CustomImages";
import { useCustomStyle } from "../constants/CustomStyles";
import { colors } from "../constants/colors";
import CustomFont from "../assets/fonts/customFonts";

interface EmotionGraphType {
  dataSet1: { value: number }[] | [];
  dataSet2?: { value: number }[] | [];
  color1: string;
  color2?: string;
  title: string;
  feedback: string;
  yAxislabel?: [];
}
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const monthsOptions = [
  { id: 0, title: "1" },
  { id: 1, title: "2" },
  { id: 2, title: "3" },
  { id: 3, title: "4" },
  { id: 4, title: "5" },
  { id: 5, title: "6" },
  { id: 6, title: "7" },
  { id: 7, title: "8" },
  { id: 8, title: "9" },
  { id: 9, title: "10" },
  { id: 10, title: "11" },
  { id: 11, title: "12" },
];

const EmotionGraph: React.FC<EmotionGraphType> = memo(
  ({ dataSet1, dataSet2, color1, color2, title, feedback, yAxislabel }) => {
    const CustomStyle = useCustomStyle();
    const { width } = Dimensions.get("screen");
    const handleChange = useCallback(() => {}, []);

    const yAxisImages = [
      CustomImages.happy,
      CustomImages.smile,
      CustomImages.normalSmile,
      CustomImages.sad,
      CustomImages.confuse,
    ];

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <View>
            <SelectDropdownInput
              options={monthsOptions}
              onChange={handleChange}
              suffix=" months"
            />
          </View>
        </View>
        <View style={styles.graphBox}>
          <View style={styles.yAxisLabels}>
            {yAxisImages.map((img, index) => (
              <FastImage key={index} source={img} style={styles.emotionIcon} />
            ))}
          </View>
          <View style={styles.graphTree}>
            <LineChart
              areaChart
              curved
              data={dataSet1 ?? []}
              data2={dataSet2 ?? []}
              height={185}
              spacing={50}
              initialSpacing={0}
              color1={color1}
              color2={color2 ?? "orange"}
              textColor1="green"
              hideDataPoints
              dataPointsColor1={color1}
              dataPointsColor2={color2 ?? "orange"}
              startFillColor1={color1}
              startFillColor2={color2 ?? "orange"}
              startOpacity={1}
              endOpacity={0.7}
              maxValue={5}
              textShiftY={-2}
              textShiftX={-5}
              yAxisOffset={0}
              yAxisLabelSuffix="k"
              textFontSize={13}
              noOfSections={5}
              xAxisLabelTexts={months}
              yAxisLabelTexts={yAxislabel ?? []}
              hideYAxisText
              yAxisTextStyle={[styles.commonAxisStyle, styles.yAxisText]}
              xAxisLabelTextStyle={[styles.commonAxisStyle, styles.xAxisText]}
              hideRules={true}
              xAxisColor={colors.chartBarColor}
              yAxisColor={colors.chartBarColor}
              xAxisLength={30}
            />
          </View>
        </View>

        <View style={styles.feedbackBox}>
          <Text style={[CustomStyle.commonText, styles.feedbackText]}>
            <Text style={styles.feedbackTitle}>Feedback:</Text>
            {feedback}
          </Text>
        </View>
      </View>
    );
  }
);

export default EmotionGraph;

const styles = StyleSheet.create({
  yAxisLabels: {
    height: 185,
    justifyContent: "space-between",
    marginRight: 2,
    marginBottom: 20,
    flex: 0.07,
  },
  graphTree: {
    flex: 0.93,
  },
  emotionIcon: {
    width: 20,
    height: 20,
  },
  graphBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  yAxisText: {
    paddingBottom: 15,
  },
  feedbackBox: {
    marginTop: 24,
  },
  feedbackTitle: {
    color: colors.black,
    marginRight: 10,
  },
  feedbackText: {},
  header: {
    marginBottom: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontFamily: CustomFont.Urbanist700,
    fontSize: 20,
    lineHeight: 24,
    color: colors.primary,
  },
  container: {
    backgroundColor: colors.white,
    padding: 16,
    marginVertical: 12,
    borderRadius: 25,
    paddingBottom: 18,
    overflow: "hidden",
  },
  xAxisText: {
    marginLeft: 10,
  },
  commonAxisStyle: {
    fontSize: 13,
    lineHeight: 14.4,
    fontFamily: CustomFont.Urbanist500,
    color: colors.secondaryLight,
  },
});
