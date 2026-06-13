import { sectionGapClassName } from "@/components/layout/section-styles";
import { Hero } from "@/components/portfolio/hero";
import { Offer } from "@/components/portfolio/offer";
import { Testimonials } from "@/components/portfolio/testimonials";
import { WhyMe } from "@/components/portfolio/why-me";
import { WorkedFor } from "@/components/portfolio/worked-for";

export default function Home() {
  return (
    <main className={`flex flex-col ${sectionGapClassName}`}>
      <Hero />
      <Offer />
      <Testimonials />
      <WhyMe />
      <WorkedFor />
    </main>
  );
}
