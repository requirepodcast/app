import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {theme} from '../../utils/theme';

function PlayButton({onPress, style}) {
  let buttonStyles;

  switch (style) {
    case 'small':
      buttonStyles = styles.small;
      break;
    case 'big':
      buttonStyles = styles.big;
      break;
    default:
      buttonStyles = styles.small;
      break;
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Icon style={buttonStyles} name="play">
        {!(style === 'big') && <Text>{' Odtwórz'}</Text>}
      </Icon>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  big: {
    backgroundColor: theme.red,
    color: theme.fg,
    fontSize: 50,
    borderRadius: 45,
    overflow: 'hidden',
    textAlign: 'center',
    padding: 20,
  },
  small: {
    backgroundColor: theme.red,
    color: theme.fg,
    fontSize: 15,
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 10,
    marginBottom: 5,
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  text: {
    color: theme.fg,
  },
});

export default PlayButton;
