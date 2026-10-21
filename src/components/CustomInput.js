import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { COLORS } from '../commons/colors';

export default function CustomInput({ placeholder, value, onChangeText, secureTextEntry, style }) {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholder={placeholder}
      placeholderTextColor="#888"
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      autoCapitalize="none"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 48,
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
});