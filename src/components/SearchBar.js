import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Colors } from '../commons/constants/colors';
import { Radius, Spacing } from '../commons/constants/spacing';

export default function SearchBar({ value, onChangeText }) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="🔍 Tìm kiếm môn học..."
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.xl,
    marginVertical: Spacing.sm,
  },
  input: {
    backgroundColor: Colors.card,
    height: 46,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    fontSize: 14,
    color: Colors.textPrimary,
  },
});