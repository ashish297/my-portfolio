"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ArrowDown } from "lucide-react";

export function Hero() {
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto text-center">
                <ScrollReveal direction="up" delay={0.2}>
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 gradient-text leading-tight">
                        Ashish Kumar Meena
                    </h1>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={0.4}>
                    <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-4 font-medium">
                        Software Engineer from IIT Kharagpur
                    </p>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={0.6}>
                    <p className="text-base sm:text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto mb-12 leading-relaxed">
                        Architecting live MERN systems and cloud infrastructures.
                        Building scalable applications that serve 10+ patients weekly with
                        seamless AWS S3 to DigitalOcean migrations and optimized performance.
                    </p>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={0.8}>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <MagneticButton
                            variant="primary"
                            onClick={() => scrollToSection("contact")}
                            className="w-full sm:w-auto"
                        >
                            Get In Touch
                        </MagneticButton>

                        <MagneticButton
                            variant="ghost"
                            onClick={() => scrollToSection("projects")}
                            className="w-full sm:w-auto"
                        >
                            View My Work
                        </MagneticButton>
                    </div>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={1}>
                    <div className="mt-16 flex justify-center">
                        <button
                            onClick={() => scrollToSection("experience")}
                            className="text-muted-foreground hover:text-primary transition-colors animate-bounce"
                            aria-label="Scroll to experience section"
                        >
                            <ArrowDown className="w-6 h-6" />
                        </button>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
