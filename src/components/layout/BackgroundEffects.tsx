"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function BackgroundEffects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const petalsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) return;

      const petalCount = 45;
      
      for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement("div");
        petal.className = "petal hidden-initially"; // Hide initially in CSS to prevent top-left flash
        
        container.appendChild(petal);
        petalsRef.current.push(petal);

        // Initial setup - ALWAYS safely above viewport
        gsap.set(petal, {
          x: Math.random() * window.innerWidth,
          y: -150 - (Math.random() * window.innerHeight * 2), // distribute highly above screen
          rotation: Math.random() * 360,
          scale: 0.5 + Math.random() * 0.7,
          opacity: 0, // start invisible
        });

        const animatePetal = (p: HTMLElement, isCeremonial = false) => {
            // Unhide immediately before animation starts
            p.classList.remove('hidden-initially');
            
            const duration = isCeremonial ? 3 + Math.random() * 4 : 15 + Math.random() * 10;
            const currentWidth = window.innerWidth;
            const currentHeight = window.innerHeight;
            
            // True rainfall effect
            gsap.to(p, {
                y: currentHeight + 150, // fall safely past bottom
                x: `+=${-15 + Math.random() * 30}`, // very minimal horizontal sway
                rotation: `+=${180 + Math.random() * 180}`,
                opacity: 0.2 + Math.random() * 0.4, // fade in naturally
                duration: duration,
                ease: isCeremonial ? "power1.in" : "none",
                onComplete: () => {
                    // Reset to just above viewport, random X
                    gsap.set(p, { 
                        y: -150 - (Math.random() * 100), 
                        x: Math.random() * currentWidth,
                        opacity: 0 // hide during reset
                    });
                    // Only loop normal animation
                    if(!isCeremonial) {
                        animatePetal(p);
                    } else {
                        // After ceremonial, return to slow loop with delay
                        setTimeout(() => animatePetal(p), Math.random() * 5000);
                    }
                }
            });
        };

        // Start standard animation immediately
        animatePetal(petal);
      }
      
      // Listen for ceremonial event
      const handleCeremonialShower = () => {
         // Create a temporary burst of extra petals
         for(let i=0; i < 30; i++) {
             const tempPetal = document.createElement("div");
             tempPetal.className = "petal";
             container.appendChild(tempPetal);
             
             gsap.set(tempPetal, {
                  x: Math.random() * window.innerWidth,
                  y: -50 - (Math.random() * 200), 
                  rotation: Math.random() * 360,
                  scale: 0.6 + Math.random() * 0.8,
                  opacity: 0,
             });
             
             gsap.to(tempPetal, {
                y: window.innerHeight + 200,
                x: `+=${-50 + Math.random() * 100}`,
                rotation: `+=${360 + Math.random() * 360}`,
                opacity: 0.5 + Math.random() * 0.4,
                duration: 2 + Math.random() * 3,
                ease: "power2.in",
                onComplete: () => {
                    tempPetal.remove(); // Cleanup
                }
             });
         }
      };
      
      window.addEventListener('triggerCeremonialShower', handleCeremonialShower);
      
      return () => {
          window.removeEventListener('triggerCeremonialShower', handleCeremonialShower);
      };

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
          pointer-events: none;
          will-change: transform, opacity;
        }
        .hidden-initially {
          display: none !important;
        }
      `}</style>
    </>
  );
}
