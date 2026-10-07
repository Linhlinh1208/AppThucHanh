// src/services/api.js
import axios from 'axios';
import { API_BASE_URL } from '../commons/constants';

export const fetchForecastData = async (latitude, longitude) => {
  const params = {
    latitude,
    longitude,
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'precipitation',
      'weather_code',
      'surface_pressure',
      'wind_speed_10m',
      'wind_direction_10m',
      'visibility',
    ].join(','),
    hourly: [
      'temperature_2m',
      'precipitation_probability',
      'weather_code',
    ].join(','),
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'uv_index_max',
      'precipitation_probability_max',
      'wind_speed_10m_max',
    ].join(','),
    timezone: 'auto',
  };

  const response = await axios.get(API_BASE_URL, { params, timeout: 8000 });
  return response.data;
};

export const getCityNameFromCoords = async (lat, lon) => {
  try {
    const res = await axios.get(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=vi`,
      { timeout: 3000 } // Tối đa 3s, không để treo
    );
    return res.data.city || res.data.locality || res.data.principalSubdivision || 'Hà Nội';
  } catch (error) {
    console.log('Lỗi lấy tên địa danh, dùng mặc định');
    return 'Hà Nội';
  }
};