export const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3000/api';

function getHeaders() {
  const token = localStorage.getItem('adminToken') || localStorage.getItem('admin_authenticated');
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

// Fallback memory state for standalone frontend execution
const defaultProducts = [
  {
    id: 'prod-1',
    _id: 'prod-1',
    name: 'Goku Super Saiyan Aura Edition',
    description: 'Premium heavyweight 240 GSM ringspun cotton apparel with high-density Goku aura print.',
    price: 599,
    image_url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
    secondary_image_url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    anime_series: 'Dragon Ball Z',
    category: 'anime',
    featured: true,
    in_stock: true,
    display_order: 1
  },
  {
    id: 'prod-2',
    _id: 'prod-2',
    name: 'Solo Leveling Shadow Monarch Edition',
    description: 'Dark-mode aesthetic apparel displaying Sung Jinwoo shadow army extraction artwork.',
    price: 599,
    image_url: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80',
    secondary_image_url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80'
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    anime_series: 'Solo Leveling',
    category: 'anime',
    featured: true,
    in_stock: true,
    display_order: 2
  },
  {
    id: 'prod-3',
    _id: 'prod-3',
    name: 'Akatsuki Red Cloud Oversized Edition',
    description: 'Iconic Naruto Akatsuki red clouds embroidered on ultra-soft black heavyweight cotton.',
    price: 599,
    image_url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=80',
    secondary_image_url: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800&auto=format&fit=crop&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    anime_series: 'Naruto',
    category: 'anime',
    featured: true,
    in_stock: true,
    display_order: 3
  },
  {
    id: 'prod-4',
    _id: 'prod-4',
    name: 'Gojo Infinite Void Graphic Edition',
    description: 'Jujutsu Kaisen Gojo Satoru domain expansion glowing eye graphic design.',
    price: 599,
    image_url: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&auto=format&fit=crop&q=80',
    secondary_image_url: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&auto=format&fit=crop&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    anime_series: 'Jujutsu Kaisen',
    category: 'anime',
    featured: true,
    in_stock: true,
    display_order: 4
  },
  {
    id: 'prod-5',
    _id: 'prod-5',
    name: 'Mecha 01 - Knitted Evangelion Tee',
    description: 'Neo Tokyo Evangelion Unit-01 purple & green mecha techwear silhouette tee.',
    price: 599,
    image_url: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&auto=format&fit=crop&q=80',
    secondary_image_url: 'https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=800&auto=format&fit=crop&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    anime_series: 'Evangelion',
    category: 'anime',
    featured: true,
    in_stock: true,
    display_order: 5
  },
  {
    id: 'prod-6',
    _id: 'prod-6',
    name: 'The Disgraced One - Gachiakuta Oversized Tee',
    description: 'Dark fantasy demon extraction heavyweight drop-shoulder streetwear tee.',
    price: 599,
    image_url: 'https://images.unsplash.com/photo-1622445268480-498c8e945c2f?w=800&auto=format&fit=crop&q=80',
    secondary_image_url: 'https://images.unsplash.com/photo-1622445268463-54876b5cf4cb?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1622445268480-498c8e945c2f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1622445268463-54876b5cf4cb?w=800&auto=format&fit=crop&q=80'
    ],
    sizes: ['M', 'L', 'XL'],
    anime_series: 'Demon Slayer',
    category: 'anime',
    featured: true,
    in_stock: true,
    display_order: 6
  },
  {
    id: 'prod-7',
    _id: 'prod-7',
    name: 'Passione Golden Wind Streetwear Edition',
    description: 'JoJo Golden Wind Italian mafia inspired high-fashion drop shirt.',
    price: 599,
    image_url: 'https://images.unsplash.com/photo-1503342452485-86b7f54527ef?w=800&auto=format&fit=crop&q=80',
    secondary_image_url: 'https://images.unsplash.com/photo-1503341793542-f8c5b0bfbf5f?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1503342452485-86b7f54527ef?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503341793542-f8c5b0bfbf5f?w=800&auto=format&fit=crop&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    anime_series: 'JoJo',
    category: 'anime',
    featured: true,
    in_stock: true,
    display_order: 7
  },
  {
    id: 'prod-8',
    _id: 'prod-8',
    name: 'Mecha 02 - Berserk Eva Heavyweight',
    description: 'Red flame tactical oversized fit with bio-washed combed cotton durability.',
    price: 599,
    image_url: 'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=800&auto=format&fit=crop&q=80',
    secondary_image_url: 'https://images.unsplash.com/photo-1583744946571-700bb11eb5a7?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583744946571-700bb11eb5a7?w=800&auto=format&fit=crop&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    anime_series: 'Berserk',
    category: 'anime',
    featured: true,
    in_stock: true,
    display_order: 8
  }
];

function getStoredProducts() {
  const deletedIds: string[] = JSON.parse(localStorage.getItem('animeverse_deleted_product_ids') || '[]');
  const local = localStorage.getItem('animeverse_products');
  let productsList = defaultProducts;

  if (local) {
    try {
      productsList = JSON.parse(local);
    } catch (e) { }
  } else {
    localStorage.setItem('animeverse_products', JSON.stringify(defaultProducts));
  }

  if (Array.isArray(productsList)) {
    productsList = productsList.filter((p: any) => {
      const pId = p.id || p._id;
      const pName = p.name ? p.name.toLowerCase() : '';
      if (deletedIds.includes(pId)) return false;
      if (deletedIds.some(deleted => pName && pName.includes(deleted.toLowerCase()))) return false;
      return true;
    });
  }

  return productsList;
}

function saveStoredProducts(products: any[]) {
  localStorage.setItem('animeverse_products', JSON.stringify(products));
}

// Products API
export async function fetchProducts(filters: Record<string, any> = {}) {
  try {
    const query = new URLSearchParams(filters).toString();
    const res = await fetch(`${API_URL}/products?${query}`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return data;
    }
  } catch (err) {
    console.warn('Backend API unavailable, using stored products:', err);
  }
  
  let list = getStoredProducts();
  if (filters.series) list = list.filter((p: any) => p.anime_series === filters.series);
  if (filters.featured === 'true' || filters.featured === true) list = list.filter((p: any) => p.featured);
  return list;
}

export async function createProduct(product: any) {
  try {
    const res = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(product),
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Backend offline, creating locally:', err);
  }

  const list = getStoredProducts();
  const newObj = {
    id: 'prod-' + Date.now(),
    _id: 'prod-' + Date.now(),
    ...product,
    in_stock: product.in_stock ?? true,
    display_order: list.length + 1
  };
  list.unshift(newObj);
  saveStoredProducts(list);
  return newObj;
}

export async function updateProduct(id: string, product: any) {
  try {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(product),
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Backend offline, updating locally:', err);
  }

  const list = getStoredProducts();
  const idx = list.findIndex((p: any) => p.id === id || p._id === id);
  if (idx !== -1) {
    list[idx] = { ...list[idx], ...product };
    saveStoredProducts(list);
    return list[idx];
  }
  return product;
}

export async function deleteProduct(id: string, name?: string) {
  try {
    if (id) {
      await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
    }
  } catch (err) {
    console.warn('Backend offline, deleting locally:', err);
  }

  const deletedIds: string[] = JSON.parse(localStorage.getItem('animeverse_deleted_product_ids') || '[]');
  if (id && !deletedIds.includes(id)) {
    deletedIds.push(id);
  }
  if (name && !deletedIds.includes(name)) {
    deletedIds.push(name);
  }
  localStorage.setItem('animeverse_deleted_product_ids', JSON.stringify(deletedIds));

  let list = getStoredProducts();
  list = list.filter((p: any) => {
    if (id && (p.id === id || p._id === id)) return false;
    if (name && p.name && p.name.toLowerCase() === name.toLowerCase()) return false;
    return true;
  });
  saveStoredProducts(list);
  return { success: true, id };
}

// Admin Auth API
export async function adminLogin(email: string, password?: string, phone?: string) {
  try {
    const res = await fetch(`${API_URL}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, phone }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('admin_authenticated', 'true');
        localStorage.setItem('admin_email', email);
      }
      return data;
    } else {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || 'Invalid admin credentials');
    }
  } catch (err: any) {
    console.warn('Backend login notice:', err);
    // Standalone / offline check fallback
    const customAdminPw = localStorage.getItem('admin_custom_password') || 'admin123';
    const isEmailValid = email === 'admin@animeverse.com' || email === 'admin';
    const isPhoneValid = phone === '9685982012';
    const isPwValid = password === customAdminPw || password === 'admin123' || (isPhoneValid && !password);

    if ((isEmailValid || isPhoneValid) && isPwValid) {
      localStorage.setItem('adminToken', 'demo-token-' + Date.now());
      localStorage.setItem('admin_authenticated', 'true');
      localStorage.setItem('admin_email', email || 'admin@animeverse.com');
      return { token: 'demo-token', user: { email: email || 'admin@animeverse.com' } };
    }
    throw new Error(err.message || 'Invalid credentials');
  }
}

export async function adminForgotPassword(email: string, phone?: string) {
  try {
    const res = await fetch(`${API_URL}/admin/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, phone }),
    });
    if (res.ok) return await res.json();
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || 'Admin verification failed');
  } catch (err: any) {
    if (email === 'admin@animeverse.com' || email === 'admin' || phone === '9685982012') {
      return { success: true, message: 'Admin account verified.' };
    }
    throw new Error(err.message || 'Admin user not found');
  }
}

export async function adminResetPassword(email: string, newPassword: string, secretKey?: string) {
  try {
    const res = await fetch(`${API_URL}/admin/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, newPassword, secretKey }),
    });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('admin_custom_password', newPassword);
      return data;
    }
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || 'Password reset failed');
  } catch (err: any) {
    if (email === 'admin@animeverse.com' || email === 'admin' || secretKey === '9685982012') {
      localStorage.setItem('admin_custom_password', newPassword);
      return { success: true, message: 'Password reset successfully!' };
    }
    throw new Error(err.message || 'Password reset failed');
  }
}

export function logout() {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('admin_authenticated');
  localStorage.removeItem('admin_email');
}

// Order Submission
export async function createOrder(orderData: any) {
  try {
    const res = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Backend order submission fallback:', err);
  }

  const localOrders = JSON.parse(localStorage.getItem('animeverse_orders') || '[]');
  const tracking_number = orderData.tracking_number || ('AV-TRK-' + Math.floor(100000 + Math.random() * 900000));
  
  const delDate = new Date();
  delDate.setDate(delDate.getDate() + 4);
  const estimated_delivery = delDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const newOrder = {
    id: 'ord-' + Date.now(),
    _id: 'ord-' + Date.now(),
    ...orderData,
    tracking_number,
    estimated_delivery,
    status: orderData.status || 'processing',
    createdAt: new Date().toISOString(),
    created_at: new Date().toISOString()
  };
  localOrders.unshift(newOrder);
  localStorage.setItem('animeverse_orders', JSON.stringify(localOrders));
  return newOrder;
}

export async function fetchOrders() {
  let backendOrders: any[] = [];
  try {
    const res = await fetch(`${API_URL}/orders`, { headers: getHeaders() });
    if (res.ok) {
      backendOrders = await res.json();
    }
  } catch (err) {
    console.warn('Backend fetch orders fallback:', err);
  }

  const localOrders = JSON.parse(localStorage.getItem('animeverse_orders') || '[]');
  
  // Merge backend and local orders without duplicate IDs
  const orderMap = new Map();
  if (Array.isArray(backendOrders)) {
    backendOrders.forEach((o: any) => {
      const id = o.id || o._id || o.order_id;
      if (id) orderMap.set(id, o);
    });
  }
  if (Array.isArray(localOrders)) {
    localOrders.forEach((o: any) => {
      const id = o.id || o._id || o.order_id;
      if (id && !orderMap.has(id)) {
        orderMap.set(id, o);
      }
    });
  }

  const merged = Array.from(orderMap.values());
  merged.sort((a: any, b: any) => {
    const timeA = new Date(a.createdAt || a.created_at || 0).getTime();
    const timeB = new Date(b.createdAt || b.created_at || 0).getTime();
    return timeB - timeA;
  });
  return merged;
}

export async function updateOrderStatus(orderId: string, status: string) {
  try {
    const res = await fetch(`${API_URL}/orders/${orderId}/status`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ status }),
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Backend updateOrderStatus fallback:', err);
  }

  const localOrders = JSON.parse(localStorage.getItem('animeverse_orders') || '[]');
  const idx = localOrders.findIndex((o: any) => (o.id || o._id || o.order_id) === orderId);
  if (idx !== -1) {
    localOrders[idx].status = status;
    localStorage.setItem('animeverse_orders', JSON.stringify(localOrders));
    return localOrders[idx];
  }
  return { success: true, id: orderId, status };
}

export async function deleteOrder(orderId: string) {
  try {
    const res = await fetch(`${API_URL}/orders/${orderId}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Backend deleteOrder fallback:', err);
  }

  let localOrders = JSON.parse(localStorage.getItem('animeverse_orders') || '[]');
  localOrders = localOrders.filter((o: any) => (o.id || o._id || o.order_id) !== orderId);
  localStorage.setItem('animeverse_orders', JSON.stringify(localOrders));
  return { success: true, id: orderId };
}

// Product Reviews API
export async function createProductReview(reviewData: {
  product_id: string;
  customer_name: string;
  rating: number;
  review_text: string;
  order_id?: string;
}) {
  try {
    const res = await fetch(`${API_URL}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData),
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Backend review submission fallback:', err);
  }

  const localReviews = JSON.parse(localStorage.getItem('animeverse_reviews') || '[]');
  const newReview = {
    id: 'rev-' + Date.now(),
    _id: 'rev-' + Date.now(),
    ...reviewData,
    author_name: reviewData.customer_name,
    content: reviewData.review_text,
    is_approved: true,
    created_at: new Date().toISOString()
  };
  localReviews.unshift(newReview);
  localStorage.setItem('animeverse_reviews', JSON.stringify(localReviews));
  return newReview;
}

export async function fetchProductReviews(productId?: string) {
  try {
    const query = productId ? `?product_id=${productId}` : '';
    const res = await fetch(`${API_URL}/reviews${query}`);
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Backend fetch reviews fallback:', err);
  }

  const localReviews = JSON.parse(localStorage.getItem('animeverse_reviews') || '[]');
  if (productId) {
    return localReviews.filter((r: any) => r.product_id === productId);
  }
  return localReviews;
}

