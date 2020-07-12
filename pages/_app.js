import React from 'react';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';

import theme from '../styles/theme';

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
