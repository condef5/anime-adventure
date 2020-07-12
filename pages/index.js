import Link from 'next/link';
import { Heading, Text, Box } from '@chakra-ui/core';

import { getAllAnimes } from '../lib/api';
import Container from '../components/container';

function Home({ allAnimes }) {
  return (
    <Container>
      <Heading letterSpacing="tight" mt={8} mb={2} as="h1" size="2xl">
        Bienvenido a anime adventure
      </Heading>
      <Text color="gray.700">
        Directorio de los mejores animes jamás nombrados.
      </Text>

      <Box>
        {allAnimes.map((anime) => (
          <Box key={anime.slug} mt={8}>
            <Heading size="md" as="h3" mb={2} fontWeight="medium">
              <Link as={`/animes/${anime.slug}`} href="/animes/[slug]">
                <a>{anime.title}</a>
              </Link>
            </Heading>
            <Text color="gray.700">{anime.summary}</Text>
          </Box>
        ))}
      </Box>
    </Container>
  );
}

export function getStaticProps() {
  const allAnimes = getAllAnimes([
    'title',
    'date',
    'slug',
    'summary',
    'coverImage'
  ]);

  return {
    props: { allAnimes }
  };
}

export default Home;
