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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Space+Grotesk:wght@600&family=Inter:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        <Analytics />
        <HollandAIButton />
      </body>
    </html>
  );
}
