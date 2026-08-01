# 🚀 Supabase Setup Guide

Follow these steps to connect your anime t-shirt store to Supabase and enable all features.

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click **"Start your project"** or **"New Project"**
3. Sign in with GitHub (or create an account)
4. Click **"New project"**
5. Fill in:
   - **Name:** anime-tshirt-store (or any name you like)
   - **Database Password:** Create a strong password (save it!)
   - **Region:** Choose closest to your location
   - **Pricing Plan:** Free tier is perfect to start
6. Click **"Create new project"**
7. Wait 2-3 minutes for setup to complete ⏳

## Step 2: Get Your API Credentials

1. In your Supabase project dashboard, click **Settings** (gear icon in sidebar)
2. Click **API** in the settings menu
3. You'll see two important values:

   **Project URL** - Looks like:
   ```
   https://xxxxxxxxxxxxx.supabase.co
   ```

   **anon/public key** - Looks like:
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

4. **Copy these values** - you'll need them next!

## Step 3: Update Your .env File

1. Open the `.env` file in your project root
2. Replace the placeholder values with your real credentials:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. **Save the file**

## Step 4: Create Database Tables

1. In your Supabase dashboard, click **SQL Editor** in the sidebar
2. Click **"New query"**
3. Open the `supabase-schema.sql` file from your project
4. **Copy ALL the SQL code** (entire file)
5. **Paste it** into the SQL Editor
6. Click **"Run"** (or press Ctrl/Cmd + Enter)
7. You should see: **"Success. No rows returned"**

This creates:
- ✅ Products table with sample anime t-shirts
- ✅ Coupons table with discount codes
- ✅ Product reviews table
- ✅ Website testimonials table
- ✅ Customer support info table
- ✅ Scrolling animations table
- ✅ Admin users table (with your credentials)
- ✅ Orders tables

## Step 5: Verify Setup

1. In Supabase, click **Table Editor** in sidebar
2. You should see all the tables listed:
   - admin_users
   - products
   - coupons
   - product_reviews
   - website_testimonials
   - support_info
   - scrolling_animations
   - orders
   - order_items

3. Click on **products** - you should see 6 sample anime t-shirts!

## Step 6: Restart Your Dev Server

If your dev server is running, restart it to load the new environment variables:

1. Stop the server (Ctrl+C or Cmd+C)
2. Start it again
3. Refresh your browser

**Or simply refresh your browser if using Figma Make!**

## ✅ You're Done!

The orange warning banner should disappear and you should now see:

- ✅ Products loading from Supabase
- ✅ Testimonials showing on homepage
- ✅ Admin panel accessible at `/admin/login`
- ✅ All features working!

## 🔐 Admin Login

Now you can access the admin panel:

1. Visit `/admin/login`
2. Email: `deepankraghuwanshi1@gmail.com`
3. Phone: `9685982012`
4. Click **"Login to Admin Panel"**

## 🎉 What You Can Do Now

### As Admin:
- ✅ Add/Edit/Delete products
- ✅ Upload your own anime t-shirt images
- ✅ Create discount coupons
- ✅ Moderate product reviews
- ✅ Edit website testimonials
- ✅ Update customer support information
- ✅ Upload scrolling t-shirt animation (video or image)

### On Homepage:
- ✅ See real products from database
- ✅ Swipe through product carousel
- ✅ Read customer testimonials
- ✅ Apply coupon codes
- ✅ Beautiful animations everywhere!

## 🆘 Troubleshooting

**Orange banner won't disappear?**
- Make sure you saved `.env` file
- Check credentials are correct (no extra spaces)
- Refresh your browser
- Check browser console for errors

**Can't login to admin panel?**
- Make sure SQL schema ran successfully
- Email must be exactly: `deepankraghuwanshi1@gmail.com`
- Phone must be exactly: `9685982012`
- Check `admin_users` table in Supabase

**Products not showing?**
- Check `products` table in Supabase Table Editor
- Make sure SQL schema ran successfully
- Check browser console for errors
- Verify `.env` credentials are correct

**Need help?**
- Check Supabase dashboard logs
- Review browser console
- Verify all tables were created
- Make sure project is active (not paused)

## 📝 Sample Data Included

Your database now has:
- **6 anime t-shirt products** (Solo Leveling, DBZ, Demon Slayer, etc.)
- **3 customer testimonials** with ratings
- **3 active coupon codes** (WELCOME10, ANIME50, FIRSTBUY)
- **6 customer support sections** (contact info, policies)
- **1 admin user** (you!)

You can edit or delete these and add your own!

## 🎨 Next Steps

1. **Add Your Products**
   - Go to Admin → Products
   - Upload your anime t-shirt images
   - Set prices and descriptions

2. **Create Your Coupons**
   - Go to Admin → Coupons
   - Create discount codes for your customers

3. **Customize Support Info**
   - Go to Admin → Support Info
   - Update contact details
   - Edit policies to match your business

4. **Upload T-Shirt Animation**
   - Go to Admin → Animations
   - Upload a video or image of a t-shirt
   - It will float and animate while users scroll!

---

**Need more help?** Check the main README.md file for complete documentation!
