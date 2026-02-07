"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { type ClassValue } from "clsx";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLMotionProps<"div"> {
    hoverEffect?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, hoverEffect = false, children, ...props }, ref) => {
        return (
            <motion.div
                ref={ref}
                className={cn(
                    "bg-brand-slate border border-slate-800 rounded-xl p-6 shadow-xl shadow-black/20",
                    hoverEffect && "hover:border-slate-700 hover:shadow-brand-blue/5 transition-all duration-300",
                    className
                )}
                initial={hoverEffect ? { y: 0 } : undefined}
                whileHover={hoverEffect ? { y: -5 } : undefined}
                {...props}
            >
                {children}
            </motion.div>
        );
    }
);
Card.displayName = "Card";

export { Card };
