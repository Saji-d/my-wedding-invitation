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
    <section className="py-24 px-4 bg-[var(--color-champagne)] dark:bg-[var(--color-burgundy-900)] overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-great-vibes text-[var(--color-burgundy-900)] dark:text-[var(--color-ivory)] mb-4">
            Moments Captured
          </h2>
          <div className="w-16 h-[1px] bg-[var(--color-gold-400)] mx-auto"></div>
        </motion.div>

        <div className="w-full max-w-[300px] md:max-w-[420px] relative">
          <Swiper
            modules={[Autoplay, EffectCards, Mousewheel, Keyboard]}
            effect={"cards"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3500,
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
            className="w-full"
          >
            {images.map((story, index) => (
              <SwiperSlide key={index} className="flex flex-col items-center">
                <div className="bg-white p-3 pb-10 md:p-4 md:pb-14 shadow-2xl rounded-sm border border-gray-100 w-full mb-8">
                  <div className="relative aspect-[3/4] w-full overflow-hidden mb-4 md:mb-6 shadow-inner bg-gray-50">
                    <Image
                      src={story.src}
                      alt={story.caption}
                      fill
                      className="object-cover"
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw, 420px"
                    />
                  </div>
                  <div className="text-center px-2">
                    <p className="font-great-vibes text-2xl md:text-3xl text-gray-800">
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
