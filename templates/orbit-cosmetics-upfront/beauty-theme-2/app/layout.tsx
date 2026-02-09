import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { StorefrontProvider } from "@/context/StorefrontContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
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
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased min-h-screen flex flex-col font-sans bg-background text-foreground`}
      >
        <StorefrontProvider>
          <CartProvider>
            <Header />
            <CartDrawer />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </StorefrontProvider>
      </body>
    </html>
  );
}
