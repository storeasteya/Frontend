import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTIwMDAsImV4cCI6MTk2MDc2ODAwMH0.placeholder';

const isPlaceholder = supabaseUrl === 'https://placeholder.supabase.co';

if (isPlaceholder) {
  console.info('Supabase not configured — add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env to enable full functionality.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface AdminUser {
  id: string;
  email: string;
  phone?: string;
  created_at: string;
  last_login?: string;
}

export interface Product {
  id: string;
  created_at: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  images: string[];
  sizes: string[];
  in_stock: boolean;
  category: string;
  anime_series?: string;
  featured: boolean;
  display_order: number;
}

export interface ProductReview {
  id: string;
  product_id: string;
  customer_name: string;
  customer_email?: string;
  rating: number;
  review_text?: string;
  is_approved: boolean;
  created_at: string;
}

export interface WebsiteTestimonial {
  id: string;
  customer_name: string;
  customer_image?: string;
  rating: number;
  testimonial_text: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
}

export interface SupportInfo {
  id: string;
  section_key: string;
  title: string;
  content: string;
  is_active: boolean;
  display_order: number;
  updated_at: string;
}

export interface ScrollingAnimation {
  id: string;
  name: string;
  video_url?: string;
  image_url?: string;
  animation_type: string;
  is_active: boolean;
  created_at: string;
}

export interface Coupon {
  id: string;
  created_at: string;
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_purchase?: number;
  max_discount?: number;
  valid_from: string;
  valid_until: string;
  usage_limit?: number;
  times_used: number;
  is_active: boolean;
}

export interface Order {
  id: string;
  user_id?: string;
  total_amount: number;
  discount_amount: number;
  coupon_code?: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  customer_name: string;
  shipping_address: string;
  phone: string;
  email: string;
  created_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id?: string;
  product_name: string;
  product_price: number;
  size: string;
  quantity: number;
  created_at: string;
}

// Helper function to check if user is admin
export async function isAdmin(email: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('admin_users')
    .select('id')
    .eq('email', email)
    .single();

  return !error && !!data;
}

// Helper function to update admin last login
export async function updateAdminLogin(email: string) {
  await supabase
    .from('admin_users')
    .update({ last_login: new Date().toISOString() })
    .eq('email', email);
}
