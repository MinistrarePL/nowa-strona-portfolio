"use client";

import { TestimonialsCarousel } from "@/components/portfolio/testimonials-carousel";
import { Container } from "@/components/layout/container";
import { sectionTitleClassName } from "@/components/layout/section-styles";
import { GlassButton } from "@/components/ui/glass-button";

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-black">
      <Container>
        <h2 className={sectionTitleClassName}>Received Testimonials</h2>

        <div className="mt-10 flex justify-center md:mt-12">
          <TestimonialsCarousel />
        </div>

        <div className="mt-12 flex justify-center">
          <GlassButton
            size="lg"
            className="border-emerald-300 bg-emerald-300 text-black shadow-none hover:bg-emerald-200 hover:text-black before:hidden"
            asChild
          >
            <a href="https://www.linkedin.com/in/mateuszglasek/" target="_blank" rel="noreferrer">
              See more on LinkedIn
            </a>
          </GlassButton>
        </div>
      </Container>
    </section>
  );
}
