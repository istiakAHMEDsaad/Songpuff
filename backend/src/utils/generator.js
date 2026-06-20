import { Faker, en, de } from "@faker-js/faker";
import seedrandom from "seedrandom";

const locales = {
  en: en,
  de: de,
};

export const generateSongs = (
  seedString,
  page,
  region,
  averageLikes,
  pageSize = 20,
) => {
  const localeData = locales[region] || locales.en;

  const fakerInstance = new Faker({ locale: [localeData, en] });

  const combinedSeedString = `${seedString}-page-${page}`;

  const rng = seedrandom(combinedSeedString);

  const numericSeed = Math.floor(rng() * 1000000000);
  fakerInstance.seed(numericSeed);

  const songs = [];
  const startIndex = (page - 1) * pageSize + 1;

  for (let i = 0; i < pageSize; i++) {
    const currentIndex = startIndex + i;

    const baseLikes = Math.floor(averageLikes);
    const fractionalPart = averageLikes - baseLikes;
    const extraLike = rng() < fractionalPart ? 1 : 0;
    const finalLikes = baseLikes + extraLike;

    // artist name
    const isBand = fakerInstance.number.int({ min: 1, max: 2 }) === 1;
    const artistName = isBand
      ? fakerInstance.company.name()
      : fakerInstance.person.fullName();

    // album name
    const isSingle = fakerInstance.number.int({ min: 1, max: 10 }) > 8;
    const albumName = isSingle
      ? "Single"
      : fakerInstance.word
          .words({ count: { min: 1, max: 3 } })
          .replace(/\b\w/g, (l) => l.toUpperCase());

    // song title
    const songTitle = fakerInstance.word
      .words({ count: { min: 2, max: 4 } })
      .replace(/\b\w/g, (l) => l.toUpperCase());

    songs.push({
      index: currentIndex,
      title: songTitle,
      artist: artistName,
      album: albumName,
      genre: fakerInstance.music.genre(),
      likes: finalLikes,
    });
  }

  return songs;
};
