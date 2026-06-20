import { Faker, en_US, de } from "@faker-js/faker";
import seedrandom from "seedrandom";

const locals = {
  en: en_US,
  de: de,
};

export const generateSongs = (
  seedString,
  page,
  region,
  averageLikes,
  pageSize,
) => {
  const localData = locals[region] || locals.en;
  const fakerInstance = new Faker({ locale: [localData, en_US] });
  const combinedSeedString = `${seedString}-page-${page}`;
  const rng = seedrandom(combinedSeedString);

  // int
  const numericSeed = Math.floor(rng() * 1000000000);
  fakerInstance.seed(numericSeed);

  const songs = [];

  const startIndex = (page - 1) * pageSize + 1;

  for (let i = 0; i < pageSize; i++) {
    const currentIndex = startIndex + i;

    // like %
    const baseLikes = Math.floor(averageLikes);
    const fractionalPart = averageLikes - baseLikes;

    const extraLike = rng < fractionalPart ? 1 : 0;
    const finalLike = baseLikes + extraLike;

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

    const songTitle = fakerInstance.word
      .words({ count: { min: 2, max: 4 } })
      .replace(/\b\w/g, (l) => l.toUpperCase());

    songs.push({
      index: currentIndex,
      title: songTitle,
      artist: artistName,
      album: albumName,
      genre: fakerInstance.music.genre(),
      likes: finalLike,
    });
  }

  return songs;
};
