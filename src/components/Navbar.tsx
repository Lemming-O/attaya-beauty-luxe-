import React, { useState } from 'react';
import { ShoppingBag, Sparkles, Calendar, Search, User, Menu, X, Heart, ShieldCheck, Crown, MapPin } from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  openCart: () => void;
  user: UserProfile;
  openUserAccount: () => void;
  openAdmin: () => void;
  openMap: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  openCart,
  user,
  openUserAccount,
  openAdmin,
  openMap,
  searchQuery,
  setSearchQuery,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const navItems = [
    { id: 'home', label: 'Beranda' },
    { id: 'products', label: 'Katalog Produk' },
    { id: 'clinic', label: 'Klinik Estetika' },
    { id: 'ai-advisor', label: 'AI Skin Advisor', badge: 'AI' },
    { id: 'journal', label: 'Luxe Journal' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EADEC9] transition-all duration-300">
      {/* Top Privilege Bar */}
      <div className="bg-[#141414] text-[#D4AF37] px-4 py-1.5 text-xs tracking-wider flex justify-between items-center text-center">
        <div className="hidden sm:flex items-center space-x-2 font-medium">
          <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>ATTAYA LUXE BLORA: Pusat Skincare & Klinik Kecantikan Terlengkap di Blora</span>
        </div>
        <div className="w-full sm:w-auto flex justify-center sm:justify-end items-center space-x-4 text-[11px] text-[#E0D5C1]">
          <button
            onClick={openMap}
            className="hover:text-[#D4AF37] transition-colors flex items-center space-x-1 font-bold text-[#D4AF37] bg-white/10 px-2.5 py-0.5 rounded-full border border-[#D4AF37]/30"
            title="Lihat Pin Map Alamat Klinik Blora"
          >
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>PinMap Blora</span>
          </button>
          <button 
            onClick={openAdmin}
            className="hover:text-[#D4AF37] transition-colors flex items-center space-x-1 underline decoration-gold-[#D4AF37]"
          >
            <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
            <span>Portal Admin</span>
          </button>
        </div>
      </div>


      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Hamburger Menu */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#1A1A1A] hover:text-[#D4AF37] focus:outline-none"
              aria-label="Buka Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Professional Brand Logo */}
          <div className="flex-1 lg:flex-none text-center lg:text-left">
            <button 
              onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="inline-flex items-center space-x-3 group text-left focus:outline-none"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#141414] via-[#2A2415] to-[#141414] border-2 border-[#D4AF37] shadow-lg flex items-center justify-center p-1.5 group-hover:scale-105 transition-transform">
                <Crown className="w-6 h-6 text-[#D4AF37] drop-shadow-md" />
              </div>
              <div className="flex flex-col items-start">
                <div className="flex items-center space-x-1">
                  <span className="font-serif-luxe text-2xl sm:text-3xl font-bold tracking-widest text-[#1A1A1A] group-hover:text-[#C5A059] transition-colors">
                    ATTAYA
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] -mt-2 animate-pulse" />
                </div>
                <span className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-[#8C6B1F] font-extrabold -mt-1">
                  BEAUTY LUXE • BLORA
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative text-sm font-medium tracking-wide py-1 transition-all duration-200 ${
                  activeTab === item.id
                    ? 'text-[#C5A059] font-semibold'
                    : 'text-[#2C2C2C] hover:text-[#C5A059]'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-1.5 px-1.5 py-0.5 text-[10px] bg-gradient-to-r from-[#D4AF37] to-[#B76E79] text-white font-bold rounded-full">
                    {item.badge}
                  </span>
                )}
                {activeTab === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C5A059] rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Search Toggle */}
            <div className="relative">
              {showSearchInput ? (
                <div className="flex items-center bg-white border border-[#D4AF37] rounded-full px-3 py-1 text-sm shadow-sm">
                  <Search className="w-4 h-4 text-[#C5A059] mr-2" />
                  <input
                    type="text"
                    placeholder="Cari serum, parfum, treatment..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-36 sm:w-56 bg-transparent focus:outline-none text-xs text-[#1A1A1A]"
                    autoFocus
                  />
                  <button 
                    onClick={() => { setShowSearchInput(false); setSearchQuery(''); }}
                    className="text-gray-400 hover:text-gray-600 ml-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSearchInput(true)}
                  className="p-2 text-[#1A1A1A] hover:text-[#C5A059] transition-colors"
                  title="Cari Produk & Treatment"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* AI Advisor Direct Button */}
            <button
              onClick={() => setActiveTab('ai-advisor')}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 bg-[#FAF3E0] border border-[#D4AF37]/40 rounded-full text-xs font-medium text-[#8C6B1F] hover:bg-[#D4AF37] hover:text-white transition-all shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] group-hover:text-white" />
              <span>Skin AI</span>
            </button>

            {/* User Profile */}
            <button
              onClick={openUserAccount}
              className="p-2 text-[#1A1A1A] hover:text-[#C5A059] transition-colors relative"
              title="Profil Luxe Member"
            >
              <User className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#D4AF37] rounded-full ring-2 ring-white"></span>
            </button>

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative p-2 text-[#1A1A1A] hover:text-[#C5A059] transition-colors"
              title="Keranjang Belanja"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#B76E79] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-b border-[#EADEC9] px-4 pt-2 pb-6 space-y-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors flex justify-between items-center ${
                activeTab === item.id
                  ? 'bg-[#FAF3E0] text-[#8C6B1F] font-semibold border-l-4 border-[#D4AF37]'
                  : 'text-[#1A1A1A] hover:bg-gray-100'
              }`}
            >
              <span>{item.label}</span>
              {item.badge && (
                <span className="px-2 py-0.5 text-[10px] bg-gradient-to-r from-[#D4AF37] to-[#B76E79] text-white font-bold rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
          <div className="pt-2 border-t border-[#EADEC9] flex justify-between items-center text-xs text-[#666]">
            <button 
              onClick={() => { openUserAccount(); setMobileMenuOpen(false); }}
              className="flex items-center space-x-2 text-[#1A1A1A] font-medium"
            >
              <Crown className="w-4 h-4 text-[#D4AF37]" />
              <span>{user.name} ({user.tier})</span>
            </button>
            <button 
              onClick={() => { openAdmin(); setMobileMenuOpen(false); }}
              className="text-[#C5A059] font-medium"
            >
              Admin Portal
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
