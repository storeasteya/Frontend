# Anime T-Shirt Store - Complete E-Commerce Platform

A premium, fully-featured anime t-shirt e-commerce website built with React, Motion, Tailwind CSS, and Supabase.

## 🎯 Complete Feature Set

### ✅ User-Facing Features

1. **Combined Homepage & Shop**
   - Stunning hero section with 3D parallax effects
   - Product carousel with swipe/flip animations
   - One-click navigation between products
   - Hover effects on all interactive elements
   - Smooth scrolling animations

2. **Product Showcase**
   - Interactive 3D product cards
   - Swipe left/right to browse products
   - Featured product badges
   - Size selection with visual feedback
   - In-stock status indicators
   - Anime series tags

3. **Scrolling T-Shirt Animation**
   - Floating video/image animation while scrolling
   - Admin-changeable (upload any video or image)
   - Smooth parallax movement
   - Customizable positioning

4. **Customer Reviews & Testimonials**
   - Product-specific reviews with star ratings
   - Website-wide testimonials section
   - Admin moderation system
   - Beautiful card layouts

5. **Advanced Interactions**
   - Custom glowing cursor (desktop only)
   - Hover effects on all products and buttons
   - Smooth page transitions
   - Mobile-responsive design

### 🔐 Admin Panel Features

**Admin Access:** Only `deepankraghuwanshi1@gmail.com` (Phone: 9685982012)

Navigate to `/admin/login` to access the admin panel.

#### Admin Can Manage:

1. **Products**
   - Add/Edit/Delete products
   - Upload product images (multiple images support)
   - Set prices and descriptions
   - Manage sizes and stock
   - Mark products as featured
   - Set display order

2. **Coupons**
   - Create discount codes
   - Percentage or fixed amount discounts
   - Set minimum purchase requirements
   - Max discount caps
   - Usage limits
   - Validity periods

3. **Product Reviews**
   - Approve/Reject customer reviews
   - Moderate review content
   - Delete inappropriate reviews
   - View review ratings

4. **Website Testimonials**
   - Add/Edit/Delete testimonials
   - Upload customer images
   - Set star ratings
   - Control display order
   - Activate/Deactivate testimonials

5. **Customer Support Information**
   - Edit contact information
   - Update shipping policies
   - Modify return policies
   - Add FAQ sections
   - Change payment methods info
   - Any custom support sections

6. **Scrolling Animations**
   - Upload t-shirt videos
   - Add animated images
   - Switch between different animations
   - Set active animation
   - Support for MP4, WebM videos

## 🚀 Quick Setup

### 1. Set Up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to SQL Editor
3. Copy all content from `supabase-schema.sql`
4. Paste and run in SQL Editor
5. This creates all tables with sample data

### 2. Configure Environment

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Add your Supabase credentials to `.env`:
   ```env
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

3. Get credentials from Supabase Dashboard → Settings → API

### 3. Install Dependencies

```bash
pnpm install
```

### 4. Start Development Server

The Vite dev server is already running. Just refresh your browser!

## 📖 Usage Guide

### For Admin

1. **Login to Admin Panel**
   - Visit `/admin/login`
   - Enter email: `deepankraghuwanshi1@gmail.com`
   - Enter phone: `9685982012`
   - Click "Login to Admin Panel"

2. **Manage Products**
   - Go to Products tab
   - Click "Add Product"
   - Fill in product details
   - Upload image URL
   - Set sizes and stock
   - Save product

3. **Create Coupons**
   - Go to Coupons tab
   - Click "Add Coupon"
   - Enter code (e.g., SAVE20)
   - Choose discount type
   - Set validity and limits
   - Save coupon

4. **Moderate Reviews**
   - Go to Reviews tab
   - View all product reviews
   - Click "Approve" to make visible
   - Click "Delete" to remove

5. **Edit Support Info**
   - Go to Support Info tab
   - Edit contact details
   - Update policies
   - Add new sections

6. **Change Scrolling Animation**
   - Go to Animations tab
   - Click "Add Animation"
   - Choose video or image
   - Enter URL (video: .mp4, .webm)
   - Save - will automatically set as active

### For Customers

1. **Browse Products**
   - Scroll to "Featured Products" section
   - Click left/right arrows to swipe between products
   - Click on product indicators to jump to specific product

2. **Select Size & Add to Cart**
   - Choose your size (S, M, L, XL, XXL)
   - Click "Add to Cart"

3. **Apply Coupons**
   - Enter coupon code
   - See instant discount calculation
   - View final price

## 🎨 Design Features

### Animations

- **3D Parallax Hero** - Background moves with scroll
- **Product Carousel** - Swipe/flip animations between products
- **Hover Effects** - Scale, glow, and transform on hover
- **Scroll Indicators** - Smooth progress indicators
- **Page Transitions** - Fade and slide transitions
- **Custom Cursor** - Glowing cursor on desktop
- **Floating Particles** - Ambient animations

### Color Scheme

- **Background:** Pure black (#000000)
- **Primary:** White (#FFFFFF)
- **Accents:** Gradients and overlays
- **Glass Effects:** Backdrop blur with transparency

### Typography

- **Headings:** Black, ultra-bold
- **Body:** Light to medium weights
- **Tracking:** Tight tracking for impact

## 🗄️ Database Schema

### Tables

1. **products** - Product catalog
2. **coupons** - Discount codes
3. **product_reviews** - Customer reviews
4. **website_testimonials** - Testimonials
5. **support_info** - Contact & policy info
6. **scrolling_animations** - T-shirt animations
7. **orders** - Customer orders
8. **order_items** - Order line items
9. **admin_users** - Admin authentication

## 🔒 Security

- Admin-only authentication for `/admin`
- Row Level Security (RLS) on all tables
- Public read access for products/testimonials
- Admin verification by email + phone
- Secure password-less authentication

## 📱 Responsive Design

- **Desktop:** Full animations, custom cursor, wide layouts
- **Tablet:** Optimized grid layouts
- **Mobile:** Touch-friendly, stacked layouts
- **Touch Devices:** Standard cursor, swipe gestures

## 🎯 Sample Data Included

The database comes with:

- **6 Anime Products** (Solo Leveling, Dragon Ball Z, Demon Slayer, One Piece, Attack on Titan, Naruto)
- **3 Testimonials** with ratings
- **3 Active Coupons** ready to use
- **6 Support Information sections**
- **1 Admin User** (you!)

## 🛠️ Tech Stack

- **Frontend:** React 18
- **Routing:** React Router 7
- **Animations:** Motion (Framer Motion)
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Database:** Supabase (PostgreSQL)
- **Build:** Vite
- **Package Manager:** pnpm

## 📂 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── ui/              # Radix UI components
│   │   ├── Header.tsx       # Navigation header
│   │   ├── Footer.tsx       # Site footer
│   │   ├── GlowingCursor.tsx
│   │   ├── ScrollingTshirt.tsx
│   │   └── RootLayout.tsx
│   ├── pages/
│   │   ├── Home.tsx         # Combined home + shop
│   │   ├── About.tsx
│   │   ├── Admin.tsx        # Admin dashboard
│   │   └── AdminLogin.tsx   # Admin authentication
│   ├── routes.ts            # Route configuration
│   └── App.tsx              # App entry point
├── lib/
│   └── supabase.ts          # Supabase client + types
└── styles/
    ├── theme.css            # Tailwind theme
    └── fonts.css            # Font imports
```

## 🚧 Upcoming Features

- Shopping cart functionality
- Checkout with payment gateway
- Order tracking
- User accounts & profiles
- Email notifications
- Product search & filters
- Wishlist functionality

## 💡 Tips

1. **Product Images:** Use high-quality images (800x800px minimum)
2. **Coupon Codes:** Use all CAPS for consistency
3. **Animations:** Use compressed videos (<5MB) for scrolling animation
4. **Support Info:** Keep content concise and clear
5. **Reviews:** Moderate regularly to maintain quality

## 🐛 Troubleshooting

**Products not loading?**
- Check Supabase connection
- Verify `.env` credentials
- Check browser console for errors

**Admin login not working?**
- Ensure exact email match: `deepankraghuwanshi1@gmail.com`
- Phone must be: `9685982012`
- Check network tab for API errors

**Animations not showing?**
- Verify video URL is accessible
- Check animation is set to "active"
- Try using image instead of video

**Cursor issues on mobile?**
- Cursor is hidden on touch devices by design
- Test on desktop for full experience

## 📞 Support

For questions or issues:
- Check Supabase logs
- Review browser console
- Verify database schema is complete

## 🎉 Features Summary

✅ Combined home + shop page with carousel
✅ 3D product swipe animations
✅ Hover effects everywhere
✅ Scrolling t-shirt video animation (admin changeable)
✅ Admin authentication (email + phone)
✅ Product management (add/edit/delete)
✅ Review system with moderation
✅ Website testimonials
✅ Customer support info panel (editable)
✅ Coupon system
✅ Custom cursor (desktop only)
✅ Mobile responsive
✅ Beautiful animations throughout

---

**Admin Login:** `deepankraghuwanshi1@gmail.com` / `9685982012`

Visit `/admin/login` to get started! 🚀
