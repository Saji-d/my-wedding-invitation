"use client";

import { useState } from "react";
import OpeningScreen from "@/components/sections/OpeningScreen";
import BackgroundEffects from "@/components/layout/BackgroundEffects";
import MusicPlayer from "@/components/ui/MusicPlayer";
import Hero from "@/components/sections/Hero";
import LoveStory from "@/components/sections/LoveStory";
import PhotoMemories from "@/components/sections/PhotoMemories";
import Quotes from "@/components/sections/Quotes";
import Events from "@/components/sections/Events";
import Countdown from "@/components/sections/Countdown";
import Venue from "@/components/sections/Venue";
import GuestWishes from "@/components/sections/GuestWishes";
import Gallery from "@/components/sections/Gallery";
import RSVP from "@/components/sections/RSVP";
import IslamicBlessing from "@/components/sections/IslamicBlessing";
import Closing from "@/components/sections/Closing";
import { HiArrowUp } from "react-icons/hi";

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] relative overflow-hidden">
      <MusicPlayer />
      {!hasEntered && <OpeningScreen onComplete={() => setHasEntered(true)} />}

      {hasEntered && (
        <div className="opacity-0 animate-[fadeIn_1s_ease-in-out_forwards]">
          <BackgroundEffects />
          
          <Hero />
          <IslamicBlessing />
          <LoveStory />
          <PhotoMemories />
          <Quotes />
          <Events />
          <Countdown />
          <Venue />
          <Gallery />
          <GuestWishes />
          <RSVP />
          <Closing />

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="fixed bottom-24 right-6 z-50 p-4 rounded-full glass bg-[var(--color-burgundy-900)] text-[var(--color-champagne)] shadow-lg hover:bg-[var(--color-burgundy-800)] transition-all duration-300"
            aria-label="Scroll to top"
          >
            <HiArrowUp className="w-5 h-5" />
          </button>
        </div>
      )}
    </main>
  );
}
