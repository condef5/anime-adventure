import fs from 'fs';
import { join } from 'path';

import matter from 'gray-matter';

const animesDirectory = join(process.cwd(), '_animes');

export function getAnimeSlugs() {
  return fs.readdirSync(animesDirectory);
}

export function getAnimeBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.md$/u, '');
  const fullPath = join(animesDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }

    if (field === 'content') {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllAnimes(fields = []) {
  const slugs = getAnimeSlugs();
  const animes = slugs
    .map((slug) => getAnimeBySlug(slug, fields))
    .sort((anime1, anime2) => (anime1.date > anime2.date ? '-1' : '1'));

  return animes;
}
