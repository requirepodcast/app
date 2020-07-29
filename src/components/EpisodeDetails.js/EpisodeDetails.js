import React, {useLayoutEffect} from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.bg.light};
`;

const Text = styled.Text`
  color: ${({theme}) => theme.fg};
`;

function EpisodeDetails({
  route: {
    params: {episode},
  },
  navigation,
}) {
  useLayoutEffect(() => {
    navigation.setOptions({title: episode.title});
  });

  return (
    <Wrapper>
      <Text>{episode.title}</Text>
    </Wrapper>
  );
}

export default EpisodeDetails;
