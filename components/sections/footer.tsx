"use client";

import { Github, Linkedin, Mail, Twitter, MapPin } from "lucide-react";
import { motion } from "framer-motion";

interface SocialLink {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    ariaLabel: string;
}

export function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks: SocialLink[] = [
        {
            name: "LinkedIn",
            href: "https://www.linkedin.com/in/ashishkm1/", // Update with your actual LinkedIn
            icon: Linkedin,
            ariaLabel: "Visit my LinkedIn profile",
        },
        {
            name: "GitHub",
            href: "https://github.com/ashish297", // Update with your actual GitHub
            icon: Github,
            ariaLabel: "Visit my GitHub profile",
        },
        {
            name: "Email",
            href: "mailto:dewandameena1098@gmail.com", // Update with your actual email
            icon: Mail,
            ariaLabel: "Send me an email",
        },
        {
            name: "X (Twitter)",
            href: "https://x.com/Ashish_1098", // Update with your actual X/Twitter
            icon: Twitter,
            ariaLabel: "Follow me on X",
        },
    ];

    return (
        <footer className="relative z-10 border-t border-border/50 bg-background/80 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col items-center space-y-6">
                    {/* Social Links */}
                    <div className="flex items-center gap-4">
                        {socialLinks.map((link, index) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={link.ariaLabel}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-3 rounded-full bg-muted/50 hover:bg-blue-600/20 border border-border/50 hover:border-blue-600/50 transition-all duration-300 group"
                            >
                                <link.icon className="w-5 h-5 text-muted-foreground group-hover:text-blue-600 transition-colors" />
                            </motion.a>
                        ))}
                    </div>

                    {/* Location */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center gap-2 text-muted-foreground"
                    >
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">Jaipur, Rajasthan, India</span>
                    </motion.div>

                    {/* Copyright and Credits */}
                    <div className="flex flex-col items-center gap-2 text-center">
                        <p className="text-sm text-muted-foreground">
                            © {currentYear} Ashish Kumar Meena. All rights reserved.
                        </p>
                       
                    </div>

                    {/* Quick Links (Optional - can be added later) */}
                    {/* <div className="flex items-center gap-6 text-sm">
            <a href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">
              Projects
            </a>
            <a href="#experience" className="text-muted-foreground hover:text-foreground transition-colors">
              Experience
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
          </div> */}
                </div>
            </div>
        </footer>
    );
}
