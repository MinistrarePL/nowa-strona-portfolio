import Image from "next/image";
import { cn } from "@/lib/utils";

const NN_G_CERTIFIED_URL = "https://www.nngroup.com/ux-certification/people/";

type NNgCertifiedBadgeProps = {
  className?: string;
};

export function NNgCertifiedBadge({ className }: NNgCertifiedBadgeProps) {
  return (
    <a
      href={NN_G_CERTIFIED_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="NN/g UX Certified — view certified people on Nielsen Norman Group"
      className={cn(
        "group inline-block shrink-0 transition-transform duration-300 hover:scale-[1.03]",
        className,
      )}
    >
      <Image
        src="/badges/nng.png"
        alt="NN/g UX Certified"
        width={706}
        height={616}
        className="h-auto w-full object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-[filter] duration-300 group-hover:drop-shadow-[0_10px_32px_rgba(255,255,255,0.12)]"
      />
    </a>
  );
}
