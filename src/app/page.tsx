"use client";

import { useState } from "react";
import OpeningScreen from "@/components/sections/OpeningScreen";
import BackgroundEffects from "@/components/layout/BackgroundEffects";
import MusicPlayer from "@/components/ui/MusicPlayer";
import Hero from "@/components/sections/Hero";
import LoveStory from "@/components/sections/LoveStory";
import Events from "@/components/sections/Events";
import Countdown from "@/components/sections/Countdown";
import Venue from "@/components/sections/Venue";
import Gallery from "@/components/sections/Gallery";
import ScratchCard from "@/components/sections/ScratchCard";
import ModernSlideshow from "@/components/sections/ModernSlideshow";
import GuestWishes from "@/components/sections/GuestWishes";
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
        <div className="opacity-0 animate-[fadeIn_0.5s_ease-in-out_forwards]">
          <BackgroundEffects />
          
          <Hero />
          <IslamicBlessing />
          <ScratchCard />
          <ModernSlideshow />
          <LoveStory />
          <Countdown />
          <Events />
          <Venue />
          <Gallery />
          <GuestWishes />
          <RSVP />
          <Closing />

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="fixed bottom-20 right-6 z-50 p-3 rounded-full glass bg-[var(--color-burgundy-900)] text-[var(--color-champagne)] shadow-lg hover:bg-[var(--color-burgundy-800)] opacity-20 hover:opacity-80 transition-all duration-300 border border-white/10"
            aria-label="Scroll to top"
          >
            <HiArrowUp className="w-4 h-4" />
          </button>
        </div>
      )}
    </main>
  );
}
