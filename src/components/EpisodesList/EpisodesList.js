import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';

import Item from './Item';
import {theme} from '../../utils/theme';

function EpisodeList() {
  const episodes = useSelector((store) => store.episodes).reverse();

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={episodes}
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
    height: 1,
    backgroundColor: theme.bg.dark,
    marginHorizontal: 10,
    marginVertical: 0,
  },
});

export default EpisodeList;
