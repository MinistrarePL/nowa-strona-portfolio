import { Footer } from "@/components/layout/footer";
import { sectionGapClassName } from "@/components/layout/section-styles";
import { Contact } from "@/components/portfolio/contact";
import { Header } from "@/components/portfolio/header";
import { Hero } from "@/components/portfolio/hero";
import { NNgCertification } from "@/components/portfolio/nn-g-certification";
import { Offer } from "@/components/portfolio/offer";
import { ProjectsOverview } from "@/components/portfolio/projects-overview";
import { Testimonials } from "@/components/portfolio/testimonials";
import { WhyMe } from "@/components/portfolio/why-me";
import { WorkedFor } from "@/components/portfolio/worked-for";

export default function Home() {
  return (
    <>
      <Header />
      <main className={`flex flex-col bg-black ${sectionGapClassName}`}>
        <Hero />
        <Offer />
        <ProjectsOverview />
        <Testimonials />
        <WhyMe />
        <WorkedFor />
        <Contact />
      </main>
      <NNgCertification />
      <Footer />
    </>
  );
}
