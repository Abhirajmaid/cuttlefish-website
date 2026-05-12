import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Parcel - The Ultimate Refurbished Designer Retailer",
  description: "Discover premium refurbished and vintage designer pieces at Parcel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-white`}
    >
      <body className="min-h-full flex flex-col bg-white">
        <Header />
        <div className="mx-16 bg-white border-l border-r border-gray-200 flex">
          <div className="px-4">
          <main className="flex-1">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
