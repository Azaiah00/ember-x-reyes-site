"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { mapScrollToFrame } from "@/utils/scrollMapper";
import { loadWebPFrames } from "@/utils/webpSequence";

/**
 * Hero Section Component
 * Full-screen hero with scroll-mapped WebP sequence background
 * Canvas-based frame rendering for performance
 * Text overlay with parallax effect
 */
export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frames, setFrames] = useState<HTMLImageElement[]>([]);
  const [isFramesLoaded, setIsFramesLoaded] = useState(false);

  // Framer Motion scroll tracking
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Parallax transform for text (moves slower than background)
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Load all frames on mount
  useEffect(() => {
    const loadFrames = async () => {
      try {
        const loadedFrames = await loadWebPFrames(0, 191);
        setFrames(loadedFrames);
        setIsFramesLoaded(true);
      } catch (error) {
        console.error("Error loading frames:", error);
      }
    };

    loadFrames();
  }, []);

  // Use Framer Motion's scroll progress to update frame
  const frameProgress = useTransform(scrollYProgress, (progress) => {
    // Convert progress (0-1) to scroll percentage (0-100)
    const scrollPercent = progress * 100;
    // Map to frame index
    return mapScrollToFrame(scrollPercent, 191);
  });

  // Update canvas when frame changes
  useEffect(() => {
    if (!canvasRef.current || !isFramesLoaded || frames.length === 0) return;

    const unsubscribe = frameProgress.on("change", (frameIndex) => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d");
      
      if (ctx && frames[frameIndex]) {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw frame
        ctx.drawImage(frames[frameIndex], 0, 0, canvas.width, canvas.height);
      }
    });

    // Initial render
    const initialFrame = Math.floor(frameProgress.get());
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d");
    if (ctx && frames[initialFrame]) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(frames[initialFrame], 0, 0, canvas.width, canvas.height);
    }

    return () => unsubscribe();
  }, [frames, isFramesLoaded, frameProgress]);

  // Set canvas size on mount and resize
  useEffect(() => {
    if (!canvasRef.current || !heroRef.current) return;

    const resizeCanvas = () => {
      const canvas = canvasRef.current!;
      const hero = heroRef.current!;
      
      // Set canvas to full viewport size
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Canvas background for WebP sequence */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ imageRendering: "high-quality" as React.CSSProperties["imageRendering"] }}
      />

      {/* Text overlay with parallax effect */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Top section: Left and Right content */}
        <div className="flex-1 flex flex-col md:flex-row items-start justify-between p-8 md:p-12 lg:p-16">
          {/* Left Side: Identity Block */}
          <motion.div
            style={{ y: textY }}
            className="flex flex-col space-y-4 md:space-y-6 max-w-2xl"
          >
            {/* Small intro line - Orange, all caps */}
            <p className="text-[#FF4500] text-sm md:text-base font-medium uppercase tracking-wider">
              WELCOME TO THE WORLD OF
            </p>

            {/* Huge two-line title - White, massive, bold */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white leading-tight">
              EMBER
              <br />
              REYES
            </h1>

            {/* Skill/Focus Highlights - Horizontal Row */}
            <div className="flex flex-wrap gap-4 md:gap-6 mt-4">
              <span className="text-white text-xs md:text-sm font-semibold">
                #01 High-Fashion Modeling
              </span>
              <span className="text-white text-xs md:text-sm font-semibold">
                #02 Athletic Roots (Ex-Pro)
              </span>
              <span className="text-white text-xs md:text-sm font-semibold">
                #03 Fitness Coaching
              </span>
              <span className="text-white text-xs md:text-sm font-semibold">
                #04 Exclusive Private Content
              </span>
            </div>
          </motion.div>

          {/* Right Side: Value Proposition Block */}
          <motion.div
            style={{ y: textY }}
            className="flex flex-col items-end text-right space-y-4 md:space-y-6 max-w-xl mt-8 md:mt-0"
          >
            {/* Subheadline - Right-aligned, bold */}
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
              From the court to the camera. Still playing to win.
            </h2>

            {/* Supporting paragraph - Right-aligned */}
            <p className="text-sm md:text-base lg:text-lg text-gray-300 leading-relaxed">
              Fusing athletic discipline with high-fashion allure. Whether you
              are here for my professional portfolio or my private locker room,
              you&apos;re in the right place.
            </p>
          </motion.div>
        </div>

        {/* Bottom Center: Social Icons - Minimalist monochrome */}
        <div className="flex justify-center items-center gap-6 pb-8 md:pb-12">
          {/* Instagram Icon */}
          <a
            href="https://instagram.com/emberxreyes"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#00FFFF] transition-colors duration-300"
            aria-label="Instagram"
          >
            <svg
              className="w-6 h-6 md:w-8 md:h-8"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>

          {/* Email Icon */}
          <a
            href="mailto:emberxreyes@gmail.com"
            className="text-white hover:text-[#00FFFF] transition-colors duration-300"
            aria-label="Email"
          >
            <svg
              className="w-6 h-6 md:w-8 md:h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Rounded border bottom - 40px radius */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-[#050505] rounded-t-[40px] z-20" />
    </section>
  );
}

