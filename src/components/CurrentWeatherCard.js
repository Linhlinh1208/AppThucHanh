import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS } from '../commons/colors';
import { getWeatherMeta } from '../commons/helpers';

export default function CurrentWeatherCard({ locationName, current, daily }) {
  const meta = getWeatherMeta(current.weather_code);
  const maxTemp = Math.round(daily?.temperature_2m_max[0] ?? current.temperature_2m);
  const minTemp = Math.round(daily?.temperature_2m_min[0] ?? current.temperature_2m);

  return (
    <View style={styles.container}>
      <Text style={styles.location}>{locationName}</Text>
      <View style={styles.tempRow}>
        <Text style={styles.temp}>{Math.round(current.temperature_2m)}°</Text>
        <Icon name={meta.icon} size={48} color={COLORS.primary} style={styles.icon} />
      </View>
      <Text style={styles.status}>{meta.label}</Text>
      <Text style={styles.feelsLike}>
        Cảm giác như {Math.round(current.apparent_temperature)}° • C: {maxTemp}° / T: {minTemp}°
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginVertical: 20 },
  location: { fontSize: 22, fontWeight: '700', color: COLORS.textPrimary },
  tempRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  temp: { fontSize: 64, fontWeight: '200', color: COLORS.textPrimary },
  icon: { marginLeft: 12 },
  status: { fontSize: 17, color: COLORS.textSecondary, fontWeight: '500' },
  feelsLike: { fontSize: 13, color: COLORS.textMuted, marginTop: 4 },
});