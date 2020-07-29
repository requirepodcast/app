import React from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.SafeAreaView`
  background-color: ${({theme}) => theme.bg.light};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  color: ${({theme}) => theme.fg};
`;

function ListenScreen() {
  return (
    <Wrapper>
      <Text>Listen</Text>
    </Wrapper>
  );
}

export default ListenScreen;
