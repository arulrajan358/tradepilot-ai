"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { type ClassValue } from "clsx";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
        const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue/50 disabled:opacity-50 disabled:pointer-events-none";

        const variants = {
            primary: "bg-brand-blue text-white hover:bg-blue-600 shadow-lg shadow-blue-500/20",
            secondary: "bg-brand-slate text-white border border-slate-700 hover:bg-slate-800 hover:border-slate-600",
            outline: "border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 bg-transparent",
            ghost: "text-slate-400 hover:text-white hover:bg-slate-800/50",
            danger: "bg-status-loss text-white hover:bg-red-600 shadow-lg shadow-red-500/20",
        };

        const sizes = {
            sm: "h-8 px-3 text-sm",
            md: "h-10 px-4 py-2",
            lg: "h-12 px-6 text-lg",
        };

        return (
            <motion.button
                ref={ref}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading || disabled}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children as React.ReactNode}
            </motion.button>
        );
    }
);
Button.displayName = "Button";

export { Button };
