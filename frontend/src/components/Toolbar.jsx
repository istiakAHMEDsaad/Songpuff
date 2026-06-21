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
import { Shuffle } from "lucide-react";

export default function Toolbar({
  region,
  setRegion,
  seed,
  setSeed,
  likes,
  setLikes,
}) {
  const handleRandomSeed = () => {
    const randomString = Math.random().toString(36).substring(2, 10);
    setSeed(randomString);
  };

  return (
    <div className="bg-white p-5 rounded border shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
      {/* language */}
      <div className="flex flex-col md:w-72 w-full gap-1.5 overflow-hidden">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Region
        </label>
        <Select value={region} onValueChange={setRegion}>
          <SelectTrigger className="bg-slate-50 w-28">
            <SelectValue placeholder="Select Region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="de">German</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* seed */}
      <div className="flex flex-col md:w-340 w-full gap-1.5">
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

      {/* likes */}
      <div className="flex flex-col md:w-260 w-full gap-1.5">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Average Likes
          </label>
          <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
            {likes}
          </span>
        </div>
        <div className="pt-2">
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
    </div>
  );
}
