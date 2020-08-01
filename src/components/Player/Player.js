import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';
import MusicControl from 'react-native-music-control';

import {theme} from '../../utils/theme';
import {
  pausePlaying,
  resumePlaying,
  setProgress,
  setDuration,
  seekFunc,
  seek,
  clean,
} from '../../store/actions/player';
import PlayerWrapper from './PlayerWrapper';
import logo from '../../images/RequireLogo.png';
import {setupMusicControl} from '../../utils/setupMusicControl';

setupMusicControl();

function Player() {
  const dispatch = useDispatch();
  const playerRef = useRef();

  const {
    player: {queuePosition, isPlaying, isPaused, progress},
    episodes: {episodes},
  } = useSelector((state) => state);

  const episode = queuePosition
    ? episodes[queuePosition]
    : queuePosition === 0 && episodes[queuePosition];

  function onLoad(data) {
    MusicControl.setNowPlaying({
      title: episode.title,
      artwork: logo,
      artist: 'Require Podcast',
      duration: data.duration,
    });

    MusicControl.on('play', () => {
      dispatch(resumePlaying());
    });

    MusicControl.on('pause', () => {
      dispatch(pausePlaying());
    });

    MusicControl.on('seek', (val) => {
      dispatch(seek(val));
    });

    dispatch(seekFunc(playerRef.current.seek));
    dispatch(setDuration(data.duration));
  }

  useEffect(() => {
    if (isPlaying) {
      MusicControl.updatePlayback({
        state: isPaused
          ? MusicControl.STATE_PAUSED
          : MusicControl.STATE_PLAYING,
        elapsedTime: progress,
      });
    }
  });

  return (
    <PlayerWrapper>
      <View style={styles.half}>
        {episode && (
          <Video
            source={{
              uri: episode.audioUrl,
            }}
            paused={isPaused}
            playInBackground={true}
            playWhenInactive={true}
            onLoad={onLoad}
            onProgress={(data) => dispatch(setProgress(data.currentTime))}
            onEnd={() => dispatch(clean())}
            ref={playerRef}
          />
        )}
        <Text style={styles.text}>
          {episode ? episode.title : 'Aktualnie nie odtwarzane'}
        </Text>
      </View>
      <View style={styles.half}>
        <TouchableOpacity
          style={styles.controlButton}
          disabled={!isPlaying}
          onPress={() => dispatch(isPaused ? resumePlaying() : pausePlaying())}>
          <Icon
            name={isPaused ? 'play' : 'pause'}
            color={isPlaying ? theme.fg : 'grey'}
            size={16}
          />
        </TouchableOpacity>
      </View>
    </PlayerWrapper>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: theme.bg.medium,
    borderBottomColor: theme.bg.dark,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  half: {
    flexDirection: 'row',
  },
  text: {
    color: theme.fg,
    fontSize: 14,
  },
  controlButton: {
    alignItems: 'center',
    height: '100%',
  },
});

export default Player;
