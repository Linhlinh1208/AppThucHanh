import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS } from '../commons/colors';

export default function EmptyStateView({ message = 'Không có dữ liệu thời tiết.' }) {
  return (
    <View style={styles.center}>
      <Icon name="inbox" size={44} color={COLORS.textMuted} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  text: { color: COLORS.textMuted, fontSize: 15, marginTop: 12 },
});