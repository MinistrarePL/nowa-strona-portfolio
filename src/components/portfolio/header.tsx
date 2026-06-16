"use client";

import { Container } from "@/components/layout/container";
import { smoothScrollToHash } from "@/lib/smooth-scroll";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Offer", href: "#offer" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Why me?", href: "#why-me" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

const navLinkClassName =
  "text-[18px] text-white/70 transition-colors hover:text-emerald-300";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 0);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrollState);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const closeMenu = () => setIsMenuOpen(false);
    window.addEventListener("resize", closeMenu);

    return () => {
      window.removeEventListener("resize", closeMenu);
    };
  }, []);

  const showBackground = isScrolled || isMenuOpen;

  const handleNavClick = (href: string) => {
    smoothScrollToHash(href);
    window.history.pushState(null, "", href);
    setIsMenuOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300",
        showBackground && "border-b border-white/5 bg-black/55 backdrop-blur-md",
      )}
    >
      <Container className="py-[clamp(0.75rem,1.75vh,1.5rem)]">
        <nav className="flex items-center justify-end md:justify-center">
          <ul className="hidden flex-wrap items-center justify-center gap-x-[clamp(1rem,3vw,2rem)] gap-y-2 md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={navLinkClassName}
                  onClick={(event) => {
                    event.preventDefault();
                    handleNavClick(item.href);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="flex size-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-emerald-300/40 hover:text-emerald-300 md:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>
      </Container>

      <div
        id="mobile-nav"
        className={cn(
          "overflow-hidden border-t border-white/10 bg-black/95 backdrop-blur-md transition-[max-height,opacity] duration-300 md:hidden",
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <Container className="py-5">
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={navLinkClassName}
                  onClick={(event) => {
                    event.preventDefault();
                    handleNavClick(item.href);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </header>
  );
}
