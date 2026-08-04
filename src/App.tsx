import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  Sparkles, ShieldCheck, Heart, ShoppingBag, ArrowRight, 
  Search, Filter, Star, Clock, User, Calendar, Check, X,
  Trash2, Plus, Minus, Lock, MessageSquare, Award
} from 'lucide-react';

// Models & Types
import { 
  Product, ClinicTreatment, TreatmentBooking, Order, 
  AISkinAnalysisResult, UserProfile, JournalArticle, CartItem, AdBanner
} from './types';

// Storage Services
import { storageService } from './services/storageService';

// UI Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroBanner } from './components/HeroBanner';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ClinicTreatmentCard } from './components/ClinicTreatmentCard';
import { BookingModal } from './components/BookingModal';
import { AISkinAdvisor } from './components/AISkinAdvisor';
import { AIConciergeWidget } from './components/AIConciergeWidget';
import { AdminPortal } from './components/AdminPortal';
import { JournalView } from './components/JournalView';
import { UserAccountModal } from './components/UserAccountModal';
import { CheckoutModal } from './components/CheckoutModal';
import { AdBannerCarousel } from './components/AdBannerCarousel';
import { BloraPinMapModal } from './components/BloraPinMapModal';

export default function App() {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState<'home' | 'catalog' | 'clinic' | 'advisor' | 'journal'>('home');
  const [isMapOpen, setIsMapOpen] = useState(false);

  // Core Data States (persisted with storageService)
  const [products, setProducts] = useState<Product[]>(() => storageService.getProducts());
  const [treatments, setTreatments] = useState<ClinicTreatment[]>(() => storageService.getTreatments());
  const [bookings, setBookings] = useState<TreatmentBooking[]>(() => storageService.getBookings());
  const [orders, setOrders] = useState<Order[]>(() => storageService.getOrders());
  const [aiLogs, setAiLogs] = useState<AISkinAnalysisResult[]>(() => storageService.getAILogs());
  const [user, setUser] = useState<UserProfile>(() => storageService.getUser());
  const [journalArticles, setJournalArticles] = useState<JournalArticle[]>(() => storageService.getJournal());
  const [banners, setBanners] = useState<AdBanner[]>(() => storageService.getBanners());

  // Filter & Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Skincare' | 'Cosmetics' | 'Perfume'>('All');
  const [selectedSkinType, setSelectedSkinType] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<'All' | 'Under1M' | '1MTo3M' | 'Above3M'>('All');

  // Clinic Treatment Filter State
  const [selectedClinicCategory, setSelectedClinicCategory] = useState<string>('All');

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => storageService.getCart());
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Modal States
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null);
  const [selectedTreatmentForBooking, setSelectedTreatmentForBooking] = useState<ClinicTreatment | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isUserAccountOpen, setIsUserAccountOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Sync Cart to LocalStorage
  useEffect(() => {
    storageService.saveCart(cartItems);
  }, [cartItems]);

  // Sync Products to LocalStorage
  useEffect(() => {
    storageService.saveProducts(products);
  }, [products]);

  // Sync Bookings to LocalStorage
  useEffect(() => {
    storageService.saveBookings(bookings);
  }, [bookings]);

  // Sync Orders to LocalStorage
  useEffect(() => {
    storageService.saveOrders(orders);
  }, [orders]);

  // Cart Operations
  const handleAddToCart = (product: Product, quantity = 1, selectedShade?: string) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id && item.selectedShade === selectedShade);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity, selectedShade }];
    });

    showToast(`✓ ${product.name} dimasukkan ke tas belanja!`);
  };

  const handleUpdateCartQty = (productId: string, newQty: number, selectedShade?: string) => {
    if (newQty <= 0) {
      handleRemoveFromCart(productId, selectedShade);
      return;
    }
    setCartItems(prev => prev.map(item => {
      if (item.product.id === productId && item.selectedShade === selectedShade) {
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleRemoveFromCart = (productId: string, selectedShade?: string) => {
    setCartItems(prev => prev.filter(item => !(item.product.id === productId && item.selectedShade === selectedShade)));
    showToast('Produk dihapus dari tas belanja.');
  };

  const cartSubtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Admin Portal Handler Operations
  const handleSaveProduct = (updatedProduct: Product) => {
    setProducts(prev => {
      const idx = prev.findIndex(p => p.id === updatedProduct.id);
      if (idx > -1) {
        const copy = [...prev];
        copy[idx] = updatedProduct;
        return copy;
      }
      return [updatedProduct, ...prev];
    });
    showToast('✓ Katalog produk berhasil diperbarui!');
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Produk telah dihapus dari katalog.');
  };

  const handleUpdateBookingStatus = (id: string, status: TreatmentBooking['status']) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    showToast(`✓ Status reservasi #${id} diperbarui ke: ${status}`);
  };

  const handleUpdateOrderStatus = (id: string, status: Order['status'], customTrackingNumber?: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id === id) {
        const autoResi = customTrackingNumber || o.trackingNumber || `JNE-BLR-${Math.floor(10000000 + Math.random() * 90000000)}`;
        return {
          ...o,
          status,
          trackingNumber: status === 'Dikirim' || status === 'Selesai' ? autoResi : o.trackingNumber,
        };
      }
      return o;
    }));
    showToast(`✓ Status pesanan diperbarui ke: ${status}`);
  };

  // Booking Complete Handler
  const handleCompleteBooking = (newBooking: TreatmentBooking) => {
    setBookings(prev => [newBooking, ...prev]);
    setUser(prev => ({
      ...prev,
      points: prev.points + 500,
    }));
    showToast(`✓ Janji Treatment #${newBooking.bookingNumber} berhasil dibuat! +500 Poin VIP Added.`);
  };

  const handleConfirmBooking = (bookingInput: Omit<TreatmentBooking, 'id' | 'bookingNumber' | 'createdAt'>) => {
    const newBooking: TreatmentBooking = {
      ...bookingInput,
      id: `book-${Date.now()}`,
      bookingNumber: `ATL-BK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
    };

    handleCompleteBooking(newBooking);
    return newBooking;
  };

  // Order Complete Handler
  const handleCompleteOrder = (newOrder: Order) => {
    setOrders(prev => [newOrder, ...prev]);
    setCartItems([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    // Add reward points
    const earnedPoints = Math.floor(newOrder.grandTotal / 10000);
    setUser(prev => ({
      ...prev,
      points: prev.points + earnedPoints,
    }));
    showToast(`✓ Pesanan #${newOrder.orderNumber} berhasil dibuat! +${earnedPoints} Poin VIP Added.`);
  };

  // AI Diagnostic Complete Handler
  const handleAISkinAnalysisComplete = (result: AISkinAnalysisResult) => {
    setAiLogs(prev => [result, ...prev]);
    storageService.addAILog(result);
  };

  // Filter Products Logic
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.ingredients.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;

    const matchesSkinType = selectedSkinType === 'All' || p.skinTypeMatch.includes('All') || p.skinTypeMatch.includes(selectedSkinType);

    let matchesPrice = true;
    if (priceRange === 'Under1M') matchesPrice = p.price < 1000000;
    else if (priceRange === '1MTo3M') matchesPrice = p.price >= 1000000 && p.price <= 3000000;
    else if (priceRange === 'Above3M') matchesPrice = p.price > 3000000;

    return matchesSearch && matchesCategory && matchesSkinType && matchesPrice;
  });

  // Filter Clinic Treatments Logic
  const filteredTreatments = treatments.filter(t => {
    if (selectedClinicCategory === 'All') return true;
    return t.category === selectedClinicCategory;
  });

  const formatIDR = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] font-sans antialiased flex flex-col selection:bg-[#D4AF37]/20 selection:text-[#8C6B1F]">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#141414] text-[#D4AF37] border border-[#D4AF37]/40 px-5 py-3 rounded-2xl shadow-2xl text-xs font-semibold flex items-center space-x-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartItemCount}
        openCart={() => setIsCartOpen(true)}
        user={user}
        openUserAccount={() => setIsUserAccountOpen(true)}
        openAdmin={() => setIsAdminOpen(true)}
        openMap={() => setIsMapOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* BODY CONTENT ROUTING BASED ON ACTIVE TAB */}
      <main className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            {/* TAB 1: HOME PAGE */}
            {activeTab === 'home' && (
              <div className="space-y-16 pb-16">
                
                {/* Hero Banner Showcase */}
                <HeroBanner
                  onExploreProducts={() => setActiveTab('catalog')}
                  onStartAIScan={() => setActiveTab('advisor')}
                  onBookClinic={() => setActiveTab('clinic')}
                />

                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="bg-white rounded-3xl border border-[#EADEC9] shadow-xs p-6 sm:p-8 space-y-6">
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Enterprise Customer Journey</span>
                        <h2 className="font-serif-luxe text-3xl font-bold text-[#1A1A1A]">Ekosistem Fitur Wajib Attaya Beauty Luxe</h2>
                      </div>
                      <p className="text-xs text-gray-600 max-w-2xl">
                        Login, membership, wishlist, keranjang, checkout, tracking, live chat, AI assistant, affiliate, dan ad management terhubung dalam satu pengalaman pelanggan premium.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        ['Customer', 'Login pelanggan, register, loyalty point, wishlist, riwayat pembelian, review & kritik saran'],
                        ['Live Commerce', 'Floating live chat, WhatsApp, Telegram, auto reply, upload gambar & file, status online'],
                        ['Order & Tracking', 'Checkout aman, resi otomatis, status pengiriman, estimasi ongkir & sampai'],
                        ['AI & Growth', 'Skin advisor, parfum recommendation, admin analytics, affiliate & ad manager'],
                      ].map(([title, copy]) => (
                        <div key={title} className="bg-[#FAF8F5] rounded-2xl border border-[#EADEC9] p-4 space-y-2">
                          <div className="text-[10px] font-bold uppercase tracking-widest text-[#8C6B1F]">{title}</div>
                          <p className="text-xs text-gray-700 leading-relaxed">{copy}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Promo Space / Space Iklan Carousel Banner */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <AdBannerCarousel
                    banners={banners}
                    onSelectBanner={(banner) => {
                      if (banner.targetUrl === '#clinic') {
                        setActiveTab('clinic');
                      } else {
                        setActiveTab('catalog');
                      }
                    }}
                  />
                </section>

                {/* Curated Bestsellers Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-[#EADEC9] pb-4">
                    <div>
                      <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">Koleksi Bestseller Terfavorit</span>
                      <h2 className="font-serif-luxe text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
                        Masterpiece Skincare & Kosmetik
                      </h2>
                    </div>
                    <button
                      onClick={() => setActiveTab('catalog')}
                      className="text-xs font-bold text-[#8C6B1F] hover:text-[#C5A059] flex items-center space-x-1 transition-colors"
                    >
                      <span>Lihat Seluruh Katalog ({products.length})</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.slice(0, 4).map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onQuickView={(p) => setSelectedProductDetail(p)}
                        onAddToCart={(p) => handleAddToCart(p, 1)}
                      />
                    ))}
                  </div>
                </section>

            {/* Clinic & Gemini Vision AI Teaser Section */}
            <section className="bg-gradient-to-r from-[#141414] via-[#222222] to-[#141414] text-white py-16 border-y border-[#D4AF37]/30">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                <div className="space-y-6">
                  <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#FAF3E0]/10 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Inovasi Gemini 2.5 Vision AI Diagnostic</span>
                  </div>

                  <h2 className="font-serif-luxe text-3xl sm:text-5xl font-bold text-white leading-tight">
                    Analisis Kulit Presisi Tinggi Berbasis Kecerdasan Buatan
                  </h2>

                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    Dapatkan rekomendasi kombinasi skincare & treatment klinik yang tepat hanya dengan mengunggah foto selfie wajah Anda. Gemini AI kami memproses tingkat hidrasi, pigmentasi, pori-pori, dan kerutan secara otomatis.
                  </p>

                  <div className="flex flex-wrap gap-4 pt-2">
                    <button
                      onClick={() => setActiveTab('advisor')}
                      className="px-6 py-3.5 bg-gold-gradient text-white font-bold rounded-xl text-xs shadow-lg flex items-center space-x-2 hover:scale-105 transition-transform"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Coba Gemini AI Skin Advisor Now</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('clinic')}
                      className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-xs border border-white/20 transition-colors"
                    >
                      <span>Lihat Treatment Klinik</span>
                    </button>
                  </div>
                </div>

                {/* AI Scanner Preview Graphic */}
                <div className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl bg-black/40 p-4">
                  <img
                    src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=1000"
                    alt="Attaya Clinic & AI Skin Advisor"
                    className="w-full h-80 object-cover rounded-2xl opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-8 left-8 right-8 text-white space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-[#D4AF37]">
                      <span>Attaya Flagship Clinic - Senayan City</span>
                      <span>Dermatologist Sp.DVE</span>
                    </div>
                    <p className="text-xs text-gray-300">
                      Dilengkapi dengan teknologi laser Pico Sure, Microdermabrasion 24K Gold, dan terapis berpengalaman lebih dari 10 tahun.
                    </p>
                  </div>
                </div>

              </div>
            </section>

            {/* Dermatology Journal Teaser */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="flex justify-between items-end border-b border-[#EADEC9] pb-4">
                <div>
                  <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">Attaya Journal & Science</span>
                  <h2 className="font-serif-luxe text-3xl font-bold text-[#1A1A1A]">Edukasi & Riset Kecantikan</h2>
                </div>
                <button
                  onClick={() => setActiveTab('journal')}
                  className="text-xs font-bold text-[#8C6B1F] hover:text-[#C5A059] flex items-center space-x-1"
                >
                  <span>Baca Semua Journal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {journalArticles.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => setActiveTab('journal')}
                    className="bg-white p-5 rounded-2xl border border-[#EADEC9] shadow-xs hover:shadow-md transition-all cursor-pointer flex space-x-4 items-center"
                  >
                    <img src={art.image} alt={art.title} className="w-24 h-24 rounded-xl object-cover shrink-0" />
                    <div className="space-y-1 text-xs">
                      <span className="px-2 py-0.5 bg-[#FAF3E0] text-[#8C6B1F] font-bold rounded-md text-[10px]">{art.category}</span>
                      <h4 className="font-serif-luxe text-base font-bold text-[#1A1A1A] line-clamp-2">{art.title}</h4>
                      <p className="text-gray-500 line-clamp-1">{art.excerpt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}

        {/* TAB 2: PRODUCT CATALOG */}
        {activeTab === 'catalog' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            
            {/* Catalog Header */}
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">Exclusive Luxury Collection</span>
              <h1 className="font-serif-luxe text-4xl font-bold text-[#1A1A1A]">Katalog Skincare & Kosmetik</h1>
              <p className="text-xs text-gray-600">
                Formulasi khusus 24K Gold, Stem Cell Mawar Damask, & Diamond Dust bersertifikat BPOM dan Halal.
              </p>
            </div>

            {/* Space Iklan Affiliate Promo Banner */}
            <AdBannerCarousel
              banners={banners}
              onSelectBanner={(banner) => {
                if (banner.targetUrl === '#clinic') {
                  setActiveTab('clinic');
                }
              }}
            />

            {/* Multi-Filter Bar */}
            <div className="bg-white p-5 rounded-2xl border border-[#EADEC9] shadow-xs space-y-4">
              
              {/* Category Chips */}
              <div className="flex flex-wrap gap-2 items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {['All', 'Skincare', 'Cosmetics', 'Perfume'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat as any)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        selectedCategory === cat
                          ? 'bg-[#141414] text-[#D4AF37] shadow-xs'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {cat === 'All' ? 'Semua Kategori' : cat}
                    </button>
                  ))}
                </div>

                <div className="text-xs text-gray-500 font-semibold">
                  Menampilkan <strong>{filteredProducts.length}</strong> dari {products.length} produk
                </div>
              </div>

              {/* Secondary Filters */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-gray-100 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Pencarian Kata Kunci:</label>
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Cari serum, lipstick, emas..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-xl text-xs focus:ring-1 focus:ring-[#D4AF37] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Cocok untuk Tipe Kulit:</label>
                  <select
                    value={selectedSkinType}
                    onChange={(e) => setSelectedSkinType(e.target.value)}
                    className="w-full py-2 px-3 border border-gray-200 rounded-xl text-xs outline-none bg-white"
                  >
                    <option value="All">Semua Jenis Kulit</option>
                    <option value="Normal">Kulit Normal</option>
                    <option value="Oily">Kulit Berminyak / Acne-Prone</option>
                    <option value="Dry">Kulit Kering / Dehidrasi</option>
                    <option value="Combination">Kulit Kombinasi</option>
                    <option value="Sensitive">Kulit Sensitif</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Kisaran Harga (IDR):</label>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value as any)}
                    className="w-full py-2 px-3 border border-gray-200 rounded-xl text-xs outline-none bg-white"
                  >
                    <option value="All">Semua Harga</option>
                    <option value="Under1M">Di bawah Rp 1.000.000</option>
                    <option value="1MTo3M">Rp 1.000.000 - Rp 3.000.000</option>
                    <option value="Above3M">Di atas Rp 3.000.000</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl text-center space-y-3 border border-gray-200">
                <p className="text-gray-500 font-semibold text-sm">Tidak ada produk yang cocok dengan kriteria pencarian Anda.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setSelectedSkinType('All');
                    setPriceRange('All');
                  }}
                  className="px-4 py-2 bg-gold-gradient text-white rounded-xl text-xs font-bold"
                >
                  Reset Semua Filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setSelectedProductDetail(p)}
                    onAddToCart={(p) => handleAddToCart(p, 1)}
                  />
                ))}
              </div>
            )}

          </div>
        )}

        {/* TAB 3: CLINIC TREATMENTS & RESERVATION */}
        {activeTab === 'clinic' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
            
            {/* Header */}
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">Attaya Aesthetic & Laser Clinic</span>
              <h1 className="font-serif-luxe text-4xl sm:text-5xl font-bold text-[#1A1A1A]">Layanan Treatment Estetika Medis</h1>
              <p className="text-xs text-gray-600">
                Ditangani langsung oleh Dokter Spesialis Dermatologi & Venereologi (Sp.DVE) berlisensi resmi dengan fasilitas alat medis berstandar internasional.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2">
              {['All', 'Facial & Glow', 'Laser & Pigmentation', 'Acne & Pore', 'Anti-Aging & Lifting'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedClinicCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedClinicCategory === cat
                      ? 'bg-[#141414] text-[#D4AF37] shadow-md'
                      : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {cat === 'All' ? 'Semua Treatment' : cat}
                </button>
              ))}
            </div>

            {/* Clinic Treatments Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredTreatments.map((treatment) => (
                <ClinicTreatmentCard
                  key={treatment.id}
                  treatment={treatment}
                  onBook={(t) => setSelectedTreatmentForBooking(t)}
                />
              ))}
            </div>

            {/* Doctor Specialists Highlight Card */}
            <div className="bg-gradient-to-r from-[#141414] to-[#242424] text-white rounded-3xl p-8 border border-[#D4AF37]/40 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <span className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest">Tim Dokter Spesialis</span>
                <h3 className="font-serif-luxe text-2xl font-bold text-white">Konsultasi Pribadi dengan dr. Aurelia Sp.DVE</h3>
                <p className="text-xs text-gray-300">
                  Kepala Tim Medis Attaya Luxe Clinic dengan pengalaman lebih dari 12 tahun dalam dermatologi estetika & laser rejuvenation.
                </p>
              </div>
              <button
                onClick={() => setSelectedTreatmentForBooking(treatments[0])}
                className="px-6 py-3.5 bg-gold-gradient text-white rounded-xl font-bold text-xs shadow-lg shrink-0"
              >
                Jadwalkan Konsultasi Dokter
              </button>
            </div>

          </div>
        )}

        {/* TAB 4: GEMINI AI SKIN ADVISOR */}
        {activeTab === 'advisor' && (
          <AISkinAdvisor
            products={products}
            treatments={treatments}
            onAnalysisComplete={handleAISkinAnalysisComplete}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onBookTreatment={(t) => setSelectedTreatmentForBooking(t)}
          />
        )}

        {/* TAB 5: JOURNAL */}
        {activeTab === 'journal' && (
          <JournalView articles={journalArticles} />
        )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* FLOATING AI CONCIERGE CHAT WIDGET */}
      <AIConciergeWidget
        products={products}
        treatments={treatments}
        onOpenMap={() => setIsMapOpen(true)}
      />

      {/* FOOTER */}
      <Footer onOpenMap={() => setIsMapOpen(true)} />

      {/* BLORA PIN MAP MODAL */}
      <BloraPinMapModal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        onBookClinic={() => setActiveTab('clinic')}
      />

      {/* CART DRAWER SLIDE-OVER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs animate-fade-in flex justify-end">
          <div 
            className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl relative border-l border-[#D4AF37]/30"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-5 border-b border-gray-200 flex justify-between items-center bg-[#141414] text-white">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="font-serif-luxe text-lg font-bold text-[#D4AF37]">Tas Belanja Anda ({cartItemCount})</h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1 text-gray-400 hover:text-white rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto" />
                  <p className="text-xs font-semibold text-gray-500">Tas belanja Anda masih kosong.</p>
                  <button
                    onClick={() => { setIsCartOpen(false); setActiveTab('catalog'); }}
                    className="px-4 py-2 bg-gold-gradient text-white text-xs font-bold rounded-xl"
                  >
                    Jelajahi Produk Sekarang
                  </button>
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <div key={idx} className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 flex space-x-3 items-center">
                    <img src={item.product.image} alt={item.product.name} className="w-16 h-16 rounded-lg object-cover bg-white shrink-0" />
                    <div className="flex-1 text-xs space-y-1">
                      <h4 className="font-bold text-[#1A1A1A] line-clamp-1">{item.product.name}</h4>
                      {item.selectedShade && (
                        <span className="text-[10px] text-[#8C6B1F] bg-[#FAF3E0] px-1.5 py-0.5 rounded font-semibold block w-fit">
                          Shade: {item.selectedShade}
                        </span>
                      )}
                      <p className="font-bold text-[#8C6B1F]">{formatIDR(item.product.price)}</p>

                      <div className="flex items-center space-x-2 pt-1">
                        <div className="flex items-center border rounded-lg bg-white">
                          <button
                            onClick={() => handleUpdateCartQty(item.product.id, item.quantity - 1, item.selectedShade)}
                            className="p-1 hover:bg-gray-100 text-gray-600"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 font-bold text-[11px]">{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateCartQty(item.product.id, item.quantity + 1, item.selectedShade)}
                            className="p-1 hover:bg-gray-100 text-gray-600"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemoveFromCart(item.product.id, item.selectedShade)}
                          className="text-rose-600 p-1 hover:bg-rose-50 rounded"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Checkout Footer */}
            {cartItems.length > 0 && (
              <div className="p-5 border-t border-gray-200 bg-[#FAF8F5] space-y-3">
                <div className="flex justify-between items-center text-xs font-bold text-[#1A1A1A]">
                  <span>Subtotal:</span>
                  <span className="font-serif-luxe text-xl text-[#8C6B1F]">{formatIDR(cartSubtotal)}</span>
                </div>
                <p className="text-[10px] text-gray-500">
                  *Gratis ongkos kirim khusus area Jabodetabek untuk pembelian di atas Rp 2.000.000.
                </p>
                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full py-3.5 bg-gold-gradient text-white font-bold rounded-xl text-xs shadow-lg flex items-center justify-center space-x-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Lanjut Pembayaran Aman ({formatIDR(cartSubtotal)})</span>
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* MODALS */}
      {/* 1. Product Detail Modal */}
      {selectedProductDetail && (
        <ProductDetailModal
          product={selectedProductDetail}
          onClose={() => setSelectedProductDetail(null)}
          onAddToCart={(p, qty, shade) => {
            handleAddToCart(p, qty, shade);
            setSelectedProductDetail(null);
          }}
        />
      )}

      {/* 2. Clinic Booking Modal */}
      {selectedTreatmentForBooking && (
        <BookingModal
          treatment={selectedTreatmentForBooking}
          user={user}
          onClose={() => setSelectedTreatmentForBooking(null)}
          onConfirmBooking={handleConfirmBooking}
        />
      )}

      {/* 3. Admin Portal Modal */}
      <AdminPortal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        treatments={treatments}
        bookings={bookings}
        orders={orders}
        aiLogs={aiLogs}
        onSaveProduct={handleSaveProduct}
        onDeleteProduct={handleDeleteProduct}
        onUpdateBookingStatus={handleUpdateBookingStatus}
        onUpdateOrderStatus={handleUpdateOrderStatus}
      />

      {/* 4. VIP User Account Modal */}
      <UserAccountModal
        isOpen={isUserAccountOpen}
        onClose={() => setIsUserAccountOpen(false)}
        user={user}
        bookings={bookings}
        orders={orders}
      />

      {/* 5. Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        subtotal={cartSubtotal}
        onCompleteOrder={handleCompleteOrder}
      />

    </div>
  );
}
