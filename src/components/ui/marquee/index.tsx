import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type MarqueeProps = HTMLAttributes<HTMLDivElement>;

export const Marquee = ({ className, ...props }: MarqueeProps) => (
  <div
    className={cn("relative flex w-full overflow-hidden", className)}
    {...props}
  />
);

export type MarqueeContentProps = HTMLAttributes<HTMLDivElement> & {
  direction?: "left" | "right";
  speed?: number;
  pauseOnHover?: boolean;
  repeat?: number;
  children?: ReactNode;
};

export const MarqueeContent = ({
  className,
  direction = "left",
  speed = 40,
  pauseOnHover = true,
  repeat = 2,
  children,
  style,
  ...props
}: MarqueeContentProps) => {
  return (
    <div
      className={cn(
        "flex min-w-full shrink-0 items-center justify-around",
        direction === "left" ? "animate-marquee-left" : "animate-marquee-right",
        pauseOnHover && "hover:[animation-play-state:paused]",
        className,
      )}
      style={{
        ...style,
        animationDuration: `${speed}s`,
      }}
      {...props}
    >
      {Array.from({ length: repeat }).map((_, index) => (
        <div
          key={index}
          className="flex shrink-0 items-center justify-around gap-12 px-6"
        >
          {children}
        </div>
      ))}
    </div>
  );
};

export type MarqueeFadeProps = HTMLAttributes<HTMLDivElement> & {
  side: "left" | "right";
};

export const MarqueeFade = ({
  className,
  side,
  ...props
}: MarqueeFadeProps) => (
  <div
    className={cn(
      "pointer-events-none absolute inset-y-0 z-10 w-20 md:w-32",
      side === "left"
        ? "from-background left-0 bg-gradient-to-r to-transparent"
        : "from-background right-0 bg-gradient-to-l to-transparent",
      className,
    )}
    {...props}
  />
);

export type MarqueeItemProps = HTMLAttributes<HTMLDivElement>;

export const MarqueeItem = ({ className, ...props }: MarqueeItemProps) => (
  <div
    className={cn("flex shrink-0 items-center justify-center", className)}
    {...props}
  />
);
