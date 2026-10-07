// src/services/locationService.js
import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { DEFAULT_COORDS } from '../commons/constants';

export const requestLocationPermission = async () => {
  try {
    if (Platform.OS === 'ios') {
      const auth = await Geolocation.requestAuthorization('whenInUse');
      return auth === 'granted';
    }

    if (Platform.OS === 'android') {
      // Android 12+ yêu cầu xin cả FINE và COARSE cùng lúc
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]);

      return (
        granted['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED ||
        granted['android.permission.ACCESS_COARSE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED
      );
    }
  } catch (err) {
    console.warn('Lỗi xin quyền vị trí:', err);
    return false;
  }
  return false;
};

export const getCurrentCoordinates = () => {
  return new Promise((resolve) => {
    // Tăng thời gian chờ lên 10 giây để máy thật kịp bắt GPS
    const fallbackTimer = setTimeout(() => {
      console.log('GPS timeout -> dùng toạ độ mặc định');
      resolve({ ...DEFAULT_COORDS, isDefault: true });
    }, 10000);

    Geolocation.getCurrentPosition(
      (position) => {
        clearTimeout(fallbackTimer);
        console.log('Lấy GPS thành công:', position.coords);
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          isDefault: false,
        });
      },
      (error) => {
        clearTimeout(fallbackTimer);
        console.warn('Lỗi GPS máy thật:', error.code, error.message);
        resolve({ ...DEFAULT_COORDS, isDefault: true });
      },
      {
        enableHighAccuracy: true, // Bật true để máy thật kích hoạt chip GPS vệ tinh
        timeout: 10000,
        maximumAge: 10000,
        forceRequestLocation: true,
        showLocationDialog: true, // Tự hiện popup nhắc người dùng bật GPS nếu đang tắt
      }
    );
  });
};