'use client'

import "./globals.css";
import React from "react";
import Navbar from './components/NavBar'; // Import your Navbar component
import { usePathname } from 'next/navigation'

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const showNavbar = pathname !== '/login' && pathname !== '/register';

    return (
        <html lang="en">
        <body className="flex flex-col min-h-screen">
        {showNavbar && <Navbar/>}
        <div className="flex-grow h-full">
            {children}
        </div>
        </body>
        </html>
    );
}