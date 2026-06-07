export const weddingConfig = {
  couple: {
    displayName1: "Sajid",
    displayName2: "Dilruba",
    fullName1: "Sajidur Rahman Sajid",
    fullName2: "Sumaiya Rahman Dilruba",
    togetherForever: "Together Forever",
  },
  events: {
    mehendi: {
      name: "Mehendi / Holud",
      date: "2026-07-16T18:00:00",
      displayDate: "16 July 2026",
    },
    wedding: {
      name: "Wedding Ceremony",
      date: "2026-07-17T19:00:00",
      displayDate: "17 July 2026",
    },
  },
  venue: {
    name: "Luxury Grand Hotel (Placeholder)",
    address: "123 Royal Avenue, Celebration City",
    coordinates: {
      lat: 23.8103,
      lng: 90.4125, // Placeholder Dhaka coordinates
    },
    mapZoom: 14,
  },
  timeline: [
    {
      title: "First Meeting",
      description: "Our eyes met across the room, and time stood still.",
      date: "January 2024",
    },
    {
      title: "Friendship",
      description: "Countless hours of talking, laughing, and understanding each other.",
      date: "March 2024",
    },
    {
      title: "Love",
      description: "Realizing that we were meant to be more than just friends.",
      date: "August 2024",
    },
    {
      title: "Promise",
      description: "A ring, a promise, and a forever yes under the stars.",
      date: "December 2025",
    },
    {
      title: "Wedding",
      description: "Two souls uniting for a lifetime of love and happiness.",
      date: "July 2026",
    },
  ],
  music: {
    url: "/music/wedding-bgm.mp3",
  },
  whatsapp: {
    number: "1234567890", // Placeholder
  },
  quotes: [
    "I have found the one whom my soul loves.",
    "Two souls but with a single thought, two hearts that beat as one.",
    "A successful marriage requires falling in love many times, always with the same person.",
  ],
  gallery: [
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1583939008713-356f183748cd?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1505902987943-7f722a945d94?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=2000",
  ],
  islamicBlessing: {
    arabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنفُسِكُمْ أَزْوَاجًا",
    translation: "And of His signs is that He created for you from yourselves mates that you may find tranquillity in them...",
  },
  googleSheetUrl: process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL || "",
};
