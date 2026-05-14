import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmoothScroller } from "@/components/SmoothScroller";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cuttle Fish - The Finest Women's Footwear.",
  description: "Discover premium, comfortable, and cozy women's footwear at Cuttle Fish",
};

const COLUMN_GRID_COUNT = 7;

/** Vertical column guides (Framer-style); painted on the shell so they stay visible in transparent gutters. */
const pageShellStyle: CSSProperties = {
  backgroundColor: "#f8f4f1",
  backgroundImage: `repeating-linear-gradient(
    to right,
    transparent 0,
    transparent calc(100% / ${COLUMN_GRID_COUNT} - 1px),
    #dadbdd calc(100% / ${COLUMN_GRID_COUNT} - 1px),
    #dadbdd calc(100% / ${COLUMN_GRID_COUNT})
  )`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-background`}
    >
      <body className="min-h-full flex flex-col bg-background">
        <SmoothScroller>
          <Header />
          <div
            className="relative mx-13 flex-1 min-h-svh border-x border-gray-200"
            style={pageShellStyle}
          >
            <div className="relative mx-4 border-x border-gray-200 h-full">
              <main className="mt-20">{children}</main>
              <Footer />
            </div>
          </div>
        </SmoothScroller>
      </body>
    </html>
  );
}
