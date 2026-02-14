import type { Metadata } from "next";
import { Nunito, Fredoka } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { WishlistProvider } from "@/context/WishlistContext";
import { StoreProvider } from "@/context/store-context";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Toy Store | Safe & Fun Toys for Kids",
  description: "Discover the best educational and fun toys for children of all ages.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${fredoka.variable} antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <StoreProvider>
          <WishlistProvider>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </WishlistProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
