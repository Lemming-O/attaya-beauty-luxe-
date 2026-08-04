import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number, selectedShade?: string) => void;
  onRemoveItem: (productId: string, selectedShade?: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const freeShippingThreshold = 1000000;
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const formatIDR = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-[#D4AF37]/30 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-[#EADEC9] bg-[#FAF8F5] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-[#C5A059]" />
              <h3 className="font-serif-luxe text-xl font-bold text-[#1A1A1A]">
                Keranjang Luxe ({cartItems.length})
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="px-5 py-3 bg-[#FAF3E0] border-b border-[#EADEC9] text-xs">
            {subtotal >= freeShippingThreshold ? (
              <div className="flex items-center text-emerald-700 font-semibold space-x-1.5">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>Selamat! Anda Berhak Mendapatkan Gratis Ongkir Express VIP.</span>
              </div>
            ) : (
              <div className="space-y-1.5">
                <div className="flex justify-between text-gray-700">
                  <span>Bebas Ongkir VIP:</span>
                  <span>Tambah {formatIDR(freeShippingThreshold - subtotal)} lagi</span>
                </div>
                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gold-gradient rounded-full" style={{ width: `${freeShippingProgress}%` }} />
                </div>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-12 space-y-4 text-gray-400">
                <ShoppingBag className="w-12 h-12 mx-auto stroke-1 text-gray-300" />
                <p className="text-xs">Keranjang belanja Anda masih kosong.</p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-gold-gradient text-white rounded-xl text-xs font-semibold shadow-xs"
                >
                  Jelajahi Produk
                </button>
              </div>
            ) : (
              cartItems.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedShade || idx}`}
                  className="flex space-x-3 p-3 rounded-2xl border border-[#EADEC9] bg-[#FAF8F5]"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-xl bg-white border border-gray-200"
                  />

                  <div className="flex-1 flex flex-col justify-between text-xs">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif-luxe text-sm font-bold text-[#1A1A1A] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id, item.selectedShade)}
                          className="text-gray-400 hover:text-rose-600 ml-1"
                          title="Hapus Produk"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.selectedShade && (
                        <p className="text-[10px] text-[#C5A059] font-medium">Shade: {item.selectedShade}</p>
                      )}
                      
                      <p className="font-bold text-[#1A1A1A] mt-0.5">{formatIDR(item.product.price)}</p>
                    </div>

                    {/* Stepper */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1), item.selectedShade)}
                          className="px-2 py-0.5 text-gray-600 hover:bg-gray-100 font-bold"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 font-semibold text-[#1A1A1A]">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1, item.selectedShade)}
                          className="px-2 py-0.5 text-gray-600 hover:bg-gray-100 font-bold"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-bold text-[#8C6B1F]">
                        {formatIDR(item.product.price * item.quantity)}
                      </span>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-[#EADEC9] bg-[#FAF8F5] space-y-4">
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal Produk:</span>
                  <span className="font-semibold text-[#1A1A1A]">{formatIDR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Estimasi Ongkir:</span>
                  <span className="font-semibold text-emerald-600">
                    {subtotal >= freeShippingThreshold ? 'GRATIS' : 'Rp 25.000'}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#1A1A1A] pt-2 border-t border-gray-200">
                  <span>Total Tagihan:</span>
                  <span className="text-[#8C6B1F]">
                    {formatIDR(subtotal + (subtotal >= freeShippingThreshold ? 0 : 25000))}
                  </span>
                </div>
              </div>

              <button
                onClick={() => { onClose(); onProceedToCheckout(); }}
                className="w-full py-4 bg-gold-gradient text-white rounded-xl font-semibold text-sm shadow-luxe hover:opacity-95 transition-all flex items-center justify-center space-x-2"
              >
                <span>Lanjut ke Pembayaran Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
