"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

/**
 * Fanvue Section Component
 * Locker Room Portal - 18+ section
 * High-contrast dark section with steamy/blurred glass background
 * Hover effect: Blur clears to reveal high-res athletic photo
 * Pulsing teal/orange border glow on CTA button
 */
export default function FanvueSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-[#050505] py-16 md:py-24 px-4 md:px-8 lg:px-16 overflow-hidden"
    >
      {/* Background image with blur effect */}
      <div
        className="absolute inset-0 w-full h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Placeholder for high-res athletic photo - user should replace */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/assets/athletic-photo.jpg')",
            filter: isHovered ? "blur(0px)" : "blur(20px)",
            transition: "filter 0.5s ease-in-out",
          }}
        >
          {/* Fallback if image doesn't exist */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
        </div>

        {/* Steamy/Blurred Glass Overlay */}
        <div
          className="absolute inset-0 backdrop-blur-md"
          style={{
            backgroundColor: "rgba(5, 5, 5, 0.7)",
            opacity: isHovered ? 0.3 : 0.9,
            transition: "opacity 0.5s ease-in-out",
          }}
        />

        {/* Additional steam effect overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 30% 50%, rgba(0, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(255, 69, 0, 0.1) 0%, transparent 50%)",
            opacity: isHovered ? 0.2 : 0.5,
            transition: "opacity 0.5s ease-in-out",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 md:space-y-12"
        >
          {/* 18+ Warning */}
          <div className="inline-block px-4 py-2 border-2 border-[#FF4500] text-[#FF4500] font-bold uppercase tracking-wider text-sm md:text-base">
            18+ Content
          </div>

          {/* Main Copy */}
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
            The game doesn&apos;t end when the whistle blows.
          </h2>

          <p className="text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            For my most intimate fitness content, private chats, and unfiltered
            shoots, enter the locker room.
          </p>

          {/* CTA Button with Pulsing Glow */}
          <motion.a
            href="https://www.fanvue.com/ember-reyes"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-10 py-5 md:px-12 md:py-6 bg-transparent border-2 border-[#00FFFF] text-[#00FFFF] font-bold uppercase tracking-wider text-lg md:text-xl breathing-glow hover:bg-[#00FFFF] hover:text-[#050505] transition-all duration-300"
            style={{
              boxShadow: `
                0 0 10px #00FFFF,
                0 0 20px #00FFFF,
                0 0 30px #FF4500,
                inset 0 0 10px rgba(0, 255, 255, 0.1)
              `,
            }}
          >
            Enter Fanvue Portal
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

