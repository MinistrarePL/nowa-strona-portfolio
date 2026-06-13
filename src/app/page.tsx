import { Hero } from "@/components/portfolio/hero";
import { Offer } from "@/components/portfolio/offer";
import { Testimonials } from "@/components/portfolio/testimonials";
import { WorkedFor } from "@/components/portfolio/worked-for";

export default function Home() {
  return (
    <main>
      <Hero />
      <Offer />
      <Testimonials />
      <WorkedFor />
    </main>
  );
}
