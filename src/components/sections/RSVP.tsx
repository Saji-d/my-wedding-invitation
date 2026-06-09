"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { weddingConfig } from "@/config/wedding";
import { HiHeart } from "react-icons/hi";

export default function RSVP() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [attending, setAttending] = useState<"JOYFULLY ACCEPT" | "REGRETFULLY DECLINE" | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !attending || !phone) return;

    setIsLoading(true);

    const url = weddingConfig.googleForms.rsvp.url;
    const payload = {
      [weddingConfig.googleForms.rsvp.entries.name]: name,
      [weddingConfig.googleForms.rsvp.entries.phone]: phone,
      [weddingConfig.googleForms.rsvp.entries.status]: attending,
    };

    const formData = new URLSearchParams();
    Object.entries(payload).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    
    formData.append("fvv", "1");
    formData.append("pageHistory", "0");

    try {
      await fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });
      
      setIsSubmitted(true);
      
      if (attending === "JOYFULLY ACCEPT") {
        const confetti = (await import("canvas-confetti")).default;
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#d4af37", "#b76e79", "#800020"]
        });
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Something went wrong. Please check your internet and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 lg:py-32 px-4 bg-[var(--background)] border-b border-[var(--color-gold-400)]/10 flex flex-col justify-center min-h-[80vh] lg:min-h-0 relative z-10">
      <div className="max-w-3xl mx-auto text-center w-full mt-8 md:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-10 lg:mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-playfair text-[var(--color-burgundy-900)] dark:text-[var(--color-ivory)] mb-3 lg:mb-4 uppercase tracking-wider">
            Will You Join Our Celebration?
          </h2>
          <div className="w-16 h-[1px] bg-[var(--color-gold-400)] mx-auto mb-3 lg:mb-4"></div>
          <p className="font-cormorant text-xl text-gray-600 dark:text-gray-400">
            Please let us know if you can make it
          </p>
        </motion.div>

        {!isSubmitted ? (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass p-6 lg:p-10 rounded-3xl space-y-6 lg:space-y-6 text-left border border-[var(--color-gold-400)]/20 shadow-xl"
          >
            <div>
              <label className="block font-cormorant text-xl mb-2 text-[var(--color-burgundy-800)] dark:text-[var(--color-champagne)]">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-6 py-3 bg-white/50 dark:bg-black/50 border border-[var(--color-gold-400)]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-gold-400)] font-cormorant text-lg"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block font-cormorant text-xl mb-2 text-[var(--color-burgundy-800)] dark:text-[var(--color-champagne)]">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full px-6 py-3 bg-white/50 dark:bg-black/50 border border-[var(--color-gold-400)]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-gold-400)] font-cormorant text-lg"
                placeholder="e.g. +880 1XXX XXXXXX"
              />
            </div>

            <div>
              <label className="block font-cormorant text-xl mb-2 text-[var(--color-burgundy-800)] dark:text-[var(--color-champagne)]">
                Will you attend?
              </label>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => setAttending("JOYFULLY ACCEPT")}
                  className={`flex-1 py-3 lg:py-4 rounded-xl font-cormorant text-lg tracking-widest uppercase transition-all duration-300 border ${
                    attending === "JOYFULLY ACCEPT"
                      ? "bg-[#059669] text-white border-[#059669] shadow-lg"
                      : "bg-transparent text-emerald-600 border-emerald-500 hover:bg-emerald-50"
                  }`}
                >
                  Joyfully Accept
                </button>
                <button
                  type="button"
                  onClick={() => setAttending("REGRETFULLY DECLINE")}
                  className={`flex-1 py-3 lg:py-4 rounded-xl font-cormorant text-lg tracking-widest uppercase transition-all duration-300 border ${
                    attending === "REGRETFULLY DECLINE"
                      ? "bg-[#E11D48] text-white border-[#E11D48] shadow-lg"
                      : "bg-transparent text-rose-600 border-rose-500 hover:bg-rose-50"
                  }`}
                >
                  Regretfully Decline
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={!name || !attending || !phone || isLoading}
              className={`w-full py-4 rounded-xl transition-all duration-500 font-cormorant tracking-widest uppercase text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative overflow-hidden group hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(212,175,55,0.3)] ${
                !attending ? "bg-[var(--color-burgundy-800)] text-[var(--color-champagne)] shadow-lg" : "text-white shadow-[0_4px_15px_rgba(212,175,55,0.2)]"
              }`}
            >
              {/* Luxury Animated Shimmer Border Background */}
              {attending && !isLoading && (
                <div className="absolute inset-0 z-0 bg-[linear-gradient(90deg,#D4AF37_0%,#F3C4CF_25%,#800020_50%,#D4AF37_75%,#F3C4CF_100%)] bg-[length:200%_200%] animate-luxury-shimmer"></div>
              )}
              
              {/* Inner mask to provide background color and keep border glow */}
              {attending && !isLoading && (
                <div className={`absolute inset-[2px] rounded-[10px] z-10 transition-colors duration-500 ${
                  attending === "REGRETFULLY DECLINE" ? "bg-[#8B0000] group-hover:bg-[#7a0000]" : "bg-[#014421] group-hover:bg-[#013220]"
                }`}></div>
              )}

              {/* Light Sweep Effect */}
              {attending && !isLoading && (
                <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent z-20 animate-light-sweep pointer-events-none"></div>
              )}

              {isLoading ? (
                <div className="relative z-30 flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                <span className="relative z-30 drop-shadow-md">Confirm Attendance</span>
              )}
            </button>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`glass p-10 lg:p-12 rounded-3xl space-y-4 lg:space-y-6 border shadow-2xl mb-32 lg:mb-0 ${
              attending === "JOYFULLY ACCEPT"
                ? "border-[var(--color-gold-400)]/40 bg-[var(--color-champagne)]/20"
                : "border-[#B76E79]/40 bg-[#B76E79]/5"
            }`}
          >
            <div className="flex justify-center mb-4">
              <HiHeart className={`w-12 h-12 ${attending === "JOYFULLY ACCEPT" ? "text-[#C2185B] drop-shadow-[0_0_15px_rgba(194,24,91,0.6)] scale-110 transition-transform" : "text-[#B76E79] drop-shadow-sm"}`} />
            </div>
            <h3 className={`text-3xl md:text-4xl font-playfair font-bold ${attending === "JOYFULLY ACCEPT" ? "text-[#C2185B] drop-shadow-[0_0_15px_rgba(194,24,91,0.6)] tracking-wide" : "text-[#B76E79] drop-shadow-[0_0_12px_rgba(183,110,121,0.5)]"}`}>
              {attending === "JOYFULLY ACCEPT" ? "Can't wait to see you!" : "You will be missed!"}
            </h3>
            <p className={`font-cormorant text-xl leading-relaxed ${
              attending === "JOYFULLY ACCEPT"
                ? "text-[var(--color-gold-500)]"
                : "text-[var(--color-gold-500)]"
            }`}>
              {attending === "JOYFULLY ACCEPT" 
                ? "Thank you for confirming your attendance. We look forward to celebrating with you."
                : "Thank you for letting us know. While we'll miss celebrating with you in person, your love, prayers, and blessings mean the world to us."}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
