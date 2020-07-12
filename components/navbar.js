import React from 'react';
import NextLink from 'next/link';
import { useColorMode, Button, Flex, Box, IconButton } from '@chakra-ui/core';
import styled from '@emotion/styled';

const StickyNav = styled(Flex)`
  position: sticky;
  z-index: 10;
  top: 0;
  backdrop-filter: saturate(180%) blur(20px);
  transition: background-color 0.1 ease-in-out;
`;

const Logo = styled.a`
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 0.25px;
  background-image: ${({ gradient }) => gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  &:hover {
    -webkit-text-fill-color: inherit;
  }
`;

const gradients = {
  light: 'linear-gradient(7deg, #1a202c 50%, #0070F3 0)',
  dark: 'linear-gradient(7deg, #fff 50%, cyan 0)'
};

const NavItem = ({ children, href }) => (
  <NextLink href={href} passHref>
    <Button as="a" variant="ghost" p={[1, 4]} marginLeft={'0.5em'}>
      {children}
    </Button>
  </NextLink>
);

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <StickyNav
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      maxWidth="800px"
      width="100%"
      as="nav"
      p={8}
      mt={[0, 8]}
      mb={8}
      mx="auto"
    >
      <NextLink href="/" passHref>
        <Logo gradient={gradients[colorMode]}>Anime Adventure</Logo>
      </NextLink>
      <Box>
        <NavItem href="/">Directorio</NavItem>
        <NavItem href="/">Stuffs</NavItem>
        <IconButton
          aria-label="Toggle dark mode"
          icon={colorMode === 'dark' ? 'sun' : 'moon'}
          marginLeft={'0.5em'}
          onClick={toggleColorMode}
        />
      </Box>
    </StickyNav>
  );
};

export default Navbar;
