'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Trash2, ShoppingBag, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, subtotal, clearCart } = useCart();

  const shippingFee = subtotal >= 3000 || cart.length === 0 ? 0 : 250;
  const grandTotal = subtotal + shippingFee;

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center mx-auto text-gray-500">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">Your Shopping Cart is Empty</h2>
          <p className="text-xs text-gray-400">Discover our collection of premium mobile shop accessories.</p>
        </div>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-400 to-brand-600 text-darkBg font-bold text-xs shadow-lg shadow-teal-500/20"
        >
          Explore Catalog <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Shopping Cart</h1>
          <p className="text-xs text-gray-400 mt-1">Review your selected mobile accessories before checkout</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-red-400 hover:text-red-300 font-semibold"
        >
          Clear Entire Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-xl bg-gray-950 border border-gray-800 shrink-0"
                />
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-teal-400 uppercase">{product.category}</span>
                  <Link href={`/products/${product.id}`} className="block text-sm font-semibold text-white hover:text-teal-300">
                    {product.name}
                  </Link>
                  <p className="text-xs text-gray-400">Rs. {product.price.toLocaleString()} each</p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-800">
                {/* Quantity Buttons */}
                <div className="flex items-center bg-gray-950 border border-gray-800 rounded-lg">
                  <button
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    className="px-2.5 py-1 text-gray-400 hover:text-white font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-bold text-white">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="px-2.5 py-1 text-gray-400 hover:text-white font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal Item Price */}
                <span className="text-sm font-bold text-white min-w-[80px] text-right">
                  Rs. {(product.price * quantity).toLocaleString()}
                </span>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="p-2 text-gray-500 hover:text-red-400 transition"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <Link href="/products" className="inline-flex items-center gap-2 text-xs font-semibold text-teal-400 hover:underline pt-2">
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>

        {/* Order Summary Sidebar */}
        <div className="p-6 rounded-2xl bg-gray-900/90 border border-gray-800 space-y-6">
          <h3 className="text-lg font-bold text-white border-b border-gray-800 pb-4">Order Summary</h3>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between text-gray-300">
              <span>Subtotal</span>
              <span className="font-semibold text-white">Rs. {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Estimated Delivery Fee</span>
              <span className="font-semibold text-white">
                {shippingFee === 0 ? <span className="text-emerald-400 font-bold">FREE</span> : `Rs. ${shippingFee}`}
              </span>
            </div>
            {shippingFee > 0 && (
              <p className="text-[11px] text-teal-400 bg-teal-500/10 p-2 rounded-lg border border-teal-500/20">
                💡 Add Rs. {(3000 - subtotal).toLocaleString()} more to your cart for FREE shipping!
              </p>
            )}
          </div>

          <div className="border-t border-gray-800 pt-4 flex justify-between items-center text-sm">
            <span className="font-bold text-white">Grand Total</span>
            <span className="text-xl font-black text-teal-400">Rs. {grandTotal.toLocaleString()}</span>
          </div>

          <Link
            href="/checkout"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-400 to-brand-600 text-darkBg font-bold text-xs hover:shadow-lg hover:shadow-teal-500/20 transition-all flex items-center justify-center gap-2"
          >
            Proceed to Checkout <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400 text-center">
            <ShieldCheck className="w-4 h-4 text-teal-400" /> Safe & Secure Cash on Delivery Option Available
          </div>
        </div>
      </div>
    </div>
  );
}
