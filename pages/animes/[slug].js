import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Head from 'next/head';

import { getAnimeBySlug, getAllAnimes } from '../../lib/api';
import markdownToHtml from '../../lib/markdownToHtml';

function Anime({ anime }) {
  const router = useRouter();

  if (!router.isFallback && !anime?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <div>
      {router.isFallback ? (
        <p>Loading…</p>
      ) : (
        <>
          <article className="mb-32">
            <Head>
              <title>{anime.title}</title>
              {/* <meta property="og:image" content={anime.ogImage.url} /> */}
            </Head>
            <div dangerouslySetInnerHTML={{ __html: anime.content }} />
          </article>
        </>
      )}
    </div>
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
