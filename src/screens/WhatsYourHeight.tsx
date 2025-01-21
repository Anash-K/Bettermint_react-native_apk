import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import ScaleRoller from "../utils/ScaleRoller";
import { useCustomStyle } from "../constants/CustomStyles";
import { useState, useCallback, useRef } from "react";

const WhatsYourHeight = () => {
  const customStyle = useCustomStyle();

  const heightData = [];
  for (let i = 50; i <= 250; i += 5) {
    heightData.push({ key: `${i}` });
  }

  const [selectedHeight, setSelectedHeight] = useState(null);
  const flatListRef = useRef(null);
  const [screenWidth, setScreenWidth] = useState(Dimensions.get("window").width); // Store the screen width
  const [itemLayouts, setItemLayouts] = useState({}); // Store layout info of each item

  // Function to store layout information of each item
  const handleLayout = (event, key) => {
    const { x, width } = event.nativeEvent.layout;
    setItemLayouts((prevLayouts) => ({
      ...prevLayouts,
      [key]: { x, width },
    }));
  };

  // Function to calculate the center based on viewable items
  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      // Calculate center by getting the middle of the screen
      const centerOffset = screenWidth / 2;

      // Find the closest item to the center of the screen
      const centerItem = viewableItems.reduce((prev, current) => {
        // Get the layout info for both items
        const prevLayout = itemLayouts[prev.item.key] || {};
        const currentLayout = itemLayouts[current.item.key] || {};

        const prevDistance = Math.abs(
          (prevLayout.x + prevLayout.width / 2) - centerOffset
        );
        const currentDistance = Math.abs(
          (currentLayout.x + currentLayout.width / 2) - centerOffset
        );

        return currentDistance < prevDistance ? current : prev;
      });

      setSelectedHeight(centerItem.item.key); // Set the selected height to the key of the centered item
      console.log(centerItem.item.key);
    }
  }, [screenWidth, itemLayouts]);

  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 50, // To consider the item as visible when at least 50% of it is visible
  };


  return (
    <View style={styles.container}>
      <Text style={[customStyle.title, styles.title]}>What’s your height?</Text>

     
      <FlatList
        ref={flatListRef}
        data={heightData}
        renderItem={({ item }) => (
          <ScaleRoller
            firstDigit={item.key}
            selectedHeight={selectedHeight}
            onLayout={(event) => handleLayout(event, item.key)} // Handle layout for each item
          />
        )}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.contentRoller}
        horizontal={true}
        onViewableItemsChanged={onViewableItemsChanged} // Monitor visible items
        viewabilityConfig={viewabilityConfig} // Set the viewability threshold
        onLayout={() => setScreenWidth(Dimensions.get("window").width)} // Update screen width dynamically
      />


      {selectedHeight && (
        <Text style={styles.selectedHeightText}>
          Selected Height: {selectedHeight}
        </Text>
      )}
    </View>
  );
};

export default WhatsYourHeight;

const styles = StyleSheet.create({
  contentRoller: {
    flexDirection: "row",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginBottom: 48,
    fontSize: 20,
    fontWeight: "bold",
  },
  selectedHeightText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
});
