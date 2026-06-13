"use client";

import SoftAurora from "@/components/SoftAurora";
import SpotlightCard from "@/components/SpotlightCard";
import { Container } from "@/components/layout/container";

const offers = [
  {
    title: "End to End Product Design",
    description:
      "From research to handoff — I design complete product experiences that are user-centered, scalable, and development-ready. Whether you're launching a startup or rethinking an enterprise platform, I'll guide you through every step of the design process.",
    spotlightColor: "rgba(110, 231, 183, 0.22)" as const,
  },
  {
    title: "MVP / POC Development",
    description:
      "Need to validate your idea fast? I help founders and product teams turn early-stage concepts into tangible MVPs and proof-of-concepts (nocode + vibe coding) that investors and users will understand — and love.",
    spotlightColor: "rgba(103, 232, 249, 0.22)" as const,
  },
  {
    title: "UX Consulting & Trainings",
    description:
      "Improve your product with expert UX insights or grow your team's design skills. I offer hands-on consulting and tailored training sessions grounded in real-world product design challenges.",
    spotlightColor: "rgba(110, 231, 183, 0.22)" as const,
  },
] as const;

export function Offer() {
  return (
    <section id="offer" className="relative isolate overflow-hidden bg-black pb-20 pt-8 md:pb-24 md:pt-12">
      <div className="pointer-events-none absolute inset-0 bg-black" />

      <div className="pointer-events-none absolute inset-0">
        <SoftAurora
          color1="#6ee7b7"
          color2="#67e8f9"
          brightness={1}
          speed={0.5}
          scale={1.4}
          bandHeight={0.45}
          bandSpread={1.2}
          enableMouseInteraction={false}
        />
      </div>

      <Container className="relative z-10">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer) => (
            <SpotlightCard
              key={offer.title}
              spotlightColor={offer.spotlightColor}
              className="border-white/15 bg-black/80 p-8 backdrop-blur-md md:p-10"
            >
              <h3 className="text-2xl leading-tight text-white md:text-3xl">{offer.title}</h3>
              <p className="mt-5 text-base leading-8 text-white/85 md:text-lg">{offer.description}</p>
            </SpotlightCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
