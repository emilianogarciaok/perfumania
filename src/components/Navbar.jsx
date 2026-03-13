"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Inicio", href: "/", scrollTo: "top" },
  { label: "Catálogo", href: "/#catalogo", scrollTo: "catalogo" },
  { label: "Contacto", href: "https://wa.me/5493885178485", external: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleSmoothScroll = useCallback((e, scrollTo) => {
    e.preventDefault();
    setMenuOpen(false);
    if (scrollTo === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(scrollTo);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/90 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-serif text-xl md:text-2xl tracking-[0.15em] text-white font-bold transition-colors group-hover:text-yellow-400">
            PERFUMANIA
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) =>
            link.external ? (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 text-xs uppercase tracking-[0.2em] font-medium hover:text-yellow-400 transition-colors duration-300"
                >
                  {link.label}
                </a>
              </li>
            ) : (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={link.scrollTo ? (e) => handleSmoothScroll(e, link.scrollTo) : undefined}
                  className="text-white/80 text-xs uppercase tracking-[0.2em] font-medium hover:text-yellow-400 transition-colors duration-300"
                >
                  {link.label}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* Hamburger Button - Mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 group"
          aria-label="Menú"
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 top-16 bg-black/95 backdrop-blur-lg transition-all duration-400 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col items-center justify-center h-full gap-10 -mt-16">
          {NAV_LINKS.map((link) =>
            link.external ? (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="text-white text-lg uppercase tracking-[0.3em] font-light hover:text-yellow-400 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ) : (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={link.scrollTo ? (e) => handleSmoothScroll(e, link.scrollTo) : () => setMenuOpen(false)}
                  className="text-white text-lg uppercase tracking-[0.3em] font-light hover:text-yellow-400 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            )
          )}
        </ul>
      </div>
    </nav>
  );
}
