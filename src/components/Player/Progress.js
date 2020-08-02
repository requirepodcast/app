import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../utils/theme';

function Progress({ progress }) {
  return (
    <View style={styles.wrapper}>
      <View style={{ ...styles.bar, width: `${progress * 100}%` }} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 3,
    backgroundColor: theme.bg.dark,
  },
  bar: {
    height: '100%',
    backgroundColor: theme.red,
  },
});

export default Progress;
