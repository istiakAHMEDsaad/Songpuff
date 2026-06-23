import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Shuffle, Volume2, VolumeX } from "lucide-react";

export default function Toolbar({
  region,
  setRegion,
  seed,
  setSeed,
  likes,
  setLikes,
  volume,
  setVolume,
}) {
  const handleRandomSeed = () => {
    const randomString = Math.random().toString(36).substring(2, 10);
    setSeed(randomString);
  };

  return (
    <div className="bg-white p-5 rounded-xl border shadow-sm flex flex-col md:flex-row items-center gap-6">
      {/* region sel */}
      <div className="flex flex-col w-full md:w-48 gap-1.5">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Region
        </label>
        <Select value={region} onValueChange={setRegion}>
          <SelectTrigger className="bg-slate-50">
            <SelectValue placeholder="Select Region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English (USA)</SelectItem>
            <SelectItem value="de">German (Germany)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* seed gen */}
      <div className="flex flex-col w-full md:flex-1 gap-1.5">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Generation Seed
        </label>
        <div className="flex gap-2">
          <Input
            type="text"
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
            className="font-mono bg-slate-50"
            placeholder="Enter custom seed..."
          />
          <Button
            variant="outline"
            onClick={handleRandomSeed}
            className="shrink-0 gap-2 hover:bg-slate-100"
          >
            <Shuffle size={16} />
            Random
          </Button>
        </div>
      </div>

      {/* likes slider */}
      <div className="flex flex-col w-full md:w-64 gap-1.5">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Average Likes
          </label>
          <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
            {likes}
          </span>
        </div>
        <div className="pt-2">
          {/* Shadcn Slider (0 to 10 with 0.1 steps for fractional likes) */}
          <Slider
            value={[likes]}
            min={0}
            max={10}
            step={0.1}
            onValueChange={(val) => setLikes(val[0])}
            className="cursor-pointer"
          />
        </div>
      </div>

      {/* vol */}
      <div className="flex flex-col w-full md:w-48 gap-1.5 md:ml-auto md:pl-6 md:border-l border-slate-100">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Volume
          </label>
          <span className="text-xs font-bold text-slate-400">{volume}%</span>
        </div>
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => setVolume(volume === 0 ? 80 : 0)}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            {volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <Slider
            value={[volume]}
            min={0}
            max={100}
            step={1}
            onValueChange={(val) => setVolume(val[0])}
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
