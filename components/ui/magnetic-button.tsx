"use client";

import { motion } from "framer-motion";
import { ReactNode, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    variant?: "primary" | "secondary" | "ghost";
    onClick?: () => void;
}

export function MagneticButton({
    children,
    className = "",
    variant = "primary",
    onClick,
}: MagneticButtonProps) {
    const ref = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!ref.current) return;

        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();

        const x = (clientX - (left + width / 2)) * 0.3;
        const y = (clientY - (top + height / 2)) * 0.3;

        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const variants = {
        primary: "bg-gradient-to-r from-blue-600 via-purple-700 to-teal-600 text-white hover:shadow-xl hover:shadow-blue-600/40 shadow-md shadow-blue-600/25",
        secondary: "bg-gradient-to-r from-purple-700 via-teal-600 to-blue-600 text-white hover:shadow-xl hover:shadow-purple-700/40 shadow-md shadow-purple-700/25",
        ghost: "border-2 border-blue-600/60 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-700/20 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-600/30 shadow-sm shadow-blue-600/15",
    };

    return (
        <motion.button
            ref={ref}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={cn(
                "relative px-6 py-3 rounded-full font-medium transition-all duration-300",
                "hover:scale-105 active:scale-95",
                variants[variant],
                className
            )}
        >
            {children}
        </motion.button>
    );
}
