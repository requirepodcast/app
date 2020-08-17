import React from 'react';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from '../assets/styles/globalStyles';
import { theme } from '../assets/styles/theme';

import Header from '../components/Header';
import Helmet from '../components/Helmet';
import Features from '../components/Features';

const IndexPage: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Helmet />
        <Header />
        <Features />
      </>
    </ThemeProvider>
  );
};

export default IndexPage;
