import type { Metadata } from "next";
import "./globals.css";
import { AnimatedBackground } from "@/components/ui/animated-background";

export const metadata: Metadata = {
  title: "Ashish Kumar Meena | Software Engineer",
  description: "Software Engineer at IIT Kharagpur specializing in MERN stack development and cloud infrastructure. Building scalable systems and innovative solutions.",
  keywords: ["Software Engineer", "MERN Stack", "Cloud Infrastructure", "Full Stack Developer", "IIT Kharagpur"],
  authors: [{ name: "Ashish Kumar Meena" }],
  openGraph: {
    title: "Ashish Kumar Meena | Software Engineer",
    description: "Software Engineer at IIT Kharagpur specializing in MERN stack development and cloud infrastructure.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <AnimatedBackground />
        {children}
      </body>
    </html>
  );
}
