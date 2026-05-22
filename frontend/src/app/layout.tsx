import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Verya - AI Smart Attendance & Gesture System",
  description: "Modernize your classroom with AI-powered attendance, gesture interaction, and real-time engagement analytics",
  keywords: ["AI", "Attendance", "Gesture", "Education", "Smart Classroom"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}