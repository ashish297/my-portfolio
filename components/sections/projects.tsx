"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { ExternalLink, Github, MessageSquare, Link2, Cloud, Code2, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface ProjectProps {
    title: string;
    description: string;
    techStack: string[];
    link?: string;
    github?: string;
    featured?: boolean;
    icon?: LucideIcon; // Optional icon for the project
    gradientFrom?: string; // Custom gradient start color
    gradientTo?: string; // Custom gradient end color
}

function ProjectCard({ title, description, techStack, link, github, featured, icon, gradientFrom = "from-blue-600", gradientTo = "to-purple-700" }: ProjectProps) {
    const [isHovered, setIsHovered] = useState(false);
    const ProjectIcon = icon || Code2; // Default to Code2 if no icon provided

    return (
        <GlassCard
            className="h-full"
            hover={false}
        >
            <motion.div
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                className="h-full flex flex-col"
            >
                {/* Project Icon with Gradient Background */}
                <div className={`relative w-full h-48 bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-lg mb-4 flex items-center justify-center overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent animate-glow-pulse" />
                    <motion.div
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                        className="relative z-10"
                    >
                        <ProjectIcon className="w-20 h-20 text-white drop-shadow-2xl" strokeWidth={1.5} />
                    </motion.div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                        <h3 className="text-2xl font-bold text-foreground">
                            {title}
                        </h3>
                        {featured && (
                            <span className="px-2 py-1 text-xs font-semibold bg-primary/20 text-primary rounded-full">
                                Featured
                            </span>
                        )}
                    </div>

                    <p className="text-muted-foreground mb-4 flex-1">
                        {description}
                    </p>

                    {/* Tech Stack - Animated on Hover */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                            opacity: isHovered ? 1 : 0.6,
                            y: isHovered ? 0 : 10
                        }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-wrap gap-2 mb-4"
                    >
                        {techStack.map((tech) => (
                            <span
                                key={tech}
                                className="px-2 py-1 rounded-md text-xs font-medium bg-accent/10 text-accent border border-accent/20"
                            >
                                {tech}
                            </span>
                        ))}
                    </motion.div>

                    {/* Links */}
                    <div className="flex gap-3">
                        {link && (
                            <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                            >
                                <ExternalLink className="w-4 h-4" />
                                <span>View Project</span>
                            </a>
                        )}
                        {github && (
                            <a
                                href={github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <Github className="w-4 h-4" />
                                <span>Source</span>
                            </a>
                        )}
                    </div>
                </div>
            </motion.div>
        </GlassCard>
    );
}

export function Projects() {
    const projects: ProjectProps[] = [
        {
            title: "AI Chat Application",
            description: "A real-time AI-powered chat application featuring authentication, message persistence, and intelligent responses. Built with modern technologies for optimal performance and user experience.",
            techStack: ["Next.js", "TypeScript", "Redis", "Clerk", "Tailwind CSS", "OpenAI"],
            featured: true,
            icon: MessageSquare,
            gradientFrom: "from-blue-600",
            gradientTo: "to-teal-600",
        },
        {
            title: "URL Shortener",
            description: "High-performance URL shortening service with analytics tracking, custom aliases, and QR code generation. Designed for scalability and speed.",
            techStack: ["React", "Node.js", "MongoDB", "Express", "AWS"],
            featured: true,
            icon: Link2,
            gradientFrom: "from-purple-700",
            gradientTo: "to-blue-600",
        },
        {
            title: "Cloud Infrastructure",
            description: "Private VPC infrastructure with isolated microservices, secure database access, and optimized performance through strategic hosting solutions.",
            techStack: ["AWS VPC", "DigitalOcean", "Docker", "MongoDB", "EC2"],
            icon: Cloud,
            gradientFrom: "from-teal-600",
            gradientTo: "to-purple-700",
        },
    ];

    return (
        <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 scroll-mt-20">
            <div className="max-w-6xl mx-auto">
                <ScrollReveal direction="up">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
                            Featured Projects
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            Building innovative solutions with modern technologies
                        </p>
                    </div>
                </ScrollReveal>

                <BentoGrid>
                    {projects.map((project, idx) => (
                        <BentoGridItem
                            key={project.title}
                            colSpan={project.featured ? 1 : 1}
                        >
                            <ScrollReveal direction="up" delay={idx * 0.1}>
                                <ProjectCard {...project} />
                            </ScrollReveal>
                        </BentoGridItem>
                    ))}
                </BentoGrid>
            </div>
        </section>
    );
}
