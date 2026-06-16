"use client";

import { Container } from "@/components/layout/container";
import { ProjectStack } from "@/components/portfolio/project-stack";
import { sectionTitleClassName, outlineButtonClassName } from "@/components/layout/section-styles";
import { useState } from "react";

const projects = [
  {
    id: "financial-data",
    title: "Shaping global financial data fuels",
    logo: {
      src: "/logos/sp-global.svg",
      alt: "S&P Global",
    },
    paragraphs: [
      "At S&P Global Energy (Commodity Insights), I am part of the product design team. We are responsible for both internal and external platforms.",
      [
        "Apart from contributing to the flagship ",
        {
          href: "https://www.spglobal.com/energy/en/products-solutions/delivery/platts-connect",
          label: "Core platform",
        },
        ", I have had the opportunity to design highly complex, specific domain platforms, such as applications for crude oil wellbore calculations and a system for monitoring gas pipelines in the US, as well as internal platforms for content creation and privilege access management.",
      ],
      "At S&P, I have significantly developed my technical and coding skills. I have mastered the design of complex, specific libraries such as AG Grid, Highcharts, TradingView and Ant, taking into account the specific requirements of the data (as data is a key product of S&P).",
      "I am responsible for building and maintaining our design system components library in Figma Make. For some projects, I created fully interactive, vibecoded prototypes that followed the best front-end practices.",
    ],
  },
  {
    id: "sandbox",
    title: "My sandbox, my rules",
    logo: {
      src: "/logos/simple-investing.svg",
      alt: "Simple Investing",
    },
    paragraphs: [
      [
        "As a huge fan of learning and investing, and developing my skills, building and developing my own app, ",
        { href: "https://simpleinvesting.org", label: "simpleinvesting.org" },
        ". I do it for a few reasons.",
      ],
      "It gives me an opportunity to develop my UX/Product Owner/Developer skills, which are not always possible in my regular work.",
      "Collecting feedback through PostHog or analysing web traffic gives me an opportunity to polish my designer/product manager workshop.",
      "It's also a great opportunity to deepen my industry, financial knowledge, as it's so important to have a domain-specific background as a designer.",
    ],
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

          <div className="mt-8 flex justify-center md:mt-10">
            <a href="#contact" className={outlineButtonClassName}>
              Connect me to get full portfolio
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
