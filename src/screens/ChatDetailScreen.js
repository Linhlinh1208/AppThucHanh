import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { COLORS } from '../commons/colors';

export default function ChatDetailScreen({ route }) {
  const { user } = route.params;
  const [messages, setMessages] = useState([
    { id: '1', text: 'Chào bạn!', isMe: false },
    { id: '2', text: 'Chào cậu nhé!', isMe: true },
  ]);
  const [input, setInput] = useState('');

  const send = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { id: Date.now().toString(), text: input, isMe: true }]);
    setInput('');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.bubble, item.isMe ? styles.myMsg : styles.theirMsg]}>
            <Text style={item.isMe ? styles.myTxt : styles.theirTxt}>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={{ padding: 16 }}
      />
      <View style={styles.inputArea}>
        <TextInput
          style={styles.textInput}
          placeholder="Nhập tin nhắn..."
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={send}>
          <Text style={styles.sendTxt}>Gửi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  bubble: { maxWidth: '75%', padding: 10, borderRadius: 12, marginBottom: 10 },
  myMsg: { alignSelf: 'flex-end', backgroundColor: COLORS.primary },
  theirMsg: { alignSelf: 'flex-start', backgroundColor: COLORS.border },
  myTxt: { color: '#FFF' },
  theirTxt: { color: COLORS.textPrimary },
  inputArea: { flexDirection: 'row', padding: 10, backgroundColor: '#FFF', borderTopWidth: 1, borderColor: COLORS.border },
  textInput: { flex: 1, height: 40, backgroundColor: COLORS.background, borderRadius: 20, paddingHorizontal: 16 },
  sendBtn: { justifyContent: 'center', paddingHorizontal: 14 },
  sendTxt: { color: COLORS.primary, fontWeight: 'bold' },
});