# AuraGear Mobile Accessories — Full-Stack E-Commerce Website

An aesthetic, modern, full-stack Next.js e-commerce application built for a mobile shop & accessories business.

## 🚀 Key Features

- **Aesthetic Dark Mode UI**: Designed with glassmorphic accents, gradient highlights, and responsive layouts tailored for mobile accessory presentation.
- **Product Catalog & Filtering**: Real-time search, category filtering (Cases, 65W Chargers, ANC Earbuds, MagSafe, Privacy Glass, Car Holders), and sorting.
- **Dynamic Product Pages**: High-definition image display, specifications checklist, stock status, ratings, and customer reviews.
- **Full Shopping Cart System**: Persistent cart state (`localStorage`), item quantity controls, subtotal calculations, and dynamic free shipping thresholds.
- **Seamless Checkout**: Customer contact & shipping address collection, city selector, Cash on Delivery (COD), and Direct Bank Transfer support.
- **Admin Management Dashboard**: Overview of store metrics (Revenue, Orders, Products, Customers) and real-time customer order management.
- **Database Ready**: Includes Prisma ORM schema (`prisma/schema.prisma`) and Next.js App Router API endpoints (`/api/products`, `/api/orders`).

---

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router, Server & Client Components)
- **Styling**: Tailwind CSS, Autoprefixer, PostCSS
- **Icons**: Lucide React
- **Language**: TypeScript
- **Database & ORM**: Prisma ORM with PostgreSQL / Supabase support
- **Deployment Platform**: Vercel

---

## 💻 Running Locally

1. **Navigate to project directory**:
   ```bash
   cd mobile-shop-ecommerce
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 🌐 Making It Live for Customers (Deploying on Vercel)

Follow these step-by-step instructions to launch your website live for customers worldwide:

### Step 1: Push Code to GitHub
1. Create a new repository on [GitHub](https://github.com/new) named `mobile-shop-accessories`.
2. In your local terminal, run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of mobile shop e-commerce platform"
   git branch -M main
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/mobile-shop-accessories.git
   git push -u origin main
   ```

### Step 2: Connect to Vercel
1. Go to [Vercel](https://vercel.com) and log in with your GitHub account.
2. Click **"Add New"** > **"Project"**.
3. Select your `mobile-shop-accessories` repository from the list.
4. Keep the Framework Preset as **Next.js**.

### Step 3: Configure Environment Variables
Add the following key-value pairs in Vercel's Environment Variables settings:
- `NEXT_PUBLIC_STORE_NAME`: `AuraGear Mobile Accessories`
- `NEXT_PUBLIC_STORE_PHONE`: `+92 300 1234567`
- `DATABASE_URL`: `postgresql://...` (from Supabase or Neon DB)

### Step 4: Deploy
1. Click **"Deploy"**.
2. Vercel will build and publish your website in less than 2 minutes!
3. You will receive a live URL like `https://mobile-shop-accessories.vercel.app`.

### Step 5: (Optional) Add a Custom Domain
1. Purchase a domain (e.g. `auragear.pk` or `auragearmobiles.com`).
2. Go to your Project Settings in Vercel > **Domains**.
3. Add your domain name and update your DNS records (CNAME/A records) as guided by Vercel.

---

## 📁 Project Structure

```
mobile-shop-ecommerce/
├── app/
│   ├── admin/             # Admin store dashboard
│   ├── api/               # API endpoints (/products, /orders)
│   ├── cart/              # Shopping cart page
│   ├── checkout/          # Order checkout page
│   ├── products/          # Catalog & dynamic product detail page
│   ├── globals.css        # Tailwind directives & theme styles
│   ├── layout.tsx         # Root layout with Navbar & Footer
│   └── page.tsx           # Aesthetic homepage & hero banner
├── components/
│   ├── Footer.tsx         # Store footer with guarantees & contact
│   ├── HeroSection.tsx    # Aesthetic hero section
│   ├── Navbar.tsx         # Top navigation bar & cart badge
│   └── ProductCard.tsx    # Product card component
├── context/
│   └── CartContext.tsx    # React Cart Context state manager
├── data/
│   └── products.ts        # Mobile accessories dataset & categories
├── prisma/
│   └── schema.prisma      # Database schema (Products, Orders)
└── package.json           # Dependencies & scripts
```
