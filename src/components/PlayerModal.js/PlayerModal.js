import React, { useEffect } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import Slider from '@react-native-community/slider';
import { theme } from '../../utils/theme';
import { getEpisode } from '../../utils/getEpisode';
import ControlButton from './ControlButton';
import {
  resumePlaying,
  pausePlaying,
  seek as seekTo,
} from '../../store/actions/player';
import SeekButton from './SeekButton';

function formatProgress(progress) {
  return new Date(progress * 1000).toISOString().substr(11, 8);
}

function PlayerModal() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    player: { queuePosition, isPaused, progress, duration, isPlaying },
    episodes: { episodes },
  } = useSelector((state) => state);

  const episode = getEpisode(queuePosition, episodes);

  function seek(by) {
    dispatch(seekTo(progress + by));
  }

  const progressFraction =
    Math.round((progress / duration + Number.EPSILON) * 1000) / 1000;

  useEffect(() => {
    if (!isPlaying) {
      navigation.goBack();
    }
  });

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="close" size={25} color={theme.fg} />
      </TouchableOpacity>
      {episode && (
        <>
          <Text style={styles.title}>{episode.title}</Text>
          <View style={styles.controlButtons}>
            <SeekButton onPress={() => seek(-10)} name="replay-10" />
            <ControlButton
              onPress={() =>
                dispatch(isPaused ? resumePlaying() : pausePlaying())
              }
              isPaused={isPaused}
            />
            <SeekButton onPress={() => seek(10)} name="forward-10" />
          </View>
          <Slider
            style={styles.slider}
            maximumTrackTintColor={'grey'}
            minimumTrackTintColor={theme.red}
            thumbTintColor={theme.red}
            value={progressFraction}
            onSlidingComplete={(val) => dispatch(seekTo(val * duration))}
          />
          <View style={styles.timerWrapper}>
            <Text style={styles.timer}>{formatProgress(progress)}</Text>
            <Text style={styles.timer}>
              -{formatProgress(duration - progress)}
            </Text>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.bg.dark,
    justifyContent: 'center',
    padding: 10,
  },
  title: {
    color: theme.fg,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    textAlign: 'center',
  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  timerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  timer: {
    fontSize: 10,
    color: 'grey',
  },
});

export default PlayerModal;
