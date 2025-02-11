import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { StackParams } from "../navigator/StackNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NavigationProp = NativeStackNavigationProp<StackParams>;

// Custom hook for handling navigation
const useHandleNextNavigation = (page: keyof StackParams) => {
  const navigation = useNavigation<NavigationProp>();

  const handleNextNavigation = useCallback(() => {
    navigation.navigate(page as any);
  }, [navigation, page]);

  return handleNextNavigation;
};

export default useHandleNextNavigation;
