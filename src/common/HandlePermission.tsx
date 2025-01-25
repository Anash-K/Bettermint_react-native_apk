
import RNPermissions, {Permission} from 'react-native-permissions';
import {StyleSheet} from 'react-native';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';
import CheckPermission from './PermissionRequest';
import PermissionModal from './PermissionModal';


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