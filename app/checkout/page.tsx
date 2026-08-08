'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { ShieldCheck, Truck, CheckCircle, CreditCard, Banknote, Building } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: 'Rawalpindi',
    address: '',
    paymentMethod: 'COD', // COD, BANK_TRANSFER
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  const shippingFee = subtotal >= 3000 ? 0 : 250;
  const grandTotal = subtotal + shippingFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address) {
      alert('Please fill in all required delivery fields.');
      return;
    }

    setIsSubmitting(true);

    // Simulate API order submission
    setTimeout(() => {
      const generatedId = 'AG-' + Math.floor(100000 + Math.random() * 900000);
      setOrderId(generatedId);
      setIsSubmitting(false);
      setOrderComplete(true);
      clearCart();
    }, 1500);
  };

  if (orderComplete) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
          <CheckCircle className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">Order Confirmed</span>
          <h1 className="text-3xl font-black text-white">Thank You for Your Order!</h1>
          <p className="text-xs text-gray-300">
            Order Reference: <span className="font-mono font-bold text-teal-300">{orderId}</span>
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-gray-900/80 border border-gray-800 text-left text-xs space-y-3">
          <h3 className="font-bold text-white border-b border-gray-800 pb-2">Delivery Summary</h3>
          <p><span className="text-gray-400">Customer:</span> {formData.fullName}</p>
          <p><span className="text-gray-400">Phone:</span> {formData.phone}</p>
          <p><span className="text-gray-400">Address:</span> {formData.address}, {formData.city}</p>
          <p><span className="text-gray-400">Payment Method:</span> {formData.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Bank Transfer'}</p>
          <p className="text-teal-400 font-bold"><span className="text-gray-400">Total Payable:</span> Rs. {grandTotal.toLocaleString()}</p>
        </div>

        <p className="text-xs text-gray-400">
          We will contact you on <span className="text-white font-semibold">{formData.phone}</span> to confirm dispatch within 24 hours.
        </p>

        <Link
          href="/products"
          className="inline-block px-8 py-3.5 rounded-xl bg-gradient-to-r from-teal-400 to-brand-600 text-darkBg font-bold text-xs shadow-lg"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">No Items in Cart</h2>
        <Link href="/products" className="inline-block px-6 py-2.5 rounded-xl bg-teal-500 text-darkBg font-bold text-xs">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Checkout</h1>
        <p className="text-xs text-gray-400 mt-1">Provide your delivery information to complete your purchase</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Delivery Details */}
        <div className="lg:col-span-2 space-y-6 bg-gray-900/60 border border-gray-800 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white border-b border-gray-800 pb-3 flex items-center gap-2">
            <Truck className="w-5 h-5 text-teal-400" /> Shipping & Delivery Address
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-300">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Abdul Moiz"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:border-teal-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-300">Phone Number (For COD Delivery) *</label>
              <input
                type="tel"
                required
                placeholder="0300 1234567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:border-teal-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-semibold text-gray-300">Email Address (Optional)</label>
              <input
                type="email"
                placeholder="moiz@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:border-teal-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-300">City *</label>
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-teal-500 focus:outline-none"
              >
                <option value="Rawalpindi">Rawalpindi</option>
                <option value="Islamabad">Islamabad</option>
                <option value="Lahore">Lahore</option>
                <option value="Karachi">Karachi</option>
                <option value="Faisalabad">Faisalabad</option>
                <option value="Multan">Multan</option>
                <option value="Peshawar">Peshawar</option>
                <option value="Other">Other City</option>
              </select>
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-semibold text-gray-300">Complete Delivery Address *</label>
              <textarea
                required
                rows={3}
                placeholder="House #, Street #, Sector/Area, Nearby Landmark"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:border-teal-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-3 border-t border-gray-800 pt-6">
            <h4 className="text-sm font-bold text-white">Payment Option</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label
                className={`p-4 rounded-xl border flex items-center gap-3 cursor-pointer transition ${
                  formData.paymentMethod === 'COD'
                    ? 'bg-teal-500/10 border-teal-500 text-white'
                    : 'bg-gray-950 border-gray-800 text-gray-400'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="COD"
                  checked={formData.paymentMethod === 'COD'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'COD' })}
                  className="accent-teal-500"
                />
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-xs text-white">
                    <Banknote className="w-4 h-4 text-teal-400" /> Cash on Delivery (COD)
                  </div>
                  <p className="text-[10px] text-gray-400">Pay cash upon receiving package</p>
                </div>
              </label>

              <label
                className={`p-4 rounded-xl border flex items-center gap-3 cursor-pointer transition ${
                  formData.paymentMethod === 'BANK'
                    ? 'bg-teal-500/10 border-teal-500 text-white'
                    : 'bg-gray-950 border-gray-800 text-gray-400'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="BANK"
                  checked={formData.paymentMethod === 'BANK'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'BANK' })}
                  className="accent-teal-500"
                />
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-xs text-white">
                    <Building className="w-4 h-4 text-teal-400" /> Direct Bank Transfer
                  </div>
                  <p className="text-[10px] text-gray-400">EasyPaisa, JazzCash, or Bank Account</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Order Summary Box */}
        <div className="p-6 rounded-2xl bg-gray-900/90 border border-gray-800 space-y-6">
          <h3 className="text-lg font-bold text-white border-b border-gray-800 pb-3">Your Items ({cart.length})</h3>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {cart.map(({ product, quantity }) => (
              <div key={product.id} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-teal-400">{quantity}x</span>
                  <span className="text-gray-200 line-clamp-1 max-w-[150px]">{product.name}</span>
                </div>
                <span className="font-semibold text-white">Rs. {(product.price * quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 pt-4 space-y-2 text-xs">
            <div className="flex justify-between text-gray-400">
              <span>Subtotal</span>
              <span>Rs. {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Shipping</span>
              <span>{shippingFee === 0 ? <span className="text-emerald-400 font-bold">FREE</span> : `Rs. ${shippingFee}`}</span>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-gray-800">
              <span>Total Payable</span>
              <span className="text-teal-400">Rs. {grandTotal.toLocaleString()}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-teal-400 to-brand-600 text-darkBg font-extrabold text-xs hover:shadow-lg hover:shadow-teal-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? 'Processing Order...' : 'Confirm Order Now'}
          </button>
        </div>
      </form>
    </div>
  );
}
