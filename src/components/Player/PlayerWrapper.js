import React from 'react';
import {Animated, TouchableOpacity, StyleSheet} from 'react-native';
import {theme} from '../../utils/theme';
import {useNavigation} from '@react-navigation/native';

function PlayerWrapper({children}) {
  const {navigate} = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigate('PlayerModal')}>
      <Animated.View style={styles.wrapper}>{children}</Animated.View>
    </TouchableOpacity>
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
    alignItems: 'center',
  },
  close: {
    position: 'absolute',
    top: 100,
    left: 0,
  },
});

export default PlayerWrapper;
