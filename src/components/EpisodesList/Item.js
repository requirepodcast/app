import React from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {theme} from '../../utils/theme';
import {TouchableHighlight} from 'react-native';

const Text = styled.Text`
  color: ${(props) => props.theme.fg};
  padding: 15px;
  font-size: 16px;
`;

function Item({episode}) {
  const navigation = useNavigation();

  return (
    <TouchableHighlight
      underlayColor={theme.bg.lighter}
      activeOpacity={1}
      onPress={() => navigation.navigate('Details', {episode})}>
      <Text>{episode.title}</Text>
    </TouchableHighlight>
  );
}

export default Item;
