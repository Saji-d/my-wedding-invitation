"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingConfig } from "@/config/wedding";

interface OpeningScreenProps {
  onComplete: () => void;
}

export default function OpeningScreen({ onComplete }: OpeningScreenProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleEnter = () => {
    // Attempt to play music
    if ((window as any).startWeddingMusic) {
      (window as any).startWeddingMusic();
    }
    setIsOpen(true);
    setTimeout(onComplete, 4000); // Allow time for exit animation and reveal
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--background)] text-[var(--foreground)]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
             <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-gold-400)] opacity-10 blur-[100px] rounded-full mix-blend-screen" />
             <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--color-rosegold)] opacity-10 blur-[100px] rounded-full mix-blend-screen" />
          </div>

          <motion.div
            className="z-10 text-center space-y-8 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <h2 className="text-2xl md:text-3xl font-playfair tracking-widest text-[var(--color-gold-500)]">
              بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
            </h2>
            
            <h1 className="text-6xl md:text-8xl font-great-vibes my-8 leading-tight">
              {weddingConfig.couple.displayName1}
              <br />
              <span className="text-4xl md:text-5xl text-[var(--color-rosegold)]">&</span>
              <br />
              {weddingConfig.couple.displayName2}
            </h1>

            <p className="text-xl md:text-2xl font-cormorant tracking-widest uppercase">
              {weddingConfig.couple.togetherForever}
            </p>

            <p className="text-lg md:text-xl font-cormorant">
              {weddingConfig.events.mehendi.displayDate.split(" ")[0]}–{weddingConfig.events.wedding.displayDate}
            </p>

            <motion.button
              onClick={handleEnter}
              className="mt-12 px-8 py-3 border border-[var(--color-gold-400)] text-[var(--color-gold-500)] hover:bg-[var(--color-gold-400)] hover:text-white transition-all duration-500 tracking-widest font-cormorant uppercase text-sm glass"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Tap To Enter Invitation
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
