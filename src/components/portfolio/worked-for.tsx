import { Container } from "@/components/layout/container";
import { sectionTitleClassName } from "@/components/layout/section-styles";
import Image from "next/image";

const companies = [
  {
    name: "Google",
    src: "/logos/google.svg",
    className:
      "h-8 w-auto max-w-[220px] md:h-[clamp(1.125rem,2.2vw,2rem)] md:max-w-full",
  },
  {
    name: "Oliver Wyman",
    src: "/logos/oliver-wyman.svg",
    className:
      "h-7 w-auto max-w-[240px] md:h-[clamp(0.875rem,1.8vw,1.625rem)] md:max-w-full",
  },
  {
    name: "Netguru",
    src: "/logos/netguru.svg",
    className: "h-8 w-auto max-w-[220px] md:h-[clamp(1rem,2vw,1.75rem)] md:max-w-full",
  },
  {
    name: "S&P Global",
    src: "/logos/sp-global.svg",
    className: "h-7 w-auto max-w-[220px] md:h-[clamp(1rem,2vw,1.75rem)] md:max-w-full",
  },
] as const;

export function WorkedFor() {
  return (
    <section className="bg-black pt-4 pb-12 md:py-16">
      <Container>
        <h2 className={sectionTitleClassName}>I worked for</h2>

        <ul className="mt-8 flex flex-col items-center gap-7 md:mt-12 md:grid md:grid-cols-4 md:items-center md:gap-x-[clamp(0.375rem,1.5vw,1.5rem)] md:gap-y-0">
          {companies.map((company) => (
            <li key={company.name} className="group flex min-w-0 justify-center">
              <Image
                src={company.src}
                alt={company.name}
                width={280}
                height={64}
                className={`${company.className} opacity-50 brightness-0 invert transition-all duration-300 ease-out group-hover:opacity-100 group-hover:brightness-100 group-hover:invert-0`}
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
