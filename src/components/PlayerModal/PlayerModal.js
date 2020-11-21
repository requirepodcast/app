import React, { useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import { theme } from '../../utils/theme';
import ControlButton from './ControlButton';
import SeekButton from './SeekButton';
import { usePlayer } from '../PlayerProvider/PlayerProvider';

function formatTime(progress) {
  return new Date(progress * 1000).toISOString().substr(11, 8);
}

function PlayerModal() {
  const navigation = useNavigation();
  const [sliderValue, setSliderValue] = useState(null);
  const { playing, title, paused, trigger, seekBy, time, duration, progress, seekTo } = usePlayer();

  function onSlidingComplete(v) {
    seekTo(v * duration);
    setTimeout(() => setSliderValue(null), 500); // Cosmetic purposes
  }

  const sliding = sliderValue !== null;
  const sliderTime = sliderValue * duration;

  return (
    <View style={styles.wrapper}>
      <>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <Icon name="close" size={25} color={theme.fg} />
        </TouchableOpacity>
      </>
      <>
        <Text style={styles.title}>{playing ? title : 'Nie odtwarzane'}</Text>
        <View style={styles.controlButtons}>
          <SeekButton name="replay-10" disabled={false} onPress={seekBy(-10)} />
          <ControlButton isPaused={paused} disabled={false} onPress={trigger} />
          <SeekButton name="forward-10" disabled={false} onPress={seekBy(10)} />
        </View>
        <Slider
          style={styles.slider}
          maximumTrackTintColor={'grey'}
          minimumTrackTintColor={theme.red}
          thumbTintColor={theme.red}
          value={sliding ? undefined : progress}
          onSlidingComplete={onSlidingComplete}
          onSlidingStart={val => setSliderValue(val)}
          onValueChange={val => setSliderValue(val)}
        />
        <View style={styles.timerWrapper}>
          <Text style={styles.timer}>{formatTime(sliding ? sliderTime : time)}</Text>
          <Text style={styles.timer}>-{formatTime(duration - (sliding ? sliderTime : time))}</Text>
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
