import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { theme } from '../../utils/theme';

function PlayButton({ onPress, style, disabled = false }) {
  let buttonStyles;
  let wrapperStyles;

  switch (style) {
    case 'small':
      buttonStyles = styles.small;
      wrapperStyles = styles.wrapperSmall;
      break;
    case 'big':
      buttonStyles = styles.big;
      wrapperStyles = styles.wrapperBig;
      break;
    default:
      buttonStyles = styles.small;
      wrapperStyles = styles.wrapperSmall;
      break;
  }

  return (
    <TouchableOpacity
      style={wrapperStyles}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
    >
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
    padding: 20,
    overflow: 'hidden',
    textAlign: 'center',
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
  wrapperBig: {
    width: 90,
    height: 90,
  },
  wrapperSmall: {},
});

export default PlayButton;
