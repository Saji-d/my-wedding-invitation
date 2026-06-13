"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingConfig } from "@/config/wedding";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";

export default function Quotes() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % weddingConfig.quotes.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 px-4 relative overflow-hidden bg-[var(--color-burgundy-900)] text-[var(--color-champagne)]">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
      
      <div className="max-w-5xl mx-auto relative z-10 text-center flex flex-col justify-center items-center">
        {/* Section Title */}
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-xl md:text-2xl font-playfair italic text-[var(--color-gold-400)] mb-12 tracking-widest"
        >
          Words From The Heart
        </motion.h2>

        <div className="relative w-full flex flex-col items-center">
          <ImQuotesLeft className="text-3xl md:text-4xl text-[var(--color-gold-400)] opacity-50 mb-6" />
          
          {/* Quote Area with Flexible Layout */}
          <div className="grid place-items-center w-full min-h-[80px] md:min-h-[100px] px-4 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="text-lg md:text-xl lg:text-2xl font-playfair text-[var(--color-champagne)] text-center lg:whitespace-nowrap leading-relaxed"
              >
                "{weddingConfig.quotes[currentIndex]}"
              </motion.p>
            </AnimatePresence>
          </div>

          <ImQuotesRight className="text-3xl md:text-4xl text-[var(--color-gold-400)] opacity-50 mt-6" />
        </div>

        {/* Carousel Indicators */}
        <div className="flex gap-2 mt-12">
          {weddingConfig.quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1 transition-all duration-500 rounded-full ${
                i === currentIndex ? "w-6 bg-[var(--color-gold-400)]" : "w-2 bg-[var(--color-gold-400)]/30"
              }`}
              aria-label={`Go to quote ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Luxury Border Accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-gold-400)]/30 to-transparent"></div>
    </section>
  );
}
