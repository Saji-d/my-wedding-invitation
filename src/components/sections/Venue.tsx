"use client";

import { motion } from "framer-motion";
import { weddingConfig } from "@/config/wedding";
import { HiOutlineMap, HiOutlineLocationMarker } from "react-icons/hi";
import { useState, useEffect } from "react";

export default function Venue() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const openDirections = () => {
    const { googleMapsUrl } = weddingConfig.venue;
    if (googleMapsUrl) {
      window.open(googleMapsUrl, "_blank");
    } else {
      const { lat, lng } = weddingConfig.venue.coordinates;
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, "_blank");
    }
  };

  return (
    <section className="py-24 px-4 bg-[var(--color-champagne)] dark:bg-[var(--color-burgundy-900)] relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-great-vibes text-[var(--color-burgundy-900)] dark:text-[var(--color-ivory)] mb-4">
            Venue
          </h2>
          <div className="w-16 h-[1px] bg-[var(--color-gold-400)] mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-center lg:text-left"
          >
            <div>
              <h3 className="text-3xl font-playfair text-[var(--color-burgundy-800)] dark:text-[var(--color-champagne)] mb-2">
                {weddingConfig.venue.name}
              </h3>
              <p className="font-cormorant text-xl text-gray-700 dark:text-gray-300 flex items-center justify-center lg:justify-start gap-2">
                <HiOutlineLocationMarker className="text-[var(--color-gold-500)]" />
                {weddingConfig.venue.address}
              </p>
            </div>
            
            <p className="font-cormorant text-lg text-gray-600 dark:text-gray-400">
              We can't wait to celebrate with you at this beautiful location. Ample parking is available for all guests.
            </p>

            <button
              onClick={openDirections}
              className="inline-flex items-center gap-2 px-8 py-3 bg-[var(--color-burgundy-800)] text-[var(--color-champagne)] rounded-full hover:bg-[var(--color-burgundy-900)] transition-colors duration-300 font-cormorant tracking-widest uppercase text-sm shadow-xl"
            >
              <HiOutlineMap className="w-5 h-5" />
              Get Directions
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full h-[400px] rounded-3xl overflow-hidden shadow-2xl glass border-2 border-[var(--color-gold-400)]/30"
          >
              <div className="w-full h-full flex flex-col items-center justify-center bg-[var(--color-ivory)] dark:bg-black/50 text-[var(--color-burgundy-800)] dark:text-[var(--color-champagne)]">
                <HiOutlineMap className="w-24 h-24 mb-6 opacity-30 text-[var(--color-gold-400)]" />
                <p className="font-playfair text-2xl mb-2">{weddingConfig.venue.name}</p>
                <button 
                  onClick={openDirections}
                  className="font-cormorant text-sm uppercase tracking-widest text-[var(--color-gold-500)] hover:text-[var(--color-gold-400)] transition-colors underline underline-offset-4"
                >
                  View on Google Maps
                </button>
              </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
