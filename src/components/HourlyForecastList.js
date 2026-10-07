import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import CardContainer from '../layouts/CardContainer';
import { COLORS } from '../commons/colors';
import { getWeatherMeta, formatTimeHour } from '../commons/helpers';

export default function HourlyForecastList({ hourlyData }) {
  // Thay đoạn: const list = hourlyData.time.slice(0, 24)...
// Bằng đoạn sau:
const currentHour = new Date().getHours();
// Open-Meteo trả về mảng 7 ngày x 24h, ta lấy 24 mốc tính từ giờ hiện tại
const list = hourlyData.time.slice(currentHour, currentHour + 24).map((time, idx) => ({
  time: formatTimeHour(time),
  temp: Math.round(hourlyData.temperature_2m[currentHour + idx]),
  rain: hourlyData.precipitation_probability[currentHour + idx],
  code: hourlyData.weather_code[currentHour + idx],
}));

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Dự báo 24 giờ</Text>
      <FlatList
        data={list}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => {
          const meta = getWeatherMeta(item.code);
          return (
            <CardContainer style={styles.card}>
              <Text style={styles.time}>{item.time}</Text>
              <Icon name={meta.icon} size={22} color={COLORS.primary} style={styles.icon} />
              <Text style={styles.temp}>{item.temp}°</Text>
              <Text style={styles.rain}>{item.rain}%</Text>
            </CardContainer>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 20 },
  title: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary, marginHorizontal: 16, marginBottom: 10 },
  card: { alignItems: 'center', marginRight: 10, minWidth: 68, padding: 12 },
  time: { fontSize: 12, color: COLORS.textMuted },
  icon: { marginVertical: 6 },
  temp: { fontSize: 16, fontWeight: '600', color: COLORS.textPrimary },
  rain: { fontSize: 11, color: COLORS.primary, marginTop: 2 },
});