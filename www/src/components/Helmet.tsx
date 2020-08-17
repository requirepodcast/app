import React from 'react';
import ReactHelmet from 'react-helmet';

const Helmet: React.FC = () => (
  <ReactHelmet>
    <link
      href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&display=swap"
      rel="stylesheet"
    />
  </ReactHelmet>
);

export default Helmet;
