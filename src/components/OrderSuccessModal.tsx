import React, { useState } from 'react';
import { 
  CheckCircle2, X, Truck, Package, Copy, Check, Printer, ArrowRight,
  MapPin, Clock, ShieldCheck, Sparkles, ShoppingBag, ExternalLink, RefreshCw
} from 'lucide-react';
import { Order } from '../types';

interface OrderSuccessModalProps {
  order: Order | null;
  onClose: () => void;
  onOpenTrackingHistory?: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onClose,
  onOpenTrackingHistory
}) => {
  if (!order) return null;

  const [copiedResi, setCopiedResi] = useState(false);
  const [activeView, setActiveView] = useState<'summary' | 'tracking'>('summary');

  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleCopyResi = () => {
    if (order.trackingNumber) {
      navigator.clipboard.writeText(order.trackingNumber);
      setCopiedResi(true);
      setTimeout(() => setCopiedResi(false), 2000);
    }
  };

  const trackingSteps = [
    {
      title: 'Pesanan Berhasil Dibuat & Lunas',
      time: new Date(order.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      desc: `Pembayaran via ${order.paymentMethod} telah diverifikasi sistem SSL.`,
      status: 'completed',
    },
    {
      title: 'Dikemas oleh Apoteker Klinik Attaya Luxe Blora',
      time: 'Estimasi 1-2 Jam',
      desc: 'Sterilisasi produk, check list BPOM, & pengemasan bubble wrap premium.',
      status: 'active',
    },
    {
      title: 'Penyerahan ke Kurir Ekspres',
      time: 'Hari ini',
      desc: `Nomor Resi Otomatis: ${order.trackingNumber || 'JNE-BLR-83921012'}.`,
      status: 'pending',
    },
    {
      title: 'Dalam Pengiriman ke Alamat Tujuan',
      time: 'Est. Besok',
      desc: `${order.shippingAddress.address}, ${order.shippingAddress.city}.`,
      status: 'pending',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div 
        className="print-receipt bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-[#D4AF37]/50 shadow-2xl relative p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="no-print absolute top-4 right-4 z-20 p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
          title="Tutup Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header & Badge */}
        <div className="text-center space-y-3">
          <div className="relative inline-block">
            <div className="w-16 h-16 bg-gradient-to-tr from-emerald-500 to-teal-400 text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20 transform -rotate-3 hover:rotate-0 transition-transform">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="absolute -top-1 -right-2 bg-[#D4AF37] text-white p-1 rounded-full shadow-md animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-[#8C6B1F] uppercase tracking-widest bg-[#FAF3E0] px-3 py-1 rounded-full border border-[#D4AF37]/30">
              Transaksi Terverifikasi System
            </span>
            <h3 className="font-serif-luxe text-2xl sm:text-3xl font-bold text-[#1A1A1A] mt-2">
              Pembayaran Berhasil!
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Terima kasih telah berbelanja di <strong className="text-gray-800">Attaya Beauty Luxe Blora</strong>. Pesanan Anda langsung diproses.
            </p>
          </div>
        </div>

        {/* Tab View Selector: Order Summary vs Track Order */}
        <div className="no-print flex bg-gray-100 p-1 rounded-2xl text-xs font-semibold">
          <button
            onClick={() => setActiveView('summary')}
            className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
              activeView === 'summary'
                ? 'bg-white text-[#8C6B1F] font-bold shadow-sm border border-[#D4AF37]/30'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Ringkasan Pesanan</span>
          </button>

          <button
            onClick={() => setActiveView('tracking')}
            className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
              activeView === 'tracking'
                ? 'bg-white text-[#8C6B1F] font-bold shadow-sm border border-[#D4AF37]/30'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Truck className="w-4 h-4 text-[#D4AF37]" />
            <span>Lacak Pengiriman (Realtime)</span>
          </button>
        </div>

        {/* VIEW 1: ORDER SUMMARY */}
        {activeView === 'summary' && (
          <div className="space-y-4 text-xs animate-fade-in">
            
            {/* Meta Order Info Bar */}
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#EADEC9] grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <span className="text-[10px] text-gray-500 uppercase font-semibold block">Nomor Pesanan</span>
                <span className="font-mono font-bold text-base text-[#8C6B1F]">{order.orderNumber}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-500 uppercase font-semibold block">Tanggal Transaksi</span>
                <span className="font-semibold text-gray-800">{new Date(order.createdAt).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-[10px] text-gray-500 uppercase font-semibold block">Metode Pembayaran</span>
                <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block">
                  {order.paymentMethod}
                </span>
              </div>
            </div>

            {/* Purchased Items List */}
            <div className="border border-gray-200 rounded-2xl overflow-hidden divide-y divide-gray-100">
              <div className="bg-gray-50 px-4 py-2.5 font-bold text-gray-700 flex justify-between">
                <span>Rincian Produk ({order.items.reduce((acc, item) => acc + item.quantity, 0)} Item)</span>
                <span>Subtotal</span>
              </div>
              {order.items.map((item, idx) => (
                <div key={idx} className="p-3.5 flex items-center space-x-3 bg-white">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-12 rounded-xl object-cover border border-gray-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 line-clamp-1">{item.product.name}</p>
                    <p className="text-[11px] text-gray-500">
                      {item.quantity} x {formatIDR(item.product.price)}
                      {item.selectedShade && <span className="ml-2 text-[#8C6B1F] font-semibold">({item.selectedShade})</span>}
                    </p>
                  </div>
                  <span className="font-mono font-bold text-gray-900">
                    {formatIDR(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Delivery Address & Resi Card */}
            <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-2">
              <div className="flex items-center space-x-2 text-[#1A1A1A] font-bold">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <span>Alamat Pengiriman Blora:</span>
              </div>
              <div className="text-gray-600 pl-6 space-y-0.5 text-[11px]">
                <p className="font-semibold text-gray-900">{order.shippingAddress.fullName} ({order.shippingAddress.phone})</p>
                <p>{order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}</p>
                {order.shippingAddress.notes && <p className="italic text-gray-500">Catatan: "{order.shippingAddress.notes}"</p>}
              </div>

              {/* Automatic Tracking Resi Bar */}
              {order.trackingNumber && (
                <div className="mt-3 bg-amber-50 p-3 rounded-xl border border-amber-300 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Package className="w-4 h-4 text-[#8C6B1F]" />
                    <div>
                      <span className="text-[10px] text-amber-900 uppercase font-bold block">Nomor Resi Kurir Ekspres</span>
                      <span className="font-mono font-bold text-amber-950 text-xs">{order.trackingNumber}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyResi}
                    className="px-3 py-1.5 bg-white text-amber-900 hover:bg-amber-100 font-bold rounded-lg border border-amber-300 text-[11px] flex items-center space-x-1"
                  >
                    {copiedResi ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-amber-800" />}
                    <span>{copiedResi ? 'Tersalin!' : 'Salin Resi'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Payment Summary */}
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-1.5">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal Produk:</span>
                <span className="font-mono">{formatIDR(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Diskon Promo VIP:</span>
                  <span className="font-mono">- {formatIDR(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Ongkos Kirim (Luxe Express):</span>
                <span className="font-mono">{order.shippingFee === 0 ? 'GRATIS' : formatIDR(order.shippingFee)}</span>
              </div>
              <div className="flex justify-between items-center text-base font-bold text-[#1A1A1A] border-t pt-2 mt-1">
                <span>Total Lunas:</span>
                <span className="text-[#8C6B1F] font-mono text-lg">{formatIDR(order.grandTotal)}</span>
              </div>
            </div>

          </div>
        )}

        {/* VIEW 2: TRACK ORDER / LIVE TIMELINE */}
        {activeView === 'tracking' && (
          <div className="space-y-4 text-xs animate-fade-in">
            
            {/* Courier Info Banner */}
            <div className="bg-slate-900 text-white p-4.5 rounded-2xl border border-[#D4AF37]/40 flex justify-between items-center">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 bg-[#D4AF37] text-black font-bold text-[10px] rounded uppercase">LUXE EXPRESS BLORA</span>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase">STATUS: {order.status}</span>
                </div>
                <p className="font-serif-luxe text-base font-bold text-white mt-1">Lacak Ekspedisi Realtime</p>
                <p className="text-[11px] text-gray-300 font-mono">No. Resi: <strong className="text-[#D4AF37]">{order.trackingNumber || 'JNE-BLR-83921012'}</strong></p>
              </div>

              <button
                onClick={handleCopyResi}
                className="p-2 bg-white/10 hover:bg-white/20 text-[#D4AF37] rounded-xl border border-[#D4AF37]/30 transition-colors"
                title="Salin Resi"
              >
                {copiedResi ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>

            {/* Live Progress Timeline */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-6">
              <h4 className="font-bold text-gray-800 text-sm flex items-center space-x-2">
                <Clock className="w-4 h-4 text-[#D4AF37]" />
                <span>Timeline Pengiriman Pesanan</span>
              </h4>

              <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
                {trackingSteps.map((step, index) => (
                  <div key={index} className="relative flex items-start space-x-3">
                    <div className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      step.status === 'completed'
                        ? 'bg-emerald-600 text-white shadow-md'
                        : step.status === 'active'
                        ? 'bg-[#D4AF37] text-white ring-4 ring-[#FAF3E0] animate-pulse'
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {step.status === 'completed' ? '✓' : index + 1}
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <p className={`font-bold text-xs ${step.status === 'active' ? 'text-[#8C6B1F]' : 'text-gray-900'}`}>
                          {step.title}
                        </p>
                        <span className="text-[10px] text-gray-400 font-mono">{step.time}</span>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Recipient Info */}
            <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#EADEC9] text-[11px] text-gray-700 flex justify-between items-center">
              <div>
                <span className="font-bold block text-gray-900">Tujuan Pengiriman:</span>
                <span>{order.shippingAddress.fullName} • {order.shippingAddress.address}, {order.shippingAddress.city}</span>
              </div>
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />
            </div>

          </div>
        )}

        {/* Action Buttons Footer */}
        <div className="no-print space-y-2.5 pt-2 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Primary Track Order Button */}
            <button
              onClick={() => {
                if (activeView === 'summary') {
                  setActiveView('tracking');
                } else if (onOpenTrackingHistory) {
                  onOpenTrackingHistory();
                }
              }}
              className="py-3.5 px-4 bg-gold-gradient text-white font-bold rounded-xl text-xs shadow-lg flex items-center justify-center space-x-2 transition-transform hover:scale-101"
            >
              <Truck className="w-4 h-4" />
              <span>{activeView === 'summary' ? 'Lacak Pesanan (Track Order)' : 'Buka Riwayat Pesanan VIP'}</span>
            </button>

            {/* Print Struk PDF */}
            <button
              onClick={() => window.print()}
              className="py-3.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl text-xs flex items-center justify-center space-x-2 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Struk / Invoice PDF</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 text-gray-500 hover:text-gray-800 font-semibold text-xs transition-colors"
          >
            Tutup & Lanjut Berbelanja
          </button>
        </div>

      </div>
    </div>
  );
};
