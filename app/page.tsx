"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FanvueSection from "@/components/FanvueSection";
import MerchSection from "@/components/MerchSection";
import ContactSection from "@/components/ContactSection";

/**
 * Main Page Component
 * Single-page parallax website for Ember Reyes
 * Includes preloader and all sections in order
 */
export default function Home() {
  const [isPreloaded, setIsPreloaded] = useState(false);

  return (
    <>
      {/* Preloader - shows until frames are loaded */}
      {!isPreloaded && <Preloader onComplete={() => setIsPreloaded(true)} />}

      {/* Main content - only visible after preloader completes */}
      {isPreloaded && (
        <main className="relative">
          {/* Hero Section - Scroll-mapped WebP sequence */}
          <HeroSection />

          {/* About Section - Stats & Aesthetics */}
          <AboutSection />

          {/* Fanvue Section - Locker Room Portal */}
          <FanvueSection />

          {/* Merch Section - All-Star Collection */}
          <MerchSection />

          {/* Contact Section - Work With Ember */}
          <ContactSection />
        </main>
      )}
    </>
  );
}
