import { createStackNavigator } from "@react-navigation/stack";
import { Text, View } from "react-native";
import MainStack from "./StackNavigator";
import BottomTabStack from "./BottomTabNavigator";

const Stack = createStackNavigator();

const RootScreen = () => {
  const isAuthenticated = true;
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      {isAuthenticated ? (
        <Stack.Screen name="StackNavigator" component={MainStack} />
      ) : (
        <Stack.Screen name="BottomTab" component={BottomTabStack} />
      )}
    </Stack.Navigator>
  );
};

export default RootScreen;
