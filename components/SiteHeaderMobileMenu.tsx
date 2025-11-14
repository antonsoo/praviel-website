"use client";

import Link from "next/link";
import { useId, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

type NavLink = {
  href: string;
  label: string;
};

interface SiteHeaderMobileMenuProps {
  links: NavLink[];
}

export default function SiteHeaderMobileMenu({ links }: SiteHeaderMobileMenuProps) {
  const menuId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleMenu = () => setIsOpen((value) => !value);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        className="site-header-summary flex h-11 min-w-[44px] items-center justify-center rounded-full text-2xl text-zinc-400 transition-colors duration-200 ease-out hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C55B]/70"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={toggleMenu}
      >
        <span className="sr-only">Toggle navigation</span>
        <span aria-hidden className={isOpen ? "hidden" : "inline"}>☰</span>
        <span aria-hidden className={isOpen ? "inline" : "hidden"}>✕</span>
      </button>
      <div
        id={menuId}
        className={`site-header-menu-panel border-t border-white/10 transition-[max-height,opacity] duration-300 ease-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
        role="menu"
        aria-label="Primary navigation"
      >
        <div className="space-y-2 px-0 pt-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch={false}
              className="block min-h-[44px] rounded-lg px-4 py-3 text-base text-zinc-300 transition-colors duration-200 hover:bg-[#D4AF37]/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C55B]/60"
              onClick={closeMenu}
              role="menuitem"
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => {
              closeMenu();
              document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="block min-h-[44px] rounded-lg px-4 py-3 text-left font-medium text-[#E8C55B] transition-colors duration-200 hover:text-[#F5E4B8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C55B]/60"
            role="menuitem"
          >
            Get early access
          </button>
        </div>
      </div>
    </div>
  );
}
