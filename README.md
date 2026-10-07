# WeatherApp - Ứng dụng Dự báo Thời tiết (React Native CLI)

Ứng dụng dự báo thời tiết phát triển bằng React Native CLI, tích hợp Open-Meteo API và định vị GPS.

## 1. Danh sách thư viện cần cài đặt

Chạy lệnh cài đặt đồng thời tất cả các gói phụ thuộc:

```
npm install @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context react-native-geolocation-service axios react-native-vector-icons

```

### Chi tiết các gói:

| **Thư viện** | **Mục đích sử dụng** | 
| `@react-navigation/native`  `@react-navigation/native-stack` | Quản lý chuyển trang giữa màn hình chính và chi tiết | 
| `react-native-screens`  `react-native-safe-area-context` | Thư viện nền tảng bắt buộc của React Navigation, xử lý SafeArea | 
| `react-native-geolocation-service` | Lấy tọa độ GPS chính xác cao của thiết bị | 
| `axios` | Xử lý các request gọi API lấy dữ liệu thời tiết và định danh địa chỉ | 
| `react-native-vector-icons` | Hiển thị bộ biểu tượng thời tiết (nắng, mưa, mây, áp suất, gió) | 

## 2. Cấu hình Native bắt buộc

### Android:

1. **Cấu hình Font Icon** (`android/app/build.gradle`):

   Thêm dòng sau vào cuối cùng của file:

   ```
   apply from: file("../../node_modules/react-native-vector-icons/fonts.gradle")
   
   ```

2. **Cấu hình Quyền Vị trí & Internet** (`android/app/src/main/AndroidManifest.xml`):

   Thêm trước thẻ `<application>`:

   ```
   <uses-permission android:name="android.permission.INTERNET" />
   <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
   <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
   
   ```

### iOS (nếu chạy macOS):

```
cd ios && pod install && cd ..

```

## 3. Hướng dẫn chạy chương trình

1. Clone dự án và checkout sang nhánh bài làm:

   ```
   git clone https://github.com/Linhlinh1208/AppThucHanh.git
   cd AppThucHanh
   git checkout ThoiTietApp
   
   ```

2. Cài đặt dependencies:

   ```
   npm install
   
   ```

3. Khởi động Metro Bundler:

   ```
   npx react-native start --reset-cache
   
   ```

4. Mở thêm một terminal mới và chạy ứng dụng lên thiết bị/máy ảo:

   ```
   npx react-native run-android
   
   ```