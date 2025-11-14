"use client";

import { useEffect } from "react";

/**
 * Scroll Performance Optimizer
 * Pauses expensive animations during scroll to maintain 60fps
 * Adds 'is-scrolling' class to document element during scroll
 */
export default function ScrollPerformance() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let scrollTimeout: NodeJS.Timeout;
    let isScrolling = false;

    const handleScroll = () => {
      if (!isScrolling) {
        isScrolling = true;
        document.documentElement.classList.add("is-scrolling");
      }

      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        isScrolling = false;
        document.documentElement.classList.remove("is-scrolling");
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return null;
}
