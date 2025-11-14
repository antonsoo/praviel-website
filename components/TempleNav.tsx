"use client";

import { useEffect, useState } from "react";

type Civilization = "egypt" | "greece" | "rome";

type SectionNavItem = {
  id: string;
  label: string;
  glyph: string;
  civilization: Civilization;
  description: string;
};

function useMediaQuery(query: string, fallback = true) {
  // Always use fallback on first render to prevent hydration mismatch
  const [matches, setMatches] = useState(fallback);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted || typeof window === "undefined") {
      return;
    }
    const mediaQuery = window.matchMedia(query);
    const update = () => setMatches(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, [query, hasMounted]);

  return matches;
}

const NAV_SECTIONS: SectionNavItem[] = [
  {
    id: "hero-section",
    label: "Torch Room",
    glyph: "𓇳",
    civilization: "egypt",
    description: "Egypt · Torch procession",
  },
  {
    id: "civilization-portals",
    label: "Portals",
    glyph: "𓉐",
    civilization: "egypt",
    description: "Egypt · Greece · Rome",
  },
  {
    id: "civilization-triad",
    label: "Triad",
    glyph: "Ω",
    civilization: "greece",
    description: "Greece · Pantheon",
  },
  {
    id: "material-study",
    label: "Material Lab",
    glyph: "𓊖",
    civilization: "egypt",
    description: "Egypt · Material study",
  },
  {
    id: "living-manuscript",
    label: "Manuscript",
    glyph: "Ↄ",
    civilization: "rome",
    description: "Rome · Scriptorium",
  },
  {
    id: "journey-timeline",
    label: "Campaign",
    glyph: "Ⅻ",
    civilization: "rome",
    description: "Rome · Campaign map",
  },
  {
    id: "language-showcase",
    label: "Language Atlas",
    glyph: "Λ",
    civilization: "greece",
    description: "Greece · Scholars' atlas",
  },
  {
    id: "voice-tour",
    label: "Voice Tour",
    glyph: "𓂀",
    civilization: "egypt",
    description: "Egypt · Audio guide",
  },
  {
    id: "features",
    label: "Feature Grid",
    glyph: "⚖",
    civilization: "rome",
    description: "Rome · Systems",
  },
];

const OBSERVER_OPTIONS: IntersectionObserverInit = {
  root: null,
  rootMargin: "-45% 0px -45% 0px",
  threshold: [0.1, 0.25, 0.4],
};

const hasDocument = () => typeof document !== "undefined";

export default function TempleNav() {
  const [activeId, setActiveId] = useState<string>(NAV_SECTIONS[0]?.id ?? "hero-section");
  const enableObserver = useMediaQuery("(min-width: 768px)", false);
  const showNav = useMediaQuery("(min-width: 1024px)", false);

  useEffect(() => {
    if (!hasDocument()) {
      return;
    }

    const doc = document.documentElement;
    const section = NAV_SECTIONS.find((item) => item.id === activeId);

    if (section) {
      doc.dataset.scene = section.civilization;
    } else {
      delete doc.dataset.scene;
    }

    return () => {
      if (!hasDocument()) {
        return;
      }
      delete document.documentElement.dataset.scene;
    };
  }, [activeId]);

  useEffect(() => {
    if (!hasDocument() || !enableObserver) return undefined;

    const targets = NAV_SECTIONS
      .map((section) => {
        const element = document.getElementById(section.id);
        return element ? { id: section.id, element } : null;
      })
      .filter(Boolean) as Array<{ id: string; element: Element }>;

    if (targets.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      const candidate = entries
        .filter((entry) => entry.intersectionRatio > 0)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (candidate?.target?.id) {
        setActiveId((current) => (current === candidate.target.id ? current : candidate.target.id));
        return;
      }

      if (window.scrollY < 120) {
        setActiveId(NAV_SECTIONS[0].id);
      }
    }, OBSERVER_OPTIONS);

    targets.forEach(({ element }) => observer.observe(element));

    return () => observer.disconnect();
  }, [enableObserver]);

  return (
    <nav
      className="temple-nav"
      aria-label="Civilization quick links"
      style={{ display: showNav ? 'block' : 'none' }}
      aria-hidden={!showNav}
    >
      <div className="temple-nav__panel">
        <p className="temple-nav__title">Temple map</p>
        <ul className="temple-nav__list">
          {NAV_SECTIONS.map((section) => {
            const isActive = section.id === activeId;
            return (
              <li key={section.id} className="temple-nav__item">
                <a
                  href={`#${section.id}`}
                  className={`temple-nav__link${isActive ? " temple-nav__link--active" : ""}`}
                  data-civilization={section.civilization}
                  aria-label={`${section.label} — ${section.description}`}
                  aria-current={isActive ? "true" : undefined}
                >
                  <span className="temple-nav__glyph" aria-hidden>
                    {section.glyph}
                  </span>
                  <span className="temple-nav__copy">
                    <span className="temple-nav__label">{section.label}</span>
                    <span className="temple-nav__description">{section.description}</span>
                  </span>
                  <span className="temple-nav__indicator" aria-hidden />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
