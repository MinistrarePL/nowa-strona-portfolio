"use client";

import { Container } from "@/components/layout/container";
import { smoothScrollToHash } from "@/lib/smooth-scroll";

const navItems = [
  { label: "Offer", href: "#offer" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Why me?", href: "#why-me" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

export function Header() {
  return (
    <header className="relative z-20 shrink-0 py-[clamp(0.75rem,1.75vh,1.5rem)]">
      <Container>
        <nav className="flex items-center justify-center">
          <ul className="flex flex-wrap items-center justify-center gap-x-[clamp(1rem,3vw,2rem)] gap-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-[18px] text-white/70 transition-colors hover:text-emerald-300"
                  onClick={(event) => {
                    event.preventDefault();
                    smoothScrollToHash(item.href);
                    window.history.pushState(null, "", item.href);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
