"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
}

export function GlassCard({ children, className = "", hover = true }: GlassCardProps) {
    return (
        <motion.div
            whileHover={hover ? { scale: 1.02, y: -5 } : {}}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className={cn(
                "glass rounded-2xl p-6",
                hover && "glass-hover cursor-pointer",
                className
            )}
        >
            {children}
        </motion.div>
    );
}
