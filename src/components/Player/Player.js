import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';
import MusicControl from 'react-native-music-control';

import {theme} from '../../utils/theme';
import {pausePlaying, resumePlaying} from '../../store/actions/player';
import PlayerWrapper from './PlayerWrapper';
import logo from '../../images/RequireLogo.png';

function Player() {
  const dispatch = useDispatch();
  const playerRef = useRef();

  const {
    player: {queuePosition, isPlaying, isPaused},
    episodes: {episodes},
  } = useSelector((state) => state);

  const episode = queuePosition
    ? episodes[queuePosition]
    : queuePosition === 0 && episodes[queuePosition];

  function setupControls(data) {
    MusicControl.enableControl('play', true);
    MusicControl.enableControl('pause', true);
    MusicControl.enableControl('stop', false);
    MusicControl.enableControl('nextTrack', false);
    MusicControl.enableControl('previousTrack', false);
    MusicControl.enableControl('changePlaybackPosition', true);
    MusicControl.enableControl('seek', true);
    MusicControl.enableControl('skipForward', false);
    MusicControl.enableControl('skipBackward', false);

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
      playerRef.current.seek(val);
    });
  }

  useEffect(() => {
    if (isPlaying) {
      MusicControl.updatePlayback({
        state: isPaused
          ? MusicControl.STATE_PAUSED
          : MusicControl.STATE_PLAYING,
      });
    }
  });

  function onProgress(data) {
    MusicControl.updatePlayback({
      elapsedTime: data.currentTime,
    });
  }

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
            onLoad={setupControls}
            onProgress={onProgress}
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
