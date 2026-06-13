"use client";

import { TestimonialsCarousel } from "@/components/portfolio/testimonials-carousel";
import { Container } from "@/components/layout/container";
import { GlassButton } from "@/components/ui/glass-button";

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-black py-24 md:py-32">
      <Container>
        <h2 className="text-center text-4xl text-white md:text-5xl lg:text-6xl">
          Received Testimonials
        </h2>

        <div className="mt-14 flex justify-center">
          <TestimonialsCarousel />
        </div>

        <div className="mt-12 flex justify-center">
          <GlassButton
            size="lg"
            className="border-emerald-300 bg-emerald-300 text-black shadow-none hover:bg-emerald-200 hover:text-black before:hidden"
            asChild
          >
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
              See more on LinkedIn
            </a>
          </GlassButton>
        </div>
      </Container>
    </section>
  );
}
