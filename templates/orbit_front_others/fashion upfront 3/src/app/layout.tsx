import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeWrapper } from "@/components/ThemeWrapper";
import { CartProvider } from "@/store/cartStore";
import { WishlistProvider } from "@/store/wishlistStore";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

import { StorefrontProvider } from "@/contexts/StorefrontContext";

// ... (imports)

// ... (fonts)

export const metadata: Metadata = {
  title: "UPFRONT | Luxury Streetwear",
  description: "Redefining urban fashion with premium essentials.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-[var(--page-bg)] text-[var(--text-primary)] min-h-screen flex flex-col`}>
        <ThemeWrapper>
          <StorefrontProvider>
            <WishlistProvider>
              <CartProvider>
                <Header />
                <main className="flex-grow">
                  {children}
                </main>
                <Footer />
              </CartProvider>
            </WishlistProvider>
          </StorefrontProvider>
        </ThemeWrapper>
      </body>
    </html>
  );
}
