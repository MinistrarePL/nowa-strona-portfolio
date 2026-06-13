"use client";

import Aurora from "@/components/Aurora";
import { Container } from "@/components/layout/container";
import { Header } from "@/components/portfolio/header";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

const tags = ["#finance", "#fintech", "#investing"] as const;

const MAX_SCALE = 1.35;
const MIN_SCALE = 0.45;

export function Hero() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const fitContent = () => {
      const viewport = viewportRef.current;
      const content = contentRef.current;
      if (!viewport || !content) return;

      content.style.transform = "scale(1)";

      requestAnimationFrame(() => {
        const availableHeight = viewport.clientHeight;
        const availableWidth = viewport.clientWidth;
        const contentRect = content.getBoundingClientRect();
        const neededHeight = contentRect.height;
        const neededWidth = contentRect.width;

        if (availableHeight <= 0 || neededHeight <= 0 || neededWidth <= 0) return;

        let nextScale = Math.min(
          MAX_SCALE,
          availableHeight / neededHeight,
          availableWidth / neededWidth,
        );
        nextScale = Math.max(MIN_SCALE, nextScale);

        const measureOverflow = (scaleValue: number) => {
          content.style.transform = `scale(${scaleValue})`;
          const contentRect = content.getBoundingClientRect();
          const viewportRect = viewport.getBoundingClientRect();
          return Math.max(
            viewportRect.top - contentRect.top,
            contentRect.bottom - viewportRect.bottom,
            viewportRect.left - contentRect.left,
            contentRect.right - viewportRect.right,
          );
        };

        while (measureOverflow(nextScale) > 1 && nextScale > MIN_SCALE) {
          nextScale = Math.max(MIN_SCALE, nextScale - 0.02);
        }

        setScale(nextScale);
      });
    };

    fitContent();

    const observer = new ResizeObserver(fitContent);
    if (viewportRef.current) observer.observe(viewportRef.current);
    if (contentRef.current) observer.observe(contentRef.current);

    window.addEventListener("resize", fitContent);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", fitContent);
    };
  }, []);

  return (
    <section className="relative h-dvh overflow-hidden">
      <div className="absolute inset-0">
        <Aurora
          colorStops={["#6ee7b7", "#67e8f9", "#6ee7b7"]}
          amplitude={1.2}
          blend={0.6}
          speed={0.8}
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/50 to-black" />
      </div>

      <div className="relative z-10 flex h-full flex-col">
        <Header />

        <div ref={viewportRef} className="relative min-h-0 flex-1 overflow-hidden">
          <Container className="absolute inset-0 flex items-center justify-center">
            <div
              ref={contentRef}
              className="flex w-full max-w-3xl flex-col items-center text-center will-change-transform"
              style={{
                transform: `scale(${scale})`,
                transformOrigin: "center center",
              }}
            >
              <div className="relative size-[clamp(7rem,26vh,22rem)] shrink-0 overflow-hidden rounded-full border-[3px] border-emerald-300/40">
                <Image
                  src="/images/profile.png"
                  alt="Zdjęcie profilowe"
                  fill
                  className="object-cover opacity-85"
                  priority
                  sizes="(max-width: 640px) 40vw, 352px"
                />
              </div>

              <h1 className="mt-[clamp(0.75rem,2.5vh,2.5rem)] text-[clamp(2.75rem,9.5vh,7rem)] leading-none tracking-tight text-white">
                Hello!
              </h1>

              <p className="mt-[clamp(0.5rem,1.5vh,1.75rem)] text-[clamp(0.9375rem,2.4vh,1.625rem)] leading-[1.45] text-white/75">
                I am Lead Product Designer focused on delivering value to both the user and the
                business, while working within the available budget and technology constraints.
                It&apos;s as simple as that.
              </p>

              <div className="mt-[clamp(0.5rem,1.5vh,2rem)] flex flex-wrap items-center justify-center gap-x-[clamp(0.75rem,2vw,1.5rem)] gap-y-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[clamp(0.875rem,1.8vh,1.25rem)] text-cyan-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button
                type="button"
                className="mt-[clamp(0.75rem,2vh,2.5rem)] shrink-0 rounded-full border-2 border-emerald-300 px-[clamp(1.75rem,4vw,2.5rem)] py-[clamp(0.625rem,1.2vh,1rem)] text-[clamp(0.9375rem,1.8vh,1.125rem)] font-medium text-emerald-300 transition-colors hover:bg-emerald-300/10"
              >
                More
              </button>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
