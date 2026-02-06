import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { StoreProvider } from "@/context/StoreContext";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Perfume Upfront | Signature Scents",
  description: "Discover your signature scent with our luxury collection of authentic perfumes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${outfit.variable} antialiased flex flex-col min-h-screen`}
      >
        <StoreProvider>
          <CartProvider>
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
