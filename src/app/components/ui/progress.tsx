"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { motion } from "motion/react";

import { cn } from "./utils";

function Progress({
  className,
  value,
  color = 'bg-primary',
  bgColor = 'bg-primary/20',
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & {
  color?: string;
  bgColor?: string;
}) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        bgColor,
        "relative h-2 w-full overflow-hidden rounded-full",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        asChild
      >
        <motion.div
          className={cn("h-full w-full flex-1", color)}
          initial={{ transform: `translateX(-100%)` }}
          animate={{ transform: `translateX(-${100 - (value || 0)}%)` }}
          transition={{ 
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1]
          }}
        />
      </ProgressPrimitive.Indicator>
    </ProgressPrimitive.Root>
  );
}

export { Progress };