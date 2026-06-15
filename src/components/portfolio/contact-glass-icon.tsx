import React from "react";

const gradientMapping: Record<string, string> = {
  blue: "linear-gradient(hsl(223, 90%, 50%), hsl(208, 90%, 50%))",
  purple: "linear-gradient(hsl(283, 90%, 50%), hsl(268, 90%, 50%))",
  red: "linear-gradient(hsl(3, 90%, 50%), hsl(348, 90%, 50%))",
  indigo: "linear-gradient(hsl(253, 90%, 50%), hsl(238, 90%, 50%))",
  orange: "linear-gradient(hsl(43, 90%, 50%), hsl(28, 90%, 50%))",
  green: "linear-gradient(hsl(123, 90%, 40%), hsl(108, 90%, 40%))",
  emerald: "linear-gradient(hsl(158, 90%, 48%), hsl(160, 84%, 36%))",
  cyan: "linear-gradient(hsl(187, 90%, 50%), hsl(192, 91%, 40%))",
};

function getBackgroundStyle(color: string): React.CSSProperties {
  if (gradientMapping[color]) {
    return { background: gradientMapping[color] };
  }

  return { background: color };
}

interface ContactGlassIconProps {
  href: string;
  color: string;
  icon: React.ReactElement;
  label: string;
  external?: boolean;
}

export function ContactGlassIcon({
  href,
  color,
  icon,
  label,
  external = false,
}: ContactGlassIconProps) {
  return (
    <a
      href={href}
      className="group flex items-center gap-5 rounded-2xl outline-none transition-colors focus-visible:ring-2 focus-visible:ring-emerald-300/60"
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      <span className="relative block h-16 w-16 shrink-0 [perspective:24em] [transform-style:preserve-3d]">
        <span
          className="absolute inset-0 block rotate-[15deg] rounded-[1.25em] transition-[transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] [transform-origin:100%_100%] group-hover:rotate-[25deg] group-hover:translate-x-[-0.5em] group-hover:translate-y-[-0.5em]"
          style={{
            ...getBackgroundStyle(color),
            boxShadow: "0.5em -0.5em 0.75em hsla(223, 10%, 10%, 0.15)",
          }}
        />
        <span
          className="absolute inset-0 flex translate-z-0 rounded-[1.25em] bg-[hsla(0,0%,100%,0.15)] backdrop-blur-[0.75em] transition-[transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] [transform-origin:80%_50%] group-hover:translate-z-[2em]"
          style={{
            boxShadow: "0 0 0 0.1em hsla(0, 0%, 100%, 0.3) inset",
          }}
        >
          <span className="m-auto flex h-6 w-6 items-center justify-center text-white">{icon}</span>
        </span>
      </span>

      <span className="text-base text-white/80 transition-colors group-hover:text-emerald-300 md:text-lg">
        {label}
      </span>
    </a>
  );
}
