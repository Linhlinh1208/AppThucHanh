import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Colors } from '../commons/constants/colors';
import { Spacing, Radius } from '../commons/constants/spacing';

export default function Header({ user }) {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <View style={styles.textGroup}>
          <Text style={styles.greeting}>{user.greeting}</Text>
          <Text style={styles.name}>{user.name}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.bellBtn}
        onPress={() => Alert.alert('Thông báo', `Bạn có ${user.unreadCount} thông báo mới`)}
      >
        <Text style={styles.bellIcon}>🔔</Text>
        {user.unreadCount > 0 && <View style={styles.dot} />}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: Radius.full,
    backgroundColor: Colors.border,
  },
  textGroup: {
    marginLeft: Spacing.md,
  },
  greeting: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginTop: 2,
  },
  bellBtn: {
    width: 42,
    height: 42,
    borderRadius: Radius.full,
    backgroundColor: Colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  bellIcon: {
    fontSize: 18,
  },
  dot: {
    position: 'absolute',
    top: 9,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.danger,
  },
});