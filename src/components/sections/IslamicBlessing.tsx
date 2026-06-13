"use client";

import { motion } from "framer-motion";
import { weddingConfig } from "@/config/wedding";

export default function IslamicBlessing() {
  return (
    <section className="h-[60vh] min-h-[400px] px-4 bg-[var(--color-champagne)] dark:bg-[var(--color-burgundy-900)] text-center relative overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="text-4xl md:text-6xl text-[var(--color-gold-500)] leading-relaxed mb-6 font-arabic" dir="rtl">
            {weddingConfig.islamicBlessing.arabic}
          </div>
          
          <div className="w-24 h-[1px] bg-[var(--color-gold-400)] mx-auto"></div>
          
          <p className="text-xl md:text-2xl font-playfair text-[var(--color-burgundy-800)] dark:text-[var(--color-champagne)]">
            "{weddingConfig.islamicBlessing.translation}"
          </p>
          
          <p className="font-cormorant text-gray-500 dark:text-gray-400 tracking-widest uppercase text-sm mt-4">
            Surah Ar-Rum [30:21]
          </p>
        </motion.div>
      </div>
    </section>
  );
}
