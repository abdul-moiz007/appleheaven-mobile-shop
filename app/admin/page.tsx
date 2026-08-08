'use client';

import React, { useState, useEffect } from 'react';
import { Product, CATEGORIES } from '@/data/products';
import { Package, ShoppingBag, Users, DollarSign, Plus, Trash2, Clock, Check, X, Sparkles, RefreshCw, Lock, Key, LogOut } from 'lucide-react';

const ADMIN_SECRET_KEY = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'auragear2026';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputPassword, setInputPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState<'orders' | 'inventory'>('inventory');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Product Form State
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'cases',
    price: '',
    oldPrice: '',
    image: '',
    description: '',
    specs: 'MagSafe Compatible, 1 Year Warranty',
    isFeatured: false,
  });

  const [submitting, setSubmitting] = useState(false);

  // Check login state on initial load
  useEffect(() => {
    const savedAuth = localStorage.getItem('appleheaven_admin_auth');
    if (savedAuth === ADMIN_SECRET_KEY) {
      setIsAuthenticated(true);
      fetchProducts();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPassword === ADMIN_SECRET_KEY) {
      setIsAuthenticated(true);
      setLoginError('');
      localStorage.setItem('appleheaven_admin_auth', ADMIN_SECRET_KEY);
      fetchProducts();
    } else {
      setLoginError('Incorrect Admin Password! Access Denied.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('appleheaven_admin_auth');
  };

  // Fetch live products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) {
      alert('Please fill product name and price');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-secret': ADMIN_SECRET_KEY,
        },
        body: JSON.stringify({
          name: newProduct.name,
          category: newProduct.category,
          price: Number(newProduct.price),
          oldPrice: newProduct.oldPrice ? Number(newProduct.oldPrice) : undefined,
          image: newProduct.image || 'https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?auto=format&fit=crop&q=80&w=800',
          description: newProduct.description || 'Premium mobile accessory.',
          specs: newProduct.specs.split(',').map((s) => s.trim()),
          isFeatured: newProduct.isFeatured,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setShowAddModal(false);
        setNewProduct({
          name: '',
          category: 'cases',
          price: '',
          oldPrice: '',
          image: '',
          description: '',
          specs: 'MagSafe Compatible, 1 Year Warranty',
          isFeatured: false,
        });
        fetchProducts(); // Refresh list immediately
      } else {
        alert(data.error || 'Failed to add product');
      }
    } catch (err) {
      console.error('Error adding product:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`/api/products?id=${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-secret': ADMIN_SECRET_KEY },
      });
      const data = await res.json();
      if (data.success) {
        fetchProducts();
      }
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  const toggleStock = async (product: Product) => {
    try {
      const res = await fetch('/api/products', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-secret': ADMIN_SECRET_KEY,
        },
        body: JSON.stringify({ id: product.id, inStock: !product.inStock }),
      });
      const data = await res.json();
      if (data.success) {
        fetchProducts();
      }
    } catch (err) {
      console.error('Error toggling stock:', err);
    }
  };

  // 🔒 Protected Login View if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="bg-gray-900 border border-gray-800 p-8 rounded-3xl max-w-md w-full space-y-6 text-center shadow-2xl relative">
          <div className="w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-white">Admin Authentication</h2>
            <p className="text-xs text-gray-400">Restricted access portal. Please enter your secret admin password to manage the store.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-300">Admin Password</label>
              <div className="relative">
                <Key className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="Enter secret password..."
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-9 pr-4 py-3 text-xs text-white placeholder-gray-500 focus:border-teal-500 focus:outline-none"
                />
              </div>
            </div>

            {loginError && (
              <p className="text-xs font-semibold text-red-400 bg-red-500/10 p-2.5 rounded-xl border border-red-500/20">
                ⚠️ {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-400 to-brand-600 text-darkBg font-extrabold text-xs hover:shadow-lg hover:shadow-teal-500/20 transition-all"
            >
              Login to Admin Portal
            </button>
          </form>

          <p className="text-[11px] text-gray-500 border-t border-gray-800/80 pt-4">
            Default Key: <code className="text-teal-400 bg-gray-950 px-1.5 py-0.5 rounded font-mono">auragear2026</code>
          </p>
        </div>
      </div>
    );
  }

  // Authorized Admin Dashboard View
  const mockOrders = [
    {
      id: 'AG-982314',
      customer: 'Hafiz Muhammad Abdul Moiz',
      phone: '0300 1234567',
      city: 'Rawalpindi',
      items: 'AuraShield MagSafe Case (1x), 65W GaN Charger (1x)',
      total: 6398,
      status: 'Pending Dispatch',
      date: 'Today, 2:10 PM',
    },
    {
      id: 'AG-771239',
      customer: 'Hamza Tariq',
      phone: '0321 9876543',
      city: 'Islamabad',
      items: 'AuraBuds Pro ANC Wireless Earbuds (1x)',
      total: 5999,
      status: 'Shipped',
      date: 'Yesterday',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <span className="text-xs font-bold text-teal-400 uppercase tracking-widest flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Authenticated Store Owner Portal
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-1">AuraGear Admin Dashboard</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'inventory' ? 'bg-teal-500 text-darkBg' : 'bg-gray-900 text-gray-400 border border-gray-800'
            }`}
          >
            Inventory ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'orders' ? 'bg-teal-500 text-darkBg' : 'bg-gray-900 text-gray-400 border border-gray-800'
            }`}
          >
            Orders
          </button>
          <button
            onClick={handleLogout}
            className="px-3.5 py-2.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-bold hover:bg-red-500 hover:text-white transition flex items-center gap-1"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 font-semibold">Total Revenue</span>
            <h3 className="text-2xl font-black text-white mt-1">Rs. 123,980</h3>
          </div>
          <div className="p-3 rounded-xl bg-teal-500/10 text-teal-400">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 font-semibold">Total Orders</span>
            <h3 className="text-2xl font-black text-white mt-1">28</h3>
          </div>
          <div className="p-3 rounded-xl bg-teal-500/10 text-teal-400">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 font-semibold">Total Products</span>
            <h3 className="text-2xl font-black text-white mt-1">{products.length}</h3>
          </div>
          <div className="p-3 rounded-xl bg-teal-500/10 text-teal-400">
            <Package className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 font-semibold">Customers</span>
            <h3 className="text-2xl font-black text-white mt-1">24</h3>
          </div>
          <div className="p-3 rounded-xl bg-teal-500/10 text-teal-400">
            <Users className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Active Tab View */}
      {activeTab === 'inventory' ? (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white">Live Product Catalog</h2>
              <p className="text-xs text-gray-400">Add, delete, or manage stock status. Changes update immediately on the frontend.</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-teal-400 to-brand-600 text-darkBg font-extrabold text-xs shadow-lg shadow-teal-500/20 flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <Plus className="w-4 h-4" /> Add New Item / Product
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12 text-xs text-gray-400 flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-teal-400" /> Loading product database...
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((p) => (
                <div key={p.id} className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800 flex flex-col justify-between space-y-4">
                  <div className="flex items-start gap-4">
                    <img src={p.image} alt={p.name} className="w-20 h-20 rounded-xl object-cover bg-gray-950 shrink-0 border border-gray-800" />
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-teal-400 uppercase">{p.category}</span>
                      <h4 className="font-bold text-xs text-white line-clamp-2 leading-snug">{p.name}</h4>
                      <div className="flex items-center gap-2 pt-1">
                        <span className="text-sm font-extrabold text-white">Rs. {p.price.toLocaleString()}</span>
                        {p.oldPrice && (
                          <span className="text-[11px] text-gray-500 line-through">Rs. {p.oldPrice.toLocaleString()}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-800 pt-3 text-xs">
                    <button
                      onClick={() => toggleStock(p)}
                      className={`px-3 py-1 rounded-lg font-bold text-[10px] border ${
                        p.inStock
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : 'bg-red-500/10 text-red-400 border-red-500/30'
                      }`}
                    >
                      {p.inStock ? '✓ In Stock' : '✕ Out of Stock'}
                    </button>

                    <button
                      onClick={() => handleDeleteProduct(p.id)}
                      className="p-2 text-gray-500 hover:text-red-400 transition"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">Incoming Customer Orders</h2>
          <div className="overflow-x-auto bg-gray-900/60 border border-gray-800 rounded-2xl">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-gray-950 text-gray-400 uppercase font-semibold border-b border-gray-800">
                <tr>
                  <th className="px-4 py-3">Order ID</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">City / Phone</th>
                  <th className="px-4 py-3">Items</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {mockOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-800/40">
                    <td className="px-4 py-3 font-mono font-bold text-teal-400">{order.id}</td>
                    <td className="px-4 py-3 font-semibold text-white">{order.customer}</td>
                    <td className="px-4 py-3">{order.city} ({order.phone})</td>
                    <td className="px-4 py-3 max-w-xs truncate">{order.items}</td>
                    <td className="px-4 py-3 font-bold text-white">Rs. {order.total.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 font-semibold text-[10px] border border-amber-500/20 inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Product Modal Form */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 max-w-lg w-full space-y-4 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-lg font-extrabold text-white">Add New Accessory to Shop</h3>
              <p className="text-xs text-gray-400">Fill in the item details. It will automatically publish to the website homepage and catalog.</p>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-300 mb-1">Product Title / Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AuraShield Clear MagSafe Case for iPhone 16"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:border-teal-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-300 mb-1">Category *</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2.5 text-white focus:border-teal-500 focus:outline-none"
                  >
                    {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-300 mb-1">Selling Price (Rs.) *</label>
                  <input
                    type="number"
                    required
                    placeholder="2499"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:border-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-300 mb-1">Original Price (Rs. Optional)</label>
                  <input
                    type="number"
                    placeholder="3200"
                    value={newProduct.oldPrice}
                    onChange={(e) => setNewProduct({ ...newProduct, oldPrice: e.target.value })}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:border-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-300 mb-1">Image URL</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:border-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-300 mb-1">Key Specifications (Comma separated)</label>
                <input
                  type="text"
                  placeholder="MagSafe Compatible, Drop Protection, 1 Year Warranty"
                  value={newProduct.specs}
                  onChange={(e) => setNewProduct({ ...newProduct, specs: e.target.value })}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:border-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-300 mb-1">Product Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe the product details and material..."
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:border-teal-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="featured"
                  checked={newProduct.isFeatured}
                  onChange={(e) => setNewProduct({ ...newProduct, isFeatured: e.target.checked })}
                  className="accent-teal-500"
                />
                <label htmlFor="featured" className="text-gray-300 font-semibold cursor-pointer">
                  Mark as Best Seller / Featured Item on Homepage
                </label>
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-1/2 py-3 rounded-xl bg-gray-800 text-gray-300 font-bold hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-1/2 py-3 rounded-xl bg-gradient-to-r from-teal-400 to-brand-600 text-darkBg font-extrabold shadow-lg shadow-teal-500/20"
                >
                  {submitting ? 'Publishing...' : 'Publish to Shop'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
