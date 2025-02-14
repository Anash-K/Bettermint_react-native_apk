import React, { useEffect } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import BootSplash from "react-native-bootsplash";
import RootScreen from "./src/navigator/RootScreen";
import { NavigationContainer } from "@react-navigation/native";
import { Loader } from "./src/Types/CommonTypes";

export const AppLoaderRef = React.createRef<Loader>();

export const setDefaultFontScaling = () => {
  (Text as any).defaultProps = (Text as any).defaultProps || {};
  (Text as any).defaultProps.allowFontScaling = false;

  (TextInput as any).defaultProps = (TextInput as any).defaultProps || {};
  (TextInput as any).defaultProps.allowFontScaling = false;
};

const App: React.FC = () => {
  useEffect(() => {
    setDefaultFontScaling();
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      BootSplash.hide();
    }, 3000); // Delay for 5 seconds

    return () => clearTimeout(timer); // Clean up on unmount
  }, []);

  console.error = () => {};

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <RootScreen />
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
