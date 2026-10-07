import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS } from '../commons/colors';

export default function ErrorStateView({ message, onRetry }) {
  return (
    <View style={styles.center}>
      <Icon name="alert-triangle" size={44} color={COLORS.error} />
      <Text style={styles.msg}>{message || 'Có lỗi xảy ra khi kết nối.'}</Text>
      <TouchableOpacity style={styles.btn} onPress={onRetry}>
        <Text style={styles.btnText}>Thử lại</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  msg: { color: COLORS.textSecondary, fontSize: 15, marginVertical: 14, textAlign: 'center' },
  btn: { backgroundColor: COLORS.primary, paddingHorizontal: 22, paddingVertical: 10, borderRadius: 8 },
  btnText: { color: '#fff', fontWeight: '600' },
});