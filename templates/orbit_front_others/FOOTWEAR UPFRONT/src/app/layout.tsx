import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "./providers";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Upfront Footwear | Walk Your Way",
  description: "Premium footwear for every step. Sneakers, casual, and formal shoes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${oswald.variable} ${inter.variable}`} suppressHydrationWarning>
        <Providers>
          <Header />
          <main style={{ minHeight: '80vh', paddingTop: '90px' }}>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
