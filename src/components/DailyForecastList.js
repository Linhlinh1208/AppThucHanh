import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import CardContainer from '../layouts/CardContainer';
import { COLORS } from '../commons/colors';
import { getWeatherMeta, formatDayLabel } from '../commons/helpers';

export default function DailyForecastList({ dailyData, onItemPress }) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Dự báo 7 ngày tới</Text>
      {dailyData.time.map((date, idx) => {
        const meta = getWeatherMeta(dailyData.weather_code[idx]);
        return (
          <TouchableOpacity key={date} activeOpacity={0.7} onPress={() => onItemPress(idx)}>
            <CardContainer style={styles.row}>
              <Text style={styles.date}>{formatDayLabel(date, idx)}</Text>
              <View style={styles.statusCol}>
                <Icon name={meta.icon} size={18} color={COLORS.primary} />
                <Text style={styles.statusText}>{meta.label}</Text>
              </View>
              <Text style={styles.temp}>
                {Math.round(dailyData.temperature_2m_min[idx])}° / {Math.round(dailyData.temperature_2m_max[idx])}°
              </Text>
            </CardContainer>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { paddingHorizontal: 16, marginBottom: 20 },
  title: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 10 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  date: { width: 85, fontSize: 14, fontWeight: '500', color: COLORS.textPrimary },
  statusCol: { flexDirection: 'row', alignItems: 'center', flex: 1, paddingHorizontal: 8 },
  statusText: { marginLeft: 8, fontSize: 13, color: COLORS.textSecondary },
  temp: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary },
});