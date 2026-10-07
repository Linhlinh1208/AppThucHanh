// src/screens/HomeScreen.js
import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, RefreshControl, StyleSheet, View } from 'react-native';
import ScreenContainer from '../layouts/ScreenContainer';
import CurrentWeatherCard from '../components/CurrentWeatherCard';
import HourlyForecastList from '../components/HourlyForecastList';
import DailyForecastList from '../components/DailyForecastList';
import WeatherMetricsGrid from '../components/WeatherMetricsGrid';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorStateView from '../components/ErrorStateView';
import EmptyStateView from '../components/EmptyStateView'; // <-- Thêm Empty state
import { requestLocationPermission, getCurrentCoordinates } from '../services/locationService';
import { fetchForecastData, getCityNameFromCoords } from '../services/api'; // <-- Thêm hàm lấy tên địa danh
import { DEFAULT_COORDS } from '../commons/constants';

export default function HomeScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [locationName, setLocationName] = useState('Đang cập nhật vị trí...');

  const loadData = useCallback(async () => {
    try {
      setError(null);
      const granted = await requestLocationPermission();
      let coords = DEFAULT_COORDS;

      if (granted) {
        coords = await getCurrentCoordinates();
      }

      // 1. Gọi song song cả dữ liệu thời tiết và tên địa danh thực tế
      const [weatherRes, cityNameRes] = await Promise.all([
        fetchForecastData(coords.latitude, coords.longitude),
        getCityNameFromCoords(coords.latitude, coords.longitude),
      ]);

      setWeatherData(weatherRes);
      setLocationName(coords.isDefault ? `${cityNameRes} (Mặc định)` : cityNameRes);
    } catch (err) {
      setError('Không thể lấy thông tin thời tiết. Vui lòng kiểm tra kết nối mạng.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  // Trạng thái 1: Loading
  if (loading) {
    return (
      <ScreenContainer>
        <LoadingIndicator />
      </ScreenContainer>
    );
  }

  // Trạng thái 2: Error
  if (error) {
    return (
      <ScreenContainer>
        <ErrorStateView message={error} onRetry={loadData} />
      </ScreenContainer>
    );
  }

  // Trạng thái 3: Empty (theo đúng yêu cầu mục 3 của đề bài)
  if (!weatherData || !weatherData.current) {
    return (
      <ScreenContainer>
        <EmptyStateView message="Không tìm thấy dữ liệu thời tiết cho khu vực này." />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#0284c7']} />
        }
      >
        {/* Khối hiển thị thời tiết tức thời */}
        <CurrentWeatherCard
          locationName={locationName}
          current={weatherData.current}
          daily={weatherData.daily}
        />

        {/* Khối dự báo 24 giờ tiếp theo */}
        <HourlyForecastList hourlyData={weatherData.hourly} />

        {/* Khối dự báo 7 ngày tới (bấm vào để chuyển sang DetailScreen) */}
        <DailyForecastList
          dailyData={weatherData.daily}
          onItemPress={(index) =>
            navigation.navigate('Detail', {
              dayIndex: index,
              daily: weatherData.daily,
            })
          }
        />

        {/* Lưới 8 chỉ số thời tiết chi tiết */}
        <WeatherMetricsGrid
          current={weatherData.current}
          daily={weatherData.daily}
        />
      </ScrollView>
    </ScreenContainer>
  );
}