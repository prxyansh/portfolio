import type { Metadata } from "next";
import {
  Barlow_Condensed,
  Geist_Mono,
  Playfair_Display,
  Space_Grotesk,
} from "next/font/google";
import SiteHeader from "@/components/ui/site-header";
import { ThemeProvider } from "@/components/ui/theme-provider";
import "./globals.css";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const condensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-condensed",
});

export const metadata: Metadata = {
  title: "Obsidian Studio — Portfolio",
  description:
    "Immersive, editorial-grade portfolio showcasing advanced interactive work.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Obsidian Studio — Portfolio",
    description:
      "A dark-luxury interactive portfolio experience crafted with motion.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Obsidian Studio — Portfolio",
    description:
      "Cinematic, high-contrast portfolio with fluid interactions and motion.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${grotesk.variable} ${mono.variable} ${condensed.variable} theme-night`}>
        <ThemeProvider>
          <SiteHeader />
          <div className="pt-32 pb-16">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
