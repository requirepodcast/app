import React from 'react';
import styled from 'styled-components/native';
import {useSelector} from 'react-redux';

import PlayButton from '../components/PlayButton/PlayButton';

const Wrapper = styled.SafeAreaView`
  background-color: ${({theme}) => theme.bg.light};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  color: ${({theme}) => theme.fg};
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  padding: 0 20px;
`;

const Description = styled.Text`
  color: ${({theme}) => theme.fg};
  margin-bottom: 15px;
  padding: 0 20px;
  text-align: center;
`;

function ListenScreen() {
  const episodes = useSelector((store) => store.episodes);
  const episode = episodes.slice(-1)[0];

  return (
    <Wrapper>
      <Title>{episode && episode.title}</Title>
      <Description>{episode && episode.shortDescription}</Description>
      <PlayButton onPress={() => console.log('dupa')} />
    </Wrapper>
  );
}

export default ListenScreen;
