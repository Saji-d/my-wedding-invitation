"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineUser, HiOutlinePencil } from "react-icons/hi";
import { submitToGoogleSheets } from "@/lib/googleSheets";

interface Wish {
  id: string;
  name: string;
  message: string;
  date: string;
}

export default function GuestWishes() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("wedding_wishes");
    if (saved) {
      setWishes(JSON.parse(saved));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || isLoading) return;

    setIsLoading(true);

    try {
      await submitToGoogleSheets({
        name: name.trim(),
        message: message.trim(),
        source: "Guest Wish"
      });

      const newWish: Wish = {
        id: Date.now().toString(),
        name: name.trim(),
        message: message.trim(),
        date: new Date().toLocaleDateString(),
      };

      const updatedWishes = [newWish, ...wishes];
      setWishes(updatedWishes);
      localStorage.setItem("wedding_wishes", JSON.stringify(updatedWishes));
      
      setName("");
      setMessage("");
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Wish submission failed:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 px-4 bg-[var(--background)]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-great-vibes text-[var(--color-burgundy-900)] dark:text-[var(--color-ivory)] mb-4">
            Guest Book
          </h2>
          <div className="w-16 h-[1px] bg-[var(--color-gold-400)] mx-auto mb-6"></div>
          <p className="font-cormorant text-xl text-gray-600 dark:text-gray-400">
            Leave a message for the couple
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6 glass p-8 rounded-3xl">
              <div>
                <label className="block font-cormorant text-lg mb-2 text-[var(--color-burgundy-800)] dark:text-[var(--color-champagne)]">
                  Your Name
                </label>
                <div className="relative">
                  <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-black/50 border border-[var(--color-gold-400)]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-gold-400)] font-cormorant text-lg"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block font-cormorant text-lg mb-2 text-[var(--color-burgundy-800)] dark:text-[var(--color-champagne)]">
                  Your Message
                </label>
                <div className="relative">
                  <HiOutlinePencil className="absolute left-4 top-4 text-gray-400" />
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={4}
                    className="w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-black/50 border border-[var(--color-gold-400)]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-gold-400)] font-cormorant text-lg resize-none"
                    placeholder="Wishing you a lifetime of love and happiness..."
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[var(--color-gold-400)] text-white rounded-xl hover:bg-[var(--color-gold-500)] transition-colors duration-300 font-cormorant tracking-widest uppercase shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Wish"
                )}
              </button>

              <AnimatePresence>
                {isSuccess && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-center font-cormorant text-green-600 dark:text-green-400"
                  >
                    Your wishes have been received 🌸
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-[400px] overflow-y-auto pr-4 custom-scrollbar space-y-4"
          >
            <AnimatePresence>
              {wishes.length === 0 ? (
                <p className="text-center font-cormorant text-gray-500 italic mt-10">
                  Be the first to leave a wish!
                </p>
              ) : (
                wishes.map((wish) => (
                  <motion.div
                    key={wish.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    layout
                    className="glass p-6 rounded-2xl border border-[var(--color-gold-400)]/20"
                  >
                    <p className="font-playfair text-xl text-[var(--color-burgundy-800)] dark:text-[var(--color-champagne)] mb-2">
                      {wish.name}
                    </p>
                    <p className="font-cormorant text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
                      "{wish.message}"
                    </p>
                    <span className="text-xs text-gray-500 font-cormorant tracking-widest">
                      {wish.date}
                    </span>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
