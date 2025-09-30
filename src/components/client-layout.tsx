"use client";

import { Roboto } from "next/font/google";
// Remove Material Tailwind imports to avoid dependency issues
import { FixedPlugin } from "@/components/fixed-plugin";
import { ChatbotWidget } from "@/components/chatbot-widget";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={roboto.className}>
      {/* Analytics / Scripts */}
      <script
        defer
        data-site="YOUR_DOMAIN_HERE"
        src="https://api.nepcha.com/js/nepcha-analytics.js"
      ></script>

      {/* App Content */}
      {children}

      {/* Global Widgets */}
      <FixedPlugin />
      <ChatbotWidget />
    </div>
  );
}