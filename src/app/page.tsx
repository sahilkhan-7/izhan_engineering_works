"use client";

import { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import About from "@/components/About";
import Specializations from "@/components/Specializations";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";


// Custom hook for dark mode
const useDarkMode = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved) {
      setIsDark(JSON.parse(saved));
    }
  }, []);

  const toggle = () => {
    const newValue = !isDark;
    setIsDark(newValue);
    localStorage.setItem('darkMode', JSON.stringify(newValue));
  };

  return [isDark, toggle];
};

export default function HomePage() {
  const [isDark, toggleDark] = useDarkMode();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      <Navbar isDark={isDark} toggleDark={toggleDark} />
      <HeroSection isDark={isDark} />
      <About isDark={isDark}/>
      <Projects isDark={isDark}/>
      <Specializations isDark={isDark}/>
      <Testimonials isDark={isDark} />
      <ContactForm isDark={isDark} />
      <Footer isDark={isDark} />
    </div>
  );
}