import React, { useState } from 'react';
import { X, ShieldCheck, Plus, Edit, Trash2, CheckCircle2, Clock, AlertCircle, ShoppingBag, Calendar, Activity, DollarSign, Package, Lock, Key, Megaphone, ExternalLink, Image, LogOut } from 'lucide-react';
import { Product, ClinicTreatment, TreatmentBooking, Order, AISkinAnalysisResult, AdBanner } from '../types';
import { storageService } from '../services/storageService';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  treatments: ClinicTreatment[];
  bookings: TreatmentBooking[];
  orders: Order[];
  aiLogs: AISkinAnalysisResult[];
  onSaveProduct: (p: Product) => void;
  onDeleteProduct: (id: string) => void;
  onUpdateBookingStatus: (id: string, status: TreatmentBooking['status']) => void;
  onUpdateOrderStatus: (id: string, status: Order['status']) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  isOpen,
  onClose,
  products,
  treatments,
  bookings,
  orders,
  aiLogs,
  onSaveProduct,
  onDeleteProduct,
  onUpdateBookingStatus,
  onUpdateOrderStatus,
}) => {
  // Authentication State
  const [passwordInput, setPasswordInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passError, setPassError] = useState('');

  // Tab State
  const [activeTab, setActiveTab] = useState<'products' | 'banners' | 'affiliates' | 'vouchers' | 'bookings' | 'orders' | 'live-chat' | 'seo' | 'ai-logs' | 'settings'>('products');

  // Live Chat State
  const [liveChats, setLiveChats] = useState<any[]>(storageService.getLiveChats());
  const [replyText, setReplyText] = useState('');

  // Ad Banners State
  const [banners, setBanners] = useState<AdBanner[]>(storageService.getBanners());
  const [showBannerModal, setShowBannerModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Partial<AdBanner>>({
    title: '',
    subtitle: '',
    badge: 'LUXE PROMO',
    bgGradient: 'from-[#141414] via-[#332A15] to-[#8C6B1F]',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
    ctaText: 'Lihat Promo',
    targetUrl: 'https://shopee.co.id/attayabeautyluxe',
    platform: 'Shopee',
    isActive: true,
  });

  // Password Update State
  const [newPassword, setNewPassword] = useState('');
  const [passUpdatedMsg, setPassUpdatedMsg] = useState('');

  // New Product Modal State
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product>>({
    name: '',
    brand: 'Attaya Beauty Luxe',
    category: 'Skincare',
    subcategory: 'Serum',
    price: 1500000,
    rating: 4.9,
    reviewCount: 1,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
    description: '',
    ingredients: ['24K Gold Flakes', 'Damask Rose Stem Cell'],
    benefits: ['Glass Skin Effect', 'Anti Aging Presisi'],
    howToUse: 'Teteskan 3-4 tetes pada wajah',
    skinTypeMatch: ['All'],
    volume: '30 ml',
    inStock: true,
    shopeeUrl: '',
    tiktokUrl: '',
    tokopediaUrl: '',
  });

  if (!isOpen) return null;

  const formatIDR = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);
  };

  const totalRevenue = orders.reduce((acc, o) => acc + o.grandTotal, 0);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const currentPass = storageService.getAdminPassword();
    if (passwordInput.trim() === currentPass) {
      setIsAuthenticated(true);
      setPassError('');
    } else {
      setPassError('Password salah! Silakan cek konfigurasi admin password di environment.');
    }
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct.name && editingProduct.price) {
      onSaveProduct({
        ...editingProduct,
        id: editingProduct.id || `prod-${Date.now()}`,
        name: editingProduct.name,
        brand: editingProduct.brand || 'Attaya Beauty Luxe',
        category: editingProduct.category || 'Skincare',
        subcategory: editingProduct.subcategory || 'Serum',
        price: Number(editingProduct.price),
        rating: editingProduct.rating || 4.9,
        reviewCount: editingProduct.reviewCount || 1,
        image: editingProduct.image || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
        description: editingProduct.description || 'Produk formulasi khusus Attaya Beauty Luxe.',
        ingredients: editingProduct.ingredients || ['Active Ingredients'],
        benefits: editingProduct.benefits || ['Kulit Halus'],
        howToUse: editingProduct.howToUse || 'Gunakan setiap hari.',
        skinTypeMatch: editingProduct.skinTypeMatch || ['All'],
        volume: editingProduct.volume || '30 ml',
        inStock: editingProduct.inStock !== false,
        shopeeUrl: editingProduct.shopeeUrl,
        tiktokUrl: editingProduct.tiktokUrl,
        tokopediaUrl: editingProduct.tokopediaUrl,
      } as Product);

      setShowProductModal(false);
    }
  };

  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBanner.title && editingBanner.targetUrl) {
      const newBanner: AdBanner = {
        id: editingBanner.id || `banner-${Date.now()}`,
        title: editingBanner.title,
        subtitle: editingBanner.subtitle || '',
        badge: editingBanner.badge || 'PROMO',
        bgGradient: editingBanner.bgGradient || 'from-[#141414] via-[#332A15] to-[#8C6B1F]',
        image: editingBanner.image || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
        ctaText: editingBanner.ctaText || 'Lihat Detail',
        targetUrl: editingBanner.targetUrl,
        platform: editingBanner.platform || 'Shopee',
        isActive: editingBanner.isActive !== false,
      };

      const updated = editingBanner.id
        ? banners.map((b) => (b.id === editingBanner.id ? newBanner : b))
        : [newBanner, ...banners];

      setBanners(updated);
      storageService.saveBanners(updated);
      setShowBannerModal(false);
    }
  };

  const handleToggleBannerStatus = (id: string) => {
    const updated = banners.map((b) => (b.id === id ? { ...b, isActive: !b.isActive } : b));
    setBanners(updated);
    storageService.saveBanners(updated);
  };

  const handleDeleteBanner = (id: string) => {
    const updated = banners.filter((b) => b.id !== id);
    setBanners(updated);
    storageService.saveBanners(updated);
  };

  const handleSendAdminReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    const newMsg = {
      id: `adm-${Date.now()}`,
      senderName: 'Dokter / CS Admin Blora',
      senderRole: 'admin',
      message: replyText.trim(),
      timestamp: `${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`,
    };
    const updated = [...liveChats, newMsg];
    setLiveChats(updated);
    storageService.saveLiveChats(updated);
    setReplyText('');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.trim().length >= 4) {
      storageService.saveAdminPassword(newPassword.trim());
      setPassUpdatedMsg('Password admin berhasil diperbarui!');
      setNewPassword('');
      setTimeout(() => setPassUpdatedMsg(''), 3000);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput('');
    setPassError('');
    setPassUpdatedMsg('');
  };

  // PASSWORD PROTECTION OVERLAY
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-md w-full p-8 border border-[#D4AF37]/50 shadow-2xl relative space-y-6 text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 bg-[#FAF3E0] rounded-2xl border border-[#D4AF37]/40 flex items-center justify-center mx-auto text-[#8C6B1F]">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <h3 className="font-serif-luxe text-2xl font-bold text-[#1A1A1A]">Akses Portal Admin</h3>
            <p className="text-xs text-gray-500 mt-1">Masukkan password keamanan yang diset via environment deployment untuk mengelola sistem Attaya Luxe.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <input
              type="password"
              required
              placeholder="Masukkan Password Admin..."
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#D4AF37] text-center font-mono"
            />
            {passError && <p className="text-rose-600 font-bold text-[11px]">{passError}</p>}

            <button
              type="submit"
              className="w-full py-3.5 bg-gold-gradient text-white font-bold rounded-xl text-xs shadow-md"
            >
              Masuk Dashboard Admin
            </button>
            <p className="text-[10px] text-gray-400 font-mono">*Password admin diambil dari konfigurasi environment deployment.</p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fade-in flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden border border-[#D4AF37]/40 shadow-2xl flex flex-col">
        
        {/* Top Header */}
        <div className="bg-[#141414] text-white p-5 flex items-center justify-between border-b border-[#D4AF37]/30">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#FAF3E0]/10 rounded-xl text-[#D4AF37] border border-[#D4AF37]/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif-luxe text-xl font-bold text-[#D4AF37]">Portal Admin Attaya Luxe</h3>
              <p className="text-xs text-gray-400">Dashboard Produk, Space Iklan Affiliate, Klinik & Order</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[#D4AF37]/40 bg-white/5 text-[#F3D57A] text-xs font-semibold hover:bg-white/10"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="bg-[#FAF8F5] p-5 border-b border-[#EADEC9] grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <span className="text-[10px] text-gray-400 uppercase font-bold block">Total Pendapatan</span>
            <span className="font-serif-luxe text-2xl font-bold text-[#1A1A1A]">{formatIDR(totalRevenue)}</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <span className="text-[10px] text-gray-400 uppercase font-bold block">Banner Iklan Active</span>
            <span className="font-serif-luxe text-2xl font-bold text-[#8C6B1F]">{banners.filter(b => b.isActive).length} Slot</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <span className="text-[10px] text-gray-400 uppercase font-bold block">Katalog Produk</span>
            <span className="font-serif-luxe text-2xl font-bold text-[#1A1A1A]">{products.length} Item</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <span className="text-[10px] text-gray-400 uppercase font-bold block">Pesanan Pelanggan</span>
            <span className="font-serif-luxe text-2xl font-bold text-emerald-600">{orders.length} Order</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap border-b border-gray-200 bg-white px-6">
          <button
            onClick={() => setActiveTab('products')}
            className={`py-3.5 px-4 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'products'
                ? 'border-[#D4AF37] text-[#8C6B1F]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Kelola Produk ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('banners')}
            className={`py-3.5 px-4 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'banners'
                ? 'border-[#D4AF37] text-[#8C6B1F]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Space Iklan & Banner ({banners.length})
          </button>
          <button
            onClick={() => setActiveTab('affiliates')}
            className={`py-3.5 px-4 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'affiliates'
                ? 'border-[#D4AF37] text-[#8C6B1F]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Affiliate External
          </button>
          <button
            onClick={() => setActiveTab('vouchers')}
            className={`py-3.5 px-4 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'vouchers'
                ? 'border-[#D4AF37] text-[#8C6B1F]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Voucher & Promo
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`py-3.5 px-4 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'bookings'
                ? 'border-[#D4AF37] text-[#8C6B1F]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Reservasi Klinik ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3.5 px-4 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'orders'
                ? 'border-[#D4AF37] text-[#8C6B1F]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Pesanan Toko ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('live-chat')}
            className={`py-3.5 px-4 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'live-chat'
                ? 'border-[#D4AF37] text-[#8C6B1F]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Live Chat CS ({liveChats.length})
          </button>
          <button
            onClick={() => setActiveTab('seo')}
            className={`py-3.5 px-4 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'seo'
                ? 'border-[#D4AF37] text-[#8C6B1F]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            SEO & Schema
          </button>
          <button
            onClick={() => setActiveTab('ai-logs')}
            className={`py-3.5 px-4 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'ai-logs'
                ? 'border-[#D4AF37] text-[#8C6B1F]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Log AI Skin Vision ({aiLogs.length})
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3.5 px-4 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'settings'
                ? 'border-[#D4AF37] text-[#8C6B1F]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Pengaturan Password
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
          
          {/* TAB 1: PRODUCTS */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-serif-luxe text-lg font-bold text-[#1A1A1A]">Daftar Produk Kosmetik & Skincare</h4>
                <button
                  onClick={() => {
                    setEditingProduct({
                      name: '',
                      brand: 'Attaya Beauty Luxe',
                      category: 'Skincare',
                      subcategory: 'Serum',
                      price: 1200000,
                      rating: 5.0,
                      reviewCount: 1,
                      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
                      description: '',
                      ingredients: ['24K Gold', 'Niacinamide'],
                      benefits: ['Mencerahkan'],
                      howToUse: 'Usapkan 3 tetes',
                      skinTypeMatch: ['All'],
                      volume: '30 ml',
                      inStock: true,
                      shopeeUrl: '',
                      tiktokUrl: '',
                      tokopediaUrl: '',
                    });
                    setShowProductModal(true);
                  }}
                  className="px-4 py-2 bg-gold-gradient text-white rounded-xl text-xs font-semibold shadow-xs flex items-center space-x-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Produk Baru</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((prod) => (
                  <div key={prod.id} className="bg-white p-4 rounded-xl border border-gray-200 flex justify-between space-x-3 shadow-xs">
                    <img src={prod.image} alt={prod.name} className="w-16 h-16 object-cover rounded-lg bg-gray-100 shrink-0" />
                    <div className="flex-1 text-xs space-y-1">
                      <span className="text-[10px] text-[#C5A059] font-bold">{prod.category}</span>
                      <h5 className="font-bold text-[#1A1A1A] line-clamp-1">{prod.name}</h5>
                      <p className="font-bold text-[#8C6B1F]">{formatIDR(prod.price)}</p>
                      
                      <div className="flex flex-wrap gap-1 text-[9px]">
                        {prod.shopeeUrl && <span className="px-1 bg-orange-100 text-orange-700 rounded font-mono">Shopee ✓</span>}
                        {prod.tiktokUrl && <span className="px-1 bg-gray-200 text-black rounded font-mono">TikTok ✓</span>}
                        {prod.tokopediaUrl && <span className="px-1 bg-emerald-100 text-emerald-700 rounded font-mono">Tokopedia ✓</span>}
                      </div>

                      <div className="flex space-x-3 pt-1">
                        <button
                          onClick={() => { setEditingProduct(prod); setShowProductModal(true); }}
                          className="text-xs text-blue-600 font-semibold hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onDeleteProduct(prod.id)}
                          className="text-xs text-rose-600 font-semibold hover:underline"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: AD BANNERS */}
          {activeTab === 'banners' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-serif-luxe text-lg font-bold text-[#1A1A1A]">Kelola Space Iklan & Banner Affiliate</h4>
                  <p className="text-xs text-gray-500">Atur banner promo Shopee, TikTok Shop LIVE, Tokopedia, dan Special Deals.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingBanner({
                      title: '',
                      subtitle: '',
                      badge: 'SHOPEE MALL PROMO',
                      bgGradient: 'from-[#EE4D2D] via-[#FF7337] to-[#C93B1B]',
                      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
                      ctaText: 'Beli Sekarang',
                      targetUrl: 'https://shopee.co.id/attayabeautyluxe',
                      platform: 'Shopee',
                      isActive: true,
                    });
                    setShowBannerModal(true);
                  }}
                  className="px-4 py-2 bg-gold-gradient text-white rounded-xl text-xs font-semibold shadow-xs flex items-center space-x-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Slot Iklan Baru</span>
                </button>
              </div>

              <div className="space-y-3">
                {banners.map((b) => (
                  <div key={b.id} className="bg-white p-4 rounded-2xl border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
                    <div className="flex items-center space-x-4">
                      <img src={b.image} alt={b.title} className="w-16 h-16 rounded-xl object-cover border shrink-0" />
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-0.5 bg-gray-100 text-[#8C6B1F] font-bold rounded-md text-[10px] uppercase">
                            {b.platform} • {b.badge}
                          </span>
                          {b.isActive ? (
                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 font-bold rounded-md text-[10px]">Aktif</span>
                          ) : (
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-500 font-bold rounded-md text-[10px]">Nonaktif</span>
                          )}
                        </div>
                        <h5 className="font-bold text-sm text-[#1A1A1A]">{b.title}</h5>
                        <p className="text-gray-500 line-clamp-1">{b.subtitle}</p>
                        <a href={b.targetUrl} target="_blank" rel="noreferrer" className="text-blue-600 font-mono text-[11px] flex items-center hover:underline">
                          <span>{b.targetUrl}</span>
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <button
                        onClick={() => handleToggleBannerStatus(b.id)}
                        className={`px-3 py-1.5 rounded-lg font-bold text-xs ${
                          b.isActive ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {b.isActive ? 'Nonaktifkan' : 'Aktifkan'}
                      </button>
                      <button
                        onClick={() => { setEditingBanner(b); setShowBannerModal(true); }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteBanner(b.id)}
                        className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2.5: AFFILIATE EXTERNAL TRACKING */}
          {activeTab === 'affiliates' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-serif-luxe text-lg font-bold text-[#1A1A1A]">Dashboard Affiliate External & Tracking Komisi</h4>
                  <p className="text-xs text-gray-500">Pantau performa tautan affiliate Shopee, TikTok Shop, Tokopedia, Lazada, dan Blibli.</p>
                </div>
                <div className="flex space-x-2">
                  <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-xl font-bold text-xs">Total Klik: 1,842</span>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-900 rounded-xl font-bold text-xs">Estimasi Komisi: Rp 4.250.000</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-orange-200 space-y-2 shadow-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-orange-600 text-sm">Shopee Affiliate</span>
                    <span className="px-2 py-0.5 bg-orange-100 text-orange-700 font-bold text-[10px] rounded">Aktif</span>
                  </div>
                  <p className="text-xs text-gray-600">Produk Terhubung: <strong>12 Item</strong></p>
                  <p className="text-xs text-gray-600">Total Klik Minggu Ini: <strong>890 Klik</strong></p>
                  <p className="text-xs text-gray-600 font-mono">Commission Rate: <strong>8% - 12%</strong></p>
                  <a href="https://shopee.co.id/attayabeautyluxe" target="_blank" rel="noreferrer" className="text-blue-600 text-xs hover:underline flex items-center pt-1 font-mono">
                    <span>Lihat Toko Shopee Mall</span>
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-300 space-y-2 shadow-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-black text-sm">TikTok Shop LIVE</span>
                    <span className="px-2 py-0.5 bg-gray-200 text-black font-bold text-[10px] rounded">Aktif</span>
                  </div>
                  <p className="text-xs text-gray-600">Produk Terhubung: <strong>10 Item</strong></p>
                  <p className="text-xs text-gray-600">Total Klik Minggu Ini: <strong>620 Klik</strong></p>
                  <p className="text-xs text-gray-600 font-mono">Commission Rate: <strong>10% - 15%</strong></p>
                  <a href="https://tiktok.com/@attaya_luxe" target="_blank" rel="noreferrer" className="text-blue-600 text-xs hover:underline flex items-center pt-1 font-mono">
                    <span>Lihat TikTok Shop LIVE</span>
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-emerald-200 space-y-2 shadow-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-emerald-600 text-sm">Tokopedia Official</span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 font-bold text-[10px] rounded">Aktif</span>
                  </div>
                  <p className="text-xs text-gray-600">Produk Terhubung: <strong>8 Item</strong></p>
                  <p className="text-xs text-gray-600">Total Klik Minggu Ini: <strong>332 Klik</strong></p>
                  <p className="text-xs text-gray-600 font-mono">Commission Rate: <strong>7% - 10%</strong></p>
                  <a href="https://tokopedia.com/attayaluxe" target="_blank" rel="noreferrer" className="text-blue-600 text-xs hover:underline flex items-center pt-1 font-mono">
                    <span>Lihat Tokopedia Official</span>
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2.8: VOUCHER & PROMO MANAGER */}
          {activeTab === 'vouchers' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-serif-luxe text-lg font-bold text-[#1A1A1A]">Kelola Kode Voucher & Diskon Luxe</h4>
                  <p className="text-xs text-gray-500">Buat voucher potongan harga otomatis untuk checkout pelanggan.</p>
                </div>
                <button className="px-4 py-2 bg-gold-gradient text-white rounded-xl text-xs font-semibold shadow-xs flex items-center space-x-1">
                  <Plus className="w-4 h-4" />
                  <span>Tambah Kode Voucher</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-[#D4AF37]/40 space-y-2 shadow-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-mono font-bold text-sm text-[#8C6B1F] bg-[#FAF3E0] px-2.5 py-1 rounded-lg border border-[#D4AF37]">LUXE10</span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">Aktif</span>
                  </div>
                  <p className="text-xs font-bold text-[#1A1A1A]">Diskon 10% Semua Skincare</p>
                  <p className="text-xs text-gray-500">Min. Pembelian: Rp 500.000 | Maks. Diskon: Rp 200.000</p>
                  <p className="text-[10px] text-gray-400 font-mono">Masa Berlaku: s/d 31 Desember 2026</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#D4AF37]/40 space-y-2 shadow-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-mono font-bold text-sm text-[#8C6B1F] bg-[#FAF3E0] px-2.5 py-1 rounded-lg border border-[#D4AF37]">BLORA100K</span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">Aktif</span>
                  </div>
                  <p className="text-xs font-bold text-[#1A1A1A]">Potongan Rp 100.000 Khusus Warga Blora</p>
                  <p className="text-xs text-gray-500">Min. Pembelian: Rp 1.000.000 | Berlaku untuk Treatment & Skincare</p>
                  <p className="text-[10px] text-gray-400 font-mono">Masa Berlaku: s/d 31 Desember 2026</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#D4AF37]/40 space-y-2 shadow-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-mono font-bold text-sm text-[#8C6B1F] bg-[#FAF3E0] px-2.5 py-1 rounded-lg border border-[#D4AF37]">VIPDIAMOND</span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">Aktif</span>
                  </div>
                  <p className="text-xs font-bold text-[#1A1A1A]">Diskon Special VIP Diamond Therapy 15%</p>
                  <p className="text-xs text-gray-500">Khusus Platinum Luxe Member | Gratis Serum Sampel</p>
                  <p className="text-[10px] text-gray-400 font-mono">Masa Berlaku: s/d 31 Desember 2026</p>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'bookings' && (
            <div className="space-y-4">
              <h4 className="font-serif-luxe text-lg font-bold text-[#1A1A1A]">Daftar Janji Treatment Klinik</h4>
              
              {bookings.length === 0 ? (
                <div className="bg-white p-8 rounded-xl text-center text-xs text-gray-500">
                  Belum ada reservasi treatment yang dibuat.
                </div>
              ) : (
                <div className="space-y-3">
                  {bookings.map((book) => (
                    <div key={book.id} className="bg-white p-5 rounded-2xl border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono font-bold text-[#8C6B1F]">{book.bookingNumber}</span>
                          <span className="px-2 py-0.5 bg-amber-100 text-amber-800 font-bold rounded-full text-[10px]">
                            {book.status}
                          </span>
                        </div>
                        <h5 className="font-bold text-sm text-[#1A1A1A]">{book.treatmentTitle} ({formatIDR(book.treatmentPrice)})</h5>
                        <p className="text-gray-600">Pasien: <strong>{book.userName}</strong> ({book.userPhone})</p>
                        <p className="text-gray-500">Jadwal: {book.date} | {book.timeSlot} | {book.therapist}</p>
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={() => onUpdateBookingStatus(book.id, 'Terkonfirmasi')}
                          className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold"
                        >
                          Konfirmasi
                        </button>
                        <button
                          onClick={() => onUpdateBookingStatus(book.id, 'Selesai')}
                          className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold"
                        >
                          Selesai
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h4 className="font-serif-luxe text-lg font-bold text-[#1A1A1A]">Daftar Pesanan Toko E-Commerce</h4>
              
              {orders.length === 0 ? (
                <div className="bg-white p-8 rounded-xl text-center text-xs text-gray-500">
                  Belum ada pesanan e-commerce.
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((ord) => (
                    <div key={ord.id} className="bg-white p-5 rounded-2xl border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono font-bold text-[#8C6B1F]">{ord.orderNumber}</span>
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 font-bold rounded-full text-[10px]">
                            {ord.status}
                          </span>
                        </div>
                        <p className="text-gray-700">Penerima: <strong>{ord.shippingAddress.fullName}</strong> ({ord.shippingAddress.address}, {ord.shippingAddress.city})</p>
                        <p className="text-gray-500">Item: {ord.items.map(i => `${i.product.name} (x${i.quantity})`).join(', ')}</p>
                        <p className="font-bold text-[#8C6B1F]">Total: {formatIDR(ord.grandTotal)} ({ord.paymentMethod})</p>
                        <div className="text-[11px] text-gray-600 grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                          <span>Status Bayar: <strong className="text-emerald-700 uppercase">{ord.paymentStatus || 'pending'}</strong></span>
                          <span>Invoice: <strong className="font-mono text-[#8C6B1F]">{ord.invoiceNumber || 'AUTO-GENERATED'}</strong></span>
                          <span>Refund: <strong>{ord.refundStatus || 'none'}</strong></span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={() => onUpdateOrderStatus(ord.id, 'Dikirim')}
                          className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold"
                        >
                          Kirim Barang
                        </button>
                        <button
                          onClick={() => onUpdateOrderStatus(ord.id, 'Selesai')}
                          className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold"
                        >
                          Selesai
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: LIVE CHAT MONITORING & DIRECT REPLIES */}
          {activeTab === 'live-chat' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-serif-luxe text-lg font-bold text-[#1A1A1A]">Live Chat & Monitoring CS Blora</h4>
                  <p className="text-xs text-gray-500">Monitor percakapan pengguna secara real-time & kirim balasan langsung dari Dokter/CS Admin.</p>
                </div>
                <button
                  onClick={() => setLiveChats(storageService.getLiveChats())}
                  className="px-3 py-1.5 bg-[#FAF3E0] text-[#8C6B1F] rounded-xl text-xs font-bold border border-[#D4AF37]/40 hover:bg-[#D4AF37] hover:text-white transition-colors"
                >
                  🔄 Refresh Pesan Realtime
                </button>
              </div>

              {/* Chat Log Display */}
              <div className="bg-white p-4 rounded-2xl border border-gray-200 max-h-[350px] overflow-y-auto space-y-3">
                {liveChats.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-6">Belum ada riwayat live chat.</p>
                ) : (
                  liveChats.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-3 rounded-xl text-xs space-y-1 ${
                        msg.senderRole === 'admin'
                          ? 'bg-amber-50 border border-amber-200 text-amber-950 ml-6'
                          : msg.senderRole === 'ai'
                          ? 'bg-blue-50 border border-blue-200 text-blue-950 ml-4'
                          : 'bg-gray-50 border border-gray-200 text-gray-900 mr-4'
                      }`}
                    >
                      <div className="flex justify-between items-center font-bold">
                        <span className="flex items-center space-x-1.5">
                          <span className={`w-2 h-2 rounded-full ${msg.senderRole === 'admin' ? 'bg-amber-600' : msg.senderRole === 'ai' ? 'bg-blue-600' : 'bg-emerald-600'}`}></span>
                          <span>{msg.senderName}</span>
                          <span className="text-[10px] text-gray-500 font-normal">({msg.senderRole.toUpperCase()})</span>
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono">{msg.timestamp}</span>
                      </div>
                      <p className="whitespace-pre-line text-xs font-medium">{msg.message}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Admin Reply Box */}
              <form onSubmit={handleSendAdminReply} className="bg-white p-3 rounded-2xl border border-[#D4AF37]/50 flex space-x-2">
                <input
                  type="text"
                  required
                  placeholder="Ketik balasan resmi dari Dokter / CS Admin Blora..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="flex-1 border border-gray-200 p-3 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-gold-gradient text-white font-bold rounded-xl text-xs shadow-md hover:opacity-95 whitespace-nowrap"
                >
                  Kirim Balasan Admin
                </button>
              </form>
            </div>
          )}

          {/* TAB 5.5: SEO & SCHEMA.ORG MANAGER */}
          {activeTab === 'seo' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-serif-luxe text-lg font-bold text-[#1A1A1A]">Pusat Optimalisasi SEO, OpenGraph & Schema.org</h4>
                <p className="text-xs text-gray-500">Aset Meta Title, Meta Description, Google Rich Results & Sitemap XML Attaya Beauty Luxe Blora.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Meta & Social Preview */}
                <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-3 text-xs">
                  <h5 className="font-bold text-[#8C6B1F] flex items-center">
                    <Megaphone className="w-4 h-4 mr-1.5" />
                    <span>OpenGraph & Meta Tags Live Preview</span>
                  </h5>

                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
                    <p className="text-blue-700 font-bold text-sm hover:underline">ATTAYA BEAUTY LUXE | Klinik Kecantikan & Skincare Mewah Terlengkap Blora</p>
                    <p className="text-emerald-700 font-mono text-[11px]">https://attayaluxe.com/blora</p>
                    <p className="text-gray-600 text-[11px]">Pusat Perawatan Kulit Glass Skin, Anti-Aging & Skincare Bintang 5 di Alun-Alun Blora. Dokter Spesialis Sp.DVE, Konsultasi AI 24 Jam & Layanan Reservasi Klinik VIP.</p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div>
                      <label className="block font-semibold text-gray-700">Meta Keywords:</label>
                      <input
                        type="text"
                        readOnly
                        value="skincare blora, klinik kecantikan blora, dokter spdve blora, attaya beauty luxe, serum 24k gold, facial glow blora, alun alun blora"
                        className="w-full border p-2 rounded-lg font-mono text-[10px] bg-gray-50 text-gray-600"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-gray-700">Canonical URL:</label>
                      <input
                        type="text"
                        readOnly
                        value="https://attayaluxe.com/blora"
                        className="w-full border p-2 rounded-lg font-mono text-[10px] bg-gray-50 text-gray-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Schema JSON-LD */}
                <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-3 text-xs">
                  <h5 className="font-bold text-[#8C6B1F] flex items-center">
                    <Activity className="w-4 h-4 mr-1.5" />
                    <span>Schema.org JSON-LD Structure (BeautySalon & MedicalBusiness)</span>
                  </h5>

                  <textarea
                    rows={10}
                    readOnly
                    value={JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "BeautySalon",
                      "name": "Attaya Beauty Luxe Blora",
                      "image": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be",
                      "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "Jl. Pemuda No. 18, Alun-Alun Blora",
                        "addressLocality": "Blora",
                        "addressRegion": "Jawa Tengah",
                        "postalCode": "58211",
                        "addressCountry": "ID"
                      },
                      "geo": {
                        "@type": "GeoCoordinates",
                        "latitude": -6.9697,
                        "longitude": 111.4172
                      },
                      "telephone": "+6281234567890",
                      "priceRange": "$$$",
                      "openingHours": "Mo-Su 08:00-21:00"
                    }, null, 2)}
                    className="w-full p-3 bg-[#141414] text-emerald-400 font-mono text-[10px] rounded-xl border border-gray-800 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: AI SKIN VISION LOGS */}
          {activeTab === 'ai-logs' && (
            <div className="space-y-4">
              <h4 className="font-serif-luxe text-lg font-bold text-[#1A1A1A]">Log Hasil Analisis AI Skin Vision</h4>
              <p className="text-xs text-gray-500">Riwayat diagnosa kesehatan kulit pelanggan menggunakan Gemini AI.</p>

              {aiLogs.length === 0 ? (
                <div className="bg-white p-8 rounded-xl text-center text-xs text-gray-500">
                  Belum ada log diagnosa AI skin vision.
                </div>
              ) : (
                <div className="space-y-3">
                  {aiLogs.map((log, idx) => (
                    <div key={log.id || idx} className="bg-white p-4 rounded-2xl border border-gray-200 space-y-2 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-[#8C6B1F]">Diagnosa Tipe Kulit: {log.skinType}</span>
                        <span className="text-gray-400 text-[10px] font-mono">{log.analysisDate}</span>
                      </div>
                      <p className="text-gray-700">{log.summary}</p>
                      <div className="flex flex-wrap gap-2 text-[10px]">
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold">Skor Kulit: {log.score}/100</span>
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-bold">Problem Utama: {log.primaryConcern}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 7: SETTINGS & PASSWORD */}
          {activeTab === 'settings' && (
            <div className="max-w-md bg-white p-6 rounded-2xl border border-gray-200 space-y-4 text-xs">
              <h4 className="font-serif-luxe text-lg font-bold text-[#1A1A1A] flex items-center">
                <Key className="w-5 h-5 mr-2 text-[#D4AF37]" />
                Keamanan Password Admin
              </h4>
              <p className="text-gray-500">Ganti password keamanan portal admin Attaya Luxe.</p>

              <form onSubmit={handleChangePassword} className="space-y-3">
                <div>
                  <label className="block font-semibold mb-1">Password Baru:</label>
                  <input
                    type="password"
                    required
                    placeholder="Masukkan Password Baru..."
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full border p-2.5 rounded-xl font-mono text-xs"
                  />
                </div>
                {passUpdatedMsg && <p className="text-emerald-600 font-bold">{passUpdatedMsg}</p>}

                <button
                  type="submit"
                  className="w-full py-3 bg-[#141414] text-[#D4AF37] font-bold rounded-xl hover:bg-black"
                >
                  Simpan Password Baru
                </button>
              </form>
            </div>
          )}

        </div>

      </div>

      {/* Product Add/Edit Modal */}
      {showProductModal && (
        <div className="fixed inset-0 z-60 bg-black/50 flex items-center justify-center p-4">
          <form onSubmit={handleProductSubmit} className="bg-white p-6 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto space-y-4 text-xs">
            <h4 className="font-bold text-base text-[#1A1A1A]">Form Input Produk & Link Affiliate</h4>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold mb-1">Nama Produk:</label>
                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full border p-2 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Harga (IDR):</label>
                <input
                  type="number"
                  required
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                  className="w-full border p-2 rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold mb-1">Kategori:</label>
                <select
                  value={editingProduct.category}
                  onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as any })}
                  className="w-full border p-2 rounded-lg"
                >
                  <option value="Skincare">Skincare</option>
                  <option value="Cosmetics">Cosmetics</option>
                  <option value="Perfume">Perfume</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">URL Gambar:</label>
                <input
                  type="text"
                  value={editingProduct.image}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                  className="w-full border p-2 rounded-lg"
                />
              </div>
            </div>

            {/* Affiliate Links Input */}
            <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/80 space-y-2">
              <span className="font-bold text-[#8C6B1F] block">Tautan Affiliate Marketplace:</span>
              <div>
                <label className="block font-medium text-gray-700 text-[10px]">Shopee Affiliate Link:</label>
                <input
                  type="text"
                  placeholder="https://shopee.co.id/..."
                  value={editingProduct.shopeeUrl || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, shopeeUrl: e.target.value })}
                  className="w-full border p-1.5 rounded-lg font-mono text-[10px]"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700 text-[10px]">TikTok Shop Link:</label>
                <input
                  type="text"
                  placeholder="https://vt.tiktok.com/..."
                  value={editingProduct.tiktokUrl || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, tiktokUrl: e.target.value })}
                  className="w-full border p-1.5 rounded-lg font-mono text-[10px]"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700 text-[10px]">Tokopedia Link:</label>
                <input
                  type="text"
                  placeholder="https://tokopedia.com/..."
                  value={editingProduct.tokopediaUrl || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, tokopediaUrl: e.target.value })}
                  className="w-full border p-1.5 rounded-lg font-mono text-[10px]"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1">Deskripsi:</label>
              <textarea
                rows={2}
                value={editingProduct.description}
                onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                className="w-full border p-2 rounded-lg"
              />
            </div>

            <div className="flex space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setShowProductModal(false)}
                className="flex-1 py-2 bg-gray-200 rounded-lg font-semibold"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-1 py-2 bg-gold-gradient text-white rounded-lg font-semibold"
              >
                Simpan Produk
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Ad Banner Add/Edit Modal */}
      {showBannerModal && (
        <div className="fixed inset-0 z-60 bg-black/50 flex items-center justify-center p-4">
          <form onSubmit={handleSaveBanner} className="bg-white p-6 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto space-y-4 text-xs">
            <h4 className="font-bold text-base text-[#1A1A1A]">Form Input Slot Banner Iklan</h4>
            
            <div>
              <label className="block font-semibold mb-1">Judul Banner:</label>
              <input
                type="text"
                required
                placeholder="misal: Shopee 8.8 Super Brand Day"
                value={editingBanner.title}
                onChange={(e) => setEditingBanner({ ...editingBanner, title: e.target.value })}
                className="w-full border p-2 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Deskripsi / Subtitle Promo:</label>
              <textarea
                rows={2}
                placeholder="misal: Diskon s/d 40% & Voucher Cashback Rp 250rb"
                value={editingBanner.subtitle}
                onChange={(e) => setEditingBanner({ ...editingBanner, subtitle: e.target.value })}
                className="w-full border p-2 rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold mb-1">Platform Target:</label>
                <select
                  value={editingBanner.platform}
                  onChange={(e) => setEditingBanner({ ...editingBanner, platform: e.target.value as any })}
                  className="w-full border p-2 rounded-lg"
                >
                  <option value="Shopee">Shopee Mall</option>
                  <option value="TikTok">TikTok Shop LIVE</option>
                  <option value="Tokopedia">Tokopedia Official</option>
                  <option value="AttayaLuxe">Attaya Special Promo</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Label Badge:</label>
                <input
                  type="text"
                  placeholder="misal: SHOPEE MALL OFFICIAL"
                  value={editingBanner.badge}
                  onChange={(e) => setEditingBanner({ ...editingBanner, badge: e.target.value })}
                  className="w-full border p-2 rounded-lg uppercase"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1">Target URL Affiliate Link:</label>
              <input
                type="text"
                required
                placeholder="https://shopee.co.id/attayabeautyluxe"
                value={editingBanner.targetUrl}
                onChange={(e) => setEditingBanner({ ...editingBanner, targetUrl: e.target.value })}
                className="w-full border p-2 rounded-lg font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">URL Gambar Graphic Banner:</label>
              <input
                type="text"
                value={editingBanner.image}
                onChange={(e) => setEditingBanner({ ...editingBanner, image: e.target.value })}
                className="w-full border p-2 rounded-lg font-mono"
              />
            </div>

            <div className="flex space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setShowBannerModal(false)}
                className="flex-1 py-2 bg-gray-200 rounded-lg font-semibold"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-1 py-2 bg-gold-gradient text-white rounded-lg font-semibold"
              >
                Simpan Banner Iklan
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
