import React from 'react';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from '../assets/styles/globalStyles';
import { theme } from '../assets/styles/theme';

const IndexPage: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <div>
          <h1>dupa</h1>
        </div>
      </>
    </ThemeProvider>
  );
};

export default IndexPage;
