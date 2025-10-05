// "use client";

// import Image from "next/image";
// import { motion } from "framer-motion";

// export default function HeroSection() {
//   return (
//     <section className="relative w-full h-screen max-h-[900px] flex items-center justify-center overflow-hidden">
//       {/* Background Image */}
//       <Image
//         src="/hero_image.jpg"
//         alt="Fabrication work"
//         fill
//         priority
//         className="object-cover"
//       />

//       {/* Content */}
//       <div className="z-20 px-6 md:px-10 text-center">
//         <motion.h1
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7 }}
//           className="text-4xl md:text-6xl font-bold text-blue-800 leading-tight mb-4 drop-shadow-lg"
//         >
//           Izhan Engineering Works
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.9, delay: 0.2 }}
//           className="text-lg md:text-2xl text-white max-w-2xl mx-auto drop-shadow-md"
//         >
//           Premium Fabrication Solutions Delivered Across India.
//         </motion.p>
//       </div>
//     </section>
//   );
// }

// "use client";

// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Sun, Moon } from 'lucide-react';
// import Link from 'next/link';

// interface NavbarProps {
//   isDark: boolean;
//   toggleDark: () => void;
// }

// export default function Navbar({ isDark, toggleDark }: NavbarProps) {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleNavClick = () => setMenuOpen(false);

//   const navItems = [
//     { name: 'About', href: '#about' },
//     { name: 'Specializations', href: '#specialization' },
//     { name: 'Projects', href: '#projects' },
//     { name: 'Contact', href: '#contact' },
//     { name: 'Team', href: '/team' }
//   ];

//   return (
//     <motion.nav
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       transition={{ duration: 0.8, ease: "easeOut" }}
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
//         scrolled 
//           ? isDark 
//             ? 'bg-gray-900/95 backdrop-blur-lg shadow-2xl border-b border-orange-500/20' 
//             : 'bg-white/95 backdrop-blur-lg shadow-2xl border-b border-orange-200'
//           : isDark
//             ? 'bg-transparent'
//             : 'bg-transparent'
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center h-20">
//         {/* Logo */}
//         <motion.div
//           whileHover={{ scale: 1.05 }}
//           transition={{ type: "spring", stiffness: 300 }}
//           className="flex items-center"
//         >
//           <Link href="/" className="flex items-center">
//             <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-xl flex items-center justify-center shadow-lg">
//               <span className="text-white font-bold text-xl">I</span>
//             </div>
//             <span className="ml-3 text-xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
//               Izhan Engineering
//             </span>
//           </Link>
//         </motion.div>

//         {/* Desktop Nav */}
//         <div className="hidden md:flex items-center gap-8">
//           <ul className="flex gap-8 font-medium">
//             {navItems.map((item, index) => (
//               <motion.li
//                 key={item.name}
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1, duration: 0.5 }}
//               >
//                 <a 
//                   href={item.href}
//                   className={`relative py-2 px-1 transition-colors duration-300 ${
//                     isDark ? 'text-gray-200 hover:text-orange-400' : 'text-gray-700 hover:text-orange-600'
//                   }`}
//                 >
//                   {item.name}
//                   <motion.span
//                     className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-yellow-400"
//                     whileHover={{ width: '100%' }}
//                     transition={{ duration: 0.3 }}
//                   />
//                 </a>
//               </motion.li>
//             ))}
//           </ul>

//           {/* Dark Mode Toggle */}
//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             onClick={toggleDark}
//             className={`p-2 rounded-full transition-all duration-300 ${
//               isDark 
//                 ? 'bg-yellow-400 text-gray-900 shadow-lg shadow-yellow-400/50' 
//                 : 'bg-gray-800 text-yellow-400 shadow-lg shadow-gray-800/50'
//             }`}
//             aria-label="Toggle dark mode"
//           >
//             <AnimatePresence mode="wait">
//               {isDark ? (
//                 <motion.div
//                   key="sun"
//                   initial={{ rotate: -90, opacity: 0 }}
//                   animate={{ rotate: 0, opacity: 1 }}
//                   exit={{ rotate: 90, opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <Sun className="w-5 h-5" />
//                 </motion.div>
//               ) : (
//                 <motion.div
//                   key="moon"
//                   initial={{ rotate: 90, opacity: 0 }}
//                   animate={{ rotate: 0, opacity: 1 }}
//                   exit={{ rotate: -90, opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <Moon className="w-5 h-5" />
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </motion.button>
//         </div>

//         {/* Mobile Menu Button & Dark Mode */}
//         <div className="md:hidden flex items-center gap-4">
//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             onClick={toggleDark}
//             className={`p-2 rounded-full transition-all duration-300 ${
//               isDark 
//                 ? 'bg-yellow-400 text-gray-900' 
//                 : 'bg-gray-800 text-yellow-400'
//             }`}
//             aria-label="Toggle dark mode"
//           >
//             {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
//           </motion.button>

//           <button
//             className={`p-2 transition-colors duration-300 ${
//               isDark ? 'text-gray-200' : 'text-gray-700'
//             }`}
//             onClick={() => setMenuOpen(!menuOpen)}
//             aria-label="Toggle menu"
//           >
//             <motion.div
//               animate={menuOpen ? { rotate: 180 } : { rotate: 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
//                 />
//               </svg>
//             </motion.div>
//           </button>
//         </div>
//       </div>

//       {/* Mobile Nav */}
//       <AnimatePresence>
//         {menuOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.3 }}
//             className={`md:hidden ${
//               isDark 
//                 ? 'bg-gray-900/95 backdrop-blur-lg border-t border-orange-500/20' 
//                 : 'bg-white/95 backdrop-blur-lg border-t border-orange-200'
//             }`}
//           >
//             <ul className="px-6 py-6 space-y-4">
//               {navItems.map((item, index) => (
//                 <motion.li
//                   key={item.name}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                 >
//                   <a 
//                     href={item.href}
//                     onClick={handleNavClick}
//                     className={`block py-2 font-medium transition-colors duration-300 ${
//                       isDark ? 'text-gray-200 hover:text-orange-400' : 'text-gray-700 hover:text-orange-600'
//                     }`}
//                   >
//                     {item.name}
//                   </a>
//                 </motion.li>
//               ))}
//             </ul>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.nav>
//   );
// }

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

  // Background floating elements
  const FloatingElement = ({ delay = 0, size = 100, duration = 20 }) => (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${
        isDark ? 'bg-orange-500/10' : 'bg-orange-200/30'
      }`}
      style={{
        width: size,
        height: size,
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
      }}
      animate={{
        x: [0, Math.random() * 200 - 100],
        y: [0, Math.random() * 200 - 100],
        scale: [1, Math.random() + 0.5, 1],
        rotate: [0, 360],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: "reverse",
        delay: delay,
        ease: "easeInOut"
      }}
    />
  );

  return (
    <section className={`relative w-full h-screen max-h-[900px] overflow-hidden ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black' 
        : 'bg-gradient-to-br from-orange-50 via-yellow-50 to-white'
    }`}>
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <FloatingElement 
            key={i} 
            delay={i * 0.5}
            size={Math.random() * 250 + 50}
            duration={Math.random() * 15 + 10}
          />
        ))}
      </div>

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
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
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