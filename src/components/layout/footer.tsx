import { Container } from "@/components/layout/container";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black pb-10 pt-8 md:pb-12">
      <Container>
        <p className="text-center text-sm text-white/50 md:text-base">
          Copyright © Mateusz Głasek - IT Quality from Poland 🇵🇱
        </p>
      </Container>
    </footer>
  );
}
