import { StyleSheet, Text, View } from "react-native";
import { useCustomStyle } from "../constants/CustomStyles";

const ContentText: React.FC<{ text: string }> = ({ text }) => {
  const CustomStyle = useCustomStyle();
  return <Text style={[CustomStyle.contentParaStyle]}>{text}</Text>;
};

export const BeginnerContent = () => {
  return (
    <View style={styles.container}>
      <ContentText text="But don’t worry! Joining the Bettermint family shows you’re ready to take initiative! The World Health Organization (WHO) recommends 30 minutes of exercise 5 times a week or clocking about 10K steps a day to stay healthy and fit." />
      <ContentText text="This isn’t just about keeping your weight in check; it’s also key to building muscle mass, maintaining strength, flexibility, and agility as we age." />
      <ContentText text="Getting into this movement will be one of our primary goals together! We’ll add this to your personalised habit tracker to guide you on your fitness journey." />
    </View>
  );
};

export const IntermediateContent = () => {
  return (
    <View style={styles.container}>
      <ContentText text="It’s amazing that you show up for a workout 5x a week—showing up is half the battle won! The only other thing we can work on in movement is increasing your steps. Walking is fantastic for building lean muscle mass." />
      <ContentText text="We’ll add this to your personalised healthy habits plan. On days when you don’t clock a workout—or even on days when you do—try to clock a short walk. Let’s aim for 8k+ steps daily!" />
    </View>
  );
};

export const IntermediateTwoContent = () => {
  return (
    <View style={styles.container}>
      <ContentText text="It’s amazing that you clock more than 10k steps a day—walking is incredibly beneficial for your health!" />
      <ContentText text="However, it’s also crucial to incorporate some muscle training into your routine. As we age, we naturally lose muscle mass, so it’s essential to work on building and maintaining it." />
      <ContentText text="We’ll focus on adding muscle-strengthening activities to your personalised healthy habits plan." />
    </View>
  );
};

export const AdvanceContent = () => {
  return (
    <View style={styles.container}>
      <ContentText text="Wow! Keep doing what you’re doing! We will keep tracking your workouts as a habit & towards a balance of strength & cardio workouts." />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16, // Provide some padding for better readability
  },
});
