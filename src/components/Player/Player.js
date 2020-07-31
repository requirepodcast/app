import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {theme} from '../../utils/theme';
import {useSelector} from 'react-redux';

function Player() {
  const {
    player: {queuePosition},
    episodes: {episodes},
  } = useSelector((state) => state);
  const episode = queuePosition
    ? episodes[queuePosition]
    : queuePosition === 0 && episodes[queuePosition];

  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>
        {episode ? episode.title : 'Aktualnie nie odtwarzane'}
      </Text>
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
