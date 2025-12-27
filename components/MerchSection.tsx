"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Product } from "@/types";

/**
 * Merch Section Component
 * All-Star Collection - 2x2 grid product showcase
 * Teal/orange lighting effects on product cards
 * Printify-ready Add to Cart structure
 */
export default function MerchSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  // Product data - placeholder structure for Printify integration
  const products: Product[] = [
    {
      id: "1",
      name: "Spurs Tribute Crop Top",
      description: "Athletic-inspired crop top honoring the court legacy",
      price: 49.99,
      imageUrl: "/assets/spurs-crop-top.jpg",
    },
    {
      id: "2",
      name: "All-Star Fitness Tee",
      description: "Premium fitness tee with exclusive design",
      price: 39.99,
      imageUrl: "/assets/all-star-tee.jpg",
    },
    {
      id: "3",
      name: "Exclusive Prints",
      description: "Limited edition high-fashion prints",
      price: 79.99,
      imageUrl: "/assets/exclusive-prints.jpg",
    },
    {
      id: "4",
      name: "Signature Collection",
      description: "Curated pieces from the Ember Reyes collection",
      price: 89.99,
      imageUrl: "/assets/signature-collection.jpg",
    },
  ];

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
          The All-Star Collection
        </motion.h2>

        {/* 2x2 Grid (responsive: 1 column on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={
                isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Product Card */}
              <div className="relative overflow-hidden rounded-lg bg-gray-900 border border-gray-800 hover:border-[#00FFFF] transition-all duration-300">
                {/* Product Image with Teal/Orange Lighting Effect */}
                <div className="relative aspect-square overflow-hidden">
                  {/* Placeholder for product image */}
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url('${product.imageUrl}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {/* Fallback gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
                  </div>

                  {/* Teal/Orange lighting overlay on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background:
                        "radial-gradient(circle at 30% 30%, rgba(0, 255, 255, 0.3) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(255, 69, 0, 0.3) 0%, transparent 50%)",
                    }}
                  />

                  {/* Product Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/90 to-transparent">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                      {product.name}
                    </h3>
                    <p className="text-sm md:text-base text-gray-300 mb-2">
                      {product.description}
                    </p>
                    <p className="text-lg md:text-xl font-bold text-[#00FFFF]">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Add to Cart Button - Printify-ready structure */}
                <div className="p-4 md:p-6">
                  <motion.button
                    onClick={() => setSelectedProduct(product.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-3 bg-[#00FFFF] text-[#050505] font-bold uppercase tracking-wider hover:bg-[#FF4500] hover:text-white transition-all duration-300"
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </div>

              {/* Slide-out Cart Panel (Printify integration point) */}
              {selectedProduct === product.id && (
                <>
                  {/* Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedProduct(null)}
                    className="fixed inset-0 bg-black/80 z-40"
                  />
                  {/* Panel */}
                  <motion.div
                    initial={{ opacity: 0, x: "100%" }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: "100%" }}
                    className="fixed top-0 right-0 bottom-0 w-full md:w-96 bg-[#050505] border-l border-[#00FFFF] p-6 z-50 shadow-2xl overflow-y-auto"
                  >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-xl font-bold text-white">
                      {product.name}
                    </h4>
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="text-gray-400 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-gray-300 mb-4">{product.description}</p>
                  <p className="text-2xl font-bold text-[#00FFFF] mb-6">
                    ${product.price.toFixed(2)}
                  </p>
                  {/* Printify integration: Replace with actual Printify cart component */}
                  <button className="w-full px-6 py-3 bg-[#FF4500] text-white font-bold uppercase tracking-wider hover:bg-[#00FFFF] hover:text-[#050505] transition-all duration-300">
                    Proceed to Checkout
                  </button>
                  </motion.div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

