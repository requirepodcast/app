import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../utils/theme';

function SettingsScreen() {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>Settings dupa</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.bg.light,
  },
  text: {
    color: theme.fg,
  },
});

export default SettingsScreen;
