"use client";

import Carousel, { type CarouselItem } from "@/components/Carousel";
import { testimonials } from "@/config/testimonials";
import { Quote } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const CARDS_PER_SLIDE_DESKTOP = 3;
const MOBILE_BREAKPOINT = 768;

export function TestimonialsCarousel() {
  const [baseWidth, setBaseWidth] = useState(1120);
  const [cardsPerSlide, setCardsPerSlide] = useState(1);

  useEffect(() => {
    const updateLayout = () => {
      const isDesktop = window.innerWidth >= MOBILE_BREAKPOINT;
      setCardsPerSlide(isDesktop ? CARDS_PER_SLIDE_DESKTOP : 1);
      setBaseWidth(Math.min(1120, window.innerWidth - 48));
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  const items = useMemo<CarouselItem[]>(() => {
    const slides: CarouselItem[] = [];

    for (let i = 0; i < testimonials.length; i += cardsPerSlide) {
      const group = testimonials.slice(i, i + cardsPerSlide);
      slides.push({
        id: i / cardsPerSlide + 1,
        title: group.map((item) => item.author).join(" · "),
        description: "",
        icon: <Quote className="size-4 text-emerald-300" strokeWidth={1.5} />,
        testimonials: group,
      });
    }

    return slides;
  }, [cardsPerSlide]);

  return (
    <Carousel
      items={items}
      baseWidth={baseWidth}
      loop
      autoplay
      autoplayDelay={6000}
      pauseOnHover
    />
  );
}
