"use client";

import Carousel, { type CarouselItem } from "@/components/Carousel";
import { testimonials } from "@/config/testimonials";
import { Quote } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const CARDS_PER_SLIDE = 3;

export function TestimonialsCarousel() {
  const [baseWidth, setBaseWidth] = useState(1120);

  useEffect(() => {
    const updateWidth = () => {
      setBaseWidth(Math.min(1120, window.innerWidth - 48));
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const items = useMemo<CarouselItem[]>(() => {
    const slides: CarouselItem[] = [];

    for (let i = 0; i < testimonials.length; i += CARDS_PER_SLIDE) {
      const group = testimonials.slice(i, i + CARDS_PER_SLIDE);
      slides.push({
        id: i / CARDS_PER_SLIDE + 1,
        title: group.map((item) => item.author).join(" · "),
        description: "",
        icon: <Quote className="size-4 text-emerald-300" strokeWidth={1.5} />,
        testimonials: group,
      });
    }

    return slides;
  }, []);

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
