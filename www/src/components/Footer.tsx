import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 5px;
  text-align: center;
  background-color: ${({ theme }) => theme.bg.darker};
  font-size: 0.8em;

  a {
    color: ${({ theme }) => theme.red};
  }
`;

const Footer: React.FC = () => (
  <Wrapper>
    Copyright {new Date().getFullYear()} {'\u00a9 '}
    <a href="https://require.podcast.gq">Require Podcast</a>
  </Wrapper>
);

export default Footer;
