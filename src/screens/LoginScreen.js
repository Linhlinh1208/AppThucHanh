import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { validateLogin } from '../utils/validation';
import { COLORS } from '../commons/colors';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const { isValid, message } = validateLogin(username, password);
    if (!isValid) {
      Alert.alert('Lỗi đăng nhập', message);
      return;
    }
    navigation.reset({
      index: 0,
      routes: [{
         name: 'MainTabs',
         params: {
            screem: 'Settings',
            params: { loggedInUser: username.trim() },
          }
         }],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CHAT CONNECT</Text>
      <Text style={styles.subtitle}>Kết nối và trò chuyện cùng bạn bè</Text>

      <View style={styles.form}>
        <CustomInput
          placeholder="Tên tài khoản hoặc Email"
          value={username}
          onChangeText={setUsername}
          style={styles.inputMargin}
        />
        <CustomInput
          placeholder="Mật khẩu"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.inputMargin}
        />
        <CustomButton title="Đăng Nhập" onPress={handleLogin} style={styles.btn} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: COLORS.background },
  title: { fontSize: 32, fontWeight: 'bold', color: COLORS.primary, textAlign: 'center' },
  subtitle: { fontSize: 14, color: COLORS.textSecondary, textAlign: 'center', marginBottom: 32, marginTop: 6 },
  form: { width: '100%' },
  inputMargin: { marginBottom: 16 },
  btn: { marginTop: 8 },
});