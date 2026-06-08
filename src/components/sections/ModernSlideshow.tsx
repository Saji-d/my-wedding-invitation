"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { weddingConfig } from "@/config/wedding";
import { useSwipeable } from "react-swipeable";

const SLIDE_DURATION = 5000; // 5 seconds per slide

export default function ModernSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const images = weddingConfig.gallery.slice(0, 3); // Exactly 3 images

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setProgress(0);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setProgress(0);
  }, [images.length]);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(newProgress);

      if (elapsed >= SLIDE_DURATION) {
        nextSlide();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [currentIndex, nextSlide]);

  const handlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    trackMouse: true,
  });

  return (
    <section className="py-20 px-4 md:px-8 bg-[var(--background)]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative group overflow-hidden rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] glass border border-white/20 dark:border-white/5"
          {...handlers}
        >
          <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={images[currentIndex].src}
                  alt={`Wedding moment ${currentIndex + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 80vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30"></div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Luxury Pagination & Progress */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6 px-6 py-3 rounded-full glass-gold z-20">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                  setProgress(0);
                }}
                className="relative group flex items-center justify-center w-8 h-8"
                aria-label={`Go to slide ${idx + 1}`}
              >
                {/* Background circle */}
                <div className={`absolute inset-0 rounded-full border border-white/30 transition-all duration-300 ${
                  currentIndex === idx ? "scale-100 opacity-100" : "scale-75 opacity-50 group-hover:opacity-80"
                }`} />
                
                {/* Active Progress Ring */}
                {currentIndex === idx && (
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle
                      cx="16"
                      cy="16"
                      r="14"
                      fill="none"
                      stroke="var(--color-gold-400)"
                      strokeWidth="2"
                      strokeDasharray="88"
                      strokeDashoffset={88 - (88 * progress) / 100}
                      strokeLinecap="round"
                      className="transition-all duration-100 ease-linear"
                    />
                  </svg>
                )}

                {/* Center dot */}
                <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? "bg-[var(--color-gold-400)]" : "bg-white/70"
                }`} />
              </button>
            ))}
          </div>

          {/* Subtle side indicators for desktop */}
          <div className="absolute inset-y-0 left-0 w-24 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
             <div className="w-10 h-[1px] bg-white/30 rotate-90"></div>
          </div>
          <div className="absolute inset-y-0 right-0 w-24 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
             <div className="w-10 h-[1px] bg-white/30 rotate-90"></div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .glass-gold {
          background: rgba(74, 4, 4, 0.2);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(212, 175, 55, 0.3);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </section>
  );
}
