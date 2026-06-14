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
    const duration = 4 * 1000;
    const animationEnd = Date.now() + duration;
    
    // Luxury Palette
    const gold = "#D4AF37";
    const champagne = "#F7E7CE";
    const burgundy = "#800020";
    const darkGold = "#AA7C11";
    const colors = [gold, champagne, burgundy, darkGold];

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    // 1. Initial Side Fireworks (0.2s launch, 0.5s explosion feel)
    const fireSideBursts = () => {
      // Left side
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: colors,
        startVelocity: 70,
        gravity: 1.2,
        scalar: 1.2,
        zIndex: 100,
      });
      // Right side
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: colors,
        startVelocity: 70,
        gravity: 1.2,
        scalar: 1.2,
        zIndex: 100,
      });
    };

    // 2. Elegant Golden Fireworks (Top Area - 0.5s onwards)
    const fireGoldenFireworks = () => {
      const interval: any = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        confetti({
          particleCount: 40,
          startVelocity: 30,
          spread: 360,
          ticks: 100,
          origin: { 
            x: randomInRange(0.1, 0.9), 
            y: randomInRange(0.1, 0.4) 
          },
          colors: [gold, champagne, darkGold],
          zIndex: 100,
          scalar: randomInRange(0.6, 1),
          gravity: 0.8,
        });
      }, 600);
    };

    // 3. Subtle celebration particles around the revealed date (1s)
    const fireCenterSparkles = () => {
      confetti({
        particleCount: 150,
        spread: 160,
        origin: { y: 0.5, x: 0.5 },
        colors: [gold, champagne, burgundy],
        gravity: 0.7,
        ticks: 200,
        scalar: 0.9,
        zIndex: 100,
        startVelocity: 35,
      });
    };

    // Execution Sequence per requirements
    // 0.2s: Side fireworks launch
    setTimeout(fireSideBursts, 200);
    
    // 0.5s: Golden fireworks start in top area
    setTimeout(fireGoldenFireworks, 500);
    
    // 1.0s: Confetti and sparkles appear from center
    setTimeout(fireCenterSparkles, 1000);

    // Final elegant burst
    setTimeout(fireSideBursts, 2500);
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
    ctx.globalAlpha = 0.15;
    for (let i = 0; i < 500; i++) {
        ctx.fillStyle = Math.random() > 0.5 ? "#fff" : "#000";
        ctx.beginPath();
        ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 0.7, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.globalAlpha = 1.0;

    // Elegant text overlay
    ctx.font = "italic 22px serif";
    ctx.fillStyle = "rgba(128, 0, 32, 0.6)";
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

    for (let i = 0; i < pixels.length; i += 100) { 
      if (pixels[i + 3] === 0) {
        transparent++;
      }
    }

    const percent = (transparent / (pixels.length / 100)) * 100;
    
    // Reveal threshold: 45% for a better experience
    if (percent > 45) {
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
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-burgundy-900)] text-[var(--color-champagne)] overflow-hidden">
            {/* Animated Shine Effect */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={isRevealed ? { x: "200%" } : { x: "-100%" }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] pointer-events-none"
            />
            
            <div className="flex items-center justify-center divide-x divide-[var(--color-gold-500)]/30 w-full px-6 relative z-10">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isRevealed ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex-1 flex flex-col items-center"
              >
                <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold-400)] mb-1">Day</span>
                <span className="text-4xl md:text-6xl font-playfair font-bold">17</span>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isRevealed ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex-1 flex flex-col items-center px-4"
              >
                <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold-400)] mb-1">Month</span>
                <span className="text-4xl md:text-6xl font-playfair font-bold">JULY</span>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isRevealed ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex-1 flex flex-col items-center"
              >
                <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold-400)] mb-1">Year</span>
                <span className="text-4xl md:text-6xl font-playfair font-bold">2026</span>
              </motion.div>
            </div>
          </div>

          {/* Scratchable Metallic Layer */}
          <AnimatePresence>
            {!isRevealed && (
              <motion.canvas
                ref={canvasRef}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                transition={{ duration: 1, ease: "easeInOut" }}
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
