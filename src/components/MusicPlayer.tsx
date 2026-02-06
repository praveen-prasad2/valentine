"use client";
import React, { useState, useRef, useEffect } from "react";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Using a soft, romantic piano track (royalty-free from Pixabay/Bensound)
    const audio = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3");
    audio.loop = true;
    audio.volume = 0; // Start at 0 for fade-in
    audioRef.current = audio;

    return () => {
      if (audio) {
        audio.pause();
        audio.src = "";
      }
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    };
  }, []);

  const fadeIn = () => {
    if (!audioRef.current) return;
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    
    audioRef.current.play();
    fadeIntervalRef.current = setInterval(() => {
      if (audioRef.current && audioRef.current.volume < 0.2) {
        audioRef.current.volume = Math.min(audioRef.current.volume + 0.02, 0.2);
      } else {
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      }
    }, 100);
  };

  const fadeOut = () => {
    if (!audioRef.current) return;
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    fadeIntervalRef.current = setInterval(() => {
      if (audioRef.current && audioRef.current.volume > 0.02) {
        audioRef.current.volume = Math.max(audioRef.current.volume - 0.02, 0);
      } else {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.volume = 0;
        }
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      }
    }, 100);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      fadeOut();
    } else {
      fadeIn();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] flex items-center justify-center">
      <button
        onClick={toggleMusic}
        className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg border-2 ${
          isPlaying 
            ? "bg-accent-pink border-white text-white animate-music-pulse" 
            : "bg-white/80 backdrop-blur-sm border-accent-pink/20 text-accent-pink/40 hover:text-accent-pink/60 hover:border-accent-pink/40"
        }`}
        aria-label={isPlaying ? "Mute Music" : "Play Music"}
      >
        {isPlaying ? (
          <span className="text-xl md:text-2xl">🎵</span>
        ) : (
          <span className="text-xl md:text-2xl">🔇</span>
        )}
      </button>
      
      {/* Tooltip for first-time users */}
      {!isPlaying && (
        <div className="absolute bottom-full right-0 mb-3 bg-white px-3 py-1 rounded-lg text-xs font-bold text-accent-pink shadow-md whitespace-nowrap animate-bounce pointer-events-none border border-pink-100">
          Play some magic? ✨
          <div className="absolute top-full right-5 w-2 h-2 bg-white border-b border-r border-pink-100 rotate-45 -mt-1"></div>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;

