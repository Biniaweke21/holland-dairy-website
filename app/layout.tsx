import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import HollandAIButton from "@/components/holland-ai-button";
import "./globals.css";

export const metadata: Metadata = {
  title: "Holland Dairy – Dairy Processing Company",
  description: "Holland Dairy is a leading dairy company in Ethiopia. Ethiopian by nationality, Dutch by technology.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
        <HollandAIButton />
      </body>
    </html>
  );
}
