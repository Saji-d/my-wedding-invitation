"use client";

import { motion } from "framer-motion";
import { weddingConfig } from "@/config/wedding";
import { HiOutlineClock, HiOutlineCalendar } from "react-icons/hi";
import { GiCastle } from "react-icons/gi";

export default function Events() {
  const wedding = weddingConfig.events.wedding;

  return (
    <section className="py-16 lg:py-12 px-4 bg-[var(--background)] relative z-10 border-t border-[var(--color-gold-400)]/5 overflow-visible">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-6"
        >
          <h2 className="text-5xl md:text-6xl font-great-vibes text-[var(--color-ivory)] drop-shadow-[0_2px_10px_rgba(255,255,240,0.3)] font-medium mb-4 pt-2">
            The Celebration
          </h2>
          <div className="w-16 h-[1px] bg-[var(--color-gold-400)]/50 mx-auto mb-4"></div>
          <p className="font-cormorant text-xl text-gray-600 dark:text-gray-400 uppercase tracking-[0.2em]">
            Join us for our special day
          </p>
        </motion.div>

        <motion.div 
          className="flex justify-center mb-4 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          {/* Luxury Floral Ornament */}
          <div className="relative group scale-[0.6] md:scale-75 origin-center -my-4">
            <motion.div
              animate={{ 
                rotate: 360,
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="luxuryGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#AA7C11" />
                    <stop offset="50%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#AA7C11" />
                  </linearGradient>
                </defs>
                {/* Intricate Filigree/Floral Pattern */}
                <path d="M50 20 C55 10, 65 10, 70 20 S 60 35, 50 45 C40 35, 30 30, 30 20 S 45 10, 50 20" stroke="url(#luxuryGoldGradient)" strokeWidth="1.5" fill="none" />
                <path d="M50 80 C45 90, 35 90, 30 80 S 40 65, 50 55 C60 65, 70 70, 70 80 S 55 90, 50 80" stroke="url(#luxuryGoldGradient)" strokeWidth="1.5" fill="none" />
                <path d="M20 50 C10 45, 10 35, 20 30 S 35 40, 45 50 C35 60, 30 70, 20 70 S 10 55, 20 50" stroke="url(#luxuryGoldGradient)" strokeWidth="1.5" fill="none" />
                <path d="M80 50 C90 55, 90 65, 80 70 S 65 60, 55 50 C65 40, 70 30, 80 30 S 90 45, 80 50" stroke="url(#luxuryGoldGradient)" strokeWidth="1.5" fill="none" />
                {/* Center Core */}
                <circle cx="50" cy="50" r="6" fill="url(#luxuryGoldGradient)" />
                <circle cx="50" cy="50" r="12" stroke="url(#luxuryGoldGradient)" strokeWidth="0.5" opacity="0.5" />
              </svg>
            </motion.div>
            {/* Soft Glow Pulse */}
            <motion.div 
              className="absolute inset-0 rounded-full bg-[var(--color-gold-400)]/15 blur-xl"
              animate={{ 
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

        <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full max-w-2xl glass p-4 sm:p-5 md:p-8 rounded-3xl border border-[var(--color-gold-400)]/20 shadow-2xl relative group overflow-hidden text-center"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-gold-400)] opacity-5 blur-3xl -mr-16 -mt-16 group-hover:opacity-10 transition-opacity" />
              
              <h3 className="text-3xl md:text-4xl font-playfair text-[var(--color-burgundy-800)] dark:text-[var(--color-champagne)] mb-4">
                {wedding.name}
              </h3>

              <div className="space-y-3 flex flex-col items-center">
                <div className="flex items-center gap-4 text-xl md:text-2xl font-playfair font-medium tracking-wide text-gray-700 dark:text-gray-300">
                  <HiOutlineCalendar className="text-[var(--color-gold-500)] w-6 h-6" />
                  <span>{wedding.displayDate}</span>
                </div>
                
                <div className="flex items-center gap-4 text-xl md:text-2xl font-playfair font-medium tracking-wide text-gray-700 dark:text-gray-300">
                  <HiOutlineClock className="text-[var(--color-gold-500)] w-6 h-6" />
                  <span>7:00 PM onwards</span>
                </div>

                <div className="flex flex-col items-center max-w-md mt-4">
                  <div className="mb-2 text-[var(--color-gold-500)]">
                    <GiCastle className="w-10 h-10 md:w-12 md:h-12 drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]" />
                  </div>
                  <div className="mb-1">
                    <span className="text-xl md:text-2xl font-playfair font-medium text-gray-800 dark:text-[var(--color-champagne)] block">
                      {weddingConfig.venue.name}
                    </span>
                    <span className="text-base md:text-lg font-playfair text-gray-600 dark:text-[var(--color-champagne)]/70 block mt-0.5">
                      ({(weddingConfig.venue as any).nameBn})
                    </span>
                  </div>
                  <span className="text-sm md:text-base font-cormorant text-gray-500 dark:text-gray-400 tracking-wide">
                    House 6, Road 5, Block A, Mirpur, Dhaka 1216
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-[var(--color-gold-400)]/20">
                <p className="font-playfair italic text-[var(--color-gold-500)] text-[0.88rem] sm:text-base md:text-lg whitespace-nowrap">
                  Dinner will be served following the ceremony
                </p>
              </div>
            </motion.div>
        </div>
      </div>
    </section>
  );
}
