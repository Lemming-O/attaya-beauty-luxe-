import React from 'react';
import { X, MapPin, Phone, Clock, Navigation, ExternalLink, Sparkles, MessageCircle, Calendar } from 'lucide-react';

interface BloraPinMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookClinic?: () => void;
}

export const BloraPinMapModal: React.FC<BloraPinMapModalProps> = ({
  isOpen,
  onClose,
  onBookClinic,
}) => {
  if (!isOpen) return null;

  const bloraAddress = 'Jl. Pemuda No. 45, Kompleks Alun-Alun Kota Blora, Jawa Tengah 58215';
  const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Alun+Alun+Blora';
  const waUrl = 'https://wa.me/6281234567890?text=Halo%20Attaya%20Beauty%20Luxe%20Blora,%20saya%20ingin%20tanya%20lokasi%20klinik';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-[#D4AF37]/50 shadow-2xl relative overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#141414] via-[#2A2415] to-[#141414] text-white p-6 relative border-b border-[#D4AF37]/30">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-gray-400 hover:text-white rounded-full transition-colors bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="p-3 bg-[#FAF3E0]/10 rounded-2xl text-[#D4AF37] border border-[#D4AF37]/30">
              <MapPin className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 bg-[#D4AF37] text-[#1A1A1A] font-bold text-[10px] rounded-full uppercase tracking-wider">
                  PUSAT TERLENGKAP DI BLORA
                </span>
              </div>
              <h3 className="font-serif-luxe text-2xl font-bold text-[#D4AF37] mt-0.5">
                Klinik & Butik Attaya Luxe Blora
              </h3>
              <p className="text-xs text-gray-300">Pusat Perawatan Kecantikan & Skincare 24K Gold Terlengkap di Kabupaten Blora</p>
            </div>
          </div>
        </div>

        {/* Visual Simulated Map Interface */}
        <div className="relative w-full h-64 bg-slate-900 overflow-hidden flex items-center justify-center border-b border-gray-200 group">
          {/* Map Grid Background Simulation */}
          <div 
            className="absolute inset-0 opacity-40 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px]"
          />
          
          {/* Stylized Simulated Map Road Lines */}
          <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="120" x2="600" y2="120" stroke="#D4AF37" strokeWidth="6" />
            <line x1="280" y1="0" x2="280" y2="300" stroke="#D4AF37" strokeWidth="6" />
            <circle cx="280" cy="120" r="45" fill="none" stroke="#D4AF37" strokeWidth="2" strokeDasharray="4 4" />
          </svg>

          {/* Map Card Preview Overlay */}
          <div className="relative z-10 bg-white/95 backdrop-blur-md p-4 rounded-2xl border-2 border-[#D4AF37] shadow-2xl max-w-sm text-center space-y-2 transform group-hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 bg-gold-gradient rounded-full flex items-center justify-center text-white mx-auto shadow-lg ring-4 ring-amber-100">
              <MapPin className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] text-[#8C6B1F] font-extrabold uppercase tracking-widest block">FLAGSHIP STORE & CLINIC</span>
              <h4 className="font-serif-luxe text-base font-bold text-[#1A1A1A]">Attaya Beauty Luxe Blora</h4>
              <p className="text-xs text-gray-600 font-medium">{bloraAddress}</p>
            </div>
            <div className="pt-1 flex items-center justify-center space-x-2 text-[10px] text-emerald-700 font-bold bg-emerald-50 py-1 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Buka Hari Ini: 08.00 - 21.00 WIB</span>
            </div>
          </div>

          {/* Map Coordinates Badge */}
          <div className="absolute bottom-3 right-3 bg-black/80 text-white px-3 py-1 rounded-full text-[10px] font-mono border border-white/20">
            Lat: 7.0006° S, Long: 111.4187° E (Alun-Alun Blora)
          </div>
        </div>

        {/* Info & Action Buttons */}
        <div className="p-6 bg-[#FAF8F5] space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            
            <div className="bg-white p-3.5 rounded-2xl border border-[#EADEC9] space-y-1">
              <div className="flex items-center space-x-2 text-[#8C6B1F] font-bold">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <span>Alamat Lengkap Blora</span>
              </div>
              <p className="text-gray-600 leading-relaxed font-medium">
                Jl. Pemuda No. 45 (Depan Alun-Alun Kota Blora), Kec. Blora, Kabupaten Blora, Jawa Tengah 58215
              </p>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-[#EADEC9] space-y-1">
              <div className="flex items-center space-x-2 text-[#8C6B1F] font-bold">
                <Clock className="w-4 h-4 text-[#D4AF37]" />
                <span>Jam Operasional & Layanan</span>
              </div>
              <p className="text-gray-600 leading-relaxed font-medium">
                Senin - Minggu: 08.00 - 21.00 WIB<br />
                Dokter Spesialis Sp.DVE Standby Setiap Hari
              </p>
            </div>

          </div>

          {/* Action CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 bg-[#141414] hover:bg-black text-[#D4AF37] font-bold rounded-xl text-xs shadow-md flex items-center justify-center space-x-2 border border-[#D4AF37]/40 transition-transform hover:scale-102"
            >
              <Navigation className="w-4 h-4 text-[#D4AF37]" />
              <span>Petunjuk Rute Maps</span>
            </a>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md flex items-center justify-center space-x-2 transition-transform hover:scale-102"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp CS Blora</span>
            </a>

            {onBookClinic && (
              <button
                onClick={() => {
                  onClose();
                  onBookClinic();
                }}
                className="py-3 px-4 bg-gold-gradient text-white font-bold rounded-xl text-xs shadow-md flex items-center justify-center space-x-2 transition-transform hover:scale-102"
              >
                <Calendar className="w-4 h-4" />
                <span>Reservasi Klinik Blora</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
