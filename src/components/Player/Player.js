import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';
import {theme} from '../../utils/theme';
import {pausePlaying, resumePlaying} from '../../store/actions/player';

function Player() {
  const dispatch = useDispatch();

  const {
    player: {queuePosition, isPlaying, isPaused},
    episodes: {episodes},
  } = useSelector((state) => state);

  const episode = queuePosition
    ? episodes[queuePosition]
    : queuePosition === 0 && episodes[queuePosition];

  return (
    <View style={styles.wrapper}>
      <View style={styles.half}>
        {episode && (
          <Video
            source={{
              uri:
                'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3',
            }}
            paused={isPaused}
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
    </View>
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
