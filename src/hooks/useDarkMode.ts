"use client";

import { useState, useEffect, useCallback } from "react";

// Custom hook to manage dark mode
export const useDarkMode = (): [boolean, () => void] => {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("darkMode");
      if (saved !== null) {
        setIsDark(JSON.parse(saved));
      } else {
        // Default to system preference
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setIsDark(prefersDark);
      }
    }
  }, []);

  const toggle = useCallback(() => {
    setIsDark((prev) => {
      const newValue = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem("darkMode", JSON.stringify(newValue));
      }
      return newValue;
    });
  }, []);

  return [isDark, toggle];
};
