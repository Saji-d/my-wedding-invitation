"use client";

import { motion } from "framer-motion";
import { weddingConfig } from "@/config/wedding";
import { HiHeart } from "react-icons/hi";

export default function LoveStory() {
  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-great-vibes text-[var(--color-burgundy-900)] dark:text-[var(--color-ivory)] mb-4">
            Our Love Story
          </h2>
          <div className="w-16 h-[1px] bg-[var(--color-gold-400)] mx-auto"></div>
        </motion.div>

        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[1px] bg-gradient-to-b from-transparent via-[var(--color-gold-400)] to-transparent opacity-50"></div>

          {weddingConfig.timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`flex items-center justify-between w-full mb-12 ${
                index % 2 === 0 ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div className="w-5/12"></div>
              
              <div className="w-2/12 flex justify-center z-10 relative">
                <div className="w-10 h-10 rounded-full bg-[var(--background)] border border-[var(--color-gold-400)] flex items-center justify-center shadow-lg">
                   <HiHeart className="w-5 h-5 text-[var(--color-rosegold)]" />
                </div>
              </div>

              <div className={`w-5/12 glass p-6 rounded-2xl relative ${
                index % 2 === 0 ? "text-right" : "text-left"
              }`}>
                <h3 className="text-2xl font-playfair text-[var(--color-burgundy-800)] dark:text-[var(--color-champagne)] mb-2">
                  {item.title}
                </h3>
                <span className="inline-block px-3 py-1 bg-[var(--color-gold-400)] text-white text-xs font-cormorant tracking-widest uppercase rounded-full mb-3">
                  {item.date}
                </span>
                <p className="font-cormorant text-lg text-opacity-80">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
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
