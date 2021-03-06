import React from 'react';
import styled from 'styled-components';
import { format } from 'light-date';

const Wrapper = styled.div<{ first: boolean }>`
  border-top: ${({ first, theme }) => !first && `2px solid ${theme.red}`};
  opacity: ${({ first }) => !first && '0.6'};
  transition: opacity 0.5s ease;

  :hover {
    opacity: 1;
  }
`;

const H3 = styled.h3`
  font-size: 1.5em;
  margin-bottom: 0;
  display: flex;
  align-items: center;
`;

const ReleaseDate = styled.p`
  color: #aaa;
  font-size: 0.8em;
  margin: 0;
`;

const DownloadButton = styled.a`
  border: 2px solid ${({ theme }) => theme.red};
  border-radius: 3px;
  color: ${({ theme }) => theme.fg};
  cursor: pointer;
  margin: 0 15px;
  transition: background 0.3s ease;
  font-family: inherit;
  display: block;
  text-decoration: none;
  font-size: 12px;
  font-weight: normal;
  padding: 2px 4px;

  &:hover {
    background: ${({ theme }) => theme.red};
  }
`;

const ChangelogItem: React.FC<{
  name: string;
  apk: string;
  description: string;
  createdAt: string;
  first: boolean;
}> = ({ name, apk, description, createdAt, first }) => (
  <Wrapper first={first}>
    <H3>
      {name}
      <DownloadButton href={apk} target="_blank">
        Pobierz
      </DownloadButton>
    </H3>
    <ReleaseDate>{format(new Date(createdAt), '{yyyy}-{MM}-{dd}')}</ReleaseDate>
    <div dangerouslySetInnerHTML={{ __html: description }} />
  </Wrapper>
);

export default ChangelogItem;
