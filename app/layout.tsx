import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "All Electrical Products",
  description: "Premium ecommerce landing page for electrical products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full bg-[#f2f0ea] antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#f2f0ea] font-sans text-[#171916]">
        {children}
      </body>
    </html>
  );
}
