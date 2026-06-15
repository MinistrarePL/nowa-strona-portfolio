"use client";

import { ContactGlassIcon } from "@/components/portfolio/contact-glass-icon";
import StarBorder from "@/components/StarBorder";
import { Container } from "@/components/layout/container";
import { sectionTitleClassName } from "@/components/layout/section-styles";
import { Mail } from "lucide-react";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const contactLinks = [
  {
    href: "mailto:mateusz.glasek@gmail.com",
    label: "mateusz.glasek@gmail.com",
    color: "emerald",
    icon: <Mail className="h-6 w-6" strokeWidth={1.75} />,
  },
  {
    href: "https://www.linkedin.com/in/mateuszglasek/",
    label: "mateuszglasek/",
    color: "cyan",
    icon: <LinkedInIcon className="h-6 w-6" />,
    external: true,
  },
] as const;

export function Contact() {
  return (
    <section id="contact" className="bg-black">
      <Container>
        <h2 className={sectionTitleClassName}>Contact</h2>

        <div className="mt-10 flex justify-center md:mt-12">
          <StarBorder
            as="div"
            color="var(--primary)"
            className="w-full max-w-xl"
            innerClassName="bg-black p-12 backdrop-blur-md md:p-14"
          >
            <div className="flex flex-col gap-12 md:gap-14">
              {contactLinks.map((link) => (
                <ContactGlassIcon
                  key={link.href}
                  href={link.href}
                  color={link.color}
                  icon={link.icon}
                  label={link.label}
                  external={"external" in link ? link.external : false}
                />
              ))}
            </div>
          </StarBorder>
        </div>
      </Container>
    </section>
  );
}
