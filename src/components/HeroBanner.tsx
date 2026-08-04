import React from 'react';
import { Sparkles, Calendar, ArrowRight, ShieldCheck, Crown, Star } from 'lucide-react';

interface HeroBannerProps {
  onExploreProducts: () => void;
  onStartAIScan: () => void;
  onBookClinic: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreProducts,
  onStartAIScan,
  onBookClinic,
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F6F1EA] to-[#FAF8F5] py-12 lg:py-20 border-b border-[#EADEC9]">
      {/* Decorative Gold Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#B76E79]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center space-x-2 bg-[#FAF3E0] backdrop-blur-md px-4 py-1.5 rounded-full border border-[#D4AF37]/50 shadow-xs">
              <Crown className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-xs font-bold tracking-wider text-[#8C6B1F] uppercase">
                #1 PUSAT SKINCARE & KLINIK KECANTIKAN TERLENGKAP DI BLORA
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif-luxe text-4xl sm:text-5xl lg:text-6xl text-[#1A1A1A] font-semibold tracking-tight leading-[1.15]">
              Koleksi Skincare & Klinik Kecantikan <span className="text-gold-gradient italic font-bold">Terlengkap di Blora</span> Berbasis <span className="text-rose-gold-gradient">AI Presisi</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-[#555] font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Pusat kosmetik 24K Gold, parfum Imperial Oud, dan treatment estetika medis <strong className="text-[#8C6B1F]">Terlengkap di Kabupaten Blora</strong>. Ditangani langsung oleh Dokter Spesialis Kulit (Sp.DVE) di Jl. Pemuda Alun-Alun Blora.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onStartAIScan}
                className="w-full sm:w-auto px-8 py-4 bg-gold-gradient text-white rounded-xl font-semibold text-sm shadow-luxe hover:opacity-95 transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-5 h-5 text-white animate-pulse" />
                <span>Mulai AI Skin Diagnostic</span>
              </button>

              <button
                onClick={onBookClinic}
                className="w-full sm:w-auto px-7 py-4 bg-white border border-[#D4AF37] text-[#8C6B1F] rounded-xl font-semibold text-sm hover:bg-[#FAF3E0] transition-all flex items-center justify-center space-x-2 shadow-xs"
              >
                <Calendar className="w-4 h-4 text-[#D4AF37]" />
                <span>Reservasi Treatment Klinik</span>
              </button>

              <button
                onClick={onExploreProducts}
                className="w-full sm:w-auto text-xs font-semibold text-[#1A1A1A] hover:text-[#C5A059] flex items-center justify-center space-x-1 py-3 group"
              >
                <span>Lihat Koleksi</span>
                <ArrowRight className="w-4 h-4 text-[#C5A059] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-[#EADEC9]/80 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <div className="flex items-center justify-center lg:justify-start space-x-1 text-[#D4AF37] mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs font-semibold text-[#1A1A1A]">4.9 / 5.0 Rating VIP</p>
                <p className="text-[11px] text-gray-500">12,000+ Pelanggan Setia</p>
              </div>

              <div>
                <div className="flex items-center justify-center lg:justify-start space-x-1 text-[#C5A059] mb-1">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <p className="text-xs font-semibold text-[#1A1A1A]">100% BPOM Verified</p>
                <p className="text-[11px] text-gray-500">Uji Klinis Teruji</p>
              </div>

              <div>
                <div className="flex items-center justify-center lg:justify-start space-x-1 text-[#B76E79] mb-1">
                  <Crown className="w-4 h-4" />
                </div>
                <p className="text-xs font-semibold text-[#1A1A1A]">Dokter Sp.DVE</p>
                <p className="text-[11px] text-gray-500">Praktik Dokter Spesialis</p>
              </div>
            </div>

          </div>

          {/* Right Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Image Frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=1000"
                  alt="Attaya Rose Gold Cell Revival Serum"
                  className="w-full h-[420px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Overlay Text */}
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-[10px] tracking-widest text-[#D4AF37] uppercase font-bold">FLAGSHIP EDITION</span>
                  <h3 className="font-serif-luxe text-xl font-medium">Attaya Rose Gold Cell Revival Serum</h3>
                  <p className="text-xs text-gray-200">Rp 1.850.000 • 24K Pure Gold Flakes</p>
                </div>
              </div>

              {/* Floating Badge 1 - AI Skin Diagnostic */}
              <div className="absolute -top-4 -left-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-[#D4AF37]/40 shadow-xl flex items-center space-x-3 hidden sm:flex">
                <div className="w-10 h-10 rounded-lg bg-gold-gradient flex items-center justify-center text-white">
                  <Sparkles className="w-5 h-5 animate-spin-slow" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1A1A1A]">Gemini AI Skin Vision</p>
                  <p className="text-[10px] text-gray-500">Analisis presisi 5 detik</p>
                </div>
              </div>

              {/* Floating Badge 2 - Best Treatment */}
              <div className="absolute -bottom-6 -right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-[#B76E79]/40 shadow-xl flex items-center space-x-3 hidden sm:flex">
                <div className="w-10 h-10 rounded-lg bg-rose-gold-gradient flex items-center justify-center text-white">
                  <Crown className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1A1A1A]">Diamond Microdermabrasion</p>
                  <p className="text-[10px] text-gray-500">Flagship Klinik Alun-Alun Blora</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
