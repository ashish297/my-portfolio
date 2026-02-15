"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { Calendar, MapPin } from "lucide-react";

export function Experience() {
    const experiences = [
        {
            company: "Kwike",
            role: "Founding Software Engineer",
            type: "Full-time | Hybrid",
            location: "May 2025 - Present",
            projects: [
                {
                    name: "BPS (Brain Profiling System)",
                    description: "End-to-End Ownership: Orchestrated the entire product lifecycle from initial UI/UX design to final delivery",
                    achievements: [
                        "Architected a live MERN stack application serving 100+ patients weekly",
                        "Executed seamless cloud migration of media assets from AWS S3 to DigitalOcean Spaces using s3cmd",
                        "Optimized infrastructure by hosting frontend on Netlify and backend on DigitalOcean App Platform",
                    ],
                },
                {
                    name: "Medsight & Medrecs",
                    description: "Frontend Engineering: Lead frontend engineer for both platforms",
                    achievements: [
                        "Developed high-performance web interfaces using React.js and TypeScript",
                        "Managed end-to-end deployment process including custom domain configuration on DigitalOcean",
                        "Implemented rigorous client-side validation and complex form handling logic",
                    ],
                },
            ],
            techStack: ["React", "TypeScript", "Node.js", "MongoDB", "Express", "AWS S3", "DigitalOcean", "Netlify"],
        },
        {
            company: "IIT Kharagpur",
            role: "Software Development Intern",
            type: "Research under Prof. Sudipta Mukhopadhyay",
            location: "May 2024 - May 2025",
            projects: [
                {
                    name: "Cloud Infrastructure & Security",
                    description: "Led cloud team managing Private VPC infrastructure",
                    achievements: [
                        "Architected a Private VPC infrastructure to isolate internal microservices from public exposure",
                        "Led cloud team of two full-time employees with regular progress updates and technical alignment",
                        "Secured database access by enforcing Static Elastic IPs to prevent unauthorized external requests",
                    ],
                },
            ],
            techStack: ["AWS VPC", "MediaLive", "CloudFront", "EC2", "Docker", "MongoDB"],
        },
    ];

    return (
        <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 scroll-mt-20">
            <div className="max-w-6xl mx-auto">
                <ScrollReveal direction="up">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
                            Work Experience
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            Building scalable systems and leading technical teams
                        </p>
                    </div>
                </ScrollReveal>

                <div className="space-y-8">
                    {experiences.map((exp, idx) => (
                        <ScrollReveal key={exp.company} direction="up" delay={idx * 0.2}>
                            <GlassCard>
                                <div className="space-y-6">
                                    {/* Header */}
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                        <div>
                                            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                                                {exp.role}
                                            </h3>
                                            <p className="text-xl text-primary font-semibold mb-1">
                                                {exp.company}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {exp.type}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Calendar className="w-4 h-4" />
                                            <span className="text-sm">{exp.location}</span>
                                        </div>
                                    </div>

                                    {/* Projects */}
                                    <div className="space-y-6">
                                        {exp.projects.map((project, projectIdx) => (
                                            <div key={projectIdx} className="border-l-2 border-primary/30 pl-4 space-y-2">
                                                <h4 className="text-lg font-semibold text-foreground">
                                                    {project.name}
                                                </h4>
                                                <p className="text-sm text-muted-foreground italic">
                                                    {project.description}
                                                </p>
                                                <ul className="space-y-2">
                                                    {project.achievements.map((achievement, achIdx) => (
                                                        <li key={achIdx} className="text-sm text-muted-foreground flex gap-2">
                                                            <span className="text-primary mt-1">•</span>
                                                            <span>{achievement}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-2">
                                        {exp.techStack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </GlassCard>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
