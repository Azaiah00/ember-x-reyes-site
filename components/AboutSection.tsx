"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

/**
 * About Section Component
 * Stats & Aesthetics section with split-screen layout
 * Left: Duotone portrait (Spurs jersey images)
 * Right: Professional attributes list + CTA button
 */
export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="min-h-screen bg-[#050505] py-16 md:py-24 px-4 md:px-8 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-white text-center mb-12 md:mb-16"
        >
          Stats & Aesthetics
        </motion.h2>

        {/* Split-screen layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left: Duotone Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Duotone effect using CSS filters */}
            <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg">
              {/* Placeholder for Spurs jersey image - user should replace with actual image */}
              <div
                className="w-full h-full bg-gradient-to-br from-[#FF4500] to-[#00FFFF] opacity-80"
                style={{
                  backgroundImage:
                    "url('/assets/spurs-jersey.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "grayscale(100%) contrast(1.2) brightness(0.9)",
                  mixBlendMode: "multiply",
                }}
              >
                {/* Overlay for duotone effect */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255, 69, 0, 0.3) 0%, rgba(0, 255, 255, 0.3) 100%)",
                  }}
                />
              </div>
              
              {/* Fallback if image doesn't exist */}
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                <p className="text-gray-500 text-sm text-center px-4">
                  Spurs Jersey Image
                  <br />
                  (Placeholder - add image to /public/assets/)
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Professional Attributes */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col space-y-6 md:space-y-8"
          >
            {/* Attributes List */}
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-center space-x-4">
                <span className="text-[#00FFFF] text-2xl font-bold">→</span>
                <div>
                  <p className="text-gray-400 text-sm md:text-base uppercase tracking-wider">
                    Agency
                  </p>
                  <p className="text-white text-xl md:text-2xl font-bold">
                    Couture House
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-[#00FFFF] text-2xl font-bold">→</span>
                <div>
                  <p className="text-gray-400 text-sm md:text-base uppercase tracking-wider">
                    Height
                  </p>
                  <p className="text-white text-xl md:text-2xl font-bold">
                    5&apos;9&quot;
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-[#00FFFF] text-2xl font-bold">→</span>
                <div>
                  <p className="text-gray-400 text-sm md:text-base uppercase tracking-wider">
                    Specialty
                  </p>
                  <p className="text-white text-xl md:text-2xl font-bold">
                    Athletic/Fashion Fusion
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <motion.a
              href="https://couturehouse.co"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block mt-8 px-8 py-4 bg-transparent border-2 border-[#00FFFF] text-[#00FFFF] font-bold uppercase tracking-wider hover:bg-[#00FFFF] hover:text-[#050505] transition-all duration-300 text-center"
            >
              Download Full Portfolio
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

