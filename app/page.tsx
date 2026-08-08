'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import ProductCard from '@/components/ProductCard';
import { Product, CATEGORIES } from '@/data/products';
import { Shield, Zap, Headphones, Smartphone, BatteryCharging, Car, Grid, ArrowRight, Star, RefreshCw } from 'lucide-react';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch dynamic products from backend API
  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts(data.products);
        }
      })
      .catch((err) => console.error('Failed to fetch dynamic products:', err))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield': return <Shield className="w-4 h-4" />;
      case 'Zap': return <Zap className="w-4 h-4" />;
      case 'Headphones': return <Headphones className="w-4 h-4" />;
      case 'Smartphone': return <Smartphone className="w-4 h-4" />;
      case 'BatteryCharging': return <BatteryCharging className="w-4 h-4" />;
      case 'Car': return <Car className="w-4 h-4" />;
      default: return <Grid className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <HeroSection />

      {/* Category Pills Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Shop by Category</h2>
            <p className="text-xs text-gray-400">Select a category to filter aesthetic mobile gear</p>
          </div>
          <Link href="/products" className="text-xs font-semibold text-teal-400 hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-gradient-to-r from-teal-500 to-brand-600 text-darkBg border-teal-400 shadow-lg shadow-teal-500/20 scale-105'
                    : 'bg-gray-900 border-gray-800 text-gray-300 hover:border-gray-700 hover:text-white'
                }`}
              >
                {getCategoryIcon(cat.icon)}
                {cat.name}
              </button>
            );
          })}
        </div>
      </section>

      {/* Product Catalog Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Featured Mobile Accessories</h2>
            <p className="text-xs text-gray-400">Handpicked premium products with official warranty</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-xs text-gray-400 flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin text-teal-400" /> Loading shop inventory...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Aesthetic Banner Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-gray-900 via-teal-950 to-gray-900 border border-teal-500/30 p-8 lg:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center lg:text-left max-w-xl">
            <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/30 inline-block">
              Upgrade Your Setup
            </span>
            <h3 className="text-3xl font-black text-white leading-snug">
              Looking for Wholesale or Custom Bulk Mobile Accessories?
            </h3>
            <p className="text-sm text-gray-300">
              We supply retail shops and corporate clients across Pakistan with genuine mobile accessories at competitive trade prices.
            </p>
            <div className="pt-2">
              <a
                href="https://wa.me/923001234567"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-darkBg font-bold text-xs hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/20"
              >
                Contact via WhatsApp (+92 333 0545222)
              </a>
            </div>
          </div>

          <div className="w-full lg:w-80 aspect-video rounded-2xl overflow-hidden border border-gray-800 shadow-xl bg-gray-950">
            <img
              src="https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&q=80&w=800"
              alt="Fast Chargers Bulk"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Verified Customer Reviews */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-white">Loved by Tech Enthusiasts Across Pakistan</h2>
          <p className="text-xs text-gray-400 mt-1">Real reviews from our valued mobile shop customers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-3">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              "The AuraShield MagSafe case fits my iPhone 15 Pro Max like a glove. Magnet is super strong on my car mount, and the matte finish doesn't show fingerprints."
            </p>
            <div className="text-xs font-semibold text-white pt-2 border-t border-gray-800">
              — Hamza Tariq, Rawalpindi
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-3">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              "Ordered the 65W GaN charger yesterday and received it today in Islamabad! Charges my laptop and Samsung phone simultaneously without getting hot."
            </p>
            <div className="text-xs font-semibold text-white pt-2 border-t border-gray-800">
              — Usama Khan, Islamabad
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-3">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              "AuraBuds Pro sound quality is insane for this price. Noise cancellation works great in noisy environments. Highly recommended store!"
            </p>
            <div className="text-xs font-semibold text-white pt-2 border-t border-gray-800">
              — Bilal Ahmed, Lahore
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
