import React from 'react';
import Link from 'next/link';
import { Sparkles, MapPin, Phone, Mail, Truck, ShieldCheck, RefreshCw } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 border-t border-gray-800 text-sm mt-20">
      {/* Value Proposition Highlights */}
      <div className="border-b border-gray-800/80 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4 p-4 rounded-2xl bg-gray-900/50 border border-gray-800">
            <div className="p-3 rounded-xl bg-teal-500/10 text-teal-400">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white">All over Pakistan Delivery</h4>
              <p className="text-xs text-gray-400">Dispatch within 24 hours across Pakistan</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4 p-4 rounded-2xl bg-gray-900/50 border border-gray-800">
            <div className="p-3 rounded-xl bg-teal-500/10 text-teal-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white">100% Authentic Quality</h4>
              <p className="text-xs text-gray-400">Tested products with official warranty</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4 p-4 rounded-2xl bg-gray-900/50 border border-gray-800">
            <div className="p-3 rounded-xl bg-teal-500/10 text-teal-400">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white">Easy 7-Day Returns</h4>
              <p className="text-xs text-gray-400">Hassle-free replacement policy</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-darkBg">
              <Sparkles className="w-5 h-5 fill-darkBg" />
            </div>
            <span className="text-lg font-bold text-white">Apple Heaven</span>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            Your destination for premium, aesthetic, and durable mobile accessories. High-speed chargers, MagSafe gear, crystal-clear audio, and rugged protection.
          </p>
        </div>

        {/* Categories */}
        <div>
          <h5 className="font-semibold text-white mb-4">Popular Categories</h5>
          <ul className="space-y-2 text-xs">
            <li><Link href="/products?category=cases" className="hover:text-teal-400 transition">MagSafe & Armor Cases</Link></li>
            <li><Link href="/products?category=chargers" className="hover:text-teal-400 transition">65W GaN Fast Chargers</Link></li>
            <li><Link href="/products?category=audio" className="hover:text-teal-400 transition">ANC Wireless Earbuds</Link></li>
            <li><Link href="/products?category=screen-guards" className="hover:text-teal-400 transition">9H Privacy Screen Protectors</Link></li>
            <li><Link href="/products?category=car-holders" className="hover:text-teal-400 transition">Smart Car Mounts</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h5 className="font-semibold text-white mb-4">Customer Support</h5>
          <ul className="space-y-2 text-xs">
            <li><Link href="/cart" className="hover:text-teal-400 transition">Shopping Cart</Link></li>
            <li><Link href="/checkout" className="hover:text-teal-400 transition">Track Order & Checkout</Link></li>
            <li><Link href="/admin" className="hover:text-teal-400 transition">Store Admin Portal</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-3 text-xs">
          <h5 className="font-semibold text-white mb-4">Visit / Contact Us</h5>
          <p className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
            <span>Main I-8 Markaz/ Islamabad, Pakistan</span>
          </p>
          <p className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-teal-400 shrink-0" />
            <span>+92 333 0545222</span>
          </p>
          <p className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-teal-400 shrink-0" />
            <span>support@appleheaven.com</span>
          </p>
        </div>
      </div>

      <div className="border-t border-gray-900 py-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Apple Heaven Mobile Accessories. All rights reserved. Powered by Next.js & Tailwind CSS.
      </div>
    </footer>
  );
}
