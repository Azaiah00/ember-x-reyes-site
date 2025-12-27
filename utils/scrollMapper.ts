/**
 * Scroll Mapping Utilities
 * Maps scroll position to WebP frame index for parallax effect
 */

/**
 * Maps scroll percentage (0-100) to frame index (0-191)
 * @param scrollPercent - Scroll percentage within hero section (0-100)
 * @param totalFrames - Total number of frames (default: 191)
 * @returns Frame index (0 to totalFrames-1)
 */
export function mapScrollToFrame(
  scrollPercent: number,
  totalFrames: number = 191
): number {
  // Clamp scroll percentage between 0 and 100
  const clampedPercent = Math.max(0, Math.min(100, scrollPercent));
  
  // Map to frame index
  const frameIndex = Math.floor((clampedPercent / 100) * (totalFrames - 1));
  
  // Ensure frame index is within valid range
  return Math.max(0, Math.min(totalFrames - 1, frameIndex));
}

/**
 * Calculates scroll percentage based on element position and viewport
 * @param elementTop - Top position of element relative to document
 * @param elementHeight - Height of element
 * @param scrollY - Current scroll position
 * @returns Scroll percentage (0-100)
 */
export function calculateScrollPercent(
  elementTop: number,
  elementHeight: number,
  scrollY: number
): number {
  // Distance scrolled within the element
  const scrolled = scrollY - elementTop;
  
  // Calculate percentage (0 when at top, 100 when scrolled past bottom)
  const percent = (scrolled / elementHeight) * 100;
  
  return Math.max(0, Math.min(100, percent));
}

