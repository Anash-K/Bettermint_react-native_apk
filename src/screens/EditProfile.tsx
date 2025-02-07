import { memo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import CustomImageHandler from "../common/CustomImageHandler";
import { CustomImages } from "../assets/CustomImages";
import SimpleTabs from "../common/SimpleTabs";
import SimpleTabWrapper from "../common/SimpleTabWrapper";

const EditProfile = memo(() => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View>
        <CustomImageHandler
          sourceImage={""}
          placeholderImage={CustomImages.profilePic}
          imageStyle={styles.profilePic}
        />
      </View>
      <SimpleTabWrapper title="Personal Details">
        <SimpleTabs title="Basic Info" tabIcon={CustomImages.editIcon} />
        <SimpleTabs
          title="Mobile No."
          tabIcon={CustomImages.mobileIcon}
          actionText="+1 123-4567"
        />
        <SimpleTabs
          title="Height"
          tabIcon={CustomImages.height}
          actionText="5ft, 11in"
        />
        <SimpleTabs
          title="Weight"
          tabIcon={CustomImages.weight}
          actionText="72kg"
        />
        <SimpleTabs
          title="Status"
          tabIcon={CustomImages.status}
          actionText="Working"
        />
      </SimpleTabWrapper>
      <SimpleTabWrapper title="Wellness Details">
        <SimpleTabs title="Body Measurements" tabIcon={CustomImages.scale} />
        <SimpleTabs title="Disease" tabIcon={CustomImages.disease} />
        <SimpleTabs
          title="Health Reports"
          tabIcon={CustomImages.history}
          actionText="Add"
        />
        <SimpleTabs title="Family History" tabIcon={CustomImages.disease} />
      </SimpleTabWrapper>
    </ScrollView>
  );
});

export default EditProfile;

const styles = StyleSheet.create({
  profilePic: {
    width: 175,
    height: 175,
    margin: "auto",
    // borderRadius:
  },
  container: {
    flex: 1,
    padding: 16,
  },
});
