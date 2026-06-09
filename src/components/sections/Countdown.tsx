"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { weddingConfig } from "@/config/wedding";
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from "date-fns";

export default function Countdown() {
  const targetDate = new Date(weddingConfig.events.wedding.date);
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      if (now >= targetDate) return;

      setTimeLeft({
        days: differenceInDays(targetDate, now),
        hours: differenceInHours(targetDate, now) % 24,
        minutes: differenceInMinutes(targetDate, now) % 60,
        seconds: differenceInSeconds(targetDate, now) % 60,
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const timeBlocks = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section className="py-24 px-4 bg-[var(--background)]">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2 
          className="text-4xl md:text-5xl font-playfair text-[var(--color-burgundy-900)] dark:text-[var(--color-champagne)] mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          Counting Down to Forever
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {timeBlocks.map((block, index) => (
            <motion.div
              key={block.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-[var(--color-gold-400)] flex flex-col items-center justify-center glass bg-white/50 dark:bg-black/20 relative"
            >
              {/* Inner ring animation */}
              <div className="absolute inset-1 rounded-full border border-dashed border-[var(--color-gold-500)] opacity-50 animate-[spin_20s_linear_infinite]"></div>
              
              <span className="text-4xl md:text-6xl font-playfair font-bold text-[var(--color-burgundy-800)] dark:text-[var(--color-ivory)] drop-shadow-sm">
                {block.value.toString().padStart(2, "0")}
              </span>
              <span className="text-xs tracking-widest uppercase font-cormorant text-[var(--color-gold-500)] mt-1">
                {block.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
