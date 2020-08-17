import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

const Wrapper = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 50px 20px;
`;

const H2 = styled.h2`
  font-size: 2em;
`;

const Images = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 10px;
`;

const Features: React.FC = () => {
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { relativePath: { regex: "/screenshots/" } }) {
        edges {
          node {
            id
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `);
  return (
    <Wrapper>
      <H2>O apce</H2>
      <p>
        Oficjalna aplikacja do słuchania Require Podcast! Obecne
        funkcjonalności:
      </p>
      <ul>
        <li>Dostęp do archiwum odcinków, lista odcinków</li>
        <li>Możliwość słuchania podcastu</li>
        <li>
          Odtwarzacz z opcją odtwarzania w tle, zapisywania postępu słuchania i
          kontroli z zablokowanego ekranu
        </li>
      </ul>
      <p>Planujemy również dodać powiadomienia o nowych odcinkach.</p>
      <h3>Screenshoty</h3>
      <Images>
        {data.allFile.edges.map(({ node }) => (
          <Img key={node.id} fluid={node.childImageSharp.fluid} />
        ))}
      </Images>
    </Wrapper>
  );
};

export default Features;
