import { GalleryVertical, Table } from "lucide-react";
import { useState } from "react";
import Toolbar from "./components/Toolbar";
import SongTable from "./components/SongTable";
// import SongGallery from './components/SongGallery';

function App() {
  const [region, setRegion] = useState("en");
  const [seed, setSeed] = useState("69144534");
  const [likes, setLikes] = useState(0);
  const [viewMode, setViewMode] = useState("table");
  console.log(viewMode);

  return (
    <div className="min-h-screen bg-neutral-50/50 text-slate-900 font-sans pb-20">
      {/* nav */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <img src="/wave-sound.png" alt="icon" />
            </div>
            <h1 className="md:text-xl font-bold tracking-tight">Songpuff</h1>
          </div>

          <div className="flex border-2 border-blue-600 rounded-2xl">
            <button
              onClick={() => setViewMode("table")}
              className={`px-2 py-1.5 transition-colors rounded-l-xl ${viewMode === "table" ? "bg-blue-600 text-white" : "bg-white text-blue-600"} cursor-pointer`}
            >
              <Table
                color={viewMode === "table" ? "white" : "#193cb8"}
                size={14}
              />
            </button>
            <button
              onClick={() => setViewMode("gallery")}
              className={`px-2 py-1.5 transition-colors rounded-r-xl ${viewMode === "gallery" ? "bg-blue-600 text-white" : "bg-white text-blue-600"} cursor-pointer`}
            >
              <GalleryVertical
                color={viewMode === "gallery" ? "white" : "#193cb8"}
                size={14}
              />
            </button>
          </div>
        </div>
      </header>

      {/* main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 space-y-6">
        <Toolbar
          region={region}
          setRegion={setRegion}
          seed={seed}
          setSeed={setSeed}
          likes={likes}
          setLikes={setLikes}
        />

        <div className="bg-white shadow-sm min-h-[500px]">
          {viewMode === "table" ? (
            <SongTable region={region} seed={seed} likes={likes} />
          ) : (
            <div className="flex items-center justify-center h-[400px] text-slate-400">
              Gallery View (Infinite Scroll) coming next...
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
