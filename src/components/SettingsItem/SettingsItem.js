import React from 'react';
import { TouchableHighlight, View, StyleSheet } from 'react-native';
import { theme } from '../../utils/theme';

function Item({ children, onPress }) {
  return onPress ? (
    <TouchableHighlight onPress={onPress} underlayColor={theme.bg.lighter} activeOpacity={0.95}>
      <View style={styles.item}>{children}</View>
    </TouchableHighlight>
  ) : (
    <View style={styles.item}>{children}</View>
  );
}

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 5,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: theme.bg.darker,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default Item;
