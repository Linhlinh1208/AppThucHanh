import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Radius, Spacing } from '../commons/constants/spacing';

export default function StatCard({ item }) {
  return (
    <View style={[styles.card, { backgroundColor: item.bg }]}>
      <Text style={styles.icon}>{item.icon}</Text>
      <Text style={[styles.value, { color: item.color }]}>{item.value}</Text>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: Spacing.md,
    borderRadius: Radius.lg,
    alignItems: 'center',
  },
  icon: {
    fontSize: 18,
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 11,
    color: '#4B5563',
    marginTop: 2,
    fontWeight: '600',
  },
});