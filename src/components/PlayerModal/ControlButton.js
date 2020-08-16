import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { theme } from '../../utils/theme';

function ControlButton({ onPress, isPaused }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Icon style={styles.button} name={isPaused ? 'play' : 'pause'} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.red,
    color: theme.fg,
    fontSize: 50,
    borderRadius: 45,
    overflow: 'hidden',
    textAlign: 'center',
    padding: 20,
  },
});

export default ControlButton;
