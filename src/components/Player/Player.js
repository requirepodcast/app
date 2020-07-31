import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {theme} from '../../utils/theme';

function Player() {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>Player</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: theme.bg.medium,
    borderBottomColor: theme.bg.dark,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  text: {
    color: theme.fg,
  },
});

export default Player;
