import React, { useState } from 'react';
import { Sparkles, MapPin, Phone, Mail, Instagram, Facebook, Award, CheckCircle2, ShieldCheck, MessageCircle, Send, ShoppingBag, ExternalLink } from 'lucide-react';

interface FooterProps {
  onOpenMap?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenMap }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#141414] text-[#E5E0D8] pt-16 pb-12 border-t border-[#D4AF37]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Guarantee Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 mb-12 border-b border-gray-800 text-center md:text-left">
          <div className="flex items-center space-x-4 bg-[#1E1E1E] p-4 rounded-xl border border-[#D4AF37]/20">
            <div className="p-3 bg-[#FAF3E0]/10 rounded-full text-[#D4AF37]">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif-luxe text-lg text-white font-medium">100% Autentik & BPOM Verified</h4>
              <p className="text-xs text-gray-400">Seluruh kosmetik & racikan serum teruji klinis dan resmi terdaftar.</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 bg-[#1E1E1E] p-4 rounded-xl border border-[#D4AF37]/20">
            <div className="p-3 bg-[#FAF3E0]/10 rounded-full text-[#D4AF37]">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif-luxe text-lg text-white font-medium">Teknologi Gemini AI Diagnostic</h4>
              <p className="text-xs text-gray-400">Rekomendasi skincare presisi tinggi berdasarkan AI vision & kuis dermatologi.</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 bg-[#1E1E1E] p-4 rounded-xl border border-[#D4AF37]/20">
            <div className="p-3 bg-[#FAF3E0]/10 rounded-full text-[#D4AF37]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif-luxe text-lg text-white font-medium">Luxe Flagship Clinic</h4>
              <p className="text-xs text-gray-400">Perawatan estetika ditangani langsung oleh Dokter Spesialis Kulit (Sp.DVE).</p>
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="inline-block">
              <span className="font-serif-luxe text-3xl tracking-widest text-[#D4AF37] font-semibold">ATTAYA</span>
              <p className="text-[10px] tracking-[0.3em] text-gray-400 uppercase">BEAUTY LUXE • CLINIQUE</p>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed pr-4">
              Pionir platform kecantikan mewah berbasis AI & klinik estetika terdepan di Indonesia. Kami menghadirkan kemewahan kosmetik 24K Gold, parfum berkelas dunia, dan reservasi medis perawatan wajah.
            </p>
            
            {/* Newsletter Subscription */}
            <div className="pt-2">
              <p className="text-xs text-[#D4AF37] font-medium mb-2">Berlangganan Newsletter Undangan VIP Attaya</p>
              {subscribed ? (
                <div className="flex items-center space-x-2 text-xs text-emerald-400 bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-500/30">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Terima kasih! Undangan VIP & promo eksklusif telah dikirim.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-md">
                  <input
                    type="email"
                    required
                    placeholder="Masukkan alamat email Anda..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#1E1E1E] text-white text-xs px-4 py-2.5 rounded-l-lg border border-gray-700 focus:outline-none focus:border-[#D4AF37]"
                  />
                  <button
                    type="submit"
                    className="bg-gold-gradient text-white text-xs px-5 py-2.5 rounded-r-lg font-semibold hover:opacity-95 transition-opacity whitespace-nowrap"
                  >
                    Gabung VIP
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Nav Links */}
          <div>
            <h5 className="font-serif-luxe text-base text-[#D4AF37] font-medium mb-4">Koleksi Produk</h5>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li><a href="#products" className="hover:text-white transition-colors">Skincare Anti-Aging 24K</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Parfum Imperial Oud</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Cosmetics Silk Velvet</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Sunscreen & Face Mist</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Botanical Cleansing Series</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-serif-luxe text-base text-[#D4AF37] font-medium mb-4">Klinik Estetika</h5>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li><a href="#clinic" className="hover:text-white transition-colors">Diamond Microdermabrasion</a></li>
              <li><a href="#clinic" className="hover:text-white transition-colors">Pico Sure Gold Laser</a></li>
              <li><a href="#clinic" className="hover:text-white transition-colors">Clear Pore Acne Therapy</a></li>
              <li><a href="#clinic" className="hover:text-white transition-colors">Rose Quartz Hydra-Glow</a></li>
              <li><a href="#clinic" className="hover:text-white transition-colors">Jadwal Praktik Dokter Sp.DVE</a></li>
            </ul>
          </div>

          {/* Contact & Address */}
          <div>
            <h5 className="font-serif-luxe text-base text-[#D4AF37] font-medium mb-4">Butik & Klinik Terlengkap Blora</h5>
            <div className="space-y-3 text-xs text-gray-400">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span>Jl. Pemuda No. 45, Alun-Alun Blora, Kabupaten Blora, Jawa Tengah 58215</span>
                  {onOpenMap && (
                    <button
                      onClick={onOpenMap}
                      className="block text-[#D4AF37] hover:underline font-bold text-[11px] mt-1"
                    >
                      📍 Lihat Pin Map Interaktif Blora →
                    </button>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>+62 812-3456-7890 (CS Blora)</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>blora@attayabeauty.com</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-3">
                <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#1E1E1E] border border-emerald-500/30 rounded-xl text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all flex items-center space-x-1 text-[11px] font-bold" title="WhatsApp CS Blora">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WA CS</span>
                </a>
                <a href="https://t.me/attayaluxe_blora" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#1E1E1E] border border-sky-500/30 rounded-xl text-sky-400 hover:bg-sky-600 hover:text-white transition-all flex items-center space-x-1 text-[11px] font-bold" title="Telegram Channel VIP">
                  <Send className="w-3.5 h-3.5" />
                  <span>Telegram</span>
                </a>
                <a href="https://tiktok.com/@attayabeautyluxe" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#1E1E1E] border border-rose-500/30 rounded-xl text-rose-400 hover:bg-rose-600 hover:text-white transition-all flex items-center space-x-1 text-[11px] font-bold" title="TikTok Official Store">
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>TikTok Shop</span>
                </a>
                <a href="https://shopee.co.id/attaya_beauty_luxe" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#1E1E1E] border border-amber-500/30 rounded-xl text-amber-400 hover:bg-amber-600 hover:text-white transition-all flex items-center space-x-1 text-[11px] font-bold" title="Shopee Official Mall">
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Shopee</span>
                </a>
                <a href="https://tokopedia.com/attayaluxe" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#1E1E1E] border border-emerald-500/30 rounded-xl text-emerald-300 hover:bg-emerald-700 hover:text-white transition-all flex items-center space-x-1 text-[11px] font-bold" title="Tokopedia Official Store">
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Tokopedia</span>
                </a>
                <a href="https://instagram.com/attayabeautyluxe" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#1E1E1E] rounded-xl text-gray-300 hover:text-[#D4AF37] transition-colors" title="Instagram Official">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://facebook.com/attayabeautyluxe" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#1E1E1E] rounded-xl text-gray-300 hover:text-[#D4AF37] transition-colors" title="Facebook Official">
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 space-y-4 sm:space-y-0">
          <p>© 2026 ATTAYA BEAUTY LUXE. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex space-x-6">
            <a href="#privacy" className="hover:text-gray-300">Kebijakan Privasi</a>
            <a href="#terms" className="hover:text-gray-300">Syarat & Ketentuan</a>
            <a href="#bpom" className="hover:text-gray-300">Sertifikasi BPOM</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
