/**
 * WebP Sequence Loading Utilities
 * Handles loading and caching of WebP frames from Supabase storage
 */

// Base URL for WebP sequence frames
const BASE_URL = "https://aohvpdfbiipkejquteni.supabase.co/storage/v1/object/public/Webp%20Sequence/";

/**
 * Formats frame number to match naming convention: frame_XXX_delay-0.04s.webp
 * @param frameNumber - Frame number (0-191)
 * @returns Formatted frame URL
 */
export function getFrameUrl(frameNumber: number): string {
  // Pad frame number to 3 digits (000, 001, ..., 191)
  const paddedFrame = frameNumber.toString().padStart(3, "0");
  return `${BASE_URL}frame_${paddedFrame}_delay-0.04s.webp`;
}

/**
 * Loads a single WebP frame as an HTMLImageElement
 * @param frameNumber - Frame number to load
 * @returns Promise that resolves to loaded image
 */
export function loadWebPFrame(frameNumber: number): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load frame ${frameNumber}`));
    
    img.src = getFrameUrl(frameNumber);
  });
}

/**
 * Loads multiple WebP frames in parallel
 * @param startFrame - Starting frame number (inclusive)
 * @param endFrame - Ending frame number (inclusive)
 * @param onProgress - Optional callback for progress updates (0-100)
 * @returns Promise that resolves to array of loaded images
 */
export async function loadWebPFrames(
  startFrame: number,
  endFrame: number,
  onProgress?: (progress: number) => void
): Promise<HTMLImageElement[]> {
  const totalFrames = endFrame - startFrame + 1;
  const frames: HTMLImageElement[] = [];
  
  // Load all frames in parallel for better performance
  const loadPromises = [];
  
  for (let i = startFrame; i <= endFrame; i++) {
    const promise = loadWebPFrame(i).then((img) => {
      frames[i - startFrame] = img;
      
      // Calculate progress
      if (onProgress) {
        const loaded = frames.filter(f => f !== undefined).length;
        const progress = Math.floor((loaded / totalFrames) * 100);
        onProgress(progress);
      }
      
      return img;
    });
    
    loadPromises.push(promise);
  }
  
  await Promise.all(loadPromises);
  
  return frames;
}

