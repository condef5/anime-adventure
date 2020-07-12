import React from 'react';
import { useColorMode, Flex } from '@chakra-ui/core';

function Container({ children }) {
  const { colorMode } = useColorMode();

  const bgColor = {
    light: 'white',
    dark: 'gray.900'
  };
  const primarytextColor = {
    light: 'black',
    dark: 'white'
  };

  return (
    <Flex
      as="main"
      justifyContent="center"
      flexDirection="column"
      bg={bgColor[colorMode]}
      color={primarytextColor[colorMode]}
      px={8}
      maxWidth={800}
      margin="auto"
    >
      {children}
    </Flex>
  );
}

export default Container;
