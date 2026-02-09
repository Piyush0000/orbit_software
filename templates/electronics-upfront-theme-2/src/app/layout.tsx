import type { Metadata } from "next";
import "./globals.css";
import { ThemeWrapper } from "@/components/ThemeWrapper";
import { CartProvider } from "@/store/cartStore";
import { WishlistProvider } from "@/store/wishlistStore";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Upfront",
  description: "Launch planning made simple.",
};

import { Inter, Poppins } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} antialiased font-sans`}>
        <ThemeWrapper>
          <WishlistProvider>
            <CartProvider>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                  {children}
                </main>
                <Footer />
              </div>
            </CartProvider>
          </WishlistProvider>
        </ThemeWrapper>
      </body>
    </html>
  );
}
