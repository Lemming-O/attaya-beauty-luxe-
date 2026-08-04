import React from 'react';
import { X, Crown, Award, Calendar, ShoppingBag, User, Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { UserProfile, TreatmentBooking, Order } from '../types';

interface UserAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  bookings: TreatmentBooking[];
  orders: Order[];
}

export const UserAccountModal: React.FC<UserAccountModalProps> = ({
  isOpen,
  onClose,
  user,
  bookings,
  orders,
}) => {
  if (!isOpen) return null;

  const formatIDR = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-[#D4AF37]/30 shadow-2xl relative p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Member Header Banner */}
        <div className="bg-gradient-to-r from-[#141414] via-[#242424] to-[#141414] text-white p-6 rounded-2xl border border-[#D4AF37]/40 relative overflow-hidden flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <img
            src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'}
            alt={user.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-[#D4AF37] shadow-md"
          />

          <div className="space-y-1 text-center sm:text-left flex-1">
            <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 bg-[#FAF3E0]/10 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-bold rounded-full">
              <Crown className="w-3.5 h-3.5" />
              <span>{user.tier} Member</span>
            </div>
            <h3 className="font-serif-luxe text-2xl font-bold text-white">{user.name}</h3>
            <p className="text-xs text-gray-400">{user.email} • {user.phone}</p>
          </div>

          <div className="bg-white/5 border border-[#D4AF37]/30 p-3.5 rounded-xl text-center shrink-0">
            <span className="text-[10px] text-[#D4AF37] uppercase font-bold block">Poin Rewards VIP</span>
            <span className="font-serif-luxe text-2xl font-bold text-white">{user.points.toLocaleString('id-ID')}</span>
            <span className="text-[10px] text-gray-400 block">Pts</span>
          </div>
        </div>

        {/* User Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Recent Clinic Bookings */}
          <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#EADEC9] space-y-3">
            <div className="flex items-center space-x-2 text-[#8C6B1F]">
              <Calendar className="w-4 h-4 text-[#D4AF37]" />
              <h4 className="font-serif-luxe text-base font-bold text-[#1A1A1A]">Jadwal Treatment Klinik ({bookings.length})</h4>
            </div>

            {bookings.length === 0 ? (
              <p className="text-xs text-gray-500 py-4 text-center">Belum ada reservasi treatment aktif.</p>
            ) : (
              <div className="space-y-2.5">
                {bookings.map((b) => (
                  <div key={b.id} className="bg-white p-3.5 rounded-xl border border-gray-200 text-xs space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-mono font-bold text-[#8C6B1F] text-[10px]">{b.bookingNumber}</span>
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full">{b.status}</span>
                    </div>
                    <h5 className="font-bold text-[#1A1A1A] line-clamp-1">{b.treatmentTitle}</h5>
                    <p className="text-gray-500">{b.date} • {b.timeSlot}</p>
                    <p className="text-gray-400 text-[10px]">Dokter: {b.therapist}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order History */}
          <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#EADEC9] space-y-3">
            <div className="flex items-center space-x-2 text-[#8C6B1F]">
              <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
              <h4 className="font-serif-luxe text-base font-bold text-[#1A1A1A]">Riwayat Pembelian Skincare ({orders.length})</h4>
            </div>

            {orders.length === 0 ? (
              <p className="text-xs text-gray-500 py-4 text-center">Belum ada riwayat pesanan.</p>
            ) : (
              <div className="space-y-2.5">
                {orders.map((o) => (
                  <div key={o.id} className="bg-white p-3.5 rounded-xl border border-gray-200 text-xs space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="font-mono font-bold text-[#8C6B1F] text-[10px]">{o.orderNumber}</span>
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                        o.status === 'Dikirim' ? 'bg-amber-100 text-amber-800' :
                        o.status === 'Selesai' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {o.status}
                      </span>
                    </div>
                    <p className="font-medium text-[#1A1A1A] line-clamp-1">{o.items.map(i => i.product.name).join(', ')}</p>
                    
                    {o.trackingNumber && (
                      <div className="bg-amber-50 p-2 rounded-lg border border-amber-200 text-[11px] flex justify-between items-center">
                        <span className="text-amber-900 font-medium">📦 Nomor Resi Kurir:</span>
                        <span className="font-mono font-bold text-amber-950 bg-white px-2 py-0.5 rounded border border-amber-300">{o.trackingNumber}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-gray-500 pt-0.5 text-[11px]">
                      <span>Metode: <strong className="text-gray-800">{o.paymentMethod}</strong></span>
                      <span>Total: <strong className="text-[#8C6B1F]">{formatIDR(o.grandTotal)}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Benefits & Tier Perks */}
        <div className="bg-[#FAF3E0]/40 p-4 rounded-xl border border-[#D4AF37]/30 text-xs text-gray-700 space-y-1.5">
          <span className="font-bold text-[#8C6B1F] flex items-center space-x-1">
            <Crown className="w-4 h-4 text-[#D4AF37]" />
            <span>Hak Istimewa Keanggotaan {user.tier}:</span>
          </span>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-gray-600 list-disc list-inside">
            <li>Diskon 10% setiap transaksi dengan voucher LUXE10</li>
            <li>Prioritas slot reservasi dokter spesialis Sp.DVE</li>
            <li>Konsultasi tak terbatas dengan Gemini AI Skin Advisor</li>
            <li>Undangan VIP Private Gathering & Product Launch</li>
          </ul>
        </div>

      </div>
    </div>
  );
};
