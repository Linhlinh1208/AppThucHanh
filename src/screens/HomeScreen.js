// src/screens/HomeScreen.js
import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  StyleSheet,
  StatusBar,
  ImageBackground,
} from 'react-native';

import CurrentWeatherCard from '../components/CurrentWeatherCard';
import HourlyForecastList from '../components/HourlyForecastList';
import DailyForecastList from '../components/DailyForecastList';
import WeatherMetricsGrid from '../components/WeatherMetricsGrid';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorStateView from '../components/ErrorStateView';
import EmptyStateView from '../components/EmptyStateView';

import { requestLocationPermission, getCurrentCoordinates } from '../services/locationService';
import { fetchForecastData, getCityNameFromCoords } from '../services/api';
import { DEFAULT_COORDS } from '../commons/constants';
import { getWeatherBackground } from '../commons/helpers'; 

export default function HomeScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [locationName, setLocationName] = useState('Đang định vị...');

  const loadData = useCallback(async () => {
    try {
      setError(null);
      const granted = await requestLocationPermission();
      let coords = DEFAULT_COORDS;
      if (granted) coords = await getCurrentCoordinates();

      const [weather, city] = await Promise.all([
        fetchForecastData(coords.latitude, coords.longitude),
        getCityNameFromCoords(coords.latitude, coords.longitude),
      ]);

      setWeatherData(weather);
      setLocationName(coords.isDefault ? `${city} ` : city);
    } catch {
      setError('Lỗi tải dữ liệu thời tiết. Vui lòng thử lại.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorStateView message={error} onRetry={loadData} />;
  if (!weatherData?.current) return <EmptyStateView />;

  // Lấy file ảnh tương ứng với mã thời tiết
  const localBg = getWeatherBackground(weatherData.current.weather_code);

  return (
    <ImageBackground
      source={localBg} 
      style={styles.bgContainer}
      resizeMode="cover"
    >
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <View style={styles.overlay}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                loadData();
              }}
              tintColor="#fff"
            />
          }
        >
          <CurrentWeatherCard
            locationName={locationName}
            current={weatherData.current}
            daily={weatherData.daily}
          />
          <HourlyForecastList hourlyData={weatherData.hourly} />
          <DailyForecastList
            dailyData={weatherData.daily}
            onItemPress={(index) =>
              navigation.navigate('Detail', {
                dayIndex: index,
                daily: weatherData.daily,
              })
            }
          />
          <WeatherMetricsGrid
            current={weatherData.current}
            daily={weatherData.daily}
          />
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.28)', 
  },
  scroll: {
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 20 : 50,
    paddingHorizontal: 16,
    paddingBottom: 35,
  },
});