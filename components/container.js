import React from 'react';
import { Flex } from '@chakra-ui/core';

import Navbar from './navbar';

function Container({ children }) {
  return (
    <>
      <Navbar />
      <Flex
        as="main"
        justifyContent="center"
        flexDirection="column"
        px={8}
        maxWidth={800}
        margin="auto"
      >
        {children}
      </Flex>
    </>
  );
}

export default Container;
