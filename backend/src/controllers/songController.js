import { generateSongs } from "../utils/generator.js";

export const getSongs = (req, res) => {
  try {
    const seed = req.query.seed || "default-seed";
    const page = parseInt(req.query.page) || 1;
    const region = req.query.region || "en";
    const likes = parseFloat(req.query.likes) || 0;
    const songs = generateSongs(seed, page, region, likes);

    res.status(200).json({
      success: true,
      meta: {
        page,
        seed,
        region,
        averageLikes: likes,
        pageSize: songs.length,
      },
      data: songs,
    });
  } catch (error) {
    console.error("Error generating songs:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
