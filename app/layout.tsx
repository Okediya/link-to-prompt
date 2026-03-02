/**
 * Root layout — sets up global fonts, metadata, dark theme, Sonner toaster,
 * and the open-source footer.
 */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Link to Prompt — Generate AI Coding Prompts from Any Website",
  description:
    "Paste any website URL, scrape it cleanly, and generate the perfect prompt for AI coding agents like Cursor, v0, and Claude to rebuild it.",
  keywords: [
    "nextjs",
    "ai",
    "prompt-engineering",
    "groq",
    "llama3",
    "web-scraping",
    "vercel",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} font-sans antialiased bg-black text-white min-h-screen flex flex-col`}
      >
        {/* Main content area */}
        <main className="flex-1">{children}</main>

        {/* Open-source footer */}
        <footer className="border-t border-white/10 py-4 px-6 text-center">
          <p className="text-xs text-[#C0C0C0]/60 tracking-wide">
            Open Source &middot; MIT License &middot;{" "}
            <a
              href="https://github.com/yourusername/link-to-prompt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C0C0C0]/80 hover:text-white transition-colors underline underline-offset-2"
            >
              GitHub
            </a>
          </p>
        </footer>

        {/* Toast notifications — silver-themed */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#111111",
              color: "#C0C0C0",
              border: "1px solid rgba(192, 192, 192, 0.2)",
            },
          }}
        />
      </body>
    </html>
  );
}
