import "./globals.css";
import React from "react";
import Navbar from './components/NavBar'; // Import your Navbar component

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className="flex flex-col items-center justify-center min-h-screen">
        <Navbar/>
        <div className="flex-grow flex items-center justify-center">
            {children}
        </div>
        </body>
        </html>
    );
}