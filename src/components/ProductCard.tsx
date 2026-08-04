import React from 'react';
import { Star, ShoppingBag, Eye, ExternalLink } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  isWishlisted?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
}) => {
  const formatIDR = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="group bg-white rounded-2xl border border-[#EADEC9] overflow-hidden shadow-luxe hover:shadow-luxe-hover transition-all duration-300 flex flex-col justify-between">
      
      {/* Product Image & Badges */}
      <div className="relative overflow-hidden aspect-square bg-[#FAF8F5]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isBestSeller && (
            <span className="bg-gold-gradient text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
              Terlaris VIP
            </span>
          )}
          {product.isNew && (
            <span className="bg-[#141414] text-[#D4AF37] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
              Edisi Baru
            </span>
          )}
        </div>

        {/* Quick View Floating Overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3 p-4">
          <button
            onClick={() => onQuickView(product)}
            className="p-3 bg-white/90 hover:bg-white text-[#1A1A1A] rounded-full shadow-lg transition-transform transform hover:scale-110"
            title="Lihat Detail Produk"
          >
            <Eye className="w-5 h-5 text-[#C5A059]" />
          </button>
          <button
            onClick={() => onAddToCart(product)}
            className="p-3 bg-[#D4AF37] hover:bg-[#C5A059] text-white rounded-full shadow-lg transition-transform transform hover:scale-110"
            title="Tambah ke Keranjang"
          >
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>

        {/* Category Pill */}
        <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] text-[#666] font-medium border border-[#EADEC9]">
          {product.category}
        </div>
      </div>

      {/* Product Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
            <span className="font-medium text-[#C5A059]">{product.brand}</span>
            <div className="flex items-center space-x-1 text-amber-500 font-semibold">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{product.rating}</span>
              <span className="text-gray-400 font-normal">({product.reviewCount})</span>
            </div>
          </div>

          <h3 
            onClick={() => onQuickView(product)}
            className="font-serif-luxe text-base text-[#1A1A1A] font-semibold line-clamp-2 hover:text-[#C5A059] cursor-pointer transition-colors leading-snug"
          >
            {product.name}
          </h3>
        </div>

        {/* Price Breakdown */}
        <div className="pt-2 border-t border-[#F0E6D6] flex items-center justify-between">
          <div>
            <div className="text-sm font-bold text-[#1A1A1A]">
              {formatIDR(product.price)}
            </div>
            {product.originalPrice && (
              <div className="text-[11px] text-gray-400 line-through">
                {formatIDR(product.originalPrice)}
              </div>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="px-3 py-1.5 bg-[#FAF3E0] hover:bg-[#D4AF37] text-[#8C6B1F] hover:text-white rounded-xl text-xs font-semibold transition-all duration-200 border border-[#D4AF37]/30 flex items-center space-x-1"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>+ Tas</span>
          </button>
        </div>

        {/* Affiliate Marketplace Buy Links */}
        <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-1 text-[10px] font-bold">
          <span className="text-gray-400 text-[9px] uppercase">Marketplace:</span>
          <div className="flex items-center gap-1">
            <a
              href={product.shopeeUrl || `https://shopee.co.id/search?keyword=${encodeURIComponent(product.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-1.5 py-0.5 bg-[#EE4D2D] hover:bg-[#D73B1C] text-white rounded transition-colors flex items-center space-x-0.5"
              title="Beli di Shopee Official Store"
            >
              <span>Shopee</span>
              <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
            </a>
            <a
              href={product.tiktokUrl || `https://www.tiktok.com/search?q=${encodeURIComponent(product.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-1.5 py-0.5 bg-black hover:bg-gray-800 text-[#25F4EE] rounded transition-colors flex items-center space-x-0.5 border border-[#FE2C55]/30"
              title="Beli di TikTok Shop Official"
            >
              <span>TikTok</span>
              <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
            </a>
            <a
              href={product.tokopediaUrl || `https://www.tokopedia.com/search?st=product&q=${encodeURIComponent(product.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-1.5 py-0.5 bg-[#03AC0E] hover:bg-[#028A0B] text-white rounded transition-colors flex items-center space-x-0.5"
              title="Beli di Tokopedia Official"
            >
              <span>Tokopedia</span>
              <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
            </a>
          </div>
        </div>

      </div>

    </div>
  );
};

