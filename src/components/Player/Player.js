import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import { theme } from '../../utils/theme';
import Progress from './Progress';

function Player() {
  const { navigate } = useNavigation();

  return (
    <>
      <Progress progress={1} />
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigate('PlayerModal')}
        disabled={false}
      >
        <View style={styles.wrapper}>
          <View style={styles.half}>
            <Text style={{ ...styles.text, color: theme.fg }}>{'Nie odtwarzane'}</Text>
          </View>
          <View style={styles.half}>
            <TouchableOpacity style={styles.controlButton} disabled={false}>
              <Icon name={'play'} color={theme.fg} size={16} />
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
