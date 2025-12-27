"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ContactFormData } from "@/types";

/**
 * Contact Section Component
 * Work With Ember - Contact form and footer
 * Fields: Name, Agency/Brand, Message
 * Footer: Social icons, email, copyright
 */
export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    agency: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Form submission logic - integrate with your backend/email service
    console.log("Form submitted:", formData);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    // Reset form or show success message
    setFormData({ name: "", agency: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      ref={ref}
      className="min-h-screen bg-[#050505] py-16 md:py-24 px-4 md:px-8 lg:px-16"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-white text-center mb-12 md:mb-16"
        >
          Work With Ember
        </motion.h2>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-6 md:space-y-8 mb-16 md:mb-24"
        >
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm md:text-base font-semibold text-gray-300 mb-2 uppercase tracking-wider"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 text-white focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF] transition-all duration-300"
              placeholder="Your name"
            />
          </div>

          {/* Agency/Brand Field */}
          <div>
            <label
              htmlFor="agency"
              className="block text-sm md:text-base font-semibold text-gray-300 mb-2 uppercase tracking-wider"
            >
              Agency / Brand
            </label>
            <input
              type="text"
              id="agency"
              name="agency"
              value={formData.agency}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 text-white focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF] transition-all duration-300"
              placeholder="Your agency or brand"
            />
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm md:text-base font-semibold text-gray-300 mb-2 uppercase tracking-wider"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 text-white focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF] transition-all duration-300 resize-none"
              placeholder="Tell me about your project..."
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-8 py-4 bg-[#00FFFF] text-[#050505] font-bold uppercase tracking-wider hover:bg-[#FF4500] hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </motion.button>
        </motion.form>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="border-t border-gray-800 pt-8 md:pt-12"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
            {/* Social Icons */}
            <div className="flex items-center gap-6">
              {/* Instagram */}
              <a
                href="https://instagram.com/emberxreyes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#00FFFF] transition-colors duration-300"
                aria-label="Instagram"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* Email */}
              <a
                href="mailto:emberxreyes@gmail.com"
                className="text-white hover:text-[#00FFFF] transition-colors duration-300"
                aria-label="Email"
              >
                <svg
                  className="w-6 h-6"
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

            {/* Email Address */}
            <div className="text-center md:text-right">
              <a
                href="mailto:emberxreyes@gmail.com"
                className="text-gray-300 hover:text-[#00FFFF] transition-colors duration-300 text-sm md:text-base"
              >
                emberxreyes@gmail.com
              </a>
            </div>

            {/* Copyright */}
            <div className="text-gray-500 text-xs md:text-sm text-center md:text-right">
              © 2025 Ember Reyes. All Rights Reserved.
            </div>
          </div>
        </motion.footer>
      </div>
    </section>
  );
}

