import { NavigationProp, RouteProp } from "@react-navigation/native";

import { StackParams } from "./StackNavigator";
import { BottomParams } from "./BottomTabNavigator";
import { AuthStackParams } from "./AuthStack";
import { RootStackParams } from "./RootScreen";

export type ScreenParams = StackParams & BottomParams & AuthStackParams & RootStackParams ; // Combine the params

export type ScreenProps<T extends keyof ScreenParams> = {
  navigation: NavigationProp<ScreenParams, T>;
  route: RouteProp<ScreenParams, T>;
};
