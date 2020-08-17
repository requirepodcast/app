import React from 'react';
import styled from 'styled-components';

import Button from './Button';

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const H1 = styled.h1`
  font-weight: normal;
  font-size: 2.5em;
  color: ${({ theme }) => theme.red};
`;

const Header: React.FC = () => {
  return (
    <Wrapper>
      <H1>Require Podcast App</H1>
      <Button>Pobierz</Button>
    </Wrapper>
  );
};

export default Header;
