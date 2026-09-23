import React from 'react';
import { View, StatusBar, StyleSheet, Platform } from 'react-native';
import { Colors } from '../commons/constants/colors';

export default function ScreenLayout({ children }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <View style={styles.wrapper}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  wrapper: {
    flex: 1,
  },
});