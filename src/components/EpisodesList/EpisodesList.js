import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';

import Item from './Item';
import {theme} from '../../utils/theme';

function EpisodeList() {
  const episodes = useSelector((store) => store.episodes.episodes);

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={episodes.slice().reverse()}
        keyExtractor={(episode) => episode.id}
        renderItem={({item}) => <Item episode={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.bg.light,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme.bg.darker,
    marginHorizontal: 10,
    marginVertical: 0,
  },
});

export default EpisodeList;
