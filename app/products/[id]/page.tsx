'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { INITIAL_PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Star, ShieldCheck, Truck, RefreshCw, ShoppingCart, Check, ArrowLeft, Zap } from 'lucide-react';
import Link from 'next/link';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = INITIAL_PRODUCTS.find((p) => p.id === params.id || p.slug === params.id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Product Not Found</h2>
        <p className="text-gray-400 text-xs">The requested accessory could not be found.</p>
        <Link href="/products" className="inline-block px-6 py-2.5 rounded-xl bg-teal-500 text-darkBg font-bold text-xs">
          Back to Catalog
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back Button */}
      <Link href="/products" className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-teal-400 transition">
        <ArrowLeft className="w-4 h-4" /> Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Product Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square w-full rounded-3xl overflow-hidden bg-gray-950 border border-gray-800 relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.isFeatured && (
              <span className="absolute top-4 left-4 bg-teal-500 text-darkBg font-extrabold text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                <Zap className="w-3.5 h-3.5 fill-darkBg" /> Best Seller
              </span>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">{product.category}</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 leading-snug">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mt-3 text-xs">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-bold text-gray-200">{product.rating}</span>
              <span className="text-gray-500">({product.reviewsCount} customer reviews)</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="p-4 rounded-2xl bg-gray-900/80 border border-gray-800 flex items-center gap-4">
            <div>
              <span className="text-sm text-gray-400">Price: </span>
              <span className="text-3xl font-black text-white">Rs. {product.price.toLocaleString()}</span>
              {product.oldPrice && (
                <span className="text-sm text-gray-500 line-through ml-2">
                  Rs. {product.oldPrice.toLocaleString()}
                </span>
              )}
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 ml-auto">
              In Stock (Ready for 24h Shipping)
            </span>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            {product.description}
          </p>

          {/* Key Specifications */}
          <div className="space-y-2 border-t border-b border-gray-800 py-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Key Specifications:</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-300">
              {product.specs.map((spec, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
                  {spec}
                </li>
              ))}
            </ul>
          </div>

          {/* Quantity Selector & CTA Buttons */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold text-gray-300">Quantity:</span>
              <div className="flex items-center bg-gray-900 border border-gray-800 rounded-xl">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-gray-300 hover:text-white font-bold"
                >
                  -
                </button>
                <span className="px-4 text-xs font-bold text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-gray-300 hover:text-white font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={handleAddToCart}
                className={`py-3.5 px-6 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg ${
                  added
                    ? 'bg-teal-500 text-darkBg'
                    : 'bg-teal-600/20 border border-teal-500/40 text-teal-300 hover:bg-teal-500 hover:text-darkBg'
                }`}
              >
                {added ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                {added ? 'Added to Cart' : 'Add to Cart'}
              </button>

              <button
                onClick={handleBuyNow}
                className="py-3.5 px-6 rounded-xl bg-gradient-to-r from-teal-400 to-brand-600 text-darkBg font-bold text-xs hover:shadow-lg hover:shadow-teal-500/20 transition-all text-center"
              >
                Buy Now (Cash on Delivery)
              </button>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-2 pt-4 text-center text-[10px] text-gray-400">
            <div className="p-2 rounded-xl bg-gray-900/40 border border-gray-800 space-y-1">
              <Truck className="w-4 h-4 text-teal-400 mx-auto" />
              <p>24h Fast Dispatch</p>
            </div>
            <div className="p-2 rounded-xl bg-gray-900/40 border border-gray-800 space-y-1">
              <ShieldCheck className="w-4 h-4 text-teal-400 mx-auto" />
              <p>100% Original Product</p>
            </div>
            <div className="p-2 rounded-xl bg-gray-900/40 border border-gray-800 space-y-1">
              <RefreshCw className="w-4 h-4 text-teal-400 mx-auto" />
              <p>7-Day Easy Warranty</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
