import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../commons/constants/colors';
import { Spacing } from '../commons/constants/spacing';

export default function BottomNavBar({ activeTab, onSelectTab }) {
  const tabs = [
    { id: 'home', label: 'Trang chủ', icon: '🏠' },
    { id: 'courses', label: 'Môn học', icon: '📖' },
    { id: 'tasks', label: 'Bài tập', icon: '📝' },
    { id: 'profile', label: 'Cá nhân', icon: '👤' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tabBtn}
            onPress={() => onSelectTab(tab.id)}
          >
            <Text style={styles.tabIcon}>{tab.icon}</Text>
            <Text style={[styles.tabLabel, { color: isActive ? Colors.primary : Colors.textSecondary }]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingVertical: Spacing.sm,
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 2,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
});