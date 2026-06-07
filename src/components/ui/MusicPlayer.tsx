"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { HiVolumeUp, HiVolumeOff, HiPlay, HiPause } from "react-icons/hi";
import { weddingConfig } from "@/config/wedding";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio and load preferences
  useEffect(() => {
    const savedPlayStatus = localStorage.getItem("music_playing");
    const savedMuteStatus = localStorage.getItem("music_muted");

    const audio = new Audio(weddingConfig.music.url);
    audio.loop = true;
    audio.preload = "auto";
    audioRef.current = audio;

    if (savedMuteStatus === "true") {
      audio.muted = true;
      setIsMuted(true);
    }

    console.log("Audio file loading: ", weddingConfig.music.url);

    audio.addEventListener("canplaythrough", () => {
      console.log("Audio file loaded and ready to play");
    });

    audio.addEventListener("error", (e) => {
      console.error("Audio loading failed:", e);
    });

    // Handle global play trigger from OpeningScreen
    (window as any).startWeddingMusic = () => {
      handlePlay();
    };

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      delete (window as any).startWeddingMusic;
    };
  }, []);

  const handlePlay = useCallback(async () => {
    if (!audioRef.current) return;

    try {
      await audioRef.current.play();
      setIsPlaying(true);
      setShowOverlay(false);
      localStorage.setItem("music_playing", "true");
      console.log("Playback started successfully");
    } catch (error) {
      console.error("Playback failed or blocked:", error);
      setShowOverlay(true);
      setIsPlaying(false);
    }
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      localStorage.setItem("music_playing", "false");
    } else {
      handlePlay();
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    const newMuteStatus = !isMuted;
    audioRef.current.muted = newMuteStatus;
    setIsMuted(newMuteStatus);
    localStorage.setItem("music_muted", String(newMuteStatus));
  };

  return (
    <>
      {/* Autoplay blocked overlay */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-md"
          >
            <motion.button
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePlay}
              className="px-8 py-4 bg-[var(--color-burgundy-900)] text-[var(--color-gold-400)] border-2 border-[var(--color-gold-400)] rounded-full font-playfair text-xl flex items-center gap-3 shadow-2xl"
            >
              <HiPlay className="w-6 h-6" />
              Tap To Enter With Music
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Controls */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-3"
        >
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="p-4 rounded-full glass bg-[var(--color-burgundy-900)]/80 text-[var(--color-gold-400)] shadow-lg hover:bg-[var(--color-burgundy-900)] transition-all duration-300 border border-[var(--color-gold-500)]/30"
            aria-label={isPlaying ? "Pause Music" : "Play Music"}
          >
            {isPlaying ? (
              <HiPause className="w-6 h-6" />
            ) : (
              <HiPlay className="w-6 h-6 animate-pulse" />
            )}
          </button>

          {/* Mute/Unmute Button */}
          <button
            onClick={toggleMute}
            className="p-4 rounded-full glass bg-[var(--color-burgundy-900)]/80 text-[var(--color-gold-400)] shadow-lg hover:bg-[var(--color-burgundy-900)] transition-all duration-300 border border-[var(--color-gold-500)]/30"
            aria-label={isMuted ? "Unmute Music" : "Mute Music"}
          >
            {isMuted ? (
              <HiVolumeOff className="w-6 h-6" />
            ) : (
              <HiVolumeUp className="w-6 h-6" />
            )}
          </button>
        </motion.div>
      </div>
    </>
  );
}
