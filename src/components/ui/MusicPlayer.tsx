"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { weddingConfig } from "@/config/wedding";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio and load preferences
  useEffect(() => {
    const savedMuteStatus = localStorage.getItem("music_muted");

    const audio = new Audio(weddingConfig.music.url);
    audio.loop = true;
    audio.preload = "auto";
    audioRef.current = audio;

    if (savedMuteStatus === "true") {
      audio.muted = true;
      setIsMuted(true);
    }

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
    } catch (error) {
      console.error("Playback failed or blocked:", error);
      setIsPlaying(false);
    }
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    const newMuteStatus = !isMuted;
    audioRef.current.muted = newMuteStatus;
    setIsMuted(newMuteStatus);
    localStorage.setItem("music_muted", String(newMuteStatus));
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative group">
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleMute}
          className={`
            p-2.5 rounded-full backdrop-blur-md border shadow-md transition-all duration-300
            ${isMuted 
              ? "bg-black/20 border-white/5 text-[var(--color-champagne)]/40 hover:text-[var(--color-champagne)]/60 hover:bg-black/30" 
              : "bg-[var(--color-burgundy-900)]/80 border-[var(--color-gold-400)]/40 text-[var(--color-gold-400)] hover:bg-[var(--color-burgundy-900)]"
            }
          `}
          aria-label={isMuted ? "Unmute Music" : "Mute Music"}
        >
          {isMuted ? (
            <HiVolumeOff className="w-5 h-5" />
          ) : (
            <HiVolumeUp className="w-5 h-5" />
          )}
        </motion.button>
      </div>
    </div>
  );
}
