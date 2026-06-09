"use client";

import { motion } from "framer-motion";
import { weddingConfig } from "@/config/wedding";
import { HiHeart } from "react-icons/hi";
import Image from "next/image";

export default function LoveStory() {
  const images = weddingConfig.gallery.slice(1, 7); // Using first 6 gallery images

  return (
    <section className="py-24 px-4 relative bg-[var(--background)] z-10 border-t border-[var(--color-gold-400)]/5">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-great-vibes text-[var(--color-burgundy-900)] dark:text-[var(--color-ivory)] mb-4">
            Our Love Story
          </h2>
          <div className="w-16 h-[1px] bg-[var(--color-gold-400)] mx-auto"></div>
        </motion.div>

        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[1px] bg-gradient-to-b from-transparent via-[var(--color-gold-400)] to-transparent opacity-50"></div>

          {weddingConfig.timeline.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div 
                key={index} 
                className={`flex w-full items-center justify-center mb-16 lg:mb-24 last:mb-0 ${
                  isEven ? "flex-row" : "flex-row-reverse"
                }`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {/* Image Side */}
                <motion.div 
                  className="w-[42%] px-2 md:px-6"
                  initial={{ x: isEven ? -50 : 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-xl border border-[var(--color-gold-400)]/20">
                    <Image
                      src={images[index]?.src || "/images/gallery/hero.jpeg"}
                      alt={item.title}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                </motion.div>

                {/* Center Icon */}
                <div className="w-[16%] flex justify-center items-center z-10 relative shrink-0">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[var(--background)] border border-[var(--color-gold-400)] flex items-center justify-center shadow-lg relative">
                    <div className="absolute inset-1 rounded-full border border-dashed border-[var(--color-gold-400)] opacity-50 animate-[spin_15s_linear_infinite]"></div>
                     <HiHeart className="w-5 h-5 md:w-6 md:h-6 text-[var(--color-rosegold)] z-10" />
                  </div>
                </div>

                {/* Content Side */}
                <motion.div 
                  className="w-[42%] px-2 md:px-6"
                  initial={{ x: isEven ? 50 : -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <div className="w-full aspect-[16/9] glass p-2 md:p-8 rounded-2xl flex flex-col justify-center items-center border border-[var(--color-gold-400)]/20 shadow-xl text-center">
                    <div className="mb-1 md:mb-3">
                      <span className="inline-block px-2 py-0.5 md:px-4 md:py-1.5 bg-[var(--color-gold-400)]/10 text-[var(--color-gold-500)] text-[8px] md:text-sm font-playfair font-medium tracking-widest uppercase rounded-full border border-[var(--color-gold-400)]/30">
                        {item.date}
                      </span>
                    </div>
                    <h3 className="text-[10px] md:text-2xl font-playfair font-bold text-[var(--color-burgundy-800)] dark:text-[var(--color-champagne)] mb-1 md:mb-3 leading-tight uppercase">
                      {item.title}
                    </h3>
                    <p className="font-cormorant text-[8px] sm:text-xs md:text-lg text-gray-700 dark:text-gray-300 leading-tight md:leading-relaxed italic">
                      "{item.description}"
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Closing decorative element */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 flex flex-col items-center"
        >
          <div className="w-px h-16 bg-gradient-to-b from-[var(--color-gold-400)] to-transparent mb-4 opacity-50"></div>
          <HiHeart className="text-[var(--color-rosegold)] w-6 h-6 animate-pulse" />
        </motion.div>
      </div>
    </section>
  );
}
