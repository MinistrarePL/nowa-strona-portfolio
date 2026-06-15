"use client";

import { Container } from "@/components/layout/container";
import { ProjectStack } from "@/components/portfolio/project-stack";
import { sectionTitleClassName } from "@/components/layout/section-styles";
import { useState } from "react";

const projects = [
  {
    id: "financial-data",
    title: "Shaping global financial data fuels",
    description:
      "Platform design for financial data products — from complex dashboards to workflows used by analysts and portfolio managers across global markets.",
  },
  {
    id: "sandbox",
    title: "My sandbox, my rules",
    description:
      "Personal experiments and side projects where I test new interaction patterns, AI-assisted flows, and rapid MVP ideas without enterprise constraints.",
  },
  {
    id: "business",
    title: "Shaping business",
    description:
      "Product and UX work for B2B teams — aligning user needs with business goals, stakeholder expectations, and delivery timelines.",
  },
  {
    id: "one-man-army",
    title: "One man army",
    description:
      "End-to-end delivery across research, UI, prototyping, and no-code builds — a single designer-owner moving ideas from concept to shippable product.",
  },
] as const;

export function ProjectsOverview() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="projects" className="bg-black pt-12">
      <Container>
        <h2 className={sectionTitleClassName}>Projects Overview</h2>

        <div className="mt-8 md:mt-12">
          <ProjectStack
            activeIndex={activeIndex}
            onSelect={setActiveIndex}
            items={projects}
          />
        </div>
      </Container>
    </section>
  );
}
