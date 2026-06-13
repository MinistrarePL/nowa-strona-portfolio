import { Container } from "@/components/layout/container";
import Image from "next/image";

const companies = [
  {
    name: "Google",
    src: "/logos/google.svg",
    className: "h-[clamp(1.125rem,2.2vw,2rem)] w-auto max-w-full",
  },
  {
    name: "Oliver Wyman",
    src: "/logos/oliver-wyman.svg",
    className: "h-[clamp(0.875rem,1.8vw,1.625rem)] w-auto max-w-full",
  },
  {
    name: "Netguru",
    src: "/logos/netguru.svg",
    className: "h-[clamp(1rem,2vw,1.75rem)] w-auto max-w-full",
  },
  {
    name: "S&P Global",
    src: "/logos/sp-global.svg",
    className: "h-[clamp(1rem,2vw,1.75rem)] w-auto max-w-full",
  },
] as const;

export function WorkedFor() {
  return (
    <section className="bg-black py-20 md:py-24">
      <Container>
        <h2 className="text-center text-3xl text-white md:text-4xl lg:text-5xl">
          I worked for
        </h2>

        <ul className="mt-12 grid grid-cols-4 items-center gap-x-[clamp(0.375rem,1.5vw,1.5rem)] md:mt-14">
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
