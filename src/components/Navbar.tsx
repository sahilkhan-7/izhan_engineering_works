// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { useState } from "react";
// import { motion } from "framer-motion";

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);

//   const handleNavClick = () => setMenuOpen(false);

//   return (
//     <motion.nav
//       initial={{ y: -50, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.6, ease: "easeOut" }}
//       className="fixed top-0 left-0 right-0 z-50 bg-gray-100 shadow-sm border-b border-gray-200"
//     >
//       <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center h-[64px]">
//         <Link href="/">
//           <Image
//             src="/logo.png"
//             alt="Izhan Engineering Works"
//             width={110}
//             height={110}
//             className="object-contain"
//             priority
//           />
//         </Link>

//         {/* Desktop Nav */}
//         <ul className="hidden md:flex gap-6 font-medium text-gray-700 text-l">
//           <li><a href="#about" className="hover:text-blue-600 transition"><b>About</b></a></li>
//           <li><a href="#specialization" className="hover:text-blue-600 transition"><b>Specializations</b></a></li>
//           <li><a href="#projects" className="hover:text-blue-600 transition"><b>Projects</b></a></li>
//           <li><a href="#contact" className="hover:text-blue-600 transition"><b>Contact</b></a></li>
//           <li><a href="/team" className="hover:text-blue-600 transition"><b>Team</b></a></li>
//         </ul>

//         {/* Hamburger Button */}
//         <button
//           className="md:hidden text-gray-700"
//           onClick={() => setMenuOpen(!menuOpen)}
//           aria-label="Toggle menu"
//         >
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth={2}
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d={
//                 menuOpen
//                   ? "M6 18L18 6M6 6l12 12"
//                   : "M4 6h16M4 12h16M4 18h16"
//               }
//             />
//           </svg>
//         </button>
//       </div>

//       {/* Mobile Nav */}
//       {menuOpen && (
//         <motion.ul
//           initial={{ height: 0 }}
//           animate={{ height: "auto" }}
//           transition={{ duration: 0.3 }}
//           className="md:hidden bg-gray-100 border-t border-gray-100 px-6 py-4 space-y-3 text-gray-700 font-medium text-sm"
//         >
//           <li><a href="#about" onClick={handleNavClick}><b>About</b></a></li>
//           <li><a href="#specialization" onClick={handleNavClick}><b>Specializations</b></a></li>
//           <li><a href="#projects" onClick={handleNavClick}><b>Projects</b></a></li>
//           <li><a href="#contact" onClick={handleNavClick}><b>Contact</b></a></li>
//           <li><a href="/team" onClick={handleNavClick}><b>Team</b></a></li>
//         </motion.ul>
//       )}
//     </motion.nav>
//   );
// }

"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import Link from 'next/link';

interface NavbarProps {
  isDark: boolean;
  toggleDark: () => void;
}

export default function Navbar({ isDark, toggleDark }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Specializations', href: '#specialization' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
    { name: 'Team', href: '/team' }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? isDark 
            ? 'bg-gray-900/95 backdrop-blur-lg shadow-2xl border-b border-orange-500/20' 
            : 'bg-white/95 backdrop-blur-lg shadow-2xl border-b border-orange-200'
          : isDark
            ? 'bg-transparent'
            : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="flex items-center"
        >
          <Link href="/" className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">I</span>
            </div>
            <span className="ml-3 text-xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
              Izhan Engineering
            </span>
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-8 font-medium">
            {navItems.map((item, index) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <a 
                  href={item.href}
                  className={`relative py-2 px-1 transition-colors duration-300 ${
                    isDark ? 'text-gray-200 hover:text-orange-400' : 'text-gray-700 hover:text-orange-600'
                  }`}
                >
                  {item.name}
                  <motion.span
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-yellow-400"
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </a>
              </motion.li>
            ))}
          </ul>

          {/* Dark Mode Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleDark}
            className={`p-2 rounded-full transition-all duration-300 ${
              isDark 
                ? 'bg-yellow-400 text-gray-900 shadow-lg shadow-yellow-400/50' 
                : 'bg-gray-800 text-yellow-400 shadow-lg shadow-gray-800/50'
            }`}
            aria-label="Toggle dark mode"
          >
            <AnimatePresence mode="wait">
              {isDark ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Sun className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Moon className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu Button & Dark Mode */}
        <div className="md:hidden flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleDark}
            className={`p-2 rounded-full transition-all duration-300 ${
              isDark 
                ? 'bg-yellow-400 text-gray-900' 
                : 'bg-gray-800 text-yellow-400'
            }`}
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </motion.button>

          <button
            className={`p-2 transition-colors duration-300 ${
              isDark ? 'text-gray-200' : 'text-gray-700'
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <motion.div
              animate={menuOpen ? { rotate: 180 } : { rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden ${
              isDark 
                ? 'bg-gray-900/95 backdrop-blur-lg border-t border-orange-500/20' 
                : 'bg-white/95 backdrop-blur-lg border-t border-orange-200'
            }`}
          >
            <ul className="px-6 py-6 space-y-4">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a 
                    href={item.href}
                    onClick={handleNavClick}
                    className={`block py-2 font-medium transition-colors duration-300 ${
                      isDark ? 'text-gray-200 hover:text-orange-400' : 'text-gray-700 hover:text-orange-600'
                    }`}
                  >
                    {item.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}