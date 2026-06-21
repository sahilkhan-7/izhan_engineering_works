"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  isDark: boolean;
}

export default function HeroSection({ isDark }: HeroSectionProps) {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ['Innovation', 'Excellence', 'Quality', 'Precision'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={`relative w-full h-screen min-h-[750px] max-h-[900px] overflow-hidden ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black' 
        : 'bg-gradient-to-br from-orange-50 via-yellow-50 to-white'
    }`}>
      {/* Elegant background overlay */}
      <div className={`absolute inset-0 opacity-30 ${
        isDark 
          ? 'bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-900/20 via-gray-900 to-black' 
          : 'bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-200/50 via-white to-orange-50'
      }`} />
      
      {/* Subtle breathing accent */}
      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full blur-[120px] pointer-events-none ${
          isDark ? 'bg-orange-600/10' : 'bg-orange-400/10'
        }`}
      />

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center h-full px-6">
        <div className="text-center max-w-6xl mx-auto">
          {/* Main heading with advanced gradient animation */}
          <motion.h1
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-5xl md:text-8xl lg:text-9xl font-black leading-tight mb-6"
          >
            <motion.span
              className="block bg-gradient-to-r from-orange-400 via-yellow-400 via-orange-500 to-yellow-600 bg-clip-text text-transparent relative"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ 
                backgroundSize: '300% 300%',
                backgroundImage: 'linear-gradient(45deg, #fb923c, #fbbf24, #f97316, #eab308, #fb923c)'
              }}
            >
              <motion.span
                animate={{
                  textShadow: [
                    '0 0 20px rgba(251, 146, 60, 0.5)',
                    '0 0 40px rgba(251, 191, 36, 0.7)',
                    '0 0 20px rgba(251, 146, 60, 0.5)',
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Izhan Engineering
              </motion.span>
            </motion.span>
            
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className={`block text-3xl md:text-5xl lg:text-6xl font-light mt-4 ${
                isDark ? 'text-gray-200' : 'text-gray-700'
              }`}
            >
              <motion.span
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Works
              </motion.span>
            </motion.span>
          </motion.h1>

          {/* Animated tagline with word cycling */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mb-10"
          >
            <p className={`text-xl md:text-3xl lg:text-4xl font-light ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Crafting{' '}
              <motion.span
                key={currentWord}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 1.2 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                className="inline-block bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent font-bold"
              >
                {words[currentWord]}
              </motion.span>
              {' '}Across India
            </p>
          </motion.div>

          {/* Enhanced CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                boxShadow: "0 20px 40px rgba(251, 146, 60, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-10 py-5 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-full shadow-2xl shadow-orange-500/50 hover:shadow-orange-500/70 transition-all duration-300 overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">Explore Projects</span>
            </motion.button>

            <motion.button
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                backgroundColor: isDark ? 'rgba(251, 146, 60, 0.1)' : 'rgba(251, 146, 60, 0.05)'
              }}
              whileTap={{ scale: 0.95 }}
              className={`px-10 py-5 border-2 border-orange-500 font-semibold rounded-full transition-all duration-300 backdrop-blur-sm ${
                isDark 
                  ? 'text-orange-400 hover:bg-orange-500/10 hover:text-orange-300' 
                  : 'text-orange-600 hover:bg-orange-500/10 hover:text-orange-700'
              }`}
            >
              Contact Us
            </motion.button>
          </motion.div>

          {/* Enhanced scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden [@media(min-height:650px)]:block"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`p-3 rounded-full border-2 ${
                isDark 
                  ? 'text-orange-400 border-orange-400/50 bg-orange-400/10' 
                  : 'text-orange-600 border-orange-600/50 bg-orange-600/10'
              } backdrop-blur-sm`}
            >
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Gradient overlay for better text readability */}
      <div className={`absolute inset-0 ${
        isDark 
          ? 'bg-gradient-to-t from-gray-900/50 via-transparent to-gray-900/30'
          : 'bg-gradient-to-t from-white/50 via-transparent to-orange-50/30'
      }`} />
    </section>
  );
}