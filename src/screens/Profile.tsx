import { Text, View } from "react-native";
import CustomButton from "../common/CustomButton";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScreenProps } from "../navigator/Stack";
import { logout } from "../redux/slices/authSlice";

const Profile: React.FC<ScreenProps<"Profile">> = () => {
  const { token } = useSelector((state: any) => state.auth);

  console.log(token);

  const dispatch = useDispatch();

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, []);

  return (
    <View>
      <Text>Profile</Text>
      <CustomButton text="logout" onPress={handleLogout} />
    </View>
  );
};

export default Profile;
