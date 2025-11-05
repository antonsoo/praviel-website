"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

type CookiePreferences = {
  essential: boolean;
  functional: boolean;
  analytics: boolean;
};

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always required
    functional: false,
    analytics: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      // Delay showing banner for better UX
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      essential: true,
      functional: true,
      analytics: true,
    };
    savePreferences(allAccepted);
  };

  const handleRejectAll = () => {
    const essentialOnly: CookiePreferences = {
      essential: true,
      functional: false,
      analytics: false,
    };
    savePreferences(essentialOnly);
  };

  const handleSavePreferences = () => {
    savePreferences(preferences);
  };

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem("cookie_consent", JSON.stringify(prefs));
    localStorage.setItem(
      "cookie_consent_date",
      new Date().toISOString()
    );
    setShowBanner(false);

    // Dispatch event for other parts of app to react to
    window.dispatchEvent(
      new CustomEvent("cookieConsentUpdated", { detail: prefs })
    );
  };

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-end justify-center p-4 sm:items-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm pointer-events-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => !showDetails && setShowBanner(false)}
        />

        {/* Banner */}
        <motion.div
          className="relative w-full max-w-2xl bg-gradient-to-br from-zinc-800 via-zinc-900 to-zinc-950 border-2 border-violet-500/50 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
          initial={{ y: 100, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/30 via-purple-500/30 to-violet-500/30 animate-pulse" />

          {/* Content */}
          <div className="relative p-6 sm:p-8">
            {/* Icon and Title */}
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-violet-500/20 flex items-center justify-center">
                <span className="text-2xl">🍪</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-violet-200 mb-2">
                  Cookie Preferences
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  We use cookies to enhance your experience. Essential cookies
                  are required for the site to function. You can choose which
                  optional cookies to accept.
                </p>
              </div>
            </div>

            {/* Expandable Details */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  className="mt-6 space-y-4"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Essential Cookies */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-violet-300 mb-1 flex items-center gap-2">
                          Essential Cookies
                          <span className="text-xs font-normal text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded">
                            Required
                          </span>
                        </h4>
                        <p className="text-xs text-zinc-500">
                          Necessary for the website to function. Cannot be
                          disabled.
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="w-10 h-6 rounded-full bg-violet-500/30 border border-violet-500/50 flex items-center justify-end px-1">
                          <div className="w-4 h-4 rounded-full bg-violet-400" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Functional Cookies */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-violet-300 mb-1">
                          Functional Cookies
                        </h4>
                        <p className="text-xs text-zinc-500">
                          Remember your preferences (theme, language, etc.).
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setPreferences((prev) => ({
                            ...prev,
                            functional: !prev.functional,
                          }))
                        }
                        className="flex-shrink-0"
                      >
                        <div
                          className={`w-10 h-6 rounded-full border transition-all ${
                            preferences.functional
                              ? "bg-violet-500/30 border-violet-500/50"
                              : "bg-zinc-800 border-zinc-700"
                          } flex items-center ${
                            preferences.functional
                              ? "justify-end"
                              : "justify-start"
                          } px-1`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full transition-all ${
                              preferences.functional
                                ? "bg-violet-400"
                                : "bg-zinc-600"
                            }`}
                          />
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-violet-300 mb-1">
                          Analytics Cookies
                        </h4>
                        <p className="text-xs text-zinc-500">
                          Help us understand usage patterns (anonymized data
                          only).
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setPreferences((prev) => ({
                            ...prev,
                            analytics: !prev.analytics,
                          }))
                        }
                        className="flex-shrink-0"
                      >
                        <div
                          className={`w-10 h-6 rounded-full border transition-all ${
                            preferences.analytics
                              ? "bg-violet-500/30 border-violet-500/50"
                              : "bg-zinc-800 border-zinc-700"
                          } flex items-center ${
                            preferences.analytics
                              ? "justify-end"
                              : "justify-start"
                          } px-1`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full transition-all ${
                              preferences.analytics
                                ? "bg-violet-400"
                                : "bg-zinc-600"
                            }`}
                          />
                        </div>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              {!showDetails ? (
                <>
                  {/* Equal prominence buttons */}
                  <motion.button
                    onClick={handleRejectAll}
                    className="flex-1 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold rounded-lg transition-all border border-zinc-700 hover:border-zinc-600"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Reject All
                  </motion.button>
                  <motion.button
                    onClick={handleAcceptAll}
                    className="flex-1 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-lg transition-all border border-violet-500 hover:border-violet-400"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Accept All
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.button
                    onClick={() => setShowDetails(false)}
                    className="flex-1 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium rounded-lg transition-all border border-zinc-700"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Back
                  </motion.button>
                  <motion.button
                    onClick={handleSavePreferences}
                    className="flex-1 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-lg transition-all border border-violet-500"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Save Preferences
                  </motion.button>
                </>
              )}
            </div>

            {/* Customize button */}
            {!showDetails && (
              <button
                onClick={() => setShowDetails(true)}
                className="w-full mt-3 text-sm text-violet-400 hover:text-violet-300 transition-colors underline"
              >
                Customize Settings
              </button>
            )}

            {/* Privacy Policy Link */}
            <p className="mt-4 text-xs text-center text-zinc-500">
              Read our{" "}
              <a
                href="/privacy"
                className="text-violet-400 hover:text-violet-300 underline"
              >
                Privacy Policy
              </a>{" "}
              for more information.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
