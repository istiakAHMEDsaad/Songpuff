import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChevronDown,
  ChevronUp,
  Disc3,
  Heart,
  Play,
  Square,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useGetSongs } from "../hooks/useSongs";
import { playProceduralSong, stopMusic } from "../lib/musicEngine";
import CoverArt from "./CoverArt";

export default function SongTable({ region, seed, likes }) {
  const [page, setPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState(null);
  const [playingSongIndex, setPlayingSongIndex] = useState(null);

  const { data, isLoading, isFetching } = useGetSongs(
    { region, seed, likes },
    page,
  );
  const songs = data?.data || [];

  useEffect(() => {
    setPage(1);
    setExpandedRow(null);
  }, [region, seed, likes]);

  const handlePlayAudio = async (song) => {
    if (playingSongIndex === song.index) {
      stopMusic();
      setPlayingSongIndex(null);
    } else {
      setPlayingSongIndex(song.index);
      await playProceduralSong(seed, song);
      setTimeout(() => setPlayingSongIndex(null), 8000);
    }
  };

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  const toggleRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="rounded-md border flex-1 overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-[80px] text-center">#</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Artist</TableHead>
              <TableHead>Album</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead className="text-right">Likes</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading && page === 1 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-64 text-center text-slate-500"
                >
                  <Disc3 className="mx-auto h-8 w-8 animate-spin text-slate-300 mb-2" />
                </TableCell>
              </TableRow>
            ) : songs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-64 text-center text-slate-500"
                >
                  No data found.
                </TableCell>
              </TableRow>
            ) : (
              songs.map((song) => (
                <React.Fragment key={song.index}>
                  <TableRow
                    className={`cursor-pointer transition-colors ${expandedRow === song.index ? "bg-blue-100 hover:bg-blue-100" : "hover:bg-blue-50"}`}
                    onClick={() => toggleRow(song.index)}
                  >
                    <TableHead className="text-center font-medium text-slate-900">
                      {song.index}
                    </TableHead>
                    <TableHead className="font-semibold text-slate-900">
                      {song.title}
                    </TableHead>
                    <TableHead>{song.artist}</TableHead>
                    <TableHead
                      className={`${song.album === "Single" ? "text-slate-500" : "text-slate-900"}`}
                    >
                      {song.album}
                    </TableHead>
                    <TableHead>
                      <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800">
                        {song.genre}
                      </span>
                    </TableHead>
                    <TableHead className="text-right font-medium">
                      <div className="flex items-center justify-end gap-1">
                        {song.likes}{" "}
                        <Heart className="w-4 h-4 text-rose-500 fill-rose-100" />
                      </div>
                    </TableHead>
                    <TableCell>
                      {expandedRow === song.index ? (
                        <ChevronUp className="h-5 w-5 text-slate-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-slate-400" />
                      )}
                    </TableCell>
                  </TableRow>

                  {/* song details */}
                  {expandedRow === song.index && (
                    <TableRow className="bg-slate-50 hover:bg-slate-50">
                      <TableCell colSpan={7} className="p-0">
                        <div className="p-6 border-b animate-in fade-in slide-in-from-top-2 duration-200">
                          <div className="flex flex-col md:flex-row gap-6 items-start">
                            {/* art */}
                            <div className="w-40 h-40 shrink-0 rounded-xl overflow-hidden shadow-lg border border-slate-200">
                              <CoverArt song={song} seed={seed} />
                            </div>

                            <div className="flex-1 space-y-4">
                              <div>
                                <h4 className="text-lg font-bold text-slate-900">
                                  {song.title}
                                </h4>
                                <p className="text-slate-500">
                                  By {song.artist} • {song.album}
                                </p>
                              </div>

                              {/* play song */}
                              <div className="flex items-center gap-2">
                                <Button
                                  onClick={() => handlePlayAudio(song)}
                                  className={`gap-2 text-white rounded-full px-6 transition-all ${playingSongIndex === song.index ? "bg-rose-500 hover:bg-rose-600" : "bg-blue-600 hover:bg-blue-700"}`}
                                >
                                  {playingSongIndex === song.index ? (
                                    <>
                                      <Square className="w-4 h-4 fill-current" />
                                      Stop Preview
                                    </>
                                  ) : (
                                    <>
                                      <Play className="w-4 h-4 fill-current" />
                                      Play
                                    </>
                                  )}
                                </Button>
                                <span className="bg-slate-500 px-2.5 py-0.5 rounded-full text-slate-50">
                                  {song.duration}
                                </span>
                              </div>

                              {/* lyrics text */}
                              <div className="mt-6 rounded-lg overflow-hidden w-full">
                                <div className="bg-white px-4 py-2 border-b border-slate-200 mt-[-1px] ml-4">
                                  <span className="font-semibold text-slate-700 text-sm">
                                    Lyrics
                                  </span>
                                </div>

                                <div className="p-6 bg-white space-y-4 relative">
                                  {song.lyrics.map((line, idx) => {
                                    const isPlaying =
                                      playingSongIndex === song.index;
                                    return (
                                      <p
                                        key={idx}
                                        className={`italic transition-all duration-1000 transform ${
                                          isPlaying
                                            ? "text-slate-900 font-bold scale-105 drop-shadow-sm"
                                            : "text-slate-400 font-medium scale-100"
                                        }`}
                                        style={{
                                          transitionDelay: isPlaying
                                            ? `${idx * 1.8}s`
                                            : "0s",
                                        }}
                                      >
                                        {line}
                                      </p>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* bottom pagination */}
      <div className="flex items-center justify-between m-4">
        <div className="text-sm text-slate-500">
          Showing page{" "}
          <span className="font-semibold text-slate-900">{page}</span>
          {isFetching && (
            <span className="ml-2 text-blue-500 animate-pulse">
              Updating...
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="lg"
            onClick={handlePrevPage}
            disabled={page === 1 || isLoading}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={handleNextPage}
            disabled={isLoading || songs.length < 20}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
