import type { Metadata } from "next";
import "./globals.css";
import { ThemeWrapper } from "@/components/ThemeWrapper";
import { CartProvider } from "@/store/cartStore";
import { WishlistProvider } from "@/store/wishlistStore";

export const metadata: Metadata = {
  title: "Upfront",
  description: "Launch planning made simple.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeWrapper>
          <WishlistProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </WishlistProvider>
        </ThemeWrapper>
      </body>
    </html>
  );
}
