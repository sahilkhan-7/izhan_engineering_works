"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { useDarkMode } from "@/hooks/useDarkMode";

export default function NavbarClient() {
  const [isDark, toggleDark] = useDarkMode();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return <Navbar isDark={isDark} toggleDark={toggleDark} />;
}
