import React from 'react';
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/layouts/AppNavigator';
import { name as appName } from './app.json';

function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(appName, () => App);