"use client";

import { useEffect, useRef } from 'react';

export function AnimatedBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Dot grid configuration - optimized for performance
        const spacing = 60; // Increased from 40 to reduce total dots
        const dotRadius = 2;
        const maxDistance = 120; // Reduced from 150 to limit calculations
        const dots: Array<{
            x: number;
            y: number;
            originalX: number;
            originalY: number;
            vx: number;
            vy: number
        }> = [];

        // Create dots
        for (let x = 0; x < canvas.width; x += spacing) {
            for (let y = 0; y < canvas.height; y += spacing) {
                const initialX = x + Math.random() * 10;
                const initialY = y + Math.random() * 10;
                dots.push({
                    x: initialX,
                    y: initialY,
                    originalX: initialX,
                    originalY: initialY,
                    vx: (Math.random() - 0.5) * 0.8, // Faster floating
                    vy: (Math.random() - 0.5) * 0.8,
                });
            }
        }

        let mouseX = 0;
        let mouseY = 0;
        let isMouseOnCanvas = false;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            isMouseOnCanvas = true;
        };

        const handleMouseLeave = () => {
            isMouseOnCanvas = false;
        };

        // Listen on window instead of canvas to work with pointer-events-none
        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw dots
            dots.forEach((dot, i) => {
                // Gentle floating movement
                dot.x += dot.vx;
                dot.y += dot.vy;

                // Bounce at edges
                if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1;
                if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1;

                // Spring back to original position (fiber-like effect)
                const dx = dot.originalX - dot.x;
                const dy = dot.originalY - dot.y;
                const springForce = 0.05; // Spring strength
                dot.x += dx * springForce;
                dot.y += dy * springForce;

                // Mouse interaction - fiber stretch effect (limited displacement)
                if (isMouseOnCanvas) {
                    const dx = mouseX - dot.x;
                    const dy = mouseY - dot.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        const angle = Math.atan2(dy, dx);
                        const force = (120 - distance) / 120;
                        // Limited push to prevent black holes
                        const maxDisplacement = 30;
                        const displacement = force * 2;
                        dot.x -= Math.cos(angle) * Math.min(displacement, maxDisplacement);
                        dot.y -= Math.sin(angle) * Math.min(displacement, maxDisplacement);
                    }
                }

                // Draw dot with enhanced visibility and hover glow
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 2);

                // Make dots glow when near cursor
                if (isMouseOnCanvas) {
                    const dx = mouseX - dot.x;
                    const dy = mouseY - dot.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        const proximity = 1 - distance / 120;
                        ctx.fillStyle = `rgba(37, 99, 235, ${0.7 + proximity * 0.3})`;
                    } else {
                        ctx.fillStyle = 'rgba(37, 99, 235, 0.7)';
                    }
                } else {
                    ctx.fillStyle = 'rgba(37, 99, 235, 0.7)';
                }
                ctx.fill();

                // Draw connections
                dots.slice(i + 1).forEach((otherDot) => {
                    const dx = dot.x - otherDot.x;
                    const dy = dot.y - otherDot.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        const opacity = (1 - distance / maxDistance) * 0.2;
                        ctx.beginPath();
                        ctx.moveTo(dot.x, dot.y);
                        ctx.lineTo(otherDot.x, otherDot.y);
                        ctx.strokeStyle = `rgba(37, 99, 235, ${opacity})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                });
            });

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 0 }}
        />
    );
}
