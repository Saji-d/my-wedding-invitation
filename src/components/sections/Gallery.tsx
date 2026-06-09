"use client";

import { motion } from "framer-motion";
import { weddingConfig } from "@/config/wedding";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards, Mousewheel, Keyboard } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

export default function Gallery() {
  // Dynamic image loading from weddingConfig which points to local /images/gallery/
  const images = weddingConfig.gallery;

  return (
    <section className="py-40 lg:py-24 bg-[var(--color-champagne)] dark:bg-[var(--color-burgundy-900)] relative z-10 border-y border-[var(--color-gold-400)]/10 overflow-hidden w-full">
      <div className="max-w-4xl mx-auto flex flex-col items-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-great-vibes text-[var(--color-burgundy-900)] dark:text-[var(--color-ivory)] mb-4">
            Moments Captured
          </h2>
          <div className="w-16 h-[1px] bg-[var(--color-gold-400)] mx-auto"></div>
        </motion.div>

        <div className="w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[350px] relative py-10 lg:py-12 lg:scale-[0.9] origin-center">
          <Swiper
            modules={[Autoplay, EffectCards, Mousewheel, Keyboard]}
            effect={"cards"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            mousewheel={{
              forceToAxis: true,
            }}
            keyboard={{
                enabled: true,
            }}
            cardsEffect={{
              slideShadows: true,
              rotate: true,
              perSlideOffset: 12,
              perSlideRotate: 2,
            }}
            className="w-full !overflow-visible"
          >
            {images.map((story, index) => (
              <SwiperSlide key={index} className="flex flex-col items-center !overflow-visible">
                <div className="bg-white p-3 pb-4 sm:p-4 sm:pb-5 lg:p-4 lg:pb-6 shadow-2xl rounded-sm border border-gray-100 w-full mb-8">
                  <div className="relative aspect-[3/4] w-full overflow-hidden mb-3 md:mb-4 shadow-inner bg-gray-50">
                    <Image
                      src={story.src}
                      alt={story.caption}
                      fill
                      className="object-cover"
                      priority={index === 0}
                      sizes="(max-width: 640px) 300px, (max-width: 1024px) 340px, 350px"
                    />
                  </div>
                  <div className="text-center px-2">
                    <p className="font-great-vibes text-2xl md:text-3xl text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis">
                      {story.caption}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
