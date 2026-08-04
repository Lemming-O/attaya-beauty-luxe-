import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, MapPin, CreditCard, Tag, ArrowRight, QrCode, Copy, Check, Printer, ExternalLink, AlertCircle } from 'lucide-react';
import { CartItem, ShippingAddress, Order } from '../types';
import { paymentService } from '../services/paymentService';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  subtotal: number;
  onCompleteOrder: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  subtotal,
  onCompleteOrder,
}) => {
  const [step, setStep] = useState<'shipping' | 'payment' | 'gateway' | 'confirmation'>('shipping');
  const [promoCode, setPromoCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [copiedVa, setCopiedVa] = useState(false);

  const [address, setAddress] = useState<ShippingAddress>({
    fullName: 'Ny. Pratiwi Kusuma',
    phone: '081298765432',
    address: 'Jl. Pemuda No. 88, Kradenan',
    city: 'Kabupaten Blora',
    postalCode: '58214',
    notes: 'Titipkan di Resepsionis Klinik / Garasi Rumah',
  });

  const [paymentMethod, setPaymentMethod] = useState<string>('Midtrans QRIS Instant');
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);
  const [snapToken, setSnapToken] = useState<string>('');
  const paymentOptions = paymentService.getSupportedPaymentMethods();

  if (!isOpen || cartItems.length === 0) return null;

  const shippingFee = subtotal > 2000000 ? 0 : 50000;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const formatIDR = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'LUXE10') {
      const disc = Math.round(subtotal * 0.1);
      setDiscountAmount(disc);
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Kode voucher tidak valid. Gunakan LUXE10 untuk diskon 10%.');
    }
  };

  const handleProceedToGateway = async (e: React.FormEvent) => {
    e.preventDefault();
    const tempOrderNo = `ATT-BLR-${Math.floor(100000 + Math.random() * 900000)}`;
    const snapResponse = await paymentService.createSnapTransaction(
      tempOrderNo,
      grandTotal,
      address,
      cartItems,
      paymentMethod
    );
    setSnapToken(snapResponse.token);
    setStep('gateway');
  };

  const handleFinalizePaymentWithStatus = (midtransStatus: 'settlement' | 'pending' | 'expire' = 'settlement') => {
    const trackingNo = `JNE-BLR-${Math.floor(10000000 + Math.random() * 90000000)}`;
    const orderNumber = `ATT-BLR-${Math.floor(100000 + Math.random() * 900000)}`;
    const paymentStatus: Order['paymentStatus'] = midtransStatus === 'settlement' ? 'paid' : midtransStatus === 'pending' ? 'pending' : 'failed';
    const invoiceNumber = paymentService.buildInvoiceNumber(orderNumber);

    const webhookResult = paymentService.processWebhookCallback(`ord-${Date.now()}`, midtransStatus);
    let orderStatus: Order['status'] = webhookResult.orderStatus;

    if (paymentMethod === 'COD Luxe Express') {
      orderStatus = 'Menunggu Pembayaran';
    }

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      items: cartItems,
      shippingAddress: address,
      paymentMethod,
      paymentStatus,
      invoiceNumber,
      refundStatus: 'none',
      paymentHistory: paymentService.buildPaymentHistory(orderNumber, paymentMethod, paymentStatus),
      subtotal,
      discount: discountAmount,
      shippingFee,
      grandTotal,
      status: orderStatus,
      trackingNumber: trackingNo,
      createdAt: new Date().toISOString(),
    };

    setCreatedOrder(newOrder);
    onCompleteOrder(newOrder);
    setStep('confirmation');
  };

  const handleFinalizePayment = () => {
    handleFinalizePaymentWithStatus('settlement');
  };

  const handleCopyVA = (vaText: string) => {
    navigator.clipboard.writeText(vaText);
    setCopiedVa(true);
    setTimeout(() => setCopiedVa(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#D4AF37]/50 shadow-2xl relative p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-1">
          <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest bg-[#FAF3E0] px-3 py-0.5 rounded-full border border-[#D4AF37]/30">
            Payment Gateway Terenkripsi SSL 256-Bit
          </span>
          <h3 className="font-serif-luxe text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
            Payment Gateway Attaya Luxe Blora
          </h3>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center space-x-2 text-[11px] font-semibold text-gray-500 border-b pb-4">
          <span className={step === 'shipping' ? 'text-[#8C6B1F] font-bold underline' : ''}>1. Alamat</span>
          <span>→</span>
          <span className={step === 'payment' ? 'text-[#8C6B1F] font-bold underline' : ''}>2. Metode Pembayaran</span>
          <span>→</span>
          <span className={step === 'gateway' ? 'text-[#8C6B1F] font-bold underline' : ''}>3. Gateway Transaksi</span>
          <span>→</span>
          <span className={step === 'confirmation' ? 'text-[#8C6B1F] font-bold underline' : ''}>4. Struk Digital</span>
        </div>

        {/* STEP 1: SHIPPING ADDRESS */}
        {step === 'shipping' && (
          <form onSubmit={() => setStep('payment')} className="space-y-4 text-xs">
            <h4 className="font-serif-luxe text-lg font-bold text-[#1A1A1A] flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-[#D4AF37]" />
              Detail Alamat Pengirim & Penerima Blora
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold mb-1">Nama Lengkap Penerima</label>
                <input
                  type="text"
                  required
                  value={address.fullName}
                  onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                  className="w-full border border-gray-300 p-2.5 rounded-xl text-xs focus:ring-1 focus:ring-[#D4AF37] outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Nomor Telepon / WhatsApp</label>
                <input
                  type="tel"
                  required
                  value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  className="w-full border border-gray-300 p-2.5 rounded-xl text-xs focus:ring-1 focus:ring-[#D4AF37] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1">Alamat Lengkap</label>
              <textarea
                required
                rows={2}
                value={address.address}
                onChange={(e) => setAddress({ ...address, address: e.target.value })}
                className="w-full border border-gray-300 p-2.5 rounded-xl text-xs focus:ring-1 focus:ring-[#D4AF37] outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold mb-1">Kota / Kabupaten</label>
                <input
                  type="text"
                  required
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  className="w-full border border-gray-300 p-2.5 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Kode Pos</label>
                <input
                  type="text"
                  required
                  value={address.postalCode}
                  onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                  className="w-full border border-gray-300 p-2.5 rounded-xl text-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gold-gradient text-white font-bold rounded-xl text-xs shadow-md flex items-center justify-center space-x-2 mt-4"
            >
              <span>Lanjut ke Pilih Payment Gateway</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* STEP 2: PAYMENT & PROMO */}
        {step === 'payment' && (
          <form onSubmit={handleProceedToGateway} className="space-y-4 text-xs">
            <h4 className="font-serif-luxe text-lg font-bold text-[#1A1A1A] flex items-center">
              <CreditCard className="w-4 h-4 mr-2 text-[#D4AF37]" />
              Pilih Kanal Payment Gateway
            </h4>

            {/* Promo Code Section */}
            <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#EADEC9] space-y-2">
              <label className="block font-semibold text-[#8C6B1F] flex items-center">
                <Tag className="w-3.5 h-3.5 mr-1" />
                Voucher Diskon Member VIP (Coba: LUXE10)
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Masukkan Kode Voucher..."
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 border p-2 rounded-lg text-xs uppercase font-mono"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-4 py-2 bg-[#141414] text-white rounded-lg font-bold hover:bg-black"
                >
                  Terapkan
                </button>
              </div>
              {promoApplied && <p className="text-[#8C6B1F] font-bold text-[11px]">✓ Voucher LUXE10 berhasil! Hemat 10% ({formatIDR(discountAmount)}).</p>}
              {promoError && <p className="text-rose-600 text-[11px]">{promoError}</p>}
            </div>

            {/* Payment Options */}
            <div className="space-y-2">
              {paymentOptions.map((opt) => (
                <label
                  key={opt.id}
                  onClick={() => setPaymentMethod(opt.id)}
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === opt.id
                      ? 'border-[#D4AF37] bg-[#FAF3E0]/40 font-bold text-[#8C6B1F]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px]">{opt.label}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold">{opt.category}</span>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === opt.id}
                    onChange={() => setPaymentMethod(opt.id)}
                    className="accent-[#D4AF37]"
                  />
                </label>
              ))}
            </div>

            {/* Order Summary Breakdown */}
            <div className="bg-gray-50 p-4 rounded-xl space-y-1.5 border border-gray-200 pt-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal Produk ({cartItems.length} item):</span>
                <span>{formatIDR(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Diskon Promo:</span>
                  <span>- {formatIDR(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Biaya Pengiriman (Luxe Express Blora):</span>
                <span>{shippingFee === 0 ? 'GRATIS (Min. Rp 2 Juta)' : formatIDR(shippingFee)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#1A1A1A] border-t pt-2">
                <span>Total Tagihan Gateway:</span>
                <span className="text-[#8C6B1F]">{formatIDR(grandTotal)}</span>
              </div>
            </div>

            <div className="flex space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setStep('shipping')}
                className="w-1/3 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl text-xs"
              >
                Kembali
              </button>
              <button
                type="submit"
                className="w-2/3 py-3 bg-gold-gradient text-white font-bold rounded-xl text-xs shadow-md"
              >
                Masuk Payment Gateway ({formatIDR(grandTotal)})
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: INTERACTIVE PAYMENT GATEWAY SIMULATION (MIDTRANS SNAP) */}
        {step === 'gateway' && (
          <div className="space-y-5 text-xs animate-fade-in">
            {/* Midtrans Snap Header */}
            <div className="bg-[#141414] text-white p-4.5 rounded-2xl border border-[#D4AF37]/50 flex justify-between items-center shadow-md">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] bg-blue-600 text-white font-mono font-bold px-2 py-0.5 rounded">MIDTRANS SNAP</span>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">SSL 256-BIT ENCRYPTED</span>
                </div>
                <h4 className="font-serif-luxe text-lg font-bold text-white mt-1">Attaya Beauty Luxe Blora</h4>
                <p className="text-[11px] text-gray-300">Snap Token: <span className="text-[#D4AF37] font-mono font-bold">{snapToken || 'MDTR-SNAP-93821721'}</span></p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-gray-400 block">TOTAL TAGIHAN</span>
                <span className="text-lg font-bold text-[#D4AF37] font-mono">{formatIDR(grandTotal)}</span>
              </div>
            </div>

            {/* Gateway Variant Rendering */}
            {paymentMethod === 'Midtrans QRIS Instant' && (
              <div className="bg-white p-6 rounded-2xl border-2 border-[#D4AF37] text-center space-y-4 shadow-inner">
                <div className="flex justify-center items-center space-x-2 bg-amber-50 py-1.5 px-3 rounded-full text-[11px] text-amber-900 font-bold max-w-xs mx-auto">
                  <QrCode className="w-4 h-4 text-[#D4AF37]" />
                  <span>Scan QRIS Midtrans dengan M-Banking / E-Wallet</span>
                </div>

                {/* Simulated QR Code Graphic */}
                <div className="w-48 h-48 mx-auto bg-slate-900 p-3 rounded-2xl border-4 border-[#141414] relative shadow-xl flex items-center justify-center">
                  <div className="w-full h-full bg-white p-2 rounded-xl flex flex-col items-center justify-center relative">
                    <div className="grid grid-cols-6 gap-1.5 w-full h-full p-1 opacity-90">
                      {Array.from({ length: 36 }).map((_, i) => (
                        <div key={i} className={`rounded-xs ${i % 2 === 0 ? 'bg-black' : i % 5 === 0 ? 'bg-[#D4AF37]' : 'bg-white'}`} />
                      ))}
                    </div>
                    <div className="absolute bg-[#141414] text-[#D4AF37] p-1.5 rounded-lg border border-[#D4AF37] text-[10px] font-bold">
                      MIDTRANS QRIS
                    </div>
                  </div>
                </div>

                <p className="text-gray-500 text-[11px]">NMO: ATTAYA BEAUTY LUXE MIDTRANS | NIK: 93600523000912</p>

                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => handleFinalizePaymentWithStatus('settlement')}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-lg flex items-center justify-center space-x-2 transition-transform hover:scale-101"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>⚡ Simulasi Midtrans Webhook: Settlement (Lunas)</span>
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleFinalizePaymentWithStatus('pending')}
                      className="py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl text-[11px] flex items-center justify-center space-x-1"
                    >
                      <span>Simulasi Status: Pending</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleFinalizePaymentWithStatus('expire')}
                      className="py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl text-[11px] flex items-center justify-center space-x-1"
                    >
                      <span>Simulasi Status: Expired</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {(paymentMethod === 'Midtrans BCA Virtual Account' || paymentMethod === 'Midtrans Mandiri / BRI / BNI VA') && (
              <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-4">
                <div className="bg-slate-900 text-white p-4 rounded-xl space-y-2">
                  <span className="text-[10px] text-[#D4AF37] font-bold block">NOMOR VIRTUAL ACCOUNT MIDTRANS</span>
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xl font-bold tracking-wider text-white">
                      8830 8129 8765 4321
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyVA('8830812987654321')}
                      className="px-3 py-1 bg-[#D4AF37] text-[#1A1A1A] font-bold rounded-lg text-xs flex items-center space-x-1"
                    >
                      {copiedVa ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedVa ? 'Tersalin' : 'Salin VA'}</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-1 text-gray-600 text-[11px]">
                  <p className="font-bold text-gray-800">Petunjuk Pembayaran Transfer Midtrans VA:</p>
                  <p>1. Buka M-Banking / ATM Bank Anda (BCA / Mandiri / BRI / BNI).</p>
                  <p>2. Pilih menu Transfer → Virtual Account Midtrans.</p>
                  <p>3. Masukkan kode VA di atas & konfirmasi nominal <strong>{formatIDR(grandTotal)}</strong>.</p>
                </div>

                <button
                  type="button"
                  onClick={handleFinalizePayment}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-lg flex items-center justify-center space-x-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Simulasi Transfer VA Lunas (Webhook Notification Callback)</span>
                </button>
              </div>
            )}

            {paymentMethod === 'COD Luxe Express' && (
              <div className="bg-amber-50 p-5 rounded-2xl border border-amber-300 space-y-3">
                <div className="flex items-center space-x-2 text-amber-900 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5 text-[#8C6B1F]" />
                  <span>Layanan COD (Cash On Delivery) Khusus Blora</span>
                </div>
                <p className="text-amber-900 text-[11px] leading-relaxed">
                  Pesanan Anda akan dikemas oleh tim klinik Attaya Luxe Blora dan diantarkan oleh Kurir Khusus. Silakan siapkan uang tunai senilai <strong>{formatIDR(grandTotal)}</strong> saat kurir tiba di alamat tujuan ({address.address}, {address.city}).
                </p>

                <button
                  type="button"
                  onClick={handleFinalizePayment}
                  className="w-full py-3.5 bg-[#141414] hover:bg-black text-[#D4AF37] font-bold rounded-xl text-xs shadow-lg flex items-center justify-center space-x-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Konfirmasi Pesanan COD Sekarang</span>
                </button>
              </div>
            )}

            {(paymentMethod === 'Midtrans E-Wallet (GoPay & ShopeePay)' || paymentMethod === 'Midtrans Kartu Kredit (3DS 2.0)') && (
              <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-4">
                <div>
                  <label className="block font-semibold mb-1">Nomor HP E-Wallet / Nomor Kartu Kredit Midtrans 3DS</label>
                  <input
                    type="text"
                    defaultValue="4111 2222 3333 4444"
                    className="w-full border border-gray-300 p-2.5 rounded-xl text-xs font-mono"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleFinalizePayment}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-lg flex items-center justify-center space-x-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Otorisasi Midtrans 3D Secure & Otomatis Lunas</span>
                </button>
              </div>
            )}

            {(paymentMethod === 'Xendit QRIS & E-Wallet' || paymentMethod === 'Xendit Virtual Account' || paymentMethod === 'Stripe Card Payment' || paymentMethod === 'Transfer Bank Manual') && (
              <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-4">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] text-slate-700 space-y-1">
                  <p className="font-bold text-slate-900">Gateway {paymentMethod} siap diproses</p>
                  <p>1. Konfirmasi data pemesanan & nominal pembayaran.</p>
                  <p>2. Sistem akan mengotentikasi payment status secara realtime.</p>
                  <p>3. Invoice dan riwayat pembayaran otomatis tersimpan di akun Anda.</p>
                </div>

                <button
                  type="button"
                  onClick={handleFinalizePayment}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-lg flex items-center justify-center space-x-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Konfirmasi Pembayaran {paymentMethod}</span>
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => setStep('payment')}
              className="w-full py-2 bg-gray-100 text-gray-600 font-bold rounded-xl text-xs"
            >
              Ubah Metode Pembayaran
            </button>
          </div>
        )}

        {/* STEP 4: DIGITAL RECEIPT INVOICE CONFIRMATION */}
        {step === 'confirmation' && createdOrder && (
          <div className="space-y-5 py-2 animate-fade-in text-xs">
            
            <div className="text-center space-y-2 border-b pb-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif-luxe text-2xl font-bold text-[#1A1A1A]">Transaksi Berhasil!</h4>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-[11px] font-bold rounded-full inline-block">
                STATUS: {createdOrder.paymentStatus === 'paid' ? 'VERIFIED / LUNAS 24K' : createdOrder.paymentStatus === 'pending' ? 'PENDING / MENUNGGU KONFIRMASI' : 'FAILED / MEMERLUKAN TINDAKAN'}
              </span>
            </div>

            {/* Digital Invoice Ticket */}
            <div className="bg-[#FAF8F5] p-5 rounded-2xl border-2 border-[#D4AF37]/40 space-y-3 font-sans shadow-xs">
              <div className="flex justify-between items-start border-b border-[#EADEC9] pb-3">
                <div>
                  <span className="text-[10px] text-[#8C6B1F] font-extrabold uppercase tracking-widest block">STRUK TRANSAKSI DIGITAL</span>
                  <p className="font-serif-luxe font-bold text-base text-[#1A1A1A]">Attaya Beauty Luxe Blora</p>
                  <p className="text-[10px] text-gray-500">Jl. Pemuda No. 45 Alun-Alun Blora</p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs font-bold text-[#8C6B1F]">{createdOrder.orderNumber}</span>
                  <p className="text-[10px] text-gray-400">Invoice: {createdOrder.invoiceNumber || 'AUTO-GENERATED'}</p>
                  <p className="text-[10px] text-gray-400">{new Date(createdOrder.createdAt).toLocaleString('id-ID')}</p>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-1.5 py-1">
                <span className="font-bold text-[#1A1A1A] block">Detail Item:</span>
                {createdOrder.items.map((it, idx) => (
                  <div key={`${it.product.id}-${idx}`} className="flex justify-between text-[11px] text-gray-700">
                    <span>{it.quantity}x {it.product.name}</span>
                    <span className="font-mono font-semibold">{formatIDR(it.product.price * it.quantity)}</span>
                  </div>
                ))}
              </div>

              {/* Delivery & Resi */}
              <div className="bg-white p-3 rounded-xl border border-[#EADEC9] space-y-1">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="font-semibold text-gray-700">Penerima:</span>
                  <span className="font-bold text-[#1A1A1A]">{createdOrder.shippingAddress.fullName} ({createdOrder.shippingAddress.phone})</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="font-semibold text-gray-700">Alamat Blora:</span>
                  <span className="text-gray-600 truncate max-w-[250px]">{createdOrder.shippingAddress.address}, {createdOrder.shippingAddress.city}</span>
                </div>
                <div className="flex justify-between items-center text-[11px] pt-1 border-t">
                  <span className="font-bold text-emerald-800">Nomor Resi Otomatis:</span>
                  <span className="font-mono font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                    {createdOrder.trackingNumber}
                  </span>
                </div>
              </div>

              {/* Totals */}
              <div className="pt-2 border-t border-[#EADEC9] space-y-1 text-right">
                <div className="flex justify-between text-xs font-bold text-[#1A1A1A]">
                  <span>Total Diterima Gateway:</span>
                  <span className="text-[#8C6B1F] font-mono text-sm">{formatIDR(createdOrder.grandTotal)}</span>
                </div>
                <div className="flex justify-between text-[11px] text-gray-600">
                  <span>Metode Pembayaran:</span>
                  <span className="font-semibold text-gray-800">{createdOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-[11px] text-gray-600">
                  <span>Status Pembayaran:</span>
                  <span className="font-semibold text-emerald-700 uppercase">{createdOrder.paymentStatus}</span>
                </div>
                <div className="flex justify-between text-[11px] text-gray-600">
                  <span>Refund Status:</span>
                  <span className="font-semibold text-gray-800">{paymentService.getRefundStatusLabel(createdOrder.refundStatus)}</span>
                </div>
              </div>

              {createdOrder.paymentHistory && createdOrder.paymentHistory.length > 0 && (
                <div className="bg-white p-3 rounded-xl border border-[#EADEC9] space-y-2">
                  <span className="font-bold text-[#1A1A1A] block">Riwayat Pembayaran & Invoice</span>
                  {createdOrder.paymentHistory.map((entry) => (
                    <div key={entry.id} className="flex justify-between text-[11px] text-gray-700 border-b border-gray-100 pb-1 last:border-0 last:pb-0">
                      <span>{entry.note}</span>
                      <span className="font-mono font-semibold text-[#8C6B1F]">{entry.status}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Print & Action CTAs */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl text-xs flex items-center justify-center space-x-2"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak Struk Digital</span>
              </button>

              <button
                onClick={onClose}
                className="py-3 px-4 bg-gold-gradient text-white font-bold rounded-xl text-xs shadow-md"
              >
                Kembali Belanja
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

