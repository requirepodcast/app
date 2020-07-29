import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';

const Button = styled(Icon)`
  background-color: ${({theme}) => theme.red};
  color: ${({theme}) => theme.fg};
  font-size: 50px;
  border-radius: 45px;
  overflow: hidden;
  text-align: center;
  padding: 20px;
`;

function PlayButton({onPress}) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Button name="play" />
    </TouchableOpacity>
  );
}

export default PlayButton;
