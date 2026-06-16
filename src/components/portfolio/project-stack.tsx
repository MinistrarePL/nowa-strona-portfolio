"use client";

import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from "react";

interface ProjectParagraphLink {
  href: string;
  label: string;
}

type ProjectParagraph = string | readonly (string | ProjectParagraphLink)[];

interface ProjectItem {
  id: string;
  title: string;
  description?: string;
  paragraphs?: readonly ProjectParagraph[];
  imageSlot?: boolean;
  logo?: {
    src: string;
    alt: string;
  };
  image?: {
    src: string;
    alt: string;
  };
}

interface ProjectStackProps {
  activeIndex: number;
  onSelect: (index: number) => void;
  items: readonly ProjectItem[];
}

/** Visible strip per card — must fit the full title (no clipping). */
const TITLE_PEEK = 76;
/** Fallback height before content is measured. */
const CARD_HEIGHT_FALLBACK = 268;
/** Nudge the rearmost card slightly lower for a cleaner stack silhouette. */
const REARMOST_Y_OFFSET = 16;

const springTransition = {
  type: "spring" as const,
  stiffness: 320,
  damping: 32,
  mass: 0.9,
};

const titleClassName =
  "line-clamp-2 text-lg leading-snug sm:text-xl md:text-2xl lg:text-3xl lg:leading-tight";

const titleStripClassName =
  "flex shrink-0 items-center px-6 sm:px-8 md:px-10 lg:px-12";

const bodyShellClassName =
  "flex flex-col px-6 pb-5 pt-0 sm:px-8 md:px-10 md:pb-6 lg:px-12 lg:pb-7";

const bodyTextClassName = "text-sm leading-7 md:text-base md:leading-8";

const bodyLinkClassName =
  "text-emerald-300 underline decoration-emerald-300/40 underline-offset-2 transition-colors hover:text-emerald-200";

const logoWrapClassName = "py-3 md:py-4";

const logoBoxClassName = "flex h-7 max-w-[220px] items-center md:h-8";

const logoImageClassName = "max-h-full max-w-full object-contain object-left";

function renderParagraph(content: ProjectParagraph) {
  if (typeof content === "string") {
    return content;
  }

  return content.map((part, partIndex) =>
    typeof part === "string" ? (
      part
    ) : (
      <a
        key={`${part.href}-${partIndex}`}
        href={part.href}
        target="_blank"
        rel="noreferrer"
        className={bodyLinkClassName}
        onClick={(event) => event.stopPropagation()}
      >
        {part.label}
      </a>
    ),
  );
}

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

function ProjectCardBody({
  item,
  distance,
}: {
  item: ProjectItem;
  distance: number;
}) {
  const bodyTone = getBodyTone(distance);
  const showImageSlot = item.imageSlot === true || item.image !== undefined;

  if (item.paragraphs) {
    return (
      <div
        className={cn(
          "flex flex-col gap-4 md:gap-6",
          showImageSlot && "md:flex-row md:items-start",
        )}
      >
        <div className="min-w-0 flex-1 space-y-2.5">
          {item.logo ? (
            <div className={logoWrapClassName}>
              <div className={logoBoxClassName}>
                <Image
                  src={item.logo.src}
                  alt={item.logo.alt}
                  width={280}
                  height={60}
                  className={logoImageClassName}
                />
              </div>
            </div>
          ) : null}
          {item.paragraphs.map((paragraph, paragraphIndex) => (
            <p
              key={paragraphIndex}
              className={cn(bodyTextClassName, bodyTone)}
            >
              {renderParagraph(paragraph)}
            </p>
          ))}
        </div>

        {showImageSlot ? (
          <div className="hidden w-[min(38%,240px)] shrink-0 md:block">
            {item.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.image.src}
                alt={item.image.alt}
                className="aspect-[4/5] w-full rounded-2xl object-cover"
              />
            ) : (
              <div
                className="aspect-[4/5] w-full rounded-2xl border border-dashed border-white/15 bg-white/[0.03]"
                aria-hidden
              />
            )}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <p className={cn(bodyTextClassName, bodyTone)}>
      {item.description}
    </p>
  );
}

function ProjectCardMeasure({
  item,
  measureRef,
}: {
  item: ProjectItem;
  measureRef: (node: HTMLDivElement | null) => void;
}) {
  return (
    <div ref={measureRef} className="w-full">
      <div className="flex flex-col overflow-hidden rounded-[28px] border border-emerald-300/35 bg-black/92 md:rounded-[36px]">
        <div className={titleStripClassName} style={{ height: TITLE_PEEK }}>
          <h3 className={cn(titleClassName, "text-white")}>{item.title}</h3>
        </div>
        <div className={cn(bodyShellClassName, "bg-black/40")}>
          <ProjectCardBody item={item} distance={0} />
        </div>
      </div>
    </div>
  );
}

function useCardHeights(items: readonly ProjectItem[]) {
  const measureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [heights, setHeights] = useState<number[]>(() =>
    items.map(() => CARD_HEIGHT_FALLBACK),
  );

  const measure = useCallback(() => {
    setHeights(
      items.map((_, index) => {
        const node = measureRefs.current[index];
        return node?.getBoundingClientRect().height ?? CARD_HEIGHT_FALLBACK;
      }),
    );
  }, [items]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useLayoutEffect(() => {
    const observers = measureRefs.current
      .filter((node): node is HTMLDivElement => node !== null)
      .map((node) => {
        const observer = new ResizeObserver(measure);
        observer.observe(node);
        return observer;
      });

    window.addEventListener("resize", measure);
    return () => {
      observers.forEach((observer) => observer.disconnect());
      window.removeEventListener("resize", measure);
    };
  }, [measure, items]);

  const setMeasureRef = useCallback(
    (index: number) => (node: HTMLDivElement | null) => {
      measureRefs.current[index] = node;
    },
    [],
  );

  return { heights, setMeasureRef, measure };
}

export function ProjectStack({ activeIndex, onSelect, items }: ProjectStackProps) {
  const shouldReduceMotion = useReducedMotion();
  const total = items.length;
  const { heights: cardHeights, setMeasureRef } = useCardHeights(items);
  const activeCardHeight = cardHeights[activeIndex] ?? CARD_HEIGHT_FALLBACK;
  const stackHeight = (total - 1) * TITLE_PEEK + activeCardHeight + 8;
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
        className="hidden shrink-0 flex-col items-center justify-center gap-1.5 self-center py-2 md:flex"
        aria-label="Project navigation"
      >
        <StackArrow direction="up" label="Previous project" onClick={goToPrevious} />
        <div className="h-6 w-px bg-linear-to-b from-transparent via-white/45 to-transparent md:h-8" />
        <StackArrow direction="down" label="Next project" onClick={goToNext} />
      </div>

      <div
        className="relative min-w-0 flex-1 [perspective:1500px] [perspective-origin:center_68%]"
        role="listbox"
        aria-label="Projects"
      >
        <div aria-hidden className="pointer-events-none absolute w-full opacity-0">
          {items.map((item, index) => (
            <ProjectCardMeasure
              key={`measure-${item.id}`}
              item={item}
              measureRef={setMeasureRef(index)}
            />
          ))}
        </div>

        <motion.div
          className="relative w-full overflow-hidden [transform-style:preserve-3d]"
          initial={false}
          animate={{ height: stackHeight }}
          transition={transition}
        >
          {items.map((item, index) => {
            const distance = getStackDistance(index, activeIndex, total);
            const isFront = distance === 0;
            const isRearmost = distance === total - 1;
            const y =
              (total - 1 - distance) * TITLE_PEEK + (isRearmost ? REARMOST_Y_OFFSET : 0);
            const fullHeight = cardHeights[index] ?? CARD_HEIGHT_FALLBACK;

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
                  height: fullHeight,
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
                        ? (event: KeyboardEvent<HTMLDivElement>) => {
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
                        titleStripClassName,
                        !isFront &&
                          "group pointer-events-auto cursor-pointer border-b border-white/25 transition-colors hover:bg-white/[0.04]",
                      )}
                      style={{ height: TITLE_PEEK }}
                      onClick={
                        !isFront
                          ? (event: MouseEvent<HTMLDivElement>) => {
                              event.stopPropagation();
                              onSelect(index);
                            }
                          : undefined
                      }
                      onKeyDown={
                        !isFront
                          ? (event: KeyboardEvent<HTMLDivElement>) => {
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
                          titleClassName,
                          "transition-colors",
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
                        bodyShellClassName,
                        isFront ? "bg-black/40" : "bg-black/55",
                      )}
                      aria-hidden={!isFront}
                    >
                      <ProjectCardBody item={item} distance={distance} />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
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
