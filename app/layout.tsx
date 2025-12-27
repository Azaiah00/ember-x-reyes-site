import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Variable weight font for titles and subheadlines
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Ember Reyes | Ex-Athlete, High-Fashion Model, Fitness Icon",
  description: "From the court to the camera. Still playing to win.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} font-sans antialiased bg-[#050505] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
