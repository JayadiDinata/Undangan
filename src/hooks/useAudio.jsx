import React, { createContext, useContext, useRef, useState, useCallback, useEffect } from 'react';

const AudioContext = createContext(null);

export function AudioProvider({ children }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio('/img/wedding-music.mp3');
    audio.loop = true;
    audioRef.current = audio;
    return () => { audio.pause(); audio.src = ''; };
  }, []);

  const handleFirstInteraction = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || isPlaying) return;
    audio.play().then(() => setIsPlaying(true)).catch(() => {});
  }, [isPlaying]);

  useEffect(() => {
    document.addEventListener('click', handleFirstInteraction, { once: true });
    return () => document.removeEventListener('click', handleFirstInteraction);
  }, [handleFirstInteraction]);

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  return (
    <AudioContext.Provider value={{ isPlaying, toggleMusic }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  return useContext(AudioContext);
}
