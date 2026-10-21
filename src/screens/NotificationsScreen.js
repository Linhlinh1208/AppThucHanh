import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { chatService } from '../services/chatService';
import { COLORS } from '../commons/colors';

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState(chatService.getNotifications());

  const handleMarkAsRead = id => {
    // Chỉ cập nhật isRead: true, click nhiều lần vẫn giữ nguyên là đã đọc
    setNotifications(prev =>
      prev.map(item => (item.id === id ? { ...item, isRead: true } : item))
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, !item.isRead && styles.unreadCard]}
      onPress={() => handleMarkAsRead(item.id)}
      activeOpacity={0.7}
    >
      <View style={styles.statusCol}>
        {!item.isRead && <View style={styles.unreadDot} />}
      </View>
      <View style={styles.body}>
        <Text style={[styles.text, !item.isRead && styles.unreadText]}>{item.content}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
      <Text style={styles.hint}>{item.isRead ? 'Đã đọc' : 'Chưa đọc'}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  card: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: COLORS.cardBackground, borderBottomWidth: 1, borderColor: COLORS.border },
  unreadCard: { backgroundColor: COLORS.unreadBg },
  statusCol: { width: 16, alignItems: 'center' },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.primary },
  body: { flex: 1, paddingHorizontal: 10 },
  text: { fontSize: 14, color: COLORS.textPrimary },
  unreadText: { fontWeight: 'bold' },
  time: { fontSize: 12, color: COLORS.textSecondary, marginTop: 4 },
  hint: { fontSize: 11, color: COLORS.textSecondary },
});