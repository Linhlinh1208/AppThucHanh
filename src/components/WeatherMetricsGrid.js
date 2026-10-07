import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CardContainer from '../layouts/CardContainer';
import { COLORS } from '../commons/colors';

// Hàm phụ trợ đổi độ sang hướng la bàn
const getWindDirection = (deg) => {
  const directions = ['Bắc (N)', 'Đông Bắc (NE)', 'Đông (E)', 'Đông Nam (SE)', 'Nam (S)', 'Tây Nam (SW)', 'Tây (W)', 'Tây Bắc (NW)'];
  return directions[Math.round(deg / 45) % 8];
};

export default function WeatherMetricsGrid({ current, daily }) {
  const items = [
    { label: 'Độ ẩm', value: `${current.relative_humidity_2m}%` },
    { label: 'Tốc độ gió', value: `${current.wind_speed_10m} km/h` },
    { label: 'Hướng gió', value: getWindDirection(current.wind_direction_10m) },
    { label: 'Lượng mưa', value: `${current.precipitation ?? 0} mm` },
    { label: 'Chỉ số UV (Max)', value: `${daily.uv_index_max[0]}` },
    { label: 'Áp suất', value: `${current.surface_pressure} hPa` },
    { label: 'Tầm nhìn', value: `${(current.visibility / 1000).toFixed(1)} km` },
    { label: 'Xác suất mưa ngày', value: `${daily.precipitation_probability_max[0]}%` },
  ];

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Chỉ số thời tiết chi tiết</Text>
      <View style={styles.grid}>
        {items.map((item, index) => (
          <CardContainer key={index} style={styles.gridItem}>
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.val}>{item.value}</Text>
          </CardContainer>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { paddingHorizontal: 16, marginBottom: 30 },
  title: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 10 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridItem: { width: '48%', marginBottom: 12, padding: 14 },
  label: { fontSize: 13, color: COLORS.textMuted, marginBottom: 6 },
  val: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary },
});