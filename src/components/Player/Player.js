import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import TrackPlayer, {
  STATE_PAUSED,
  TrackPlayerEvents,
  useTrackPlayerEvents,
  STATE_PLAYING,
  useTrackPlayerProgress,
} from 'react-native-track-player';

import { theme } from '../../utils/theme';
import Progress from './Progress';
import { useSelector } from 'react-redux';

function Player() {
  const { navigate } = useNavigation();
  const { episodes } = useSelector((state) => state.episodes);
  const [playbackState, setPlaybackState] = useState(null);
  const [episode, setEpisode] = useState(null);
  const { position, duration } = useTrackPlayerProgress();

  useTrackPlayerEvents(
    [
      TrackPlayerEvents.PLAYBACK_STATE,
      TrackPlayerEvents.PLAYBACK_TRACK_CHANGED,
    ],
    (e) => {
      if (e.type === TrackPlayerEvents.PLAYBACK_STATE) {
        setPlaybackState(e.state);
      }

      if (e.type === TrackPlayerEvents.PLAYBACK_TRACK_CHANGED) {
        if (e.nextTrack) {
          setEpisode(episodes.find((ep) => ep.id === e.nextTrack));
        } else {
          setEpisode(null);
        }
      }
    },
  );

  const disabled =
    !playbackState ||
    (playbackState !== STATE_PAUSED && playbackState !== STATE_PLAYING);

  const playing = playbackState === STATE_PLAYING;

  return (
    <>
      <Progress progress={position ? position / duration : 1} />
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigate('PlayerModal')}
      >
        <View style={styles.wrapper}>
          <View style={styles.half}>
            <Text
              style={{ ...styles.text, color: disabled ? 'gray' : theme.fg }}
            >
              {episode ? episode.title : 'Nie odtwarzane'}
            </Text>
          </View>
          <View style={styles.half}>
            <TouchableOpacity
              style={styles.controlButton}
              disabled={disabled}
              onPress={() =>
                playbackState === STATE_PAUSED
                  ? TrackPlayer.play()
                  : TrackPlayer.pause()
              }
            >
              <Icon
                name={playing ? 'pause' : 'play'}
                color={disabled ? 'gray' : theme.fg}
                size={16}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: theme.bg.medium,
    borderBottomColor: theme.bg.dark,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  half: {
    flexDirection: 'row',
  },
  text: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  controlButton: {
    alignItems: 'center',
    height: '100%',
    paddingVertical: 14,
    paddingHorizontal: 10,
  },
});

export default Player;
