"use client";

import { TestimonialsCarousel } from "@/components/portfolio/testimonials-carousel";
import { Container } from "@/components/layout/container";
import { sectionTitleClassName, outlineButtonClassName } from "@/components/layout/section-styles";

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-black pt-12">
      <Container>
        <h2 className={sectionTitleClassName}>Received Testimonials</h2>

        <div className="mt-10 flex justify-center md:mt-12">
          <TestimonialsCarousel />
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href="https://www.linkedin.com/in/mateuszglasek/"
            target="_blank"
            rel="noreferrer"
            className={outlineButtonClassName}
          >
            See more on LinkedIn
          </a>
        </div>
      </Container>
    </section>
  );
}
