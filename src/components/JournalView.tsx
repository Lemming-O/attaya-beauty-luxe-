import React, { useState } from 'react';
import { Clock, User, ArrowRight, Tag, BookOpen } from 'lucide-react';
import { JournalArticle } from '../types';

interface JournalViewProps {
  articles: JournalArticle[];
}

export const JournalView: React.FC<JournalViewProps> = ({ articles }) => {
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">Attaya Editorial & Dermatology Journal</span>
        <h1 className="font-serif-luxe text-4xl sm:text-5xl font-bold text-[#1A1A1A]">
          Luxe Beauty & Science Journal
        </h1>
        <p className="text-xs sm:text-sm text-gray-600">
          Artikel teredukasi seputar kandungan skincare 24K Gold, inovasi dermatologi, formulasi parfum, dan panduan AI Skin Diagnostic.
        </p>
      </div>

      {selectedArticle ? (
        /* Single Article View */
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EADEC9] shadow-luxe max-w-4xl mx-auto space-y-6 animate-fade-in">
          <button
            onClick={() => setSelectedArticle(null)}
            className="text-xs font-semibold text-[#C5A059] hover:underline flex items-center space-x-1"
          >
            <span>← Kembali ke Semua Artikel</span>
          </button>

          <img
            src={selectedArticle.image}
            alt={selectedArticle.title}
            className="w-full h-80 object-cover rounded-2xl"
          />

          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-xs text-gray-500">
              <span className="px-3 py-1 bg-[#FAF3E0] text-[#8C6B1F] font-bold rounded-full">{selectedArticle.category}</span>
              <span>•</span>
              <span className="flex items-center"><User className="w-3.5 h-3.5 mr-1" />{selectedArticle.author}</span>
              <span>•</span>
              <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1" />{selectedArticle.readTimeMinutes} Menit Baca</span>
            </div>

            <h2 className="font-serif-luxe text-3xl font-bold text-[#1A1A1A]">
              {selectedArticle.title}
            </h2>

            <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-line border-t border-gray-100 pt-6">
              {selectedArticle.content}
            </div>

            <div className="pt-6 border-t border-gray-100 flex flex-wrap gap-2">
              {selectedArticle.tags.map((t, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-gray-100 text-gray-600 text-[11px] rounded-md font-mono">
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Articles Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((art) => (
            <div
              key={art.id}
              onClick={() => setSelectedArticle(art)}
              className="group bg-white rounded-2xl border border-[#EADEC9] overflow-hidden shadow-luxe hover:shadow-luxe-hover transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-60 overflow-hidden bg-gray-100">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#141414]/80 text-[#D4AF37] border border-[#D4AF37]/30 text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                  {art.category}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center space-x-2 text-xs text-gray-400 mb-2">
                    <span>{art.date}</span>
                    <span>•</span>
                    <span>{art.readTimeMinutes} min read</span>
                  </div>

                  <h3 className="font-serif-luxe text-xl font-bold text-[#1A1A1A] group-hover:text-[#C5A059] transition-colors leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs text-gray-600 mt-2 line-clamp-3">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#8C6B1F]">
                  <span>Baca Artikel Lengkap</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
