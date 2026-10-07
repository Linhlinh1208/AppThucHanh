import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScreenContainer from '../layouts/ScreenContainer';
import CardContainer from '../layouts/CardContainer';
import { COLORS } from '../commons/colors';
import { getWeatherMeta } from '../commons/helpers';
import Icon from 'react-native-vector-icons/Feather';

export default function DetailScreen({ route }) {
  const { dayIndex, daily } = route.params;
  const meta = getWeatherMeta(daily.weather_code[dayIndex]);

  return (
    <ScreenContainer style={styles.container}>
      <CardContainer style={styles.headerCard}>
        <Text style={styles.date}>{daily.time[dayIndex]}</Text>
        <Icon name={meta.icon} size={40} color={COLORS.primary} style={{ marginVertical: 8 }} />
        <Text style={styles.status}>{meta.label}</Text>
      </CardContainer>

      <CardContainer style={styles.detailsCard}>
        <View style={styles.row}>
          <Text style={styles.label}>Nhiệt độ cao nhất:</Text>
          <Text style={styles.val}>{Math.round(daily.temperature_2m_max[dayIndex])}°C</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Nhiệt độ thấp nhất:</Text>
          <Text style={styles.val}>{Math.round(daily.temperature_2m_min[dayIndex])}°C</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Chỉ số UV tối đa:</Text>
          <Text style={styles.val}>{daily.uv_index_max[dayIndex]}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Xác suất mưa cao nhất:</Text>
          <Text style={styles.val}>{daily.precipitation_probability_max[dayIndex]}%</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Tốc độ gió tối đa:</Text>
          <Text style={styles.val}>{daily.wind_speed_10m_max[dayIndex]} km/h</Text>
        </View>
      </CardContainer>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  headerCard: { alignItems: 'center', marginBottom: 16, paddingVertical: 20 },
  date: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary },
  status: { fontSize: 16, color: COLORS.textSecondary },
  detailsCard: { padding: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  label: { fontSize: 14, color: COLORS.textMuted },
  val: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary },
});