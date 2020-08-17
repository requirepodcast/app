import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';

import ChangelogItem from './ChangelogItem';

const Wrapper = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 50px 20px;
`;

const H2 = styled.h2`
  font-size: 2em;
`;

const Changelog: React.FC = () => {
  const data: {
    allReleases: [
      {
        id: string;
        apk: string;
        childMarkdownRemark: { html: string };
        name: string;
        createdAt: string;
      }
    ];
  } = useStaticQuery(graphql`
    query {
      allReleases {
        id
        apk
        name
        createdAt
        childMarkdownRemark {
          html
        }
      }
    }
  `);

  return (
    <Wrapper id="changelog">
      <H2>Wersje</H2>
      {data.allReleases.map((release, i) => (
        <ChangelogItem
          key={release.id}
          name={release.name}
          apk={release.apk}
          description={release.childMarkdownRemark.html}
          createdAt={release.createdAt}
          first={!i}
        />
      ))}
    </Wrapper>
  );
};

export default Changelog;
