import Link from 'next/link';

import { getAllAnimes } from '../lib/api';

function Home({ allAnimes }) {
  return (
    <div>
      <h1>Bienvenido a Anime Adventure</h1>
      <p>Directorio de los mejores animes jamás nonbrados.</p>
      <hr />
      <ul>
        {allAnimes.map((anime) => (
          <li key={anime.slug}>
            <h2>
              <Link as={`/animes/${anime.slug}`} href="/animes/[slug]">
                <a>{anime.title}</a>
              </Link>
            </h2>
            <p>{anime.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
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
