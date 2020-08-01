import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {theme} from '../../utils/theme';

function SeekButton({onPress, name}) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Icon style={styles.button} name={name} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.red,
    color: theme.fg,
    fontSize: 30,
    borderRadius: 25,
    overflow: 'hidden',
    textAlign: 'center',
    padding: 10,
    marginHorizontal: 10,
  },
});

export default SeekButton;
