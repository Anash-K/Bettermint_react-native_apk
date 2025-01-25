import {
    checkMultiple,
    Permission,
    requestMultiple,
    RESULTS,
  } from 'react-native-permissions';
  
  const CheckPermissions = async (permissionRequest: Permission[]) => {
    try {
      const permissionStatus = await checkMultiple(permissionRequest);
  
      if (
        Object.values(permissionStatus).every(
          status => status === RESULTS.GRANTED || status === RESULTS.LIMITED,
        )
      ) {
        return 1;
      } else if (
        Object.values(permissionStatus).some(status => status === RESULTS.DENIED)
      ) {
        return 0;
      } else {
        return -1;
      }
    } catch (error) {
      return -1;
    }
  };
  
  const RequestPermissions = async (multipleRequests: Permission[]) => {
    try {
      const permissionStatus = await requestMultiple(multipleRequests);
  
      if (
        Object.values(permissionStatus).every(
          status => status === RESULTS.GRANTED,
        )
      ) {
        return 1;
      } else if (
        Object.values(permissionStatus).some(status => status === RESULTS.DENIED)
      ) {
        return 0;
      } else {
        return -1;
      }
    } catch (error) {
      return -1;
    }
  };
  
  const checkRequestPermission = async (permissions: Permission[]) => {
    try {
      let status = await CheckPermissions(permissions);
      if (status === 0) {
        status = await RequestPermissions(permissions);
      }
      return status;
    } catch (error) {
      return -1;
    }
  };
  
  const CheckPermission = async (
    permissions: Permission[],
    permissionName: string,
  ) => {
    try {
      const status = await checkRequestPermission(permissions);
      if (status === 0 || status === -1) {
        // errorToast(`Allow us permission of ${permissionName} to continue`);
      }
      return status === 1;
    } catch (error) {
      return false;
    }
  };
  
  export default CheckPermission;