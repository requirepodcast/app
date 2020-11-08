import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';

import PlayButton from '../components/PlayButton/PlayButton';
import { usePlayer } from '../components/PlayerProvider/PlayerProvider';
import { theme } from '../utils/theme';

function ListenScreen() {
  const episodes = useSelector(store => store.episodes.episodes);
  const playerCtx = usePlayer();
  const episode = episodes.slice(-1)[0];

  console.log(playerCtx);

  return (
    <SafeAreaView style={styles.wrapper}>
      <Text style={styles.title}>{episode && episode.title}</Text>
      <Text style={styles.description}>{episode && episode.shortDescription}</Text>
      <PlayButton
        style="big"
        disabled={!episode}
        onPress={() => playerCtx.play({ title: episode.title, url: episode.audioUrl })}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: theme.bg.light,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: theme.fg,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 0,
    paddingHorizontal: 20,
  },
  description: {
    color: theme.fg,
    marginBottom: 15,
    paddingHorizontal: 15,
    textAlign: 'center',
  },
});

export default ListenScreen;
