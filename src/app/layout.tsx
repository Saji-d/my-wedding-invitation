import type { Metadata } from "next";
import { Great_Vibes, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { weddingConfig } from "@/config/wedding";

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "Sajid ❤️ Dilruba | Wedding Invitation",
  description: `Join us to celebrate the wedding of ${weddingConfig.couple.fullName1} and ${weddingConfig.couple.fullName2}.`,
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Sajid ❤️ Dilruba | Wedding Invitation",
    description: "We invite you to share our joy and celebrate our wedding.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${greatVibes.variable} ${playfair.variable} ${cormorant.variable} antialiased selection:bg-gold-400 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
