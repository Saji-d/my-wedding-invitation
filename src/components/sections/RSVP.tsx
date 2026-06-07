"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { weddingConfig } from "@/config/wedding";
import { FaWhatsapp } from "react-icons/fa";
import { HiOutlinePhone } from "react-icons/hi";
import confetti from "canvas-confetti";
import { submitToGoogleSheets } from "@/lib/googleSheets";

export default function RSVP() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [attending, setAttending] = useState<"YES" | "NO" | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !attending || !phone) return;

    setIsLoading(true);

    try {
      await submitToGoogleSheets({
        name,
        phone,
        status: attending === "YES" ? "Attending" : "Not Attending",
        source: "RSVP"
      });

      // Trigger confetti
      if (attending === "YES") {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#d4af37", "#b76e79", "#800020"]
        });
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Something went wrong. Please try again or RSVP via WhatsApp.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsAppRSVP = () => {
    const text = `Hello! I am ${name}. I will ${attending === "YES" ? "be attending" : "not be able to attend"} your wedding.`;
    const url = `https://wa.me/${weddingConfig.whatsapp.number}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <section className="py-24 px-4 bg-[var(--background)]">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-great-vibes text-[var(--color-burgundy-900)] dark:text-[var(--color-ivory)] mb-4">
            RSVP
          </h2>
          <div className="w-16 h-[1px] bg-[var(--color-gold-400)] mx-auto mb-6"></div>
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
            className="glass p-8 md:p-12 rounded-3xl space-y-8 text-left"
          >
            <div>
              <label className="block font-cormorant text-xl mb-3 text-[var(--color-burgundy-800)] dark:text-[var(--color-champagne)]">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-6 py-4 bg-white/50 dark:bg-black/50 border border-[var(--color-gold-400)]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-gold-400)] font-cormorant text-lg"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block font-cormorant text-xl mb-3 text-[var(--color-burgundy-800)] dark:text-[var(--color-champagne)]">
                Phone Number
              </label>
              <div className="relative">
                <HiOutlinePhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white/50 dark:bg-black/50 border border-[var(--color-gold-400)]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-gold-400)] font-cormorant text-lg"
                  placeholder="e.g. +880 1XXX XXXXXX"
                />
              </div>
            </div>

            <div>
              <label className="block font-cormorant text-xl mb-3 text-[var(--color-burgundy-800)] dark:text-[var(--color-champagne)]">
                Will you attend?
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setAttending("YES")}
                  className={`flex-1 py-4 rounded-xl font-cormorant text-lg tracking-widest uppercase transition-all duration-300 border ${
                    attending === "YES"
                      ? "bg-[var(--color-burgundy-800)] text-[var(--color-champagne)] border-[var(--color-burgundy-800)]"
                      : "bg-transparent text-[var(--color-burgundy-800)] dark:text-white border-[var(--color-gold-400)] hover:bg-[var(--color-gold-400)]/10"
                  }`}
                >
                  Joyfully Accept
                </button>
                <button
                  type="button"
                  onClick={() => setAttending("NO")}
                  className={`flex-1 py-4 rounded-xl font-cormorant text-lg tracking-widest uppercase transition-all duration-300 border ${
                    attending === "NO"
                      ? "bg-gray-600 text-white border-gray-600"
                      : "bg-transparent text-gray-600 dark:text-gray-300 border-gray-400 hover:bg-gray-400/10"
                  }`}
                >
                  Regretfully Decline
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={!name || !attending || !phone || isLoading}
              className="w-full py-4 bg-[var(--color-gold-400)] text-white rounded-xl hover:bg-[var(--color-gold-500)] transition-colors duration-300 font-cormorant tracking-widest uppercase text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                "Submit RSVP"
              )}
            </button>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass p-12 rounded-3xl space-y-6"
          >
            <h3 className="text-3xl font-playfair text-[var(--color-burgundy-800)] dark:text-[var(--color-champagne)]">
              {attending === "YES" ? "Can't wait to see you!" : "You will be missed!"}
            </h3>
            <p className="font-cormorant text-xl text-gray-700 dark:text-gray-300">
              {attending === "YES" 
                ? "Thank you for confirming. We are so excited to celebrate with you!" 
                : "Thank you for letting us know. We will celebrate with you in spirit."}
            </p>
            
            <div className="pt-8 mt-8 border-t border-[var(--color-gold-400)]/30">
              <p className="font-cormorant text-lg mb-4 text-gray-600 dark:text-gray-400">
                You can also confirm your RSVP directly via WhatsApp
              </p>
              <button
                onClick={handleWhatsAppRSVP}
                className="inline-flex items-center justify-center gap-3 px-8 py-3 bg-[#25D366] text-white rounded-full hover:bg-[#128C7E] transition-colors duration-300 font-cormorant tracking-widest uppercase shadow-lg"
              >
                <FaWhatsapp className="w-6 h-6" />
                Confirm on WhatsApp
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
