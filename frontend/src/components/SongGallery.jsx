import { Card, CardContent } from "@/components/ui/card";
import { Disc3, Heart, Play, Square } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInfiniteSongs } from "../hooks/useSongs";
import { playProceduralSong, stopMusic } from "../lib/musicEngine";
import CoverArt from "./CoverArt";

export default function SongGallery({ region, seed, likes }) {
  const [playingSongIndex, setPlayingSongIndex] = useState(null);
  const observer = useRef();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteSongs({ region, seed, likes });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [region, seed, likes]);

  const lastSongElementRef = useCallback(
    (node) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage],
  );

  const handlePlayAudio = async (e, song) => {
    e.stopPropagation();
    if (playingSongIndex === song.index) {
      stopMusic();
      setPlayingSongIndex(null);
    } else {
      setPlayingSongIndex(song.index);
      await playProceduralSong(seed, song);
      setTimeout(() => setPlayingSongIndex(null), 8000);
    }
  };

  if (status === "pending") {
    return (
      <div className="h-[400px] flex items-center justify-center text-slate-500">
        <Disc3 className="animate-spin h-8 w-8 mr-2 text-blue-500" />
      </div>
    );
  }

  return (
    <div className="pb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data?.pages.map((page, pageIndex) =>
          page.data.map((song, songIndex) => {
            const isLastElement =
              pageIndex === data.pages.length - 1 &&
              songIndex === page.data.length - 1;

            return (
              <Card
                key={`${song.index}-${song.title}`}
                ref={isLastElement ? lastSongElementRef : null}
                className="overflow-hidden hover:shadow-md transition-shadow group border-slate-200 px-4"
              >
                {/* art */}
                <div className="relative aspect-square group/cover overflow-hidden">
                  <CoverArt
                    song={song}
                    seed={seed}
                    className="w-full h-full rounded-md"
                  />

                  {/* play song */}
                  <div
                    className={`absolute inset-0 bg-black/40 transition-opacity flex items-center justify-center z-20 ${playingSongIndex === song.index ? "opacity-100" : "opacity-0 group-hover/cover:opacity-100"}`}
                  >
                    <button
                      onClick={(e) => handlePlayAudio(e, song)}
                      className="bg-white text-slate-900 rounded-full p-4 transform hover:scale-110 transition-transform shadow-lg"
                    >
                      {playingSongIndex === song.index ? (
                        <Square className="w-6 h-6 fill-current text-rose-500" />
                      ) : (
                        <Play className="w-6 h-6 fill-current ml-1 text-blue-600" />
                      )}
                    </button>
                  </div>
                </div>

                <CardContent className="bg-white">
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <h3
                      className="font-bold text-slate-900 line-clamp-1"
                      title={song.title}
                    >
                      {song.title}
                    </h3>
                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded shrink-0">
                      #{song.index}
                    </span>
                  </div>

                  <p
                    className="text-sm text-slate-600 line-clamp-1 mb-3"
                    title={song.artist}
                  >
                    {song.artist}
                  </p>

                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="text-slate-500 bg-slate-50 border px-2 py-1 rounded-md line-clamp-1 max-w-[60%]">
                      {song.genre}
                    </span>
                    <div className="flex items-center gap-1 text-slate-700">
                      {song.likes}{" "}
                      <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-100" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          }),
        )}
      </div>

      {isFetchingNextPage && (
        <div className="py-8 flex justify-center text-blue-500">
          <Disc3 className="animate-spin h-6 w-6" />
        </div>
      )}
    </div>
  );
}
