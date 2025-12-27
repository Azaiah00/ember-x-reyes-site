/**
 * TypeScript type definitions for Ember Reyes website
 */

export interface WebPFrame {
  image: HTMLImageElement;
  frameNumber: number;
}

export interface PreloaderState {
  isLoading: boolean;
  progress: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export interface ContactFormData {
  name: string;
  agency: string;
  message: string;
}

