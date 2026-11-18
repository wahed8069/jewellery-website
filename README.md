# Aurelia Jewels — Lightweight Fashion & Demi-Fine Jewellery E-Commerce Platform

A production-ready, lightweight artificial and fashion jewellery e-commerce platform built for modern jewellery startups. Specializes in affordable, anti-tarnish, waterproof, 18K gold-look ornaments designed for everyday wear, office styling, and special celebrations.

---

## 💎 Key Highlights & Architectural Features

- **Guest Checkout & WhatsApp Direct Ordering:**
  - **Zero Customer Friction:** Customers do NOT need to register, remember passwords, or create accounts.
  - Full guest checkout collecting customer name, mobile, WhatsApp number, and complete delivery address with PIN code.
  - Automatically generates an order record with a unique Order ID (`AUR-YYYYMMDD-XXXX`), calculates server-side totals, and opens the official WhatsApp click-to-chat URL with a beautifully formatted itemized order summary.
  - Sets initial order status as **"Pending Confirmation"** until the admin checks warehouse stock.

- **Manual UPI Payment Workflow (No Costly Gateway Deductions):**
  - No Razorpay, Stripe, or PayPal fees. Customers pay directly via their preferred UPI app (Google Pay, PhonePe, Paytm, BHIM).
  - Clean order confirmation screen displaying the business UPI ID with 1-click copy, dynamic QR code, and payee details.
  - Customers can submit their 12-digit UTR/Reference number directly on the site or via WhatsApp.
  - Admin independently verifies the credit against their bank statement and manually marks orders as **"Paid"** from the dashboard.

- **Separate, Secure Admin Dashboard (`/admin`):**
  - Protected route with Supabase Auth or master admin passcode.
  - **Overview Metrics:** Total orders, verified paid revenue, pending confirmation orders, delivered orders, low-stock inventory warnings.
  - **Order Management:** Filter by status, search by ID or phone, manage delivery details (courier name & tracking number), add internal admin notes, direct WhatsApp link.
  - **Product Management:** Full CRUD (add, edit, delete), multi-image upload/URL, prices, discount prices, stock counts, featured/bestseller badges.
  - **Category Management:** Create, edit, and organize product categories.
  - **Payment Reconciliation:** Audit table of UPI reference numbers, 1-click manual verification, mark as paid or record refunds.
  - **Customer Directory:** Aggregated customer profiles, order counts, lifetime paid value, direct WhatsApp message link.
  - **Store Settings:** Live configuration of brand name, announcement bar, WhatsApp number, UPI ID, QR code, shipping rules, and policies.

- **Luxury-Inspired Brand Aesthetics:**
  - Cream, ivory, champagne, and soft gold color palette.
  - Elegant serif typography (`Playfair Display`) paired with clean geometric sans (`Inter`).
  - Slide-over shopping bag drawer with live free shipping meter (`Add ₹X more to unlock FREE shipping!`).
  - Interactive product quick-view modal, instant `⌘K` search modal, and local storage wishlist.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js (App Router, Server & Client Components) |
| **Language** | TypeScript (Strict mode) |
| **Styling** | Tailwind CSS with custom brand palette & typography |
| **Icons** | Lucide React |
| **Database & Auth** | Supabase (PostgreSQL, Row Level Security, Supabase Auth) |
| **Storage** | Supabase Storage (product-images bucket) |
| **Order Integration** | Official WhatsApp Click-to-Chat API |
| **Payments** | Manual UPI System (UTR Reference & Bank Verification) |
| **Deployment** | Vercel |

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js 18+ or 20+
- npm or pnpm or yarn

### 2. Installation
```bash
git clone <your-repository-url>
cd "jellw web"
npm install
```

### 3. Environment Variables Setup
Copy the `.env.example` file to `.env.local`:
```bash
cp .env.example .env.local
```

Configure your variables in `.env.local`:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Public Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_DEFAULT_WHATSAPP_NUMBER=919876543210
NEXT_PUBLIC_DEFAULT_UPI_ID=aureliajewels@okhdfcbank
NEXT_PUBLIC_DEFAULT_UPI_NAME=Aurelia Fashion Jewels
NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD=799
NEXT_PUBLIC_STANDARD_SHIPPING_FEE=69
```

> **Note on Zero-Config Mode:** If you do not provide Supabase credentials immediately, the application seamlessly runs in fallback/demo mode using rich built-in catalog data and local storage state persistence.

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Supabase Database Setup & Migrations

1. Log into your [Supabase Dashboard](https://supabase.com) and create a new project.
2. Open the **SQL Editor** from the left navigation.
3. Open `supabase/schema.sql` from this repository, copy its entire contents, paste into the Supabase SQL editor, and click **Run**.
   - This creates all 11 tables (`admins`, `categories`, `products`, `product_images`, `product_variants`, `orders`, `order_items`, `payments`, `site_settings`, `reviews`, `coupons`).
   - Automatically enables Row Level Security (RLS) policies allowing public guest checkout and admin management.
   - Sets up automatic `updated_at` triggers and unique order number generation.
4. Next, copy the contents of `supabase/seed.sql`, paste into the SQL editor, and click **Run** to populate initial categories, products, and site settings.
5. In **Storage**, create a new public bucket named `product-images` for uploading jewellery photos.

---

## 🔐 Admin Authentication Setup

1. In your Supabase Dashboard, go to **Authentication -> Users** and click **Add User -> Create User**.
2. Enter the admin email (e.g., `admin@aureliajewels.com`) and a secure password.
3. In the SQL Editor, insert the admin into the `public.admins` table:
   ```sql
   INSERT INTO public.admins (id, email, full_name, role)
   VALUES ('<user-uuid-from-auth.users>', 'admin@aureliajewels.com', 'Store Admin', 'super_admin');
   ```
4. Access the admin dashboard at [http://localhost:3000/admin/login](http://localhost:3000/admin/login).
   - *Default demo credentials for previewing without Supabase:* `admin@aureliajewels.com` / `admin123456`.

---

## 📲 WhatsApp Order Integration Details

When a customer submits the checkout form:
1. Server validates prices, stock availability, and postal information.
2. An order record is saved with status `Pending Confirmation` and payment status `Awaiting Payment`.
3. An itemized WhatsApp message is composed:
   ```text
   ✨ NEW ORDER REQUEST — AURELIA JEWELS ✨
   ━━━━━━━━━━━━━━━━━━━━
   🆔 Order ID: AUR-20261118-8421
   👤 Customer: Suhana Sharma (+91 9876543210)
   📍 Address: Flat 402, Lotus Grand, Bandra, Mumbai - 400050
   🛍️ Items:
   1. Celeste Paperclip Chain (42cm) x 1 — ₹749.00
   2. Aura Teardrop Earrings x 1 — ₹599.00
   💰 Total: ₹1348.00 (Free Express Shipping)
   💳 Payment: Manual UPI Transfer
   ```
4. Opens `https://wa.me/<whatsapp_number>?text=<encoded_text>` in WhatsApp.
5. If the customer closes the popup, the order confirmation page retains an **"Open WhatsApp Now"** button.

---

## 💳 Manual UPI Payment Workflow

```
Customer Places Order via WhatsApp
         │
         ▼
Admin checks inventory in Admin Dashboard
         │
         ▼
Admin shares business UPI ID / QR code
         │
         ▼
Customer pays using GPay / PhonePe / Paytm
         │
         ▼
Customer submits 12-digit UTR reference
         │
         ▼
Admin verifies transaction in business bank account
         │
         ▼
Admin clicks "Verify & Mark Paid" in Dashboard
         │
         ▼
Order marked Confirmed & Dispatched via Courier
```

---

## 🌐 Vercel Deployment Instructions

1. Push your code to GitHub, GitLab, or Bitbucket.
2. Sign in to [Vercel](https://vercel.com) and click **Add New -> Project**.
3. Import your repository.
4. In the **Environment Variables** section, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_SITE_URL` (your custom domain or vercel.app URL)
   - `NEXT_PUBLIC_DEFAULT_WHATSAPP_NUMBER`
   - `NEXT_PUBLIC_DEFAULT_UPI_ID`
5. Click **Deploy**. Vercel will build and deploy your project globally on Edge network.

---

© 2026 Aurelia Jewels. Built for lightweight fashion & demi-fine jewellery brands.
