import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../utils/theme';
import { version } from '../../package.json';

function SettingsScreen() {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.version}>{'\xA9'} requirepodcast_app</Text>
      <Text style={styles.version}>v{version}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.bg.light,
    padding: 10,
  },
  text: {
    color: theme.fg,
  },
  version: {
    color: 'gray',
    textAlign: 'center',
  },
});

export default SettingsScreen;
