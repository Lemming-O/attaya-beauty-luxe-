import React, { useState, useEffect } from 'react';
import { MessageCircle, Send, ArrowUp, Sparkles, X, Menu, PhoneCall, ShieldCheck } from 'lucide-react';

interface FloatingSpeedDialProps {
  onOpenLiveChat: () => void;
}

export const FloatingSpeedDial: React.FC<FloatingSpeedDialProps> = ({ onOpenLiveChat }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end space-y-3 pointer-events-auto">
      {/* Expanded Menu Options */}
      {isExpanded && (
        <div className="flex flex-col items-end space-y-2.5 animate-fade-in">
          {/* Scroll To Top */}
          {showScrollTop && (
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 bg-white text-[#1A1A1A] px-3 py-2 rounded-full border border-gray-200 shadow-xl hover:bg-gray-100 transition-all text-xs font-bold"
              title="Kembali ke atas"
            >
              <span>Ke Atas</span>
              <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
                <ArrowUp className="w-4 h-4 text-gray-800" />
              </div>
            </button>
          )}

          {/* Telegram Channel */}
          <a
            href="https://t.me/attayaluxe_blora"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-[#0088cc] text-white px-3.5 py-2 rounded-full shadow-xl hover:bg-[#0077b5] transition-all text-xs font-bold"
            title="Telegram VIP Channel Attaya Luxe Blora"
          >
            <span>Telegram Channel VIP</span>
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
              <Send className="w-4 h-4 text-white" />
            </div>
          </a>

          {/* WhatsApp CS Live */}
          <a
            href="https://wa.me/6281234567890?text=Halo%20CS%20Attaya%20Beauty%20Luxe%20Blora,%20saya%20ingin%20konsultasi%20skincare%2Fbooking%20klinik"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-emerald-600 text-white px-3.5 py-2 rounded-full shadow-xl hover:bg-emerald-700 transition-all text-xs font-bold"
            title="WhatsApp CS Resmi Blora 24/7"
          >
            <span>WhatsApp CS Blora</span>
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
          </a>

          {/* AI Concierge Chat */}
          <button
            onClick={() => {
              setIsExpanded(false);
              onOpenLiveChat();
            }}
            className="flex items-center space-x-2 bg-gradient-to-r from-[#141414] via-[#2A2415] to-[#141414] text-[#D4AF37] px-4 py-2.5 rounded-full border border-[#D4AF37] shadow-xl hover:scale-102 transition-all text-xs font-bold"
            title="Tanya dr. Aurelia AI Concierge"
          >
            <span>AI Beauty Concierge</span>
            <div className="w-7 h-7 rounded-full bg-gold-gradient flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
          </button>
        </div>
      )}

      {/* Main Trigger Floating Speed Dial Button */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`p-3.5 sm:px-5 sm:py-3.5 rounded-full border shadow-2xl transition-all transform hover:scale-105 flex items-center space-x-2 font-bold text-xs ${
            isExpanded
              ? 'bg-rose-600 text-white border-rose-400'
              : 'bg-[#141414] text-[#D4AF37] border-[#D4AF37] hover:bg-black'
          }`}
        >
          {isExpanded ? (
            <>
              <X className="w-5 h-5 text-white" />
              <span className="hidden sm:inline">Tutup Menu</span>
            </>
          ) : (
            <>
              <div className="relative flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#D4AF37] animate-spin-slow" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-black"></span>
              </div>
              <span className="hidden sm:inline">CS & AI Assistant</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
