"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function BackgroundEffects() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) return;

      const petalCount = 45;
      
      for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement("div");
        petal.className = "petal";
        
        container.appendChild(petal);

        // Initial setup - ALWAYS safely above viewport, staggered vertically
        gsap.set(petal, {
          x: Math.random() * window.innerWidth,
          y: -150 - (Math.random() * window.innerHeight * 2),
          rotation: Math.random() * 360,
          scale: 0.5 + Math.random() * 0.7,
          opacity: 0.2 + Math.random() * 0.4,
        });

        const animatePetal = (p: HTMLElement) => {
            const duration = 15 + Math.random() * 10;
            const currentWidth = window.innerWidth;
            const currentHeight = window.innerHeight;
            
            // True rainfall effect
            gsap.to(p, {
                y: currentHeight + 150, // fall safely past bottom
                x: `+=${-15 + Math.random() * 30}`, // very minimal horizontal sway
                rotation: `+=${180 + Math.random() * 180}`,
                duration: duration,
                ease: "none",
                onComplete: () => {
                    // Reset to just above viewport, random X
                    gsap.set(p, { 
                        y: -150 - (Math.random() * 100), 
                        x: Math.random() * currentWidth 
                    });
                    animatePetal(p);
                }
            });
        };

        // Start animation immediately
        animatePetal(petal);
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Global Petal Layer - Fixed to viewport */}
      <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
        <div ref={containerRef} className="absolute inset-0" />
      </div>

      <style jsx global>{`
        .petal {
          position: absolute;
          width: 14px;
          height: 14px;
          background-color: #b76e79;
          border-radius: 14px 0 14px 0;
          opacity: 0.5;
          box-shadow: 0 0 6px rgba(183, 110, 121, 0.2);
          pointer-events: none;
          will-change: transform;
        }
      `}</style>
    </>
  );
}
