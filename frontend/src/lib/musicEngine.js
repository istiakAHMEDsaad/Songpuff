import * as Tone from 'tone';
import seedrandom from 'seedrandom';

const SCALES = {
  major: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'],
  minor: ['C4', 'D4', 'Eb4', 'F4', 'G4', 'Ab4', 'Bb4', 'C5'],
  pentatonic: ['C4', 'Eb4', 'F4', 'G4', 'Bb4', 'C5']
};

let currentSynth = null;
let currentPart = null;

export const playProceduralSong = async (seed, song) => {
  await Tone.start();
  
  stopMusic();

  const combinedSeed = `${seed}-${song.title}-${song.artist}`;
  const rng = seedrandom(combinedSeed);
  const randomInt = (min, max) => Math.floor(rng() * (max - min + 1)) + min;
  const randomItem = (array) => array[randomInt(0, array.length - 1)];

  Tone.Transport.bpm.value = randomInt(80, 150);

  const oscillatorType = randomItem(['sine', 'square', 'triangle', 'sawtooth']);
  currentSynth = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: oscillatorType },
    envelope: { attack: 0.1, decay: 0.2, sustain: 0.5, release: 1.5 }
  });

  const reverb = new Tone.Reverb({ decay: 2, wet: 0.3 }).toDestination();
  const delay = new Tone.FeedbackDelay("8n", 0.2).connect(reverb);
  
  currentSynth.connect(delay);

  const scale = randomItem(Object.values(SCALES));
  const melody = [];
  
  for (let i = 0; i < 16; i++) {
    if (rng() > 0.3) {
      const note = randomItem(scale);
      const time = `0:${Math.floor(i / 4)}:${i % 4}`; 
      const duration = randomItem(["8n", "16n", "4n"]);
      
      melody.push({ time, note, duration });
    }
  }

  currentPart = new Tone.Part((time, value) => {
    currentSynth.triggerAttackRelease(value.note, value.duration, time);
  }, melody).start(0);

  currentPart.loop = true;
  currentPart.loopEnd = "1:0:0"; 

  Tone.Transport.start();

  setTimeout(() => {
    stopMusic();
  }, 8000);
};

export const stopMusic = () => {
  Tone.Transport.stop();
  Tone.Transport.cancel(0);
  if (currentPart) currentPart.dispose();
  if (currentSynth) {
    currentSynth.releaseAll();
    currentSynth.disconnect();
  }
};