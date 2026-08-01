import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Plus, Edit, Trash2, Package, Tag, Star, MessageSquare,
  HelpCircle, Video, LogOut, Check, X
} from "lucide-react";
import { supabase, type Product, type Coupon, type ProductReview, type WebsiteTestimonial, type SupportInfo, type ScrollingAnimation } from "../../lib/supabase";

export default function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"products" | "coupons" | "reviews" | "testimonials" | "support" | "animations">("products");

  // States for all data
  const [products, setProducts] = useState<Product[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [testimonials, setTestimonials] = useState<WebsiteTestimonial[]>([]);
  const [supportInfo, setSupportInfo] = useState<SupportInfo[]>([]);
  const [animations, setAnimations] = useState<ScrollingAnimation[]>([]);

  const [loading, setLoading] = useState(true);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showCouponForm, setShowCouponForm] = useState(false);
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [showSupportForm, setShowSupportForm] = useState(false);
  const [showAnimationForm, setShowAnimationForm] = useState(false);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<WebsiteTestimonial | null>(null);
  const [editingSupport, setEditingSupport] = useState<SupportInfo | null>(null);
  const [editingAnimation, setEditingAnimation] = useState<ScrollingAnimation | null>(null);

  // Check authentication
  useEffect(() => {
    const adminAuth = localStorage.getItem('admin_authenticated');
    if (!adminAuth) {
      navigate('/admin/login');
    }
  }, [navigate]);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  async function fetchData() {
    setLoading(true);
    switch (activeTab) {
      case "products":
        await fetchProducts();
        break;
      case "coupons":
        await fetchCoupons();
        break;
      case "reviews":
        await fetchReviews();
        break;
      case "testimonials":
        await fetchTestimonials();
        break;
      case "support":
        await fetchSupport();
        break;
      case "animations":
        await fetchAnimations();
        break;
    }
    setLoading(false);
  }

  async function fetchProducts() {
    const { data } = await supabase.from('products').select('*').order('display_order');
    if (data) setProducts(data);
  }

  async function fetchCoupons() {
    const { data } = await supabase.from('coupons').select('*').order('created_at', { ascending: false });
    if (data) setCoupons(data);
  }

  async function fetchReviews() {
    const { data } = await supabase.from('product_reviews').select('*, products(name)').order('created_at', { ascending: false });
    if (data) setReviews(data as any);
  }

  async function fetchTestimonials() {
    const { data } = await supabase.from('website_testimonials').select('*').order('display_order');
    if (data) setTestimonials(data);
  }

  async function fetchSupport() {
    const { data } = await supabase.from('support_info').select('*').order('display_order');
    if (data) setSupportInfo(data);
  }

  async function fetchAnimations() {
    const { data } = await supabase.from('scrolling_animations').select('*').order('created_at', { ascending: false });
    if (data) setAnimations(data);
  }

  function handleLogout() {
    localStorage.removeItem('admin_authenticated');
    localStorage.removeItem('admin_email');
    navigate('/admin/login');
  }

  // Product Functions
  const [productForm, setProductForm] = useState({
    name: "", description: "", price: "", image_url: "", images: [""],
    sizes: ["S", "M", "L", "XL", "XXL"], in_stock: true, category: "anime",
    anime_series: "", featured: false, display_order: 0
  });

  async function saveProduct() {
    const data = {
      ...productForm,
      price: parseFloat(productForm.price),
      images: productForm.images.filter(i => i.trim())
    };

    if (editingProduct) {
      await supabase.from('products').update(data).eq('id', editingProduct.id);
    } else {
      await supabase.from('products').insert([data]);
    }

    resetProductForm();
    fetchProducts();
  }

  async function deleteProduct(id: string) {
    if (confirm("Delete this product?")) {
      await supabase.from('products').delete().eq('id', id);
      fetchProducts();
    }
  }

  function resetProductForm() {
    setProductForm({
      name: "", description: "", price: "", image_url: "", images: [""],
      sizes: ["S", "M", "L", "XL", "XXL"], in_stock: true, category: "anime",
      anime_series: "", featured: false, display_order: 0
    });
    setEditingProduct(null);
    setShowProductForm(false);
  }

  // Review Functions
  async function approveReview(id: string, approved: boolean) {
    await supabase.from('product_reviews').update({ is_approved: approved }).eq('id', id);
    fetchReviews();
  }

  async function deleteReview(id: string) {
    if (confirm("Delete this review?")) {
      await supabase.from('product_reviews').delete().eq('id', id);
      fetchReviews();
    }
  }

  // Testimonial Functions
  const [testimonialForm, setTestimonialForm] = useState({
    customer_name: "", customer_image: "", rating: 5,
    testimonial_text: "", is_active: true, display_order: 0
  });

  async function saveTestimonial() {
    if (editingTestimonial) {
      await supabase.from('website_testimonials').update(testimonialForm).eq('id', editingTestimonial.id);
    } else {
      await supabase.from('website_testimonials').insert([testimonialForm]);
    }
    resetTestimonialForm();
    fetchTestimonials();
  }

  async function deleteTestimonial(id: string) {
    if (confirm("Delete this testimonial?")) {
      await supabase.from('website_testimonials').delete().eq('id', id);
      fetchTestimonials();
    }
  }

  function resetTestimonialForm() {
    setTestimonialForm({
      customer_name: "", customer_image: "", rating: 5,
      testimonial_text: "", is_active: true, display_order: 0
    });
    setEditingTestimonial(null);
    setShowTestimonialForm(false);
  }

  // Support Info Functions
  const [supportForm, setSupportForm] = useState({
    section_key: "", title: "", content: "", is_active: true, display_order: 0
  });

  async function saveSupport() {
    if (editingSupport) {
      await supabase.from('support_info').update(supportForm).eq('id', editingSupport.id);
    } else {
      await supabase.from('support_info').insert([supportForm]);
    }
    resetSupportForm();
    fetchSupport();
  }

  async function deleteSupport(id: string) {
    if (confirm("Delete this support section?")) {
      await supabase.from('support_info').delete().eq('id', id);
      fetchSupport();
    }
  }

  function resetSupportForm() {
    setSupportForm({ section_key: "", title: "", content: "", is_active: true, display_order: 0 });
    setEditingSupport(null);
    setShowSupportForm(false);
  }

  // Animation Functions
  const [animationForm, setAnimationForm] = useState({
    name: "", video_url: "", image_url: "", animation_type: "video"
  });

  async function saveAnimation() {
    // Deactivate all other animations first
    await supabase.from('scrolling_animations').update({ is_active: false }).neq('id', '00000000-0000-0000-0000-000000000000');

    if (editingAnimation) {
      await supabase.from('scrolling_animations').update({ ...animationForm, is_active: true }).eq('id', editingAnimation.id);
    } else {
      await supabase.from('scrolling_animations').insert([{ ...animationForm, is_active: true }]);
    }
    resetAnimationForm();
    fetchAnimations();
  }

  async function setActiveAnimation(id: string) {
    await supabase.from('scrolling_animations').update({ is_active: false }).neq('id', id);
    await supabase.from('scrolling_animations').update({ is_active: true }).eq('id', id);
    fetchAnimations();
  }

  async function deleteAnimation(id: string) {
    if (confirm("Delete this animation?")) {
      await supabase.from('scrolling_animations').delete().eq('id', id);
      fetchAnimations();
    }
  }

  function resetAnimationForm() {
    setAnimationForm({ name: "", video_url: "", image_url: "", animation_type: "video" });
    setEditingAnimation(null);
    setShowAnimationForm(false);
  }

  // Coupon form
  const [couponForm, setCouponForm] = useState({
    code: "", discount_type: "percentage" as "percentage" | "fixed",
    discount_value: "", min_purchase: "", max_discount: "",
    valid_from: new Date().toISOString().slice(0, 16),
    valid_until: "", usage_limit: "", is_active: true
  });

  async function saveCoupon() {
    const data = {
      ...couponForm,
      code: couponForm.code.toUpperCase(),
      discount_value: parseFloat(couponForm.discount_value),
      min_purchase: couponForm.min_purchase ? parseFloat(couponForm.min_purchase) : null,
      max_discount: couponForm.max_discount ? parseFloat(couponForm.max_discount) : null,
      usage_limit: couponForm.usage_limit ? parseInt(couponForm.usage_limit) : null,
    };

    if (editingCoupon) {
      await supabase.from('coupons').update(data).eq('id', editingCoupon.id);
    } else {
      await supabase.from('coupons').insert([{ ...data, times_used: 0 }]);
    }
    resetCouponForm();
    fetchCoupons();
  }

  async function deleteCoupon(id: string) {
    if (confirm("Delete this coupon?")) {
      await supabase.from('coupons').delete().eq('id', id);
      fetchCoupons();
    }
  }

  function resetCouponForm() {
    setCouponForm({
      code: "", discount_type: "percentage", discount_value: "", min_purchase: "",
      max_discount: "", valid_from: new Date().toISOString().slice(0, 16),
      valid_until: "", usage_limit: "", is_active: true
    });
    setEditingCoupon(null);
    setShowCouponForm(false);
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-black">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex justify-between items-center"
        >
          <div>
            <h1 className="text-6xl md:text-8xl font-black mb-4 tracking-tighter">
              Admin Dashboard
            </h1>
            <p className="text-xl text-gray-400">Manage your entire website</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="px-6 py-3 bg-red-500/20 text-red-400 border border-red-500/50 rounded-xl font-semibold flex items-center gap-2 hover:bg-red-500/30"
          >
            <LogOut size={20} />
            Logout
          </motion.button>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex gap-2 mb-12 border-b border-white/10 overflow-x-auto pb-2"
        >
          {[
            { id: "products", label: "Products", icon: Package },
            { id: "coupons", label: "Coupons", icon: Tag },
            { id: "reviews", label: "Reviews", icon: MessageSquare },
            { id: "testimonials", label: "Testimonials", icon: Star },
            { id: "support", label: "Support Info", icon: HelpCircle },
            { id: "animations", label: "Animations", icon: Video },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 font-semibold transition-colors border-b-2 whitespace-nowrap flex items-center gap-2 ${
                activeTab === tab.id
                  ? "border-white text-white"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* PRODUCTS TAB */}
        {activeTab === "products" && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Products ({products.length})</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setShowProductForm(true)}
                className="px-6 py-3 bg-white text-black rounded-xl font-semibold flex items-center gap-2"
              >
                <Plus size={20} />
                Add Product
              </motion.button>
            </div>

            {showProductForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mb-8 p-6 bg-white/5 border border-white/10 rounded-2xl"
              >
                <h3 className="text-2xl font-bold mb-6">{editingProduct ? "Edit" : "Add"} Product</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Product Name" value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/40" />
                  <input type="number" placeholder="Price (₹)" value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/40" />
                  <input type="text" placeholder="Main Image URL" value={productForm.image_url}
                    onChange={(e) => setProductForm({ ...productForm, image_url: e.target.value })}
                    className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/40" />
                  <input type="text" placeholder="Anime Series" value={productForm.anime_series}
                    onChange={(e) => setProductForm({ ...productForm, anime_series: e.target.value })}
                    className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/40" />
                  <textarea placeholder="Description" value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })} rows={3}
                    className="md:col-span-2 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/40" />
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" checked={productForm.in_stock}
                        onChange={(e) => setProductForm({ ...productForm, in_stock: e.target.checked })} className="w-5 h-5" />
                      <span>In Stock</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" checked={productForm.featured}
                        onChange={(e) => setProductForm({ ...productForm, featured: e.target.checked })} className="w-5 h-5" />
                      <span>Featured</span>
                    </label>
                  </div>
                </div>
                <div className="mt-6 flex gap-4">
                  <motion.button whileHover={{ scale: 1.05 }} onClick={saveProduct}
                    className="px-8 py-3 bg-white text-black rounded-xl font-semibold">
                    {editingProduct ? "Update" : "Save"} Product
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.05 }} onClick={resetProductForm}
                    className="px-8 py-3 bg-white/10 border border-white/20 rounded-xl font-semibold">
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            )}

            <div className="grid md:grid-cols-3 gap-6">
              {products.map((product) => (
                <motion.div key={product.id} className="p-4 bg-white/5 border border-white/10 rounded-xl">
                  <img src={product.image_url} alt={product.name} className="w-full aspect-square object-cover rounded-lg mb-4" />
                  <h3 className="font-bold mb-2">{product.name}</h3>
                  <p className="text-gray-400 text-sm mb-2 line-clamp-2">{product.description}</p>
                  <p className="font-semibold mb-2">₹{product.price}</p>
                  <div className="flex gap-2 mb-4">
                    {product.in_stock && <span className="px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-400">In Stock</span>}
                    {product.featured && <span className="px-3 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-400">Featured</span>}
                  </div>
                  <div className="flex gap-2">
                    <motion.button whileHover={{ scale: 1.05 }} onClick={() => {
                      setProductForm({ ...product, price: product.price.toString(), images: product.images || [""] });
                      setEditingProduct(product);
                      setShowProductForm(true);
                    }} className="flex-1 px-4 py-2 bg-white/10 rounded-lg flex items-center justify-center gap-2">
                      <Edit size={16} />Edit
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.05 }} onClick={() => deleteProduct(product.id)}
                      className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg">
                      <Trash2 size={16} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* COUPONS TAB */}
        {activeTab === "coupons" && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Coupons ({coupons.length})</h2>
              <motion.button whileHover={{ scale: 1.05 }} onClick={() => setShowCouponForm(true)}
                className="px-6 py-3 bg-white text-black rounded-xl font-semibold flex items-center gap-2">
                <Plus size={20} />Add Coupon
              </motion.button>
            </div>

            {showCouponForm && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                className="mb-8 p-6 bg-white/5 border border-white/10 rounded-2xl">
                <h3 className="text-2xl font-bold mb-6">{editingCoupon ? "Edit" : "Add"} Coupon</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Code (e.g., SAVE20)" value={couponForm.code}
                    onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value.toUpperCase() })}
                    className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/40 uppercase" />
                  <select value={couponForm.discount_type}
                    onChange={(e) => setCouponForm({ ...couponForm, discount_type: e.target.value as any })}
                    className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-white/40">
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                  <input type="number" placeholder="Discount Value" value={couponForm.discount_value}
                    onChange={(e) => setCouponForm({ ...couponForm, discount_value: e.target.value })}
                    className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/40" />
                  <input type="number" placeholder="Min Purchase (optional)" value={couponForm.min_purchase}
                    onChange={(e) => setCouponForm({ ...couponForm, min_purchase: e.target.value })}
                    className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/40" />
                  <input type="datetime-local" value={couponForm.valid_until}
                    onChange={(e) => setCouponForm({ ...couponForm, valid_until: e.target.value })}
                    className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-white/40" />
                </div>
                <div className="mt-6 flex gap-4">
                  <motion.button whileHover={{ scale: 1.05 }} onClick={saveCoupon}
                    className="px-8 py-3 bg-white text-black rounded-xl font-semibold">
                    {editingCoupon ? "Update" : "Save"} Coupon
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.05 }} onClick={resetCouponForm}
                    className="px-8 py-3 bg-white/10 border border-white/20 rounded-xl font-semibold">Cancel</motion.button>
                </div>
              </motion.div>
            )}

            <div className="space-y-4">
              {coupons.map((coupon) => (
                <motion.div key={coupon.id} className="p-6 bg-white/5 border border-white/10 rounded-xl flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{coupon.code}</h3>
                    <p className="text-gray-400">
                      {coupon.discount_type === 'percentage' ? `${coupon.discount_value}% off` : `₹${coupon.discount_value} off`}
                      {coupon.min_purchase && ` on orders above ₹${coupon.min_purchase}`}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">Valid until: {new Date(coupon.valid_until).toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <motion.button whileHover={{ scale: 1.05 }} onClick={() => deleteCoupon(coupon.id)}
                      className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg">
                      <Trash2 size={16} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* REVIEWS TAB */}
        {activeTab === "reviews" && (
          <div>
            <h2 className="text-3xl font-bold mb-8">Product Reviews ({reviews.length})</h2>
            <div className="space-y-4">
              {reviews.map((review: any) => (
                <motion.div key={review.id} className="p-6 bg-white/5 border border-white/10 rounded-xl">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-lg">{review.customer_name}</h4>
                      <p className="text-sm text-gray-400">Product: {review.products?.name}</p>
                      <div className="flex gap-1 mt-2">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} size={16} fill="gold" className="text-yellow-500" />
                        ))}
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs ${review.is_approved ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                      {review.is_approved ? 'Approved' : 'Pending'}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-4">{review.review_text}</p>
                  <div className="flex gap-2">
                    {!review.is_approved && (
                      <motion.button whileHover={{ scale: 1.05 }} onClick={() => approveReview(review.id, true)}
                        className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg flex items-center gap-2">
                        <Check size={16} />Approve
                      </motion.button>
                    )}
                    {review.is_approved && (
                      <motion.button whileHover={{ scale: 1.05 }} onClick={() => approveReview(review.id, false)}
                        className="px-4 py-2 bg-yellow-500/20 text-yellow-400 rounded-lg flex items-center gap-2">
                        <X size={16} />Unapprove
                      </motion.button>
                    )}
                    <motion.button whileHover={{ scale: 1.05 }} onClick={() => deleteReview(review.id)}
                      className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg">
                      <Trash2 size={16} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* TESTIMONIALS TAB */}
        {activeTab === "testimonials" && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Website Testimonials ({testimonials.length})</h2>
              <motion.button whileHover={{ scale: 1.05 }} onClick={() => setShowTestimonialForm(true)}
                className="px-6 py-3 bg-white text-black rounded-xl font-semibold flex items-center gap-2">
                <Plus size={20} />Add Testimonial
              </motion.button>
            </div>

            {showTestimonialForm && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                className="mb-8 p-6 bg-white/5 border border-white/10 rounded-2xl">
                <h3 className="text-2xl font-bold mb-6">{editingTestimonial ? "Edit" : "Add"} Testimonial</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Customer Name" value={testimonialForm.customer_name}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, customer_name: e.target.value })}
                    className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/40" />
                  <input type="text" placeholder="Customer Image URL" value={testimonialForm.customer_image}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, customer_image: e.target.value })}
                    className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/40" />
                  <select value={testimonialForm.rating}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: parseInt(e.target.value) })}
                    className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-white/40">
                    {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Stars</option>)}
                  </select>
                  <input type="number" placeholder="Display Order" value={testimonialForm.display_order}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, display_order: parseInt(e.target.value) })}
                    className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/40" />
                  <textarea placeholder="Testimonial Text" value={testimonialForm.testimonial_text}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, testimonial_text: e.target.value })} rows={4}
                    className="md:col-span-2 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/40" />
                  <label className="flex items-center gap-3">
                    <input type="checkbox" checked={testimonialForm.is_active}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, is_active: e.target.checked })} className="w-5 h-5" />
                    <span>Active</span>
                  </label>
                </div>
                <div className="mt-6 flex gap-4">
                  <motion.button whileHover={{ scale: 1.05 }} onClick={saveTestimonial}
                    className="px-8 py-3 bg-white text-black rounded-xl font-semibold">
                    {editingTestimonial ? "Update" : "Save"} Testimonial
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.05 }} onClick={resetTestimonialForm}
                    className="px-8 py-3 bg-white/10 border border-white/20 rounded-xl font-semibold">Cancel</motion.button>
                </div>
              </motion.div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {testimonials.map((t) => (
                <motion.div key={t.id} className="p-6 bg-white/5 border border-white/10 rounded-xl">
                  <div className="flex items-center gap-4 mb-4">
                    {t.customer_image && <img src={t.customer_image} alt={t.customer_name} className="w-12 h-12 rounded-full" />}
                    <div>
                      <h4 className="font-bold">{t.customer_name}</h4>
                      <div className="flex gap-1">
                        {[...Array(t.rating)].map((_, i) => <Star key={i} size={14} fill="gold" className="text-yellow-500" />)}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">{t.testimonial_text}</p>
                  <div className="flex gap-2">
                    <motion.button whileHover={{ scale: 1.05 }} onClick={() => {
                      setTestimonialForm(t);
                      setEditingTestimonial(t);
                      setShowTestimonialForm(true);
                    }} className="flex-1 px-4 py-2 bg-white/10 rounded-lg flex items-center justify-center gap-2">
                      <Edit size={16} />Edit
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.05 }} onClick={() => deleteTestimonial(t.id)}
                      className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg">
                      <Trash2 size={16} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* SUPPORT INFO TAB */}
        {activeTab === "support" && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Customer Support Information ({supportInfo.length})</h2>
              <motion.button whileHover={{ scale: 1.05 }} onClick={() => setShowSupportForm(true)}
                className="px-6 py-3 bg-white text-black rounded-xl font-semibold flex items-center gap-2">
                <Plus size={20} />Add Support Section
              </motion.button>
            </div>

            {showSupportForm && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                className="mb-8 p-6 bg-white/5 border border-white/10 rounded-2xl">
                <h3 className="text-2xl font-bold mb-6">{editingSupport ? "Edit" : "Add"} Support Info</h3>
                <div className="grid gap-4">
                  <input type="text" placeholder="Section Key (e.g., contact_email)" value={supportForm.section_key}
                    onChange={(e) => setSupportForm({ ...supportForm, section_key: e.target.value })}
                    className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/40" />
                  <input type="text" placeholder="Title" value={supportForm.title}
                    onChange={(e) => setSupportForm({ ...supportForm, title: e.target.value })}
                    className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/40" />
                  <textarea placeholder="Content" value={supportForm.content}
                    onChange={(e) => setSupportForm({ ...supportForm, content: e.target.value })} rows={4}
                    className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/40" />
                  <input type="number" placeholder="Display Order" value={supportForm.display_order}
                    onChange={(e) => setSupportForm({ ...supportForm, display_order: parseInt(e.target.value) })}
                    className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/40" />
                </div>
                <div className="mt-6 flex gap-4">
                  <motion.button whileHover={{ scale: 1.05 }} onClick={saveSupport}
                    className="px-8 py-3 bg-white text-black rounded-xl font-semibold">
                    {editingSupport ? "Update" : "Save"} Support Info
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.05 }} onClick={resetSupportForm}
                    className="px-8 py-3 bg-white/10 border border-white/20 rounded-xl font-semibold">Cancel</motion.button>
                </div>
              </motion.div>
            )}

            <div className="space-y-4">
              {supportInfo.map((info) => (
                <motion.div key={info.id} className="p-6 bg-white/5 border border-white/10 rounded-xl">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{info.title}</h3>
                    <span className="px-3 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400">
                      {info.section_key}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-4">{info.content}</p>
                  <div className="flex gap-2">
                    <motion.button whileHover={{ scale: 1.05 }} onClick={() => {
                      setSupportForm(info);
                      setEditingSupport(info);
                      setShowSupportForm(true);
                    }} className="px-4 py-2 bg-white/10 rounded-lg flex items-center gap-2">
                      <Edit size={16} />Edit
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.05 }} onClick={() => deleteSupport(info.id)}
                      className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg">
                      <Trash2 size={16} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* ANIMATIONS TAB */}
        {activeTab === "animations" && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Scrolling Animations ({animations.length})</h2>
              <motion.button whileHover={{ scale: 1.05 }} onClick={() => setShowAnimationForm(true)}
                className="px-6 py-3 bg-white text-black rounded-xl font-semibold flex items-center gap-2">
                <Plus size={20} />Add Animation
              </motion.button>
            </div>

            {showAnimationForm && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                className="mb-8 p-6 bg-white/5 border border-white/10 rounded-2xl">
                <h3 className="text-2xl font-bold mb-6">{editingAnimation ? "Edit" : "Add"} Animation</h3>
                <div className="grid gap-4">
                  <input type="text" placeholder="Name" value={animationForm.name}
                    onChange={(e) => setAnimationForm({ ...animationForm, name: e.target.value })}
                    className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/40" />
                  <select value={animationForm.animation_type}
                    onChange={(e) => setAnimationForm({ ...animationForm, animation_type: e.target.value })}
                    className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-white/40">
                    <option value="video">Video</option>
                    <option value="image">Image</option>
                  </select>
                  {animationForm.animation_type === 'video' && (
                    <input type="text" placeholder="Video URL (.mp4, .webm)" value={animationForm.video_url}
                      onChange={(e) => setAnimationForm({ ...animationForm, video_url: e.target.value })}
                      className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/40" />
                  )}
                  {animationForm.animation_type === 'image' && (
                    <input type="text" placeholder="Image URL" value={animationForm.image_url}
                      onChange={(e) => setAnimationForm({ ...animationForm, image_url: e.target.value })}
                      className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/40" />
                  )}
                </div>
                <div className="mt-6 flex gap-4">
                  <motion.button whileHover={{ scale: 1.05 }} onClick={saveAnimation}
                    className="px-8 py-3 bg-white text-black rounded-xl font-semibold">
                    {editingAnimation ? "Update" : "Save"} Animation (Will be set as active)
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.05 }} onClick={resetAnimationForm}
                    className="px-8 py-3 bg-white/10 border border-white/20 rounded-xl font-semibold">Cancel</motion.button>
                </div>
              </motion.div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {animations.map((anim) => (
                <motion.div key={anim.id} className="p-6 bg-white/5 border border-white/10 rounded-xl">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{anim.name}</h3>
                      <span className="px-3 py-1 rounded-full text-xs bg-purple-500/20 text-purple-400">
                        {anim.animation_type}
                      </span>
                      {anim.is_active && (
                        <span className="ml-2 px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                          Active
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    {!anim.is_active && (
                      <motion.button whileHover={{ scale: 1.05 }} onClick={() => setActiveAnimation(anim.id)}
                        className="flex-1 px-4 py-2 bg-green-500/20 text-green-400 rounded-lg">
                        Set Active
                      </motion.button>
                    )}
                    <motion.button whileHover={{ scale: 1.05 }} onClick={() => deleteAnimation(anim.id)}
                      className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg">
                      <Trash2 size={16} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
