import React, { useState } from 'react';
import { X, Star, ShoppingBag, CheckCircle2, ShieldCheck, Sparkles, Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, selectedShade?: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedShade, setSelectedShade] = useState(product?.shades ? product.shades[0]?.name : undefined);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const formatIDR = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedShade);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#D4AF37]/30 shadow-2xl relative flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
          title="Tutup Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className="md:w-1/2 bg-[#FAF8F5] p-6 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-[#EADEC9]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-h-[380px] object-contain rounded-2xl drop-shadow-md"
          />
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {product.skinTypeMatch.map((st, i) => (
              <span key={i} className="px-3 py-1 bg-white border border-[#D4AF37]/40 text-[#8C6B1F] text-[11px] font-medium rounded-full">
                Cocok: {st}
              </span>
            ))}
          </div>
        </div>

        {/* Details & Actions */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center text-xs text-[#C5A059] font-bold uppercase tracking-wider mb-1">
                <span>{product.brand} • {product.category}</span>
                <span className="text-gray-400 font-normal">{product.volume}</span>
              </div>
              <h2 className="font-serif-luxe text-2xl md:text-3xl text-[#1A1A1A] font-semibold leading-tight">
                {product.name}
              </h2>

              <div className="flex items-center space-x-3 mt-2 text-xs">
                <div className="flex items-center text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-current mr-1" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-gray-300">•</span>
                <span className="text-gray-500">{product.reviewCount} ulasan terverifikasi</span>
                <span className="text-gray-300">•</span>
                <span className="text-emerald-600 font-medium">BPOM Certified</span>
              </div>
            </div>

            {/* Price Display */}
            <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EADEC9] flex items-baseline space-x-3">
              <span className="text-2xl font-bold text-[#1A1A1A]">
                {formatIDR(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {formatIDR(product.originalPrice)}
                </span>
              )}
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Shade Selection if available */}
            {product.shades && product.shades.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#1A1A1A] block">
                  Pilih Shade Warna: <span className="text-[#C5A059] font-normal">{selectedShade}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.shades.map((shade, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedShade(shade.name)}
                      className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                        selectedShade === shade.name
                          ? 'border-[#D4AF37] bg-[#FAF3E0] text-[#8C6B1F] ring-1 ring-[#D4AF37]'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full border border-gray-300" style={{ backgroundColor: shade.hex }} />
                      <span>{shade.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Key Benefits */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider">Manfaat Utama:</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-gray-600">
                {product.benefits.map((b, i) => (
                  <li key={i} className="flex items-start space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ingredients */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider">Kandungan Utama:</h4>
              <div className="flex flex-wrap gap-1.5">
                {product.ingredients.map((ing, i) => (
                  <span key={i} className="px-2.5 py-1 bg-gray-100 text-gray-700 text-[11px] rounded-md font-mono">
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* How to use */}
            <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#EADEC9] text-xs space-y-1">
              <span className="font-semibold text-[#8C6B1F]">Cara Penggunaan:</span>
              <p className="text-gray-600">{product.howToUse}</p>
            </div>
          </div>

          {/* Quantity & Add Button */}
          <div className="pt-4 border-t border-[#EADEC9] flex items-center space-x-4">
            <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden bg-white">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3.5 py-2 text-gray-600 hover:bg-gray-100 text-sm font-bold"
              >
                -
              </button>
              <span className="px-4 py-2 text-sm font-semibold text-[#1A1A1A]">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3.5 py-2 text-gray-600 hover:bg-gray-100 text-sm font-bold"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAdd}
              className={`flex-1 py-3.5 rounded-xl font-semibold text-sm shadow-luxe transition-all flex items-center justify-center space-x-2 ${
                added
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gold-gradient text-white hover:opacity-95'
              }`}
            >
              {added ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Berhasil Ditambahkan!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  <span>Tambah {quantity} item ke Keranjang</span>
                </>
              )}
            </button>
          </div>

          {/* Affiliate Links Section */}
          <div className="p-3 bg-amber-50/50 rounded-2xl border border-amber-200/60 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#8C6B1F]">
              <span>Beli di Official Marketplace (Affiliate Links):</span>
              <span className="text-[10px] text-emerald-700 font-semibold">Official Store Verified</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <a
                href={product.shopeeUrl || `https://shopee.co.id/search?keyword=${encodeURIComponent(product.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-2 bg-[#EE4D2D] hover:bg-[#D73B1C] text-white rounded-xl font-bold flex items-center justify-center space-x-1 shadow-xs transition-transform hover:scale-102"
              >
                <span>Shopee Mall</span>
              </a>
              <a
                href={product.tiktokUrl || `https://www.tiktok.com/search?q=${encodeURIComponent(product.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-2 bg-black hover:bg-gray-800 text-[#25F4EE] rounded-xl font-bold flex items-center justify-center space-x-1 shadow-xs border border-[#FE2C55]/40 transition-transform hover:scale-102"
              >
                <span>TikTok Shop</span>
              </a>
              <a
                href={product.tokopediaUrl || `https://www.tokopedia.com/search?st=product&q=${encodeURIComponent(product.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-2 bg-[#03AC0E] hover:bg-[#028A0B] text-white rounded-xl font-bold flex items-center justify-center space-x-1 shadow-xs transition-transform hover:scale-102"
              >
                <span>Tokopedia</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
