import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Zap, Sparkles, BatteryCharging, Headphones } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-darkBg via-gray-900 to-darkBg py-16 lg:py-24 border-b border-gray-800">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-teal-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Text */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-teal-400 animate-spin" />
              New 2026 Collection Dropped
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Elevate Your Mobile Experience with{' '}
              <span className="bg-gradient-to-r from-teal-300 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
                Aesthetic Tech
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Explore high-performance 65W GaN fast chargers, military-grade MagSafe cases, hybrid ANC earbuds, and curved privacy glass. Engineered for beauty and durability.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/products"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-teal-400 to-brand-600 text-darkBg font-bold text-sm hover:shadow-lg hover:shadow-teal-500/25 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                Shop Full Catalog <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/products?category=magsafe"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gray-900 border border-gray-700 text-gray-200 font-semibold text-sm hover:bg-gray-800 transition-all text-center"
              >
                Explore MagSafe Gear
              </Link>
            </div>

            {/* Micro Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-800/80 text-center lg:text-left">
              <div>
                <span className="block text-2xl font-extrabold text-white">100%</span>
                <span className="text-xs text-gray-400">Authentic Guarantee</span>
              </div>
              <div>
                <span className="block text-2xl font-extrabold text-teal-400">24 Hours</span>
                <span className="text-xs text-gray-400">Fast Dispatch</span>
              </div>
              <div>
                <span className="block text-2xl font-extrabold text-white">4.9★</span>
                <span className="text-xs text-gray-400">Customer Rating</span>
              </div>
            </div>
          </div>

          {/* Right Visual Card Stack */}
          <div className="relative flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-3xl bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 p-6 shadow-2xl flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/20 rounded-full blur-3xl -z-0" />

              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/30">
                  Featured Product
                </span>
                <span className="text-xs font-semibold text-gray-400">Limited Stock</span>
              </div>

              <div className="relative z-10 my-4 flex justify-center">
                <img
                  src="https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?auto=format&fit=crop&q=80&w=800"
                  alt="AuraShield MagSafe Case"
                  className="w-64 h-64 object-cover rounded-2xl shadow-2xl shadow-teal-500/10 hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="relative z-10 bg-gray-900/90 backdrop-blur-md p-4 rounded-xl border border-gray-800 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">AuraShield MagSafe Case</h4>
                  <p className="text-xs text-teal-400 font-semibold">Rs. 2,499 <span className="text-gray-500 line-through ml-1">Rs. 3,200</span></p>
                </div>
                <Link
                  href="/products/prod-1"
                  className="px-4 py-2 rounded-lg bg-teal-500 text-darkBg font-bold text-xs hover:bg-teal-400 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
