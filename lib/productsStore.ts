import fs from 'fs';
import path from 'path';
import { Product, INITIAL_PRODUCTS } from '@/data/products';

const DATA_FILE = path.join(process.cwd(), 'data', 'dynamic_products.json');

// Initialize data file if it doesn't exist
function ensureDataFile() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(INITIAL_PRODUCTS, null, 2), 'utf-8');
  }
}

export function getAllProducts(): Product[] {
  ensureDataFile();
  try {
    const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading products file:', error);
    return INITIAL_PRODUCTS;
  }
}

export function saveAllProducts(products: Product[]): boolean {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error saving products file:', error);
    return false;
  }
}

export function addProductToStore(newProductData: Omit<Product, 'id' | 'slug' | 'rating' | 'reviewsCount'>): Product {
  const products = getAllProducts();
  const newId = 'prod-' + Date.now();
  const slug = newProductData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const newProduct: Product = {
    ...newProductData,
    id: newId,
    slug: slug,
    rating: 5.0,
    reviewsCount: 1,
    inStock: newProductData.inStock ?? true,
  };

  products.unshift(newProduct);
  saveAllProducts(products);
  return newProduct;
}

export function deleteProductFromStore(id: string): boolean {
  const products = getAllProducts();
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length === products.length) return false;
  return saveAllProducts(filtered);
}

export function updateProductInStore(id: string, updates: Partial<Product>): Product | null {
  const products = getAllProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;

  products[index] = { ...products[index], ...updates };
  saveAllProducts(products);
  return products[index];
}
