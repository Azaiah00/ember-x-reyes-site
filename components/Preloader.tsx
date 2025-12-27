"use client";

import { useEffect, useState } from "react";
import { loadWebPFrames } from "@/utils/webpSequence";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Preloader Component
 * Full-screen overlay that preloads WebP frames before revealing the UI
 * Shows percentage counter: "Loading Ember Reyes: X%"
 */
export default function Preloader({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Preload all 191 frames (0-191)
    const preloadFrames = async () => {
      try {
        // Load frames with progress callback
        await loadWebPFrames(0, 191, (progressPercent) => {
          setProgress(progressPercent);
        });

        // Small delay to show 100% before hiding
        await new Promise((resolve) => setTimeout(resolve, 500));

        setIsLoading(false);
        
        // Wait for fade-out animation before calling onComplete
        setTimeout(() => {
          onComplete();
        }, 500);
      } catch (error) {
        console.error("Error preloading frames:", error);
        // Continue even if some frames fail to load
        setIsLoading(false);
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    };

    preloadFrames();
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]"
        >
          <div className="text-center">
            {/* Loading text with percentage */}
            <motion.p
              key={progress}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              className="text-2xl md:text-4xl font-bold text-white"
            >
              Loading Ember Reyes: {progress}%
            </motion.p>
            
            {/* Progress bar (optional visual indicator) */}
            <div className="mt-8 w-64 md:w-96 h-1 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#FF4500] to-[#00FFFF]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

