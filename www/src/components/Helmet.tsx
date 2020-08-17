import React from 'react';
import ReactHelmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

const Helmet: React.FC = () => {
  const {
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
        }
      }
    }
  `);

  return (
    <ReactHelmet>
      <title>{siteMetadata.title}</title>
      <meta name="description" content={siteMetadata.description} />
      <meta name="author" content={siteMetadata.author} />
      <link
        href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&display=swap"
        rel="stylesheet"
      />
    </ReactHelmet>
  );
};

export default Helmet;
