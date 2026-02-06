import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { StoreProvider } from "@/context/StoreContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
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
  title: "Lumière Beauty | Premium Skincare & Cosmetics",
  description: "Discover premium skincare and beauty essentials for your natural glow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <StoreProvider>
          <CartProvider>
            <Header />
            <CartDrawer />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
