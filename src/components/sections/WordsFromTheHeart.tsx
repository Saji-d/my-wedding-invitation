"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const quotes = [

  "Some souls are destined to find their way together.",
  "Love grows strongest through faith and kindness.",
  "The finest journeys in life are shared hand in hand.",
  "Every chapter shines brighter with love.",
  "A beautiful beginning to a lifetime of memories.",
  "Little moments create the greatest memories.",
  "Two hearts united with countless blessings ahead."

];

export default function WordsFromTheHeart() {
  const [index, setIndex] = useState(0);

  // Auto-rotation with manual reset logic
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);
    
    // Clearing the interval on every index change effectively "restarts" the timer
    return () => clearInterval(timer);
  }, [index]);

  const handleDotClick = (i: number) => {
    setIndex(i);
  };

  return (
    <section className="relative h-[45vh] min-h-[350px] flex flex-col items-center justify-center overflow-hidden bg-[var(--color-burgundy-900)] border-y border-[var(--color-gold-400)]/20">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full border border-[var(--color-gold-400)] blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full border border-[var(--color-gold-400)] blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center text-center w-full px-4">
        {/* Section Title - Increased size and elegant gap */}
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-xl md:text-2xl font-playfair italic font-medium text-[var(--color-gold-400)] mb-8 md:mb-10 tracking-[0.2em] uppercase"
        >
          Words From The Heart
        </motion.h2>

        {/* Quote Container with FIXED Quotation Marks */}
        <div className="relative w-full max-w-[320px] sm:max-w-lg md:max-w-2xl flex flex-col items-center">
          <FaQuoteLeft className="text-[var(--color-gold-400)]/20 text-[10px] md:text-xs absolute -top-4 left-0 md:left-4" />
          
          <div className="w-full flex items-center justify-center min-h-[60px] md:min-h-[80px] px-8">
            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="text-lg md:text-xl lg:text-2xl font-playfair text-[var(--color-champagne)] text-center lg:whitespace-nowrap leading-relaxed tracking-wide"
              >
                "{quotes[index]}"
              </motion.p>
            </AnimatePresence>
          </div>

          <FaQuoteRight className="text-[var(--color-gold-400)]/20 text-[10px] md:text-xs absolute -bottom-4 right-0 md:right-4" />
        </div>

        {/* Interactive Carousel Indicators */}
        <div className="flex gap-2.5 mt-8 md:mt-10 justify-center">
          {quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              className={`w-1 h-1 rounded-full cursor-pointer transition-all duration-300 hover:scale-125 ${
                i === index 
                  ? "bg-[var(--color-gold-400)] scale-125" 
                  : "bg-[var(--color-gold-400)]/30 hover:bg-[var(--color-gold-400)]/60"
              }`}
              aria-label={`Go to quote ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Luxury Border Accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-gold-400)]/40 to-transparent"></div>
    </section>
  );
}
