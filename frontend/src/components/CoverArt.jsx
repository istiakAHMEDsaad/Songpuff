import seedrandom from "seedrandom";

// Retro, Cyberpunk, Pop Art, Vintage, Nature, Noir Contrast
const PALETTES = [
  ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"],
  ["#f72585", "#b5179e", "#7209b7", "#480ca8", "#3f37c9"],
  ["#ffbe0b", "#fb5607", "#ff006e", "#8338ec", "#3a86ff"],
  ["#001219", "#005f73", "#0a9396", "#94d2bd", "#e9d8a6"],
  ["#d8f3dc", "#b7e4c7", "#95d5b2", "#74c69d", "#52b788"],
  ["#000000", "#14213d", "#fca311", "#e5e5e5", "#ffffff"],
];

export default function CoverArt({ song, seed, className = "" }) {
  const combinedSeed = `${seed}-${song.title}-${song.artist}`;
  const rng = seedrandom(combinedSeed);

  const randomInt = (min, max) => Math.floor(rng() * (max - min + 1)) + min;
  const randomItem = (array) => array[randomInt(0, array.length - 1)];

  const palette = randomItem(PALETTES);
  const bgColor = palette[0];
  const shapeColors = palette.slice(1);

  const numShapes = randomInt(5, 10);
  const shapes = [];

  for (let i = 0; i < numShapes; i++) {
    const type = randomItem(["circle", "rect", "triangle"]);
    const color = randomItem(shapeColors);
    const size = randomInt(20, 80);
    const x = randomInt(-10, 110);
    const y = randomInt(-10, 110);
    const rotation = randomInt(0, 360);
    const opacity = randomInt(60, 100) / 100;

    shapes.push({ id: i, type, color, size, x, y, rotation, opacity });
  }

  return (
    <div
      className={`relative overflow-hidden aspect-square ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        {shapes.map((shape) => {
          const transform = `translate(${shape.x}, ${shape.y}) rotate(${shape.rotation})`;

          if (shape.type === "circle") {
            return (
              <circle
                key={shape.id}
                cx="0"
                cy="0"
                r={shape.size / 2}
                fill={shape.color}
                opacity={shape.opacity}
                transform={transform}
              />
            );
          }
          if (shape.type === "rect") {
            return (
              <rect
                key={shape.id}
                x={-shape.size / 2}
                y={-shape.size / 2}
                width={shape.size}
                height={shape.size}
                fill={shape.color}
                opacity={shape.opacity}
                transform={transform}
              />
            );
          }
          if (shape.type === "triangle") {
            const h = shape.size * (Math.sqrt(3) / 2);
            return (
              <polygon
                key={shape.id}
                points={`0,-${h / 2} -${shape.size / 2},${h / 2} ${shape.size / 2},${h / 2}`}
                fill={shape.color}
                opacity={shape.opacity}
                transform={transform}
              />
            );
          }
          return null;
        })}
      </svg>

      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-12 text-left">
        <h3 className="text-white font-black text-lg leading-tight drop-shadow-md line-clamp-2">
          {song.title}
        </h3>
        <p className="text-slate-300 font-medium text-xs mt-1 drop-shadow line-clamp-1">
          {song.artist}
        </p>
      </div>
    </div>
  );
}
