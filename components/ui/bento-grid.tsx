"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BentoGridProps {
    children: ReactNode;
    className?: string;
}

interface BentoGridItemProps {
    children: ReactNode;
    className?: string;
    colSpan?: number;
    rowSpan?: number;
}

export function BentoGrid({ children, className = "" }: BentoGridProps) {
    return (
        <div
            className={cn(
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6",
                className
            )}
        >
            {children}
        </div>
    );
}

export function BentoGridItem({
    children,
    className = "",
    colSpan = 1,
    rowSpan = 1,
}: BentoGridItemProps) {
    return (
        <div
            className={cn(className)}
            style={{
                gridColumn: `span ${colSpan}`,
                gridRow: `span ${rowSpan}`,
            }}
        >
            {children}
        </div>
    );
}
