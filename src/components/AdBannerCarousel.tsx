import React, { useState, useEffect } from 'react';
import { Sparkles, ExternalLink, ChevronLeft, ChevronRight, ShoppingBag, Tag, Radio } from 'lucide-react';
import { AdBanner } from '../types';

interface AdBannerCarouselProps {
  banners: AdBanner[];
  onSelectBanner?: (banner: AdBanner) => void;
}

export const AdBannerCarousel: React.FC<AdBannerCarouselProps> = ({ banners, onSelectBanner }) => {
  const activeBanners = banners.filter(b => b.isActive);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (activeBanners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeBanners.length]);

  if (activeBanners.length === 0) return null;

  const currentBanner = activeBanners[currentIndex];

  const getPlatformIcon = (platform: AdBanner['platform']) => {
    switch (platform) {
      case 'Shopee':
        return <span className="px-2 py-0.5 bg-[#EE4D2D] text-white font-bold text-[10px] rounded-md shadow-xs flex items-center space-x-1"><span>🛒</span><span>Shopee Mall</span></span>;
      case 'TikTok':
        return <span className="px-2 py-0.5 bg-black text-[#25F4EE] border border-[#FE2C55]/40 font-bold text-[10px] rounded-md shadow-xs flex items-center space-x-1"><span>🎵</span><span>TikTok Shop LIVE</span></span>;
      case 'Tokopedia':
        return <span className="px-2 py-0.5 bg-[#03AC0E] text-white font-bold text-[10px] rounded-md shadow-xs flex items-center space-x-1"><span>🟢</span><span>Tokopedia Official</span></span>;
      default:
        return <span className="px-2 py-0.5 bg-[#141414] text-[#D4AF37] border border-[#D4AF37]/30 font-bold text-[10px] rounded-md shadow-xs flex items-center space-x-1"><Sparkles className="w-3 h-3 mr-0.5" /><span>Luxe Special Promo</span></span>;
    }
  };

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-[#D4AF37]/30 shadow-xl bg-[#141414] group">
      {/* Banner Card Content */}
      <div className={`relative min-h-[220px] sm:min-h-[260px] bg-gradient-to-r ${currentBanner.bgGradient} p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-700`}>
        
        {/* Left Copy & CTA */}
        <div className="space-y-3 z-10 text-white max-w-xl text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold tracking-wider uppercase rounded-full border border-white/30">
              {currentBanner.badge}
            </span>
            {getPlatformIcon(currentBanner.platform)}
          </div>

          <h2 className="font-serif-luxe text-2xl sm:text-4xl font-bold text-white leading-tight drop-shadow-md">
            {currentBanner.title}
          </h2>

          <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium">
            {currentBanner.subtitle}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
            {currentBanner.targetUrl.startsWith('http') ? (
              <a
                href={currentBanner.targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-white text-[#1A1A1A] hover:bg-amber-50 font-bold rounded-xl text-xs shadow-lg flex items-center space-x-2 transition-transform hover:scale-105"
              >
                <span>{currentBanner.ctaText}</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
              </a>
            ) : (
              <button
                onClick={() => onSelectBanner && onSelectBanner(currentBanner)}
                className="px-5 py-2.5 bg-white text-[#1A1A1A] hover:bg-amber-50 font-bold rounded-xl text-xs shadow-lg flex items-center space-x-2 transition-transform hover:scale-105"
              >
                <span>{currentBanner.ctaText}</span>
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              </button>
            )}
            <span className="text-[10px] text-white/80 font-mono">*Syarat & Ketentuan Berlaku</span>
          </div>
        </div>

        {/* Right Image Graphic */}
        <div className="relative shrink-0 w-36 h-36 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-2 border-white/30 shadow-2xl z-10">
          <img
            src={currentBanner.image}
            alt={currentBanner.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>

      </div>

      {/* Slide Navigation Buttons */}
      {activeBanners.length > 1 && (
        <>
          <button
            onClick={() => setCurrentIndex((prev) => (prev === 0 ? activeBanners.length - 1 : prev - 1))}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/40 hover:bg-black/70 text-white rounded-full transition-colors backdrop-blur-xs opacity-80 hover:opacity-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % activeBanners.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/40 hover:bg-black/70 text-white rounded-full transition-colors backdrop-blur-xs opacity-80 hover:opacity-100"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex space-x-1.5">
            {activeBanners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  currentIndex === idx ? 'w-6 bg-white' : 'w-2 bg-white/40'
                }`}
              />
            ))}
          </div>
        </>
      )}

    </div>
  );
};
