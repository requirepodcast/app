import React from 'react';
import {TouchableHighlight, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {theme} from '../../utils/theme';

function Item({episode}) {
  const navigation = useNavigation();

  return (
    <TouchableHighlight
      underlayColor={theme.bg.lighter}
      activeOpacity={1}
      onPress={() => navigation.navigate('Details', {episode})}>
      <Text style={styles.title}>{episode.title}</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  title: {
    color: theme.fg,
    padding: 15,
    fontSize: 16,
  },
});

export default Item;
