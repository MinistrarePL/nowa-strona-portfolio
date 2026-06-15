"use client";

import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

interface ProjectItem {
  id: string;
  title: string;
  description: string;
}

interface ProjectStackProps {
  activeIndex: number;
  onSelect: (index: number) => void;
  items: readonly ProjectItem[];
}

/** Visible strip per card — must fit the full title (no clipping). */
const TITLE_PEEK = 120;
/** Total card height; body below the title overlaps the card in front. */
const CARD_HEIGHT = 340;

const springTransition = {
  type: "spring" as const,
  stiffness: 320,
  damping: 32,
  mass: 0.9,
};

function getStackDistance(index: number, activeIndex: number, total: number) {
  return (index - activeIndex + total) % total;
}

function getTitleTone(distance: number) {
  if (distance === 0) return "text-white";
  if (distance === 1) return "text-white/78";
  if (distance === 2) return "text-white/58";
  return "text-white/44";
}

function getBodyTone(distance: number) {
  if (distance === 0) return "text-white/85";
  return "text-white/50";
}

export function ProjectStack({ activeIndex, onSelect, items }: ProjectStackProps) {
  const shouldReduceMotion = useReducedMotion();
  const total = items.length;
  const stackHeight = (total - 1) * TITLE_PEEK + CARD_HEIGHT + 32;
  const transition = shouldReduceMotion ? { duration: 0 } : springTransition;

  const goToPrevious = () => {
    onSelect((activeIndex - 1 + total) % total);
  };

  const goToNext = () => {
    onSelect((activeIndex + 1) % total);
  };

  return (
    <div className="flex w-full items-stretch gap-5 md:gap-8">
      <div
        className="flex shrink-0 flex-col items-center justify-center gap-2 self-center py-4"
        aria-label="Project navigation"
      >
        <StackArrow direction="up" label="Previous project" onClick={goToPrevious} />
        <div className="h-8 w-px bg-linear-to-b from-transparent via-white/20 to-transparent md:h-10" />
        <StackArrow direction="down" label="Next project" onClick={goToNext} />
      </div>

      <div
        className="min-w-0 flex-1 [perspective:1500px] [perspective-origin:center_68%]"
        role="listbox"
        aria-label="Projects"
      >
        <div
          className="relative w-full [transform-style:preserve-3d]"
          style={{ minHeight: stackHeight }}
        >
          {items.map((item, index) => {
            const distance = getStackDistance(index, activeIndex, total);
            const isFront = distance === 0;
            const y = (total - 1 - distance) * TITLE_PEEK;

            return (
              <motion.div
                key={item.id}
                role="option"
                aria-selected={isFront}
                className={cn(
                  "absolute inset-x-0 top-0 will-change-transform",
                  !isFront && "pointer-events-none",
                )}
                initial={false}
                animate={{ y }}
                transition={transition}
                style={{
                  zIndex: total - distance,
                  height: CARD_HEIGHT,
                }}
              >
                <motion.div
                  className="h-full [transform-style:preserve-3d]"
                  initial={false}
                  animate={{
                    scale: 1 - distance * 0.068,
                    rotateX: distance * 4,
                    opacity: Math.max(0.52, 1 - distance * 0.14),
                  }}
                  transition={transition}
                  style={{ transformOrigin: "top center" }}
                >
                  <div
                    className={cn(
                      "flex h-full flex-col overflow-hidden rounded-[40px] border shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-md transition-[border-color,box-shadow]",
                      isFront
                        ? "pointer-events-auto cursor-pointer border-emerald-300/35 bg-black/92"
                        : "pointer-events-none border-white/10 bg-black/80",
                    )}
                    onClick={isFront ? () => onSelect(index) : undefined}
                    onKeyDown={
                      isFront
                        ? (event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              onSelect(index);
                            }
                          }
                        : undefined
                    }
                    role={isFront ? "button" : undefined}
                    tabIndex={isFront ? 0 : undefined}
                  >
                    <div
                      className={cn(
                        "flex shrink-0 items-center px-8 md:px-10 lg:px-12",
                        !isFront &&
                          "pointer-events-auto cursor-pointer transition-colors hover:bg-white/[0.04]",
                      )}
                      style={{ height: TITLE_PEEK }}
                      onClick={
                        !isFront
                          ? (event) => {
                              event.stopPropagation();
                              onSelect(index);
                            }
                          : undefined
                      }
                      onKeyDown={
                        !isFront
                          ? (event) => {
                              if (event.key === "Enter" || event.key === " ") {
                                event.preventDefault();
                                onSelect(index);
                              }
                            }
                          : undefined
                      }
                      role={!isFront ? "button" : undefined}
                      tabIndex={!isFront ? 0 : undefined}
                    >
                      <h3
                        className={cn(
                          "text-2xl leading-snug transition-colors md:text-3xl lg:leading-tight",
                          getTitleTone(distance),
                        )}
                      >
                        {item.title}
                      </h3>
                    </div>

                    <div
                      className={cn(
                        "flex flex-1 flex-col px-8 pb-8 pt-1 md:px-10 md:pb-10 lg:px-12 lg:pb-12",
                        isFront ? "bg-black/40" : "bg-black/55",
                      )}
                      aria-hidden={!isFront}
                    >
                      <p
                        className={cn(
                          "text-base leading-8 md:text-lg",
                          getBodyTone(distance),
                        )}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StackArrow({
  direction,
  label,
  onClick,
}: {
  direction: "up" | "down";
  label: string;
  onClick: () => void;
}) {
  const Icon = direction === "up" ? ChevronUp : ChevronDown;

  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "group flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.03]",
        "text-white/45 transition-all duration-300",
        "hover:border-emerald-300/40 hover:bg-emerald-300/[0.06] hover:text-emerald-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        "active:scale-95 md:size-12",
      )}
    >
      <Icon className="size-5 stroke-[1.5] transition-transform duration-300 group-hover:scale-110 md:size-[1.35rem]" />
    </button>
  );
}
