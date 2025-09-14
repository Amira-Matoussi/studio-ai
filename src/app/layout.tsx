import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Studio - AI Solutions for a Better World",
  description:
    "AI Studio harnesses artificial intelligence to solve real-world problems and create meaningful impact.",
  icons: {
    icon: "/image/favicon.ico", // Path to your favicon inside /public
    shortcut: "/image/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
