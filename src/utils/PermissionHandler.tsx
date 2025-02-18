import RNPermissions, {Permission} from 'react-native-permissions';
import {StyleSheet, Text} from 'react-native';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';
import CheckPermission from './CheckPermission';


export const handlePermission = (
  permissions: Permission[],
  permissionName: string,
): Promise<boolean> => {
  return new Promise<boolean>(async (resolve, reject) => {
    const result = await CheckPermission(permissions, permissionName);

    if (result) {
      resolve(true);
    } else {
      reject(new Error('permission rejected'));
      const openSettingHandler = async () => {
        await RNPermissions.openSettings();
      };

      Dialog.show({
        title: (<Text style={styles.title}>Permission Required</Text>) as any,
        autoClose: true,
        type: ALERT_TYPE.WARNING,
        button: (<Text>Open Settings</Text>) as any,
        closeOnOverlayTap: true,
        onPressButton: openSettingHandler,
        textBody: (
          <Text
            style={
              styles.body
            }>{`To continue allow us the permission of ${permissionName}`}</Text>
        ) as any,
      });
    }
  });
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
  },
  body: {
    fontSize: 18,
  },
});
