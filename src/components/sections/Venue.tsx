"use client";

import { motion } from "framer-motion";
import { weddingConfig } from "@/config/wedding";
import { HiOutlineMap, HiOutlineLocationMarker } from "react-icons/hi";
import { useState, useEffect } from "react";
import Image from "next/image";

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
    <section className="min-h-screen flex items-center pt-24 pb-48 lg:pt-20 lg:pb-24 bg-[var(--color-champagne)] dark:bg-[var(--color-burgundy-900)] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 w-full mt-4 md:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-10 lg:mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-great-vibes text-[var(--color-burgundy-900)] dark:text-[var(--color-ivory)] mb-4">
            The Venue
          </h2>
          <div className="w-16 h-[1px] bg-[var(--color-gold-400)] mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 lg:space-y-8 text-center lg:text-left order-1 lg:order-1"
          >
            <div>
              <h3 className="text-2xl lg:text-4xl font-playfair text-[var(--color-burgundy-800)] dark:text-[var(--color-champagne)] mb-3">
                {weddingConfig.venue.name}
              </h3>
              <p className="font-cormorant text-lg lg:text-xl text-gray-700 dark:text-gray-300 flex items-center justify-center lg:justify-start gap-2">
                <HiOutlineLocationMarker className="text-[var(--color-gold-500)] flex-shrink-0" />
                <span>{weddingConfig.venue.address}</span>
              </p>
            </div>
            
            <div className="font-cormorant text-base lg:text-lg text-gray-600 dark:text-gray-400 space-y-4">
              <p>We can't wait to celebrate with you at this beautiful location.</p>
              <p>Ample parking is available for all guests.</p>
            </div>

            <button
              onClick={openDirections}
              className="inline-flex items-center gap-2 px-6 lg:px-8 py-3 bg-[var(--color-burgundy-800)] text-[var(--color-champagne)] rounded-full hover:bg-[var(--color-burgundy-900)] transition-colors duration-300 font-cormorant tracking-widest uppercase text-xs lg:text-sm shadow-xl"
            >
              <HiOutlineMap className="w-4 h-4 lg:w-5 lg:h-5" />
              Get Directions
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center w-full h-full order-2 lg:order-2"
          >
            <div className="relative w-full lg:w-[85%] aspect-[4/3] lg:aspect-square rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl border border-[var(--color-gold-400)]/20 group">
              <Image
                src="/images/gallery/meghboroni.jpeg"
                alt="Venue"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <p className="text-[var(--color-ivory)] font-playfair text-xl">{weddingConfig.venue.name}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
