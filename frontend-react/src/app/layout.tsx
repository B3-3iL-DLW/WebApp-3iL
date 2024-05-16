import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import Navbar from './components/NavBar'; // Import your Navbar component

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body>
      <Navbar />
      {children}
      </body>
      </html>
  );
}