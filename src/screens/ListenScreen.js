import React from 'react';
import { StyleSheet, Text, SafeAreaView, View } from 'react-native';
import { useSelector } from 'react-redux';

import PlayButton from '../components/PlayButton/PlayButton';
import { usePlayer } from '../components/PlayerProvider/PlayerProvider';
import { theme } from '../utils/theme';

function ListenScreen() {
  const episodes = useSelector(store => store.episodes.episodes);
  const { play } = usePlayer();
  const episode = episodes.slice(-1)[0];

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Najnowszy odcinek:</Text>
      <SafeAreaView style={styles.container}>
        <Text style={styles.episodeTitle}>{episode && episode.title}</Text>
        <Text style={styles.episodeDescription}>{episode && episode.shortDescription}</Text>
        <PlayButton style="big" disabled={!episode} onPress={() => play({ episode })} />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: theme.bg.light,
    flex: 1,
    padding: 15,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  episodeTitle: {
    color: theme.fg,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  episodeDescription: {
    color: theme.fg,
    marginBottom: 15,
    textAlign: 'center',
  },
  title: {
    color: theme.red,
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default ListenScreen;
