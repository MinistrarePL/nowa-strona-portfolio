import { cn } from "@/lib/utils";
import React from "react";

type StarBorderProps<T extends React.ElementType> = React.ComponentPropsWithoutRef<T> & {
  as?: T;
  className?: string;
  innerClassName?: string;
  children?: React.ReactNode;
  color?: string;
  speed?: React.CSSProperties["animationDuration"];
  /** Height of the animated edge glow in px */
  thickness?: number;
};

const StarBorder = <T extends React.ElementType = "button">({
  as,
  className = "",
  innerClassName = "",
  color = "white",
  speed = "6s",
  thickness = 2,
  children,
  ...rest
}: StarBorderProps<T>) => {
  const Component = as || "button";

  const edgeStyle: React.CSSProperties = {
    background: `radial-gradient(circle, ${color} 0%, transparent 22%)`,
    animationDuration: speed,
  };

  return (
    <Component
      className={cn("relative inline-block overflow-hidden rounded-3xl", className)}
      {...(rest as React.ComponentPropsWithoutRef<T>)}
    >
      <div
        className={cn(
          "relative z-[1] rounded-3xl border border-white/15 bg-black text-white",
          innerClassName,
        )}
      >
        {children}
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[2] overflow-hidden"
        style={{ height: thickness }}
      >
        <div
          className="absolute top-1/2 left-[-250%] h-[400%] w-[300%] -translate-y-1/2 animate-star-movement-top"
          style={edgeStyle}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] overflow-hidden"
        style={{ height: thickness }}
      >
        <div
          className="absolute top-1/2 right-[-250%] h-[400%] w-[300%] -translate-y-1/2 animate-star-movement-bottom"
          style={edgeStyle}
        />
      </div>
    </Component>
  );
};

export default StarBorder;
