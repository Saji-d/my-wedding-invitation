"use client";

import { motion } from "framer-motion";
import { weddingConfig } from "@/config/wedding";
import { HiChevronDown } from "react-icons/hi";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/gallery/hero.jpeg"
          alt="Wedding Hero"
          fill
          className="object-cover brightness-[0.9] contrast-[1.1]"
          priority
          quality={100}
        />
        {/* Elegant Overlay */}
        <div 
          className="absolute inset-0 z-10" 
          style={{ 
            background: "linear-gradient(rgba(0,0,0,0.30), rgba(0,0,0,0.45))" 
          }}
        ></div>
      </div>

      <motion.div
        className="z-20 text-center space-y-8 md:space-y-12 max-w-4xl -mt-16 md:mt-0 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
      >
        <p 
          className="text-xs md:text-sm font-cormorant tracking-[0.4em] uppercase text-[var(--color-gold-400)] mb-8 md:mb-12"
          style={{ textShadow: "0 4px 16px rgba(0,0,0,0.6)" }}
        >
          You are invited
        </p>

        <h1 
          className="text-6xl md:text-9xl font-great-vibes text-[var(--color-ivory)] drop-shadow-2xl leading-tight"
          style={{ textShadow: "0 4px 24px rgba(0,0,0,0.7)" }}
        >
          {weddingConfig.couple.displayName1}
          <span className="block text-4xl md:text-7xl text-[var(--color-gold-400)] my-4 md:my-6">&</span>
          {weddingConfig.couple.displayName2}
        </h1>

        <div className="w-20 md:w-32 h-[1px] bg-[var(--color-gold-400)] mx-auto my-8 md:my-12 opacity-70"></div>

        <p 
          className="text-xl md:text-3xl font-playfair italic text-[var(--color-champagne)] leading-relaxed px-2 drop-shadow-lg"
          style={{ textShadow: "0 4px 16px rgba(0,0,0,0.6)" }}
        >
          Request the honor of your presence <br className="hidden md:block" /> at our wedding celebration.
        </p>
      </motion.div>

      <motion.div
        className="absolute bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 2,
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <span 
          className="text-xs tracking-widest uppercase mb-2 font-cormorant text-[var(--color-gold-400)]"
          style={{ textShadow: "0 4px 16px rgba(0,0,0,0.6)" }}
        >
          Scroll to discover
        </span>
        <HiChevronDown className="w-6 h-6 text-[var(--color-gold-400)]" />
      </motion.div>
    </section>
  );
}
