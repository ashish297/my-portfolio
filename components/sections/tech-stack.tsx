"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import {
    Code2,
    Database,
    Server,
    Cloud,
    Container,
    GitBranch,
    Layers,
    Zap
} from "lucide-react";
import { motion } from "framer-motion";

export function TechStack() {
    const technologies = [
        { name: "React", icon: Code2, color: "text-[#61DAFB]" },
        { name: "Next.js", icon: Layers, color: "text-foreground" },
        { name: "TypeScript", icon: Code2, color: "text-[#3178C6]" },
        { name: "Node.js", icon: Server, color: "text-[#339933]" },
        { name: "MongoDB", icon: Database, color: "text-[#47A248]" },
        { name: "Docker", icon: Container, color: "text-[#2496ED]" },
        { name: "AWS", icon: Cloud, color: "text-[#FF9900]" },
        { name: "DigitalOcean", icon: Cloud, color: "text-[#0080FF]" },
        { name: "Git", icon: GitBranch, color: "text-[#F05032]" },
        { name: "Express", icon: Zap, color: "text-foreground" },
    ];

    // Duplicate for seamless loop
    const duplicatedTechs = [...technologies, ...technologies];

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <ScrollReveal direction="up">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
                            Tech Stack
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            Technologies I work with
                        </p>
                    </div>
                </ScrollReveal>

                {/* Marquee Container - Desktop Only */}
                <div className="relative hidden md:block">
                    {/* Gradient Overlays */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

                    {/* Infinite Scrolling Track */}
                    <div className="flex overflow-hidden">
                        <motion.div
                            className="flex gap-8 py-8 will-change-transform"
                            animate={{
                                x: ["0%", "-50%"], // Move exactly half to create seamless loop
                            }}
                            transition={{
                                x: {
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration: 25,
                                    ease: "linear",
                                },
                            }}
                        >
                            {duplicatedTechs.map((tech, idx) => (
                                <motion.div
                                    key={`${tech.name}-${idx}`}
                                    whileHover={{ scale: 1.15, y: -8 }}
                                    className="flex-shrink-0 glass rounded-2xl p-6 w-36 h-36 flex flex-col items-center justify-center gap-4 glass-hover"
                                >
                                    <tech.icon
                                        className={`w-12 h-12 ${tech.color}`}
                                        style={{
                                            filter: 'drop-shadow(0 0 10px currentColor)',
                                        }}
                                    />
                                    <span className="text-sm font-medium text-foreground">
                                        {tech.name}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Mobile/Tablet Alternative Grid */}
                <div className="md:hidden mt-8">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {technologies.map((tech) => (
                            <div
                                key={tech.name}
                                className="glass rounded-2xl p-6 flex flex-col items-center justify-center gap-4"
                            >
                                <tech.icon className={`w-10 h-10 ${tech.color}`} />
                                <span className="text-sm font-medium text-foreground">
                                    {tech.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
