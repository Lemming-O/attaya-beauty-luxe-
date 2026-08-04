import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, MessageSquare, X, Send, Bot, User, Crown, MapPin, PhoneCall } from 'lucide-react';
import { Product, ClinicTreatment, LiveChatMessage } from '../types';
import { askAttayaAIConcierge } from '../services/aiService';
import { storageService } from '../services/storageService';

interface AIConciergeWidgetProps {
  products: Product[];
  treatments: ClinicTreatment[];
  onOpenMap?: () => void;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  message: string;
  time: string;
}

export const AIConciergeWidget: React.FC<AIConciergeWidgetProps> = ({
  products,
  treatments,
  onOpenMap,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      role: 'model',
      message: 'Salam hangat dari Attaya Beauty Luxe Blora! Saya dr. Aurelia AI Concierge. Ada yang bisa saya bantu tentang produk skincare terlengkap di Blora, lokasi klinik Alun-Alun Blora, atau promo toko?',
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isOpen]);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || loading) return;

    const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      message: textToSend,
      time: timeStr
    };

    const newHist = [...history, userMsg];
    setHistory(newHist);
    setInputQuery('');
    setLoading(true);

    // Save user chat to storage for admin monitoring
    const liveLogs = storageService.getLiveChats();
    liveLogs.push({
      id: userMsg.id,
      senderName: 'Pelanggan Blora',
      senderRole: 'user',
      message: textToSend,
      timestamp: `${timeStr} WIB`,
    });
    storageService.saveLiveChats(liveLogs);

    try {
      const responseText = await askAttayaAIConcierge(
        textToSend,
        history.map(h => ({ role: h.role, message: h.message })),
        products,
        treatments
      );

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        message: responseText,
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      };

      setHistory([...newHist, botMsg]);

      // Save AI reply to storage
      const updatedLogs = storageService.getLiveChats();
      updatedLogs.push({
        id: botMsg.id,
        senderName: 'dr. Aurelia AI / Admin',
        senderRole: 'ai',
        message: responseText,
        timestamp: `${botMsg.time} WIB`,
      });
      storageService.saveLiveChats(updatedLogs);
    } catch (err) {
      console.error('Chat error', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      
      {/* Floating Speed Dial & Chat Trigger */}
      <div className="flex flex-col items-end space-y-2.5">
        {/* Speed Dial Menu when closed */}
        {!isOpen && (
          <div className="flex flex-col items-end space-y-2 mb-1">
            {/* Scroll To Top Button */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-2.5 bg-white text-gray-800 rounded-full border border-gray-200 shadow-lg hover:bg-gray-100 transition-all text-xs font-bold flex items-center justify-center"
              title="Kembali ke Atas"
            >
              <PhoneCall className="w-4 h-4 text-gray-700 rotate-180 hidden" />
              <span className="text-[11px] font-bold px-1 font-mono">↑ Top</span>
            </button>

            {/* Telegram VIP Channel */}
            <a
              href="https://t.me/attayaluxe_blora"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-[#0088cc] text-white rounded-full shadow-lg hover:bg-[#0077b5] transition-all flex items-center space-x-1 text-xs font-bold"
              title="Telegram VIP Channel Attaya Luxe Blora"
            >
              <Send className="w-4 h-4" />
              <span className="hidden md:inline pr-1 text-[11px]">Telegram</span>
            </a>

            {/* WhatsApp CS Live */}
            <a
              href="https://wa.me/6281234567890?text=Halo%20CS%20Attaya%20Beauty%20Luxe%20Blora,%20saya%20ingin%20konsultasi%20skincare%2Fbooking%20klinik"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 transition-all flex items-center space-x-1 text-xs font-bold"
              title="WhatsApp CS Resmi Blora 24/7"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="hidden md:inline pr-1 text-[11px]">WhatsApp CS</span>
            </a>
          </div>
        )}

        {/* Primary AI Live Chat Trigger */}
        {isOpen ? (
          <div className="bg-white rounded-3xl border border-[#D4AF37]/40 shadow-2xl w-[90vw] sm:w-[380px] h-[520px] flex flex-col overflow-hidden animate-fade-in">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#141414] via-[#242424] to-[#141414] text-white p-4 flex items-center justify-between border-b border-[#D4AF37]/30">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center text-white shadow-xs">
                  <Crown className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif-luxe text-base font-bold text-[#D4AF37]">Aurelia AI Concierge</h4>
                  <div className="flex items-center space-x-1.5 text-[10px] text-gray-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Live Chat & Auto Reply Online</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-gray-400 hover:text-white rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages List */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FAF8F5]">
              {history.map((item) => (
                <div
                  key={item.id}
                  className={`flex flex-col ${item.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                      item.role === 'user'
                        ? 'bg-[#141414] text-white rounded-tr-none'
                        : 'bg-white border border-[#EADEC9] text-[#1A1A1A] rounded-tl-none shadow-xs'
                    }`}
                  >
                    <p className="whitespace-pre-line">{item.message}</p>
                  </div>
                  <span className="text-[9px] text-gray-400 mt-1 px-1">{item.time}</span>
                </div>
              ))}

              {loading && (
                <div className="flex items-center space-x-2 text-xs text-[#8C6B1F] bg-[#FAF3E0] p-3 rounded-2xl w-fit border border-[#D4AF37]/30">
                  <Sparkles className="w-4 h-4 animate-spin text-[#D4AF37]" />
                  <span>Aurelia sedang mengetik rekomendasi...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Starter Chips */}
            <div className="px-3 py-2 bg-white border-t border-gray-100 flex overflow-x-auto gap-1.5 text-[11px] no-scrollbar">
              {onOpenMap && (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenMap();
                  }}
                  className="px-2.5 py-1 bg-[#141414] text-[#D4AF37] font-bold rounded-full whitespace-nowrap border border-[#D4AF37]/40 flex items-center space-x-1"
                >
                  <MapPin className="w-3 h-3 text-[#D4AF37]" />
                  <span>📍 PinMap Blora</span>
                </button>
              )}
              <button
                onClick={() => handleSend('Dimana lokasi klinik kecantikan terlengkap di Blora?')}
                className="px-2.5 py-1 bg-[#FAF3E0] text-[#8C6B1F] rounded-full whitespace-nowrap border border-[#D4AF37]/30 hover:bg-[#D4AF37] hover:text-white transition-colors font-medium"
              >
                📍 Lokasi Alun-Alun Blora
              </button>
              <button
                onClick={() => handleSend('Rekomendasi Serum 24K Gold Terlengkap')}
                className="px-2.5 py-1 bg-[#FAF3E0] text-[#8C6B1F] rounded-full whitespace-nowrap border border-[#D4AF37]/30 hover:bg-[#D4AF37] hover:text-white transition-colors"
              >
                Serum 24K Gold
              </button>
              <button
                onClick={() => handleSend('Jadwal dokter spesialis klinik Blora')}
                className="px-2.5 py-1 bg-[#FAF3E0] text-[#8C6B1F] rounded-full whitespace-nowrap border border-[#D4AF37]/30 hover:bg-[#D4AF37] hover:text-white transition-colors"
              >
                Dokter Klinik Blora
              </button>
              <button
                onClick={() => handleSend('Treatment Klinik Terfavorit')}
                className="px-2.5 py-1 bg-[#FAF3E0] text-[#8C6B1F] rounded-full whitespace-nowrap border border-[#D4AF37]/30 hover:bg-[#D4AF37] hover:text-white transition-colors"
              >
                Treatment Klinik
              </button>
              <button
                onClick={() => handleSend('Rekomendasi Parfum Mewah')}
                className="px-2.5 py-1 bg-[#FAF3E0] text-[#8C6B1F] rounded-full whitespace-nowrap border border-[#D4AF37]/30 hover:bg-[#D4AF37] hover:text-white transition-colors"
              >
                Parfum Oud
              </button>
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="p-3 bg-white border-t border-[#EADEC9] flex items-center space-x-2"
            >
              <input
                type="text"
                placeholder="Tulis pertanyaan ke Aurelia AI..."
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                className="flex-1 bg-[#FAF8F5] border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37]"
              />
              <button
                type="submit"
                disabled={loading || !inputQuery.trim()}
                className="p-2.5 bg-gold-gradient text-white rounded-xl hover:opacity-95 transition-opacity disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>
        ) : (
          /* Floating Main Trigger */
          <button
            onClick={() => setIsOpen(true)}
            className="group flex items-center space-x-3 bg-[#141414] text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full border border-[#D4AF37] shadow-2xl hover:bg-black transition-all transform hover:scale-105"
          >
            <div className="relative">
              <Sparkles className="w-5 h-5 text-[#D4AF37] animate-spin-slow" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-black"></span>
            </div>
            <span className="hidden sm:inline text-xs font-semibold tracking-wide text-gray-100">
              AI Live Chat Concierge
            </span>
          </button>
        )}
      </div>

    </div>
  );
};
