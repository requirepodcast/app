import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import TrackPlayer from 'react-native-track-player';
import { theme } from '../../utils/theme';
import ControlButton from './ControlButton';
import SeekButton from './SeekButton';

function formatTime(progress) {
  return new Date(progress * 1000).toISOString().substr(11, 8);
}

function PlayerModal() {
  const navigation = useNavigation();
  const [sliderValue, setSliderValue] = useState(0);
  const { position, duration, episode, playing, disabled } = useSelector(
    (state) => state.player,
  );

  const progress = sliderValue || position / duration || 0;

  function onSlidingComplete(val) {
    TrackPlayer.seekTo(val * duration);
    setSliderValue(0);
  }

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="close" size={25} color={theme.fg} />
      </TouchableOpacity>
      <>
        <Text style={styles.title}>
          {episode ? episode.title : 'Nie odtwarzane'}
        </Text>
        <View style={styles.controlButtons}>
          <SeekButton
            onPress={() => TrackPlayer.seekTo(position - 10)}
            name="replay-10"
            disabled={disabled}
          />
          <ControlButton
            onPress={() => (playing ? TrackPlayer.pause() : TrackPlayer.play())}
            isPaused={!playing}
            disabled={disabled}
          />
          <SeekButton
            onPress={() => TrackPlayer.seekTo(position + 10)}
            name="forward-10"
            disabled={disabled}
          />
        </View>
        <Slider
          style={styles.slider}
          maximumTrackTintColor={'grey'}
          minimumTrackTintColor={theme.red}
          thumbTintColor={theme.red}
          value={!sliderValue ? position / duration || 0 : null}
          onSlidingComplete={onSlidingComplete}
          onValueChange={(val) => setSliderValue(val)}
        />
        <View style={styles.timerWrapper}>
          <Text style={styles.timer}>{formatTime(progress * duration)}</Text>
          <Text style={styles.timer}>
            -{formatTime(duration - progress * duration)}
          </Text>
        </View>
      </>
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
