'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Star, ShoppingCart, Check, Zap } from 'lucide-react';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, cart } = useCart();
  const [added, setAdded] = React.useState(false);

  const discountPercent = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group relative bg-gray-900/60 border border-gray-800 rounded-2xl overflow-hidden hover:border-teal-500/50 hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Product Image Container */}
        <Link href={`/products/${product.id}`} className="block relative aspect-square w-full overflow-hidden bg-gray-950">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {discountPercent > 0 && (
            <span className="absolute top-3 left-3 bg-red-500/90 text-white font-bold text-[10px] uppercase px-2.5 py-1 rounded-full backdrop-blur-sm shadow-md">
              -{discountPercent}% OFF
            </span>
          )}
          {product.isFeatured && (
            <span className="absolute top-3 right-3 bg-teal-500/90 text-darkBg font-extrabold text-[10px] uppercase px-2.5 py-1 rounded-full backdrop-blur-sm flex items-center gap-1 shadow-md">
              <Zap className="w-3 h-3 fill-darkBg" /> Best Seller
            </span>
          )}
        </Link>

        {/* Product Details */}
        <div className="p-4 space-y-2">
          <span className="text-[11px] font-semibold text-teal-400 uppercase tracking-wider">
            {product.category}
          </span>
          <Link href={`/products/${product.id}`} className="block">
            <h3 className="text-sm font-semibold text-white group-hover:text-teal-300 transition-colors line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1 text-xs">
            <div className="flex text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            </div>
            <span className="font-bold text-gray-200">{product.rating}</span>
            <span className="text-gray-500 text-[11px]">({product.reviewsCount})</span>
          </div>
        </div>
      </div>

      {/* Price & Action */}
      <div className="p-4 pt-0 flex items-center justify-between border-t border-gray-800/60 mt-2">
        <div>
          <span className="text-xs text-gray-400 font-medium">Rs. </span>
          <span className="text-lg font-extrabold text-white">{product.price.toLocaleString()}</span>
          {product.oldPrice && (
            <span className="block text-[11px] text-gray-500 line-through -mt-1">
              Rs. {product.oldPrice.toLocaleString()}
            </span>
          )}
        </div>

        <button
          onClick={handleAdd}
          className={`p-2.5 rounded-xl font-medium text-xs flex items-center gap-1.5 transition-all shadow-md ${
            added
              ? 'bg-teal-500 text-darkBg font-bold scale-95'
              : 'bg-teal-600/20 border border-teal-500/30 text-teal-300 hover:bg-teal-500 hover:text-darkBg'
          }`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4" /> Added
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" /> Add
            </>
          )}
        </button>
      </div>
    </div>
  );
}
