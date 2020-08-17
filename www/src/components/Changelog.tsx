import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 50px 20px;
`;

const H2 = styled.h2`
  font-size: 2em;
`;

const Changelog: React.FC = () => {
  return (
    <Wrapper>
      <H2>Changelog</H2>
    </Wrapper>
  );
};

export default Changelog;
