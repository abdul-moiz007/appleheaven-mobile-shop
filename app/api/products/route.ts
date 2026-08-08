import { NextResponse } from 'next/server';
import { getAllProducts, addProductToStore, deleteProductFromStore, updateProductInStore } from '@/lib/productsStore';

const ADMIN_SECRET = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'auragear2026';

function isAuthorized(request: Request): boolean {
  const secret = request.headers.get('x-admin-secret');
  return secret === ADMIN_SECRET;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const query = searchParams.get('query');

  let products = getAllProducts();

  if (category && category !== 'all') {
    products = products.filter((p) => p.category === category);
  }

  if (query) {
    products = products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
    );
  }

  return NextResponse.json({ success: true, count: products.length, products });
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized! Password required.' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, category, price, oldPrice, image, description, specs, isFeatured } = body;

    if (!name || !category || !price) {
      return NextResponse.json(
        { success: false, error: 'Product name, category, and price are required' },
        { status: 400 }
      );
    }

    const newProduct = addProductToStore({
      name,
      category,
      price: Number(price),
      oldPrice: oldPrice ? Number(oldPrice) : undefined,
      image: image || 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&q=80&w=800',
      description: description || 'High quality mobile accessory.',
      specs: specs && Array.isArray(specs) ? specs : ['Universal Compatibility', '1 Year Warranty'],
      isFeatured: Boolean(isFeatured),
      inStock: true,
    });

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to add product' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized! Password required.' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Product ID required' }, { status: 400 });
    }

    const success = deleteProductFromStore(id);
    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete product' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized! Password required.' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Product ID required' }, { status: 400 });
    }

    const updated = updateProductInStore(id, updates);
    return NextResponse.json({ success: Boolean(updated), product: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update product' }, { status: 500 });
  }
}
