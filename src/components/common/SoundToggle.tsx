import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { cinematicAudio } from '../../lib/audio';

export const SoundToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggle = () => {
    const active = cinematicAudio.toggle();
    setIsPlaying(active);
  };

  return (
    <button
      onClick={handleToggle}
      className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 ${
        isPlaying
          ? 'bg-red-950/40 border-cinema-red/60 text-white shadow-[0_0_15px_rgba(229,9,20,0.35)]'
          : 'bg-black/60 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
      }`}
      title={isPlaying ? 'Mute cinematic ambient audio' : 'Play cinematic ambient audio'}
      aria-label="Toggle cinematic audio"
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-cinema-red animate-pulse" />
          <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-300">Sound ON</span>
          <div className="flex items-center gap-0.5 ml-1 h-3">
            <span className="w-0.5 h-2 bg-cinema-red animate-[pulse_0.8s_ease-in-out_infinite]" />
            <span className="w-0.5 h-3 bg-cinema-red animate-[pulse_0.6s_ease-in-out_infinite_0.2s]" />
            <span className="w-0.5 h-1.5 bg-cinema-red animate-[pulse_1s_ease-in-out_infinite_0.4s]" />
          </div>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5" />
          <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 group-hover:text-neutral-200">
            Audio Muted
          </span>
        </>
      )}
    </button>
  );
};
