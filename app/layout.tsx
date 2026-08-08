import React from 'react';
import '@/app/globals.css';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'AppleHeaven | Premium Mobile Accessories Shop',
  description: 'Shop aesthetic, high-performance mobile cases, GaN fast chargers, ANC earbuds, MagSafe power banks, and privacy glass.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col justify-between bg-darkBg text-gray-100 antialiased">
        <CartProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
