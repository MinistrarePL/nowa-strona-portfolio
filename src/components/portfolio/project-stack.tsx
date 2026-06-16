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
const TITLE_PEEK = 76;
/** Total card height; body below the title overlaps the card in front. */
const CARD_HEIGHT = 268;
/** Nudge the rearmost card slightly lower for a cleaner stack silhouette. */
const REARMOST_Y_OFFSET = 16;

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
  if (distance === 1) return "text-white/88";
  if (distance === 2) return "text-white/72";
  return "text-white/58";
}

function getBodyTone(distance: number) {
  if (distance === 0) return "text-white/85";
  return "text-white/50";
}

function getStackTransform(distance: number) {
  return {
    scale: 1 - distance * 0.068,
    rotateX: distance * 4,
    opacity: Math.max(0.72, 1 - distance * 0.08),
  };
}

export function ProjectStack({ activeIndex, onSelect, items }: ProjectStackProps) {
  const shouldReduceMotion = useReducedMotion();
  const total = items.length;
  const stackHeight = (total - 1) * TITLE_PEEK + CARD_HEIGHT + 8;
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
        className="flex shrink-0 flex-col items-center justify-center gap-1.5 self-center py-2"
        aria-label="Project navigation"
      >
        <StackArrow direction="up" label="Previous project" onClick={goToPrevious} />
        <div className="h-6 w-px bg-linear-to-b from-transparent via-white/45 to-transparent md:h-8" />
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
            const isRearmost = distance === total - 1;
            const y =
              (total - 1 - distance) * TITLE_PEEK + (isRearmost ? REARMOST_Y_OFFSET : 0);

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
                  animate={getStackTransform(distance)}
                  transition={transition}
                  style={{ transformOrigin: "top center" }}
                >
                  <div
                    className={cn(
                      "flex h-full flex-col overflow-hidden rounded-[28px] border shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-md transition-[border-color,box-shadow] md:rounded-[36px]",
                      isFront
                        ? "pointer-events-auto cursor-pointer border-emerald-300/35 bg-black/92"
                        : "pointer-events-none border-white/30 bg-black/80",
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
                        "flex shrink-0 items-center px-6 sm:px-8 md:px-10 lg:px-12",
                        !isFront &&
                          "group pointer-events-auto cursor-pointer border-b border-white/25 transition-colors hover:bg-white/[0.04]",
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
                          "line-clamp-2 text-lg leading-snug transition-colors sm:text-xl md:text-2xl lg:text-3xl lg:leading-tight",
                          getTitleTone(distance),
                          !isFront &&
                            "group-hover:text-emerald-300 group-focus-visible:text-emerald-300",
                        )}
                      >
                        {item.title}
                      </h3>
                    </div>

                    <div
                      className={cn(
                        "flex flex-1 flex-col px-6 pb-5 pt-0 sm:px-8 md:px-10 md:pb-7 lg:px-12 lg:pb-8",
                        isFront ? "bg-black/40" : "bg-black/55",
                      )}
                      aria-hidden={!isFront}
                    >
                      <p
                        className={cn(
                          "text-sm leading-7 md:text-base md:leading-8",
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
