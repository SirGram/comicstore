import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Offer from "@/components/Offer";
import Cart from "@/components/modals/Cart";
import MainContent from "@/components/MainContent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Comic Store",
  description: "Princeston Comic Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body
        className={`${inter.className} min-h-screen flex flex-col relative bg-overlay font-sans`}
      >
        <Nav />
        <Cart />
        <MainContent>
          {children}
        </MainContent>
        <Footer />
      </body>
    </html>
  );
}