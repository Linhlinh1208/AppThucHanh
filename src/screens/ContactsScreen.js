import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import CustomInput from '../components/CustomInput';
import { chatService } from '../services/chatService';
import { COLORS } from '../commons/colors';

export default function ContactsScreen({ navigation }) {
  const [contacts] = useState(chatService.getContacts());
  const [keyword, setKeyword] = useState('');

  const filtered = chatService.searchItems(contacts, keyword, 'name');

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('ChatDetail', { user: item })}
    >
      <View style={styles.avatarWrap}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={[styles.dot, { backgroundColor: item.online ? COLORS.online : COLORS.offline }]} />
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.status}>{item.online ? 'Trực tuyến' : 'Ngoại tuyến'}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <CustomInput
        placeholder="Tìm kiếm danh bạ..."
        value={keyword}
        onChangeText={setKeyword}
        style={styles.search}
      />
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>Không tìm thấy liên hệ</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.cardBackground, padding: 16 },
  search: { marginBottom: 12 },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderColor: COLORS.border },
  avatarWrap: { position: 'relative', marginRight: 14 },
  avatar: { width: 48, height: 48, borderRadius: 24 },
  dot: { position: 'absolute', bottom: 2, right: 2, width: 12, height: 12, borderRadius: 6, borderWidth: 2, borderColor: '#FFF' },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600', color: COLORS.textPrimary },
  status: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2 },
  empty: { textAlign: 'center', color: COLORS.textSecondary, marginTop: 40 },
});