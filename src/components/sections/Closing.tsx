"use client";

import { motion } from "framer-motion";
import { weddingConfig } from "@/config/wedding";
import { HiHeart } from "react-icons/hi";

export default function Closing() {
  return (
    <section className="py-24 md:py-32 px-4 bg-[var(--background)] text-center relative overflow-hidden min-h-screen flex flex-col justify-center z-10 border-t border-[var(--color-gold-400)]/5">
      <div className="max-w-4xl mx-auto relative z-10 space-y-10 md:space-y-12 lg:space-y-14 -top-10 md:top-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring" }}
        >
          <HiHeart className="w-14 md:w-10 h-14 md:h-10 text-[var(--color-rosegold)] mx-auto animate-pulse" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-base md:text-2xl font-playfair text-[var(--color-burgundy-800)] dark:text-[var(--color-champagne)] leading-relaxed"
        >
          Your presence is the greatest gift.
          <br />
          We look forward to celebrating with you.
        </motion.p>

        {/* Mobile Layout: Stacked Names */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col items-center gap-1 md:hidden"
        >
          <h2 className="text-8xl font-great-vibes text-[var(--color-gold-500)] drop-shadow-sm leading-none">
            {weddingConfig.couple.displayName1}
          </h2>
          <span className="text-5xl font-great-vibes text-[var(--color-rosegold)] opacity-80 my-2">
            &
          </span>
          <h2 className="text-8xl font-great-vibes text-[var(--color-gold-500)] drop-shadow-sm leading-none">
            {weddingConfig.couple.displayName2}
          </h2>
        </motion.div>

        {/* Desktop Layout: Single Line */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="hidden md:block text-7xl lg:text-8xl font-great-vibes text-[var(--color-gold-500)] drop-shadow-sm"
        >
          {weddingConfig.couple.displayName1} & {weddingConfig.couple.displayName2}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.9 }}
          className="pt-6 md:pt-10"
        >
          <div className="inline-flex flex-col items-center px-6 md:px-16 py-6 md:py-8 border-y border-[var(--color-gold-400)]/30 relative group space-y-2 md:space-y-3">
            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-[var(--color-gold-400)]/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            
            <p className="font-playfair text-lg md:text-xl tracking-[0.4em] text-[var(--color-gold-500)] mb-2 md:mb-4 uppercase">
                Friday
            </p>
            <p className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold tracking-[0.15em] pl-[0.15em] bg-gradient-to-b from-[#F7E7CE] via-[#D4AF37] to-[#AA7C11] bg-clip-text text-transparent drop-shadow-sm">
                17 JULY 2026
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
