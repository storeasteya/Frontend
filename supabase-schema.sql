-- Complete Database Schema for Anime T-Shirt Store
-- Run this in your Supabase SQL Editor

-- Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  last_login TIMESTAMP WITH TIME ZONE
);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  sizes TEXT[] NOT NULL DEFAULT '{}',
  in_stock BOOLEAN DEFAULT true,
  category TEXT NOT NULL DEFAULT 'anime',
  anime_series TEXT,
  featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0
);

-- Product Reviews Table
CREATE TABLE IF NOT EXISTS product_reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_email TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Website Testimonials Table
CREATE TABLE IF NOT EXISTS website_testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_image TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  testimonial_text TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Customer Support Information Table
CREATE TABLE IF NOT EXISTS support_info (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section_key TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Scrolling Animations Table (for the t-shirt video)
CREATE TABLE IF NOT EXISTS scrolling_animations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  video_url TEXT,
  image_url TEXT,
  animation_type TEXT DEFAULT 'video',
  is_active BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Coupons Table
CREATE TABLE IF NOT EXISTS coupons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  code TEXT UNIQUE NOT NULL,
  discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value DECIMAL(10, 2) NOT NULL,
  min_purchase DECIMAL(10, 2),
  max_discount DECIMAL(10, 2),
  valid_from TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  valid_until TIMESTAMP WITH TIME ZONE NOT NULL,
  usage_limit INTEGER,
  times_used INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  total_amount DECIMAL(10, 2) NOT NULL,
  discount_amount DECIMAL(10, 2) DEFAULT 0,
  coupon_code TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  customer_name TEXT NOT NULL,
  shipping_address TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  product_name TEXT NOT NULL,
  product_price DECIMAL(10, 2) NOT NULL,
  size TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured, display_order);
CREATE INDEX IF NOT EXISTS idx_product_reviews_product ON product_reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_product_reviews_approved ON product_reviews(is_approved);
CREATE INDEX IF NOT EXISTS idx_testimonials_active ON website_testimonials(is_active, display_order);
CREATE INDEX IF NOT EXISTS idx_support_info_key ON support_info(section_key);
CREATE INDEX IF NOT EXISTS idx_coupons_code ON coupons(code);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE scrolling_animations ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Public read access
CREATE POLICY "Allow public read access to products" ON products
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to approved reviews" ON product_reviews
  FOR SELECT USING (is_approved = true);

CREATE POLICY "Allow public read access to active testimonials" ON website_testimonials
  FOR SELECT USING (is_active = true);

CREATE POLICY "Allow public read access to active support info" ON support_info
  FOR SELECT USING (is_active = true);

CREATE POLICY "Allow public read access to active animations" ON scrolling_animations
  FOR SELECT USING (is_active = true);

CREATE POLICY "Allow public read access to active coupons" ON coupons
  FOR SELECT USING (is_active = true);

-- Insert admin user
INSERT INTO admin_users (email, phone) VALUES
  ('deepankraghuwanshi1@gmail.com', '9685982012');

-- Insert sample products
INSERT INTO products (name, description, price, image_url, images, sizes, in_stock, anime_series, featured, display_order) VALUES
  ('Solo Leveling - Sung Jin-Woo', 'Premium black t-shirt featuring Sung Jin-Woo in his iconic shadow monarch form. High-quality print that won''t fade.', 799.00, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80', ARRAY['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80'], ARRAY['S', 'M', 'L', 'XL', 'XXL'], true, 'Solo Leveling', true, 1),
  ('Dragon Ball Z - Goku Ultra Instinct', 'White t-shirt with Goku in Ultra Instinct form. Vibrant colors and premium fabric.', 799.00, 'https://images.unsplash.com/photo-1622445275576-721325763afe?w=800&q=80', ARRAY['https://images.unsplash.com/photo-1622445275576-721325763afe?w=800&q=80'], ARRAY['S', 'M', 'L', 'XL', 'XXL'], true, 'Dragon Ball Z', true, 2),
  ('Demon Slayer - Tanjiro Kamado', 'Black t-shirt featuring Tanjiro with his water breathing technique. Exclusive design.', 799.00, 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80', ARRAY['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80'], ARRAY['S', 'M', 'L', 'XL', 'XXL'], true, 'Demon Slayer', true, 3),
  ('One Piece - Luffy Gear 5', 'Oversized white t-shirt with Luffy Gear 5 design. Perfect for One Piece fans.', 899.00, 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80', ARRAY['https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80'], ARRAY['M', 'L', 'XL', 'XXL'], true, 'One Piece', false, 4),
  ('Attack on Titan - Survey Corps', 'Black t-shirt with Survey Corps emblem. Show your dedication to humanity.', 699.00, 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&q=80', ARRAY['https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&q=80'], ARRAY['S', 'M', 'L', 'XL', 'XXL'], true, 'Attack on Titan', false, 5),
  ('Naruto - Akatsuki Cloud', 'Black t-shirt with red Akatsuki cloud pattern. For true Naruto fans.', 749.00, 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80', ARRAY['https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80'], ARRAY['S', 'M', 'L', 'XL'], false, 'Naruto', false, 6);

-- Insert sample testimonials
INSERT INTO website_testimonials (customer_name, customer_image, rating, testimonial_text, is_active, display_order) VALUES
  ('Rahul Sharma', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80', 5, 'Amazing quality! The Solo Leveling t-shirt print is fantastic and the fabric feels premium. Highly recommended!', true, 1),
  ('Priya Singh', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80', 5, 'Fast delivery and authentic merchandise. The Demon Slayer tee is exactly what I wanted. Will buy again!', true, 2),
  ('Arjun Patel', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80', 4, 'Great designs and reasonable prices. The t-shirt fits perfectly. Customer service was also very helpful.', true, 3);

-- Insert sample support information
INSERT INTO support_info (section_key, title, content, is_active, display_order) VALUES
  ('contact_email', 'Email Support', 'support@animetees.com', true, 1),
  ('contact_phone', 'Phone Support', '+91 96859 82012', true, 2),
  ('contact_whatsapp', 'WhatsApp', '+91 96859 82012', true, 3),
  ('shipping_policy', 'Shipping Policy', 'We deliver across India within 5-7 business days. Free shipping on orders above ₹1500. Track your order with the tracking ID sent to your email.', true, 4),
  ('return_policy', 'Return & Exchange', '14-day return policy for damaged or defective products. Video proof of unboxing is mandatory. Free size/color exchange available within 7 days.', true, 5),
  ('payment_methods', 'Payment Methods', 'We accept UPI, Credit/Debit Cards, Net Banking, and Cash on Delivery. All payments are secure and encrypted.', true, 6);

-- Insert sample coupons
INSERT INTO coupons (code, discount_type, discount_value, min_purchase, max_discount, valid_from, valid_until, usage_limit, is_active) VALUES
  ('WELCOME10', 'percentage', 10.00, 500.00, 200.00, timezone('utc'::text, now()), timezone('utc'::text, now()) + interval '30 days', 100, true),
  ('ANIME50', 'fixed', 50.00, 1000.00, NULL, timezone('utc'::text, now()), timezone('utc'::text, now()) + interval '7 days', 50, true),
  ('FIRSTBUY', 'percentage', 15.00, 0.00, 300.00, timezone('utc'::text, now()), timezone('utc'::text, now()) + interval '90 days', NULL, true);
