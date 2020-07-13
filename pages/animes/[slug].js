import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Head from 'next/head';
import { Heading, Box } from '@chakra-ui/core';
import styled from '@emotion/styled';

import { getAnimeBySlug, getAllAnimes } from '../../lib/api';
import markdownToHtml from '../../lib/markdownToHtml';
import Container from '../../components/container';

const Content = styled.div`
  p {
    margin: 2em 0;
    line-height: 1.65;
  }
`;

function Anime({ anime }) {
  const router = useRouter();

  if (!router.isFallback && !anime?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Container>
      {router.isFallback ? (
        <p>Loading…</p>
      ) : (
        <>
          <Box as="article" marginBottom={12}>
            <Head>
              <title>{anime.title}</title>
              {/* <meta property="og:image" content={anime.ogImage.url} /> */}
            </Head>
            <Heading as="h1" size="2xl" marginY="0.5em">
              {anime.title}
            </Heading>
            <Content>
              <div dangerouslySetInnerHTML={{ __html: anime.content }} />
            </Content>
          </Box>
        </>
      )}
    </Container>
  );
}

export async function getStaticProps({ params }) {
  const anime = getAnimeBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'content'
  ]);
  const content = await markdownToHtml(anime.content || '');

  return {
    props: {
      anime: {
        ...anime,
        content
      }
    }
  };
}

export async function getStaticPaths() {
  const animes = getAllAnimes(['slug']);

  return {
    paths: animes.map((anime) => {
      return {
        params: {
          slug: anime.slug
        }
      };
    }),
    fallback: false
  };
}

export default Anime;
