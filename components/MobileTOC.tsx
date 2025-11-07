"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

type Section = {
  id: string;
  title: string;
};

type MobileTOCProps = {
  sections: Section[];
  activeSection: string;
  onSectionClick: (_sectionId: string) => void;
};

export default function MobileTOC({
  sections,
  activeSection,
  onSectionClick,
}: MobileTOCProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSectionClick = (id: string) => {
    onSectionClick(id);
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Menu Button - Only visible on mobile */}
      <motion.button
        data-testid="mobile-toc-toggle"
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed z-40 w-14 h-14 bg-gradient-to-br from-violet-600 to-purple-600 rounded-full shadow-lg flex items-center justify-center text-white"
        style={{
          bottom: "calc(1.5rem + var(--safe-area-bottom))",
          right: "calc(1.5rem + var(--safe-area-right))",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5 }}
        aria-label="Open table of contents"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </motion.button>

      {/* Drawer Overlay and Content */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="fixed right-0 top-0 bottom-0 w-[85%] max-w-sm bg-zinc-900 border-l border-violet-500/20 shadow-2xl z-[101] overflow-y-auto lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-b from-zinc-900 via-zinc-900 to-transparent z-10 pb-4">
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <h2 className="text-lg font-bold bg-gradient-to-r from-violet-300 to-purple-300 bg-clip-text text-transparent">
                    Table of Contents
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-11 h-11 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                    aria-label="Close table of contents"
                  >
                    <svg
                      className="w-5 h-5 text-zinc-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Sections List */}
              <nav className="p-4 space-y-1">
                {sections.map((section, i) => (
                  <motion.button
                    key={section.id}
                    onClick={() => handleSectionClick(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all ${
                      activeSection === section.id
                        ? "bg-violet-500/20 text-violet-300 font-semibold border border-violet-500/30"
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
                    }`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          activeSection === section.id
                            ? "bg-violet-400"
                            : "bg-zinc-600"
                        }`}
                      />
                      {section.title}
                    </div>
                  </motion.button>
                ))}
              </nav>

              {/* Footer */}
              <div className="sticky bottom-0 p-6 bg-gradient-to-t from-zinc-900 via-zinc-900 to-transparent border-t border-white/10 mt-8">
                <p className="text-xs text-zinc-500 text-center">
                  Scroll or tap a section to navigate
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
