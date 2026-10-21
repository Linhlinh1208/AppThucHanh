import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Switch,
  StyleSheet,
  Alert,
  Modal,
  TouchableOpacity,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { COLORS } from '../commons/colors';
import defaultAvatar from '../assets/images/images.jpg'

const DEFAULT_NOTIFICATIONS = true;
const DEFAULT_DARK_MODE = false;

export default function SettingsScreen({ route, navigation }) {
  const username = route.params?.loggedInUser || 'Người dùng';

  const [notifySwitch, setNotifySwitch] = useState(DEFAULT_NOTIFICATIONS);
  const [darkSwitch, setDarkSwitch] = useState(DEFAULT_DARK_MODE);

  const [modalVisible, setModalVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = () => {
    if (!oldPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ các trường mật khẩu!');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu mới và xác nhận mật khẩu không trùng khớp!');
      return;
    }

    Alert.alert('Thành công', 'Đã đổi mật khẩu thành công!');
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setModalVisible(false);
  };

  const handleLogout = () => {
    Alert.alert('Đăng xuất', 'Bạn có chắc chắn muốn thoát tài khoản?', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Đồng ý',
        style: 'destructive',
        onPress: () => {
          setNotifySwitch(DEFAULT_NOTIFICATIONS);
          setDarkSwitch(DEFAULT_DARK_MODE);

          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
       <Image
  source={defaultAvatar} // Thay đổi từ URI sang file import trực tiếp
  style={styles.avatar}
/>
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{username}</Text>
          <Text style={styles.email}>{username.toLowerCase().replace(/\s+/g, '')}@gmail.com</Text>
        </View>
      </View>


      <CustomButton
        title="Đổi mật khẩu"
        onPress={() => setModalVisible(true)}
        style={styles.changePassBtn}
        textStyle={{ color: COLORS.primary }}
      />

      <CustomButton
        title="Đăng Xuất"
        onPress={handleLogout}
        style={styles.logoutBtn}
        textStyle={{ color: COLORS.badge }}
      />

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Đổi Mật Khẩu</Text>

            <CustomInput
              placeholder="Mật khẩu hiện tại"
              value={oldPassword}
              onChangeText={setOldPassword}
              secureTextEntry
              style={styles.modalInput}
            />
            <CustomInput
              placeholder="Mật khẩu mới"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              style={styles.modalInput}
            />
            <CustomInput
              placeholder="Xác nhận mật khẩu mới"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              style={styles.modalInput}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelBtnText}>Hủy</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmBtn}
                onPress={handleChangePassword}
              >
                <Text style={styles.confirmBtnText}>Lưu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 16 },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  avatar: { width: 60, height: 60, borderRadius: 30, marginRight: 16 },
  profileInfo: { flex: 1 },
  name: { fontSize: 18, fontWeight: 'bold', color: COLORS.textPrimary },
  email: { fontSize: 14, color: COLORS.textSecondary, marginTop: 4 },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  label: { fontSize: 15, color: COLORS.textPrimary },
  changePassBtn: {
    backgroundColor: '#EBF8FF',
    borderWidth: 1,
    borderColor: '#BEE3F8',
    marginBottom: 12,
  },
  logoutBtn: {
    backgroundColor: '#FFF5F5',
    borderWidth: 1,
    borderColor: '#FEB2B2',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 16,
    textAlign: 'center',
  },
  modalInput: {
    marginBottom: 12,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  cancelBtn: {
    flex: 1,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: '#EDF2F7',
  },
  cancelBtnText: {
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  confirmBtn: {
    flex: 1,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
  },
  confirmBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});