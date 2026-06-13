"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const lastPoint = useRef<{ x: number, y: number } | null>(null);

  // Trigger celebration when revealed
  useEffect(() => {
    if (isRevealed) {
      triggerCelebration();
    }
  }, [isRevealed]);

  const triggerCelebration = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    
    // Luxury Palette
    const gold = "#D4AF37";
    const champagne = "#F7E7CE";
    const burgundy = "#800020";
    const darkGold = "#AA7C11";
    const colors = [gold, champagne, burgundy, darkGold];

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    // 1. Initial Grand Entrance (Side Fireworks)
    const fireSideBursts = () => {
      confetti({
        particleCount: 70,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: colors,
        startVelocity: 65,
        gravity: 0.8,
        scalar: 1.2,
        zIndex: 100,
      });
      confetti({
        particleCount: 70,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: colors,
        startVelocity: 65,
        gravity: 0.8,
        scalar: 1.2,
        zIndex: 100,
      });
    };

    // 2. Elegant Golden Fireworks (Top Area)
    const fireworkInterval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(fireworkInterval);
      }

      const particleCount = 40 * (timeLeft / duration);
      
      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        ticks: 120,
        origin: { 
          x: randomInRange(0.1, 0.9), 
          y: randomInRange(0.1, 0.4) 
        },
        colors: [gold, champagne, darkGold], // Pure metal colors for fireworks
        zIndex: 100,
        scalar: randomInRange(0.6, 0.9),
        drift: randomInRange(-0.5, 0.5),
        gravity: 0.7,
      });
    }, 400);

    // 3. Delicate Sparkle Shower (Burgundy Accents)
    const fireCentralShower = () => {
      confetti({
        particleCount: 120,
        spread: 160,
        origin: { y: 0.6 },
        colors: [burgundy, gold, champagne],
        gravity: 0.6,
        ticks: 200,
        scalar: 0.8,
        zIndex: 100,
      });
    };

    // Execution Sequence
    fireSideBursts();
    setTimeout(fireCentralShower, 1000);
    setTimeout(fireSideBursts, 2000); // Second wave of side bursts
    setTimeout(fireCentralShower, 3500); // Final gentle shower
  };

  useEffect(() => {
    initCanvas();
    window.addEventListener("resize", initCanvas);
    return () => window.removeEventListener("resize", initCanvas);
  }, []);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const container = canvas.parentElement;
    if (container) {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    }

    // Premium Metallic Foil Gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#D4AF37"); // Gold
    gradient.addColorStop(0.3, "#F7E7CE"); // Champagne
    gradient.addColorStop(0.5, "#AA7C11"); // Dark Gold
    gradient.addColorStop(0.7, "#D4AF37");
    gradient.addColorStop(1, "#800020"); // Hint of Burgundy
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle luxury texture
    ctx.globalAlpha = 0.1;
    for (let i = 0; i < 400; i++) {
        ctx.fillStyle = Math.random() > 0.5 ? "#fff" : "#000";
        ctx.beginPath();
        ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 0.5, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.globalAlpha = 1.0;

    // Elegant text overlay
    ctx.font = "italic 20px serif";
    ctx.fillStyle = "rgba(128, 0, 32, 0.5)";
    ctx.textAlign = "center";
    ctx.fillText("Scratch to Reveal our Special Day", canvas.width / 2, canvas.height / 2 + 10);
  };

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 60; // Wider soft brush

    if (lastPoint.current) {
        ctx.beginPath();
        ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
        ctx.lineTo(x, y);
        ctx.stroke();
    } else {
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, Math.PI * 2);
        ctx.fill();
    }

    lastPoint.current = { x, y };
    checkReveal();
  };

  const checkReveal = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Performance-optimized sampling
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;

    for (let i = 0; i < pixels.length; i += 100) { // Check every 25th pixel
      if (pixels[i + 3] === 0) {
        transparent++;
      }
    }

    const percent = (transparent / (pixels.length / 100)) * 100;
    
    // Reveal threshold: 40%
    if (percent > 40) {
      setIsRevealed(true);
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsScratching(true);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
        lastPoint.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        scratch(e.clientX - rect.left, e.clientY - rect.top);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isScratching) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
        scratch(e.clientX - rect.left, e.clientY - rect.top);
    }
  };

  const handlePointerUp = () => {
    setIsScratching(false);
    lastPoint.current = null;
  };

  return (
    <section className="py-24 px-4 bg-[var(--background)]">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-great-vibes text-[var(--color-ivory)] drop-shadow-[0_2px_10px_rgba(255,255,240,0.3)] font-medium mb-4">
            Save The Date
          </h2>
          <div className="w-16 h-[1px] bg-[var(--color-gold-400)]/50 mx-auto mb-6"></div>
        </motion.div>

        <div className="relative w-full max-w-xl mx-auto aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border-[4px] border-[var(--color-gold-400)] glass group">
          {/* Revealed Date Content */}
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-burgundy-900)] text-[var(--color-champagne)]">
            <div className="flex items-center justify-center divide-x divide-[var(--color-gold-500)]/30 w-full px-6">
              <div className="flex-1 flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold-400)] mb-1">Day</span>
                <span className="text-4xl md:text-6xl font-playfair font-bold">17</span>
              </div>
              <div className="flex-1 flex flex-col items-center px-4">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold-400)] mb-1">Month</span>
                <span className="text-4xl md:text-6xl font-playfair font-bold">JULY</span>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold-400)] mb-1">Year</span>
                <span className="text-4xl md:text-6xl font-playfair font-bold">2026</span>
              </div>
            </div>
          </div>

          {/* Scratchable Metallic Layer */}
          <AnimatePresence>
            {!isRevealed && (
              <motion.canvas
                ref={canvasRef}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-0 z-10 touch-none cursor-pointer"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
              />
            )}
          </AnimatePresence>
        </div>
        

      </div>
    </section>
  );
}
