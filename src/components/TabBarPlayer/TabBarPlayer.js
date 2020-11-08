import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import { theme } from '../../utils/theme';
import Progress from './Progress';
import { usePlayer } from '../PlayerProvider/PlayerProvider';

function TabBarPlayer() {
  const { navigate } = useNavigation();
  const { playing, paused, title, trigger, progress } = usePlayer();

  return (
    <>
      <Progress progress={progress} />
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigate('PlayerModal')}
        disabled={!playing}
      >
        <View style={styles.wrapper}>
          <View style={styles.half}>
            <Text style={{ ...styles.text, color: theme.fg }}>
              {playing ? title : 'Nie odtwarzane'}
            </Text>
          </View>
          <View style={styles.half}>
            <TouchableOpacity style={styles.controlButton} disabled={!playing}>
              <Icon name={paused ? 'play' : 'pause'} color={theme.fg} size={16} onPress={trigger} />
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

export default TabBarPlayer;
