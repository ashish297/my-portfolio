"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

type FormState = "idle" | "loading" | "success" | "error";

export function Contact() {
    const [formState, setFormState] = useState<FormState>("idle");

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        setFormState("loading");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error("Failed to send message");

            setFormState("success");
            reset();

            // Reset success state after 3 seconds
            setTimeout(() => setFormState("idle"), 3000);
        } catch (error) {
            setFormState("error");

            // Reset error state after 3 seconds
            setTimeout(() => setFormState("idle"), 3000);
        }
    };

    const getButtonContent = () => {
        switch (formState) {
            case "loading":
                return (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending...</span>
                    </>
                );
            case "success":
                return (
                    <>
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Sent!</span>
                    </>
                );
            case "error":
                return (
                    <>
                        <XCircle className="w-5 h-5" />
                        <span>Failed</span>
                    </>
                );
            default:
                return (
                    <>
                        <motion.div
                            animate={{ x: formState === "idle" ? [0, 5, 0] : 0 }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            <Send className="w-5 h-5" />
                        </motion.div>
                        <span>Send Message</span>
                    </>
                );
        }
    };

    return (
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 scroll-mt-20">
            <div className="max-w-2xl mx-auto">
                <ScrollReveal direction="up">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
                            Get In Touch
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            Have a project in mind? Let's work together
                        </p>
                    </div>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={0.2}>
                    <GlassCard hover={false}>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* Name Field */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    {...register("name")}
                                    className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    placeholder="John Doe"
                                />
                                <AnimatePresence mode="wait">
                                    {errors.name && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="mt-1 text-sm text-destructive"
                                        >
                                            {errors.name.message}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    {...register("email")}
                                    className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    placeholder="john@example.com"
                                />
                                <AnimatePresence mode="wait">
                                    {errors.email && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="mt-1 text-sm text-destructive"
                                        >
                                            {errors.email.message}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Message Field */}
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows={5}
                                    {...register("message")}
                                    className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                                    placeholder="Tell me about your project..."
                                />
                                <AnimatePresence mode="wait">
                                    {errors.message && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="mt-1 text-sm text-destructive"
                                        >
                                            {errors.message.message}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                disabled={formState === "loading"}
                                whileHover={{ scale: formState === "idle" ? 1.02 : 1 }}
                                whileTap={{ scale: formState === "idle" ? 0.98 : 1 }}
                                className={`w-full px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2 ${formState === "success"
                                    ? "bg-green-600 text-white"
                                    : formState === "error"
                                        ? "bg-red-600 text-white"
                                        : "bg-gradient-to-r from-blue-600 via-purple-700 to-teal-600 text-white hover:shadow-xl hover:shadow-blue-600/40 shadow-md shadow-blue-600/25"
                                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                {getButtonContent()}
                            </motion.button>
                        </form>
                    </GlassCard>
                </ScrollReveal>
            </div>
        </section>
    );
}
