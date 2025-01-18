import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";


const BottomTab = createBottomTabNavigator();

const BottomTabStack = () =>{
    return(
        <BottomTab.Navigator>
            <BottomTab.Screen name="Home" component={HomeScreen}/>
        </BottomTab.Navigator>
    )
};

export default BottomTabStack;