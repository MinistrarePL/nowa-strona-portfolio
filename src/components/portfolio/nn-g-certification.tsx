import { NNgCertifiedBadge } from "@/components/portfolio/nn-g-certified-badge";
import { Container } from "@/components/layout/container";

export function NNgCertification() {
  return (
    <div className="bg-black pb-10 pt-12 md:pb-12">
      <Container className="flex justify-center">
        <NNgCertifiedBadge className="w-[clamp(9rem,28vw,12rem)]" />
      </Container>
    </div>
  );
}
