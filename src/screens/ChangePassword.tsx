import {Platform, StyleSheet, View} from 'react-native';
import CustomInput from '../common/CustomInput';
import React, {useCallback, useState} from 'react';
import CustomButton from '../common/CustomButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { ScreenProps } from '../navigator/Stack';

const ChangePassword: React.FC<ScreenProps<'ChangePassword'>> = ({
  navigation,
}) => {
  const [test1,setTest1] = useState("");
  const [test2,setTest2] = useState("");
  const [test3,setTest3] = useState("");

  const handleChange = useCallback(() => {}, []);

  const handlePress = useCallback(() => {
    navigation.goBack();
  }, []);
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        {marginBottom: Platform.select({ios: insets.bottom})},
      ]}>
      <View style={{flexGrow: 1}}>
        <CustomInput
          label="Old Password"
          onChange={(val)=> setTest1(val)}
          isPassword={true}
          inputConfigurations={{value:test1}}
        />
        <CustomInput
          label="New Password"
          onChange={(val)=> setTest2(val)}
          isPassword={true}
          inputConfigurations={{value:test2}}
        />
        <CustomInput
          label="Confirm New Password"
          onChange={(val)=> setTest3(val)}
          isPassword={true}
          inputConfigurations={{value:test3}}
        />
      </View>
      <CustomButton text="Change password" onPress={handlePress} />
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: Platform.select({android: 40}),
  },
});
