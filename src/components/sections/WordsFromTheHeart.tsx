"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const quotes = [
  "Every love story is beautiful, but ours is my favorite.",
  "In all the world, there is no heart for me like yours.",
  "You are my today and all of my tomorrows.",
  "I look at you and see the rest of my life in front of my eyes.",
  "The best thing to hold onto in life is each other.",
  "You are my safe place and my sweetest comfort.",
  "I still fall for you every single day.",
  "Forever isn't long enough when I'm with you.",
  "You are the chapter I never want to end.",
  "Every moment with you feels like a beautiful beginning.",
];

export default function WordsFromTheHeart() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[45vh] min-h-[350px] flex flex-col items-center justify-center overflow-hidden bg-[var(--color-burgundy-900)] px-6 py-12 border-y border-[var(--color-gold-400)]/20">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full border border-[var(--color-gold-400)] blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full border border-[var(--color-gold-400)] blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-center z-10 w-full max-w-4xl mx-auto flex flex-col items-center"
      >
        <h2 className="text-3xl md:text-4xl font-great-vibes text-[var(--color-gold-400)] mb-8 tracking-wider">
          Words From The Heart
        </h2>

        <div className="relative w-full flex flex-col items-center">
          <FaQuoteLeft className="text-[var(--color-gold-400)]/30 text-4xl md:text-5xl absolute -top-10 -left-2 md:-left-8" />
          
          <div className="h-32 md:h-40 flex items-center justify-center w-full px-4">
            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="text-2xl md:text-4xl lg:text-5xl font-great-vibes text-[var(--color-ivory)] text-center leading-relaxed drop-shadow-lg"
              >
                {quotes[index]}
              </motion.p>
            </AnimatePresence>
          </div>

          <FaQuoteRight className="text-[var(--color-gold-400)]/30 text-4xl md:text-5xl absolute -bottom-10 -right-2 md:-right-8" />
        </div>

        {/* Carousel Indicators */}
        <div className="flex gap-2 mt-12">
          {quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1.5 transition-all duration-500 rounded-full ${
                i === index ? "w-8 bg-[var(--color-gold-400)]" : "w-2 bg-[var(--color-gold-400)]/30"
              }`}
              aria-label={`Go to quote ${i + 1}`}
            />
          ))}
        </div>
      </motion.div>

      {/* Luxury Border Accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-gold-400)]/50 to-transparent"></div>
    </section>
  );
}
