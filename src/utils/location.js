// src/utils/location.js
import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

// Hà Nội làm toạ độ dự phòng
export const DEFAULT_COORDS = {
  latitude: 21.0285,
  longitude: 105.8542,
  cityName: 'Hà Nội (Mặc định)',
};

export const requestLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    const auth = await Geolocation.requestAuthorization('whenInUse');
    return auth === 'granted';
  }

  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Yêu cầu quyền truy cập vị trí',
        message: 'Ứng dụng cần vị trí để hiển thị thời tiết hiện tại.',
        buttonNeutral: 'Hỏi lại sau',
        buttonNegative: 'Từ chối',
        buttonPositive: 'Đồng ý',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return false;
};

export const getCurrentCoordinates = () => {
  return new Promise((resolve) => {
    Geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          isDefault: false,
        });
      },
      (error) => {
        console.warn('Lỗi lấy toạ độ, dùng mặc định:', error.message);
        resolve({ ...DEFAULT_COORDS, isDefault: true });
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  });
};