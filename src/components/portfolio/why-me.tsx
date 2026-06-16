"use client";

import DotGrid from "@/components/DotGrid";
import SpotlightCard from "@/components/SpotlightCard";
import { Container } from "@/components/layout/container";

const leftColumnReasons = [
  {
    title: "Design within constraints",
    description:
      "I design smart, effective solutions that balance user needs with business goals — always keeping budget and technical limitations in mind.",
    spotlightColor: "rgba(110, 231, 183, 0.22)" as const,
  },
  {
    title: "Complex domain experience",
    description:
      "From financial dashboards to data-heavy tools, I specialize in designing intuitive interfaces for complex, domain-specific applications.",
    spotlightColor: "rgba(103, 232, 249, 0.22)" as const,
  },
] as const;

const rightColumnReasons = [
  {
    title: "Strategic product thinking",
    description:
      "I approach design holistically, combining UX expertise with product strategy to help you build not just features, but the right ones.",
    spotlightColor: "rgba(103, 232, 249, 0.22)" as const,
  },
  {
    title: "Tech-savvy designer",
    description:
      "With strong frontend know-how, I speak the language of developers — bridging the gap between design and implementation with ease.",
    spotlightColor: "rgba(110, 231, 183, 0.22)" as const,
  },
] as const;

function ReasonCard({
  title,
  description,
  spotlightColor,
}: {
  title: string;
  description: string;
  spotlightColor: `rgba(${number}, ${number}, ${number}, ${number})`;
}) {
  return (
    <SpotlightCard
      spotlightColor={spotlightColor}
      className="h-fit w-full self-start border-white/15 bg-black/80 p-6 backdrop-blur-md md:p-7"
    >
      <h3 className="text-xl leading-tight text-white md:text-2xl">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-white/80 md:text-base md:leading-8">{description}</p>
    </SpotlightCard>
  );
}

export function WhyMe() {
  return (
    <section id="why-me" className="relative isolate overflow-hidden bg-black pt-16 md:pt-0">
      <div className="pointer-events-none absolute inset-0">
        <DotGrid
          dotSize={8}
          gap={28}
          baseColor="#1f1f1f"
          activeColor="#6ee7b7"
          proximity={120}
          className="!p-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/25 via-black/55 to-black/90" />
      </div>

      <Container className="relative z-10 pb-4 md:pb-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12 xl:gap-16">
          <div className="text-center md:text-left">
            <h2 className="text-[clamp(1.625rem,3.5vw,2.5rem)] leading-tight text-white">
              Why to Work with Me?
            </h2>
            <p className="mt-6 text-base leading-8 text-white/75 md:text-lg md:leading-9">
              With over 9 years of experience in UX and product design, I&apos;ve tackled everything
              from early-stage startups to complex enterprise systems. I bring clarity, structure, and
              a deep understanding of what makes digital products truly work.
            </p>
          </div>

          <div className="lg:pt-20 xl:pt-28">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
              <div className="flex w-full flex-col gap-4 sm:max-w-[calc(50%-0.625rem)] sm:gap-5">
                {leftColumnReasons.map((reason) => (
                  <ReasonCard key={reason.title} {...reason} />
                ))}
              </div>
              <div className="flex w-full flex-col gap-4 sm:max-w-[calc(50%-0.625rem)] sm:gap-5 sm:pt-14 lg:pt-20">
                {rightColumnReasons.map((reason) => (
                  <ReasonCard key={reason.title} {...reason} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
