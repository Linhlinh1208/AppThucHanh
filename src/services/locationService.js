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
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
  } catch (err) {
    console.warn('Lỗi xin quyền vị trí:', err);
    return false;
  }
  return false;
};

export const getCurrentCoordinates = () => {
  return new Promise((resolve) => {
    // Tự ngắt sau 4 giây nếu GPS máy ảo bị đơ -> tự động nhảy về toạ độ mặc định
    const fallbackTimer = setTimeout(() => {
      console.log('GPS quá lâu, tự động dùng toạ độ mặc định.');
      resolve({ ...DEFAULT_COORDS, isDefault: true });
    }, 4000);

    Geolocation.getCurrentPosition(
      (position) => {
        clearTimeout(fallbackTimer);
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          isDefault: false,
        });
      },
      (error) => {
        clearTimeout(fallbackTimer);
        console.warn('Không lấy được toạ độ GPS:', error.code, error.message);
        resolve({ ...DEFAULT_COORDS, isDefault: true });
      },
      {
        enableHighAccuracy: false, // QUAN TRỌNG: để false để tránh treo GPS trên máy ảo/Android
        timeout: 5000,
        maximumAge: 10000,
        forceRequestLocation: true,
        showLocationDialog: true,
      }
    );
  });
};