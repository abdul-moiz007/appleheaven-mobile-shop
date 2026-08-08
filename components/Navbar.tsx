'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Search, PhoneCall, ShieldCheck, Menu, X, Sparkles } from 'lucide-react';

export default function Navbar() {
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-darkBg/80 border-b border-gray-800 text-white">
      {/* Top Notification Bar */}
      <div className="bg-gradient-to-r from-teal-900 via-brand-700 to-indigo-900 text-teal-100 text-xs py-1.5 px-4 text-center font-medium flex justify-between items-center max-w-7xl mx-auto">
        <span className="hidden sm:flex items-center gap-1">
          <ShieldCheck className="w-4 h-4 inline text-teal-300" /> 100% Original Mobile Accessories Guarantee
        </span>
        <span className="mx-auto sm:mx-0 font-semibold">
          ⚡ Free Express Shipping Across Pakistan on Orders Over Rs. 3,000!
        </span>
        <a href="tel:+923001234567" className="hidden md:flex items-center gap-1 hover:text-white transition">
          <PhoneCall className="w-3.5 h-3.5" /> Helpline: +92 333 0545222
        </a>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-brand-600 flex items-center justify-center text-darkBg shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-6 h-6 fill-darkBg" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-teal-200 to-teal-400 bg-clip-text text-transparent">
              AuraGear
            </span>
            <span className="block text-[10px] text-teal-400 uppercase tracking-widest font-semibold -mt-1">
              Mobile Accessories
            </span>
          </div>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <Link href="/" className="hover:text-teal-400 transition-colors">Home</Link>
          <Link href="/products" className="hover:text-teal-400 transition-colors">Catalog</Link>
          <Link href="/products?category=cases" className="hover:text-teal-400 transition-colors">Cases</Link>
          <Link href="/products?category=chargers" className="hover:text-teal-400 transition-colors">Chargers</Link>
          <Link href="/products?category=audio" className="hover:text-teal-400 transition-colors">Audio</Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/cart"
            className="relative p-2.5 rounded-xl bg-gray-900/90 border border-gray-800 text-gray-200 hover:border-teal-500 hover:text-teal-400 transition-all flex items-center gap-2 group"
          >
            <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline text-xs font-semibold">Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-to-r from-teal-500 to-brand-600 text-darkBg text-xs font-bold flex items-center justify-center shadow-md shadow-teal-500/50 animate-pulse">
                {totalItems}
              </span>
            )}
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-darkBg border-b border-gray-800 px-4 py-4 space-y-3">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-200 font-medium hover:text-teal-400">Home</Link>
          <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-200 font-medium hover:text-teal-400">All Products</Link>
          <Link href="/products?category=cases" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-200 font-medium hover:text-teal-400">Cases & Covers</Link>
          <Link href="/products?category=chargers" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-200 font-medium hover:text-teal-400">Fast Chargers</Link>
          <Link href="/products?category=audio" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-200 font-medium hover:text-teal-400">Wireless Audio</Link>
          <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-teal-400 font-semibold border-t border-gray-800 pt-3">Admin Dashboard</Link>
        </div>
      )}
    </header>
  );
}
