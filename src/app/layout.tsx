import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

export async function generateMetadata(): Promise<Metadata> {
  // You'd need to determine language server-side or use a default
  return {
    title: "AI Studio - AI Solutions for a Better World",
    description: "AI Studio harnesses artificial intelligence to solve real-world problems and create meaningful impact.",
    icons: {
      icon: "/image/favicon.ico",
      shortcut: "/image/favicon.ico",
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}