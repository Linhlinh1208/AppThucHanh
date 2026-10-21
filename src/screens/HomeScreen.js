import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import CustomInput from '../components/CustomInput';
import { chatService } from '../services/chatService';
import { COLORS } from '../commons/colors';

export default function HomeScreen({ navigation }) {
  const [chats] = useState(chatService.getChats());
  const [keyword, setKeyword] = useState('');

  const filtered = chatService.searchItems(chats, keyword, 'name');

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ChatDetail', { user: item })}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.info}>
        <View style={styles.row}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.lastMsg} numberOfLines={1}>{item.lastMessage}</Text>
          {item.unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <CustomInput
        placeholder="Tìm kiếm cuộc trò chuyện..."
        value={keyword}
        onChangeText={setKeyword}
        style={styles.search}
      />
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>Không có cuộc trò chuyện nào</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.cardBackground, padding: 16 },
  search: { marginBottom: 12 },
  card: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderColor: COLORS.border },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  info: { flex: 1 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  name: { fontSize: 16, fontWeight: '600', color: COLORS.textPrimary },
  time: { fontSize: 12, color: COLORS.textSecondary },
  lastMsg: { fontSize: 14, color: COLORS.textSecondary, flex: 1, marginRight: 8 },
  badge: { backgroundColor: COLORS.badge, borderRadius: 10, paddingHorizontal: 7, paddingVertical: 2 },
  badgeText: { color: '#FFF', fontSize: 11, fontWeight: 'bold' },
  empty: { textAlign: 'center', color: COLORS.textSecondary, marginTop: 40 },
});