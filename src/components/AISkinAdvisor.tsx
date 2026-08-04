import React, { useState } from 'react';
import { Sparkles, Camera, Upload, CheckCircle2, RefreshCw, ShoppingBag, Calendar, ShieldCheck, ArrowRight, Activity, Zap } from 'lucide-react';
import { Product, ClinicTreatment, AISkinAnalysisResult } from '../types';
import { QuizInput, analyzeSkinWithAI } from '../services/aiService';

interface AISkinAdvisorProps {
  products: Product[];
  treatments: ClinicTreatment[];
  onAddToCart: (product: Product) => void;
  onBookTreatment: (treatment: ClinicTreatment) => void;
  onSaveAnalysisLog?: (result: AISkinAnalysisResult) => void;
}

export const AISkinAdvisor: React.FC<AISkinAdvisorProps> = ({
  products,
  treatments,
  onAddToCart,
  onBookTreatment,
  onSaveAnalysisLog,
}) => {
  const [quizInput, setQuizInput] = useState<QuizInput>({
    skinType: 'Kombinasi',
    ageGroup: '25-34 Tahun',
    concerns: ['Pori-pori Besar & Komedo', 'Kulit Kusam / Flek'],
    sunExposure: '2-4 Jam per Hari',
    makeupFrequency: 'Hampir Setiap Hari',
    sensitivity: 'Sedang',
    budgetPreference: 'Sangat Mewah & Klinis',
    notes: '',
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AISkinAnalysisResult | null>(null);

  const availableConcerns = [
    'Pori-pori Besar & Komedo',
    'Kulit Kusam / Flek Hitam',
    'Garis Halus & Penuaan Dini',
    'Jerawat Aktif / Breakout',
    'Kemerahan & Kulit Sensitif',
    'Dehidrasi / Kulit Kering Parah',
    'Lingkaran Hitam Mata (Dark Circle)'
  ];

  const toggleConcern = (concern: string) => {
    setQuizInput(prev => {
      const exists = prev.concerns.includes(concern);
      if (exists) {
        return { ...prev, concerns: prev.concerns.filter(c => c !== concern) };
      } else {
        return { ...prev, concerns: [...prev.concerns, concern] };
      }
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImagePreview(base64);
        setQuizInput(prev => ({ ...prev, imageBase64: base64 }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStartAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    setAnalyzing(true);
    try {
      const result = await analyzeSkinWithAI(quizInput, products, treatments);
      setAnalysisResult(result);
      if (onSaveAnalysisLog) {
        onSaveAnalysisLog(result);
      }
    } catch (err) {
      console.error('Error analyzing skin', err);
    } finally {
      setAnalyzing(false);
    }
  };

  // Helper for IDR
  const formatIDR = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);
  };

  const recommendedProds = analysisResult
    ? products.filter(p => analysisResult.recommendedProductIds.includes(p.id))
    : [];

  const recommendedTreats = analysisResult
    ? treatments.filter(t => analysisResult.recommendedTreatmentIds.includes(t.id))
    : [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12 space-y-10">
      
      {/* Page Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 bg-[#FAF3E0] border border-[#D4AF37]/40 px-4 py-1.5 rounded-full text-xs font-semibold text-[#8C6B1F]">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span>Attaya Gemini AI Diagnostic System</span>
        </div>
        <h1 className="font-serif-luxe text-3xl sm:text-5xl font-bold text-[#1A1A1A]">
          Konsultasi Kulit AI & Preskripsi Presisi
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          Unggah foto wajah Anda atau jawab kuis dermatologis singkat. Algoritma AI vision kami akan menganalisis kondisi matriks kulit dan meracik rekomendasi skincare serta treatment klinik yang ideal.
        </p>
      </div>

      {analyzing ? (
        /* Loading Screen */
        <div className="bg-white rounded-3xl p-12 text-center border border-[#D4AF37]/30 shadow-luxe max-w-xl mx-auto space-y-6">
          <div className="relative w-24 h-24 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-[#FAF3E0] animate-pulse" />
            <div className="absolute inset-0 rounded-full border-4 border-[#D4AF37] border-t-transparent animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center text-[#D4AF37]">
              <Sparkles className="w-10 h-10 animate-pulse" />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif-luxe text-2xl font-bold text-[#1A1A1A]">Menganalisis Kondisi Kulit...</h3>
            <p className="text-xs text-gray-500 animate-pulse">
              Gemini AI sedang memeriksa parameter hidrasi, produksi sebum, dan indeks penuaan dini...
            </p>
          </div>
        </div>
      ) : analysisResult ? (
        /* Diagnostic Results Screen */
        <div className="space-y-8 animate-fade-in">
          
          {/* Top Result Banner */}
          <div className="bg-gradient-to-r from-[#141414] via-[#242424] to-[#141414] text-white p-6 sm:p-10 rounded-3xl border border-[#D4AF37]/40 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Score Gauge */}
              <div className="lg:col-span-4 text-center lg:border-r border-gray-800 pr-0 lg:pr-8 space-y-3">
                <span className="text-[10px] tracking-widest text-[#D4AF37] uppercase font-bold">Skor Kesehatan Kulit</span>
                <div className="relative inline-flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full border-4 border-[#D4AF37]/30 flex items-center justify-center bg-white/5">
                    <span className="font-serif-luxe text-5xl font-bold text-white">{analysisResult.score}</span>
                    <span className="text-xs text-gray-400 font-sans ml-1">/100</span>
                  </div>
                </div>
                <div className="text-xs text-gray-300 font-medium">
                  Tipe Kulit Terdeteksi: <span className="text-[#D4AF37] font-bold">{analysisResult.skinType}</span>
                </div>
              </div>

              {/* Parameter Metrics */}
              <div className="lg:col-span-8 space-y-6">
                <div>
                  <span className="text-xs text-[#D4AF37] font-bold uppercase tracking-wider block mb-1">Diagnosa Dermatologis Attaya:</span>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                    {analysisResult.summary}
                  </p>
                </div>

                {/* Progress bars */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-gray-800 text-xs">
                  <div>
                    <div className="flex justify-between text-gray-400 mb-1">
                      <span>Tingkat Hidrasi:</span>
                      <span className="text-emerald-400 font-bold">{analysisResult.hydrationLevel}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${analysisResult.hydrationLevel}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-gray-400 mb-1">
                      <span>Perlindungan Aging:</span>
                      <span className="text-[#D4AF37] font-bold">{analysisResult.agingScore}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-[#D4AF37] rounded-full" style={{ width: `${analysisResult.agingScore}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-gray-400 mb-1">
                      <span>Kejernihan Kulit:</span>
                      <span className="text-[#B76E79] font-bold">{analysisResult.clarityScore}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-[#B76E79] rounded-full" style={{ width: `${analysisResult.clarityScore}%` }} />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-400 pt-2">
                  <span>Tanggal Analisis: {analysisResult.analysisDate}</span>
                  <button
                    onClick={() => setAnalysisResult(null)}
                    className="flex items-center space-x-1 text-[#D4AF37] hover:underline"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Ulangi Analisis AI</span>
                  </button>
                </div>

              </div>

            </div>
          </div>

          {/* Prescribed Morning & Evening Routines */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#EADEC9] shadow-luxe space-y-4">
              <div className="flex items-center space-x-2 text-[#8C6B1F]">
                <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="font-serif-luxe text-xl font-semibold">Rutinitas Pagi Hari (Morning)</h3>
              </div>
              <ul className="space-y-2.5 text-xs text-gray-700">
                {analysisResult.morningRoutine.map((step, idx) => (
                  <li key={idx} className="flex items-start space-x-2.5 bg-[#FAF8F5] p-3 rounded-xl border border-gray-100">
                    <span className="w-5 h-5 bg-[#D4AF37] text-white rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#EADEC9] shadow-luxe space-y-4">
              <div className="flex items-center space-x-2 text-[#B76E79]">
                <Activity className="w-5 h-5 text-[#B76E79]" />
                <h3 className="font-serif-luxe text-xl font-semibold">Rutinitas Malam Hari (Night)</h3>
              </div>
              <ul className="space-y-2.5 text-xs text-gray-700">
                {analysisResult.eveningRoutine.map((step, idx) => (
                  <li key={idx} className="flex items-start space-x-2.5 bg-[#FAF8F5] p-3 rounded-xl border border-gray-100">
                    <span className="w-5 h-5 bg-[#B76E79] text-white rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recommended Products Showcase */}
          {recommendedProds.length > 0 && (
            <div className="space-y-4 pt-4">
              <h3 className="font-serif-luxe text-2xl font-semibold text-[#1A1A1A] flex items-center space-x-2">
                <span>Rekomendasi Produk Skincare Presisi</span>
                <span className="text-xs font-sans text-gray-500 font-normal">({recommendedProds.length} Produk Disesuaikan)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedProds.map((prod) => (
                  <div key={prod.id} className="bg-white p-5 rounded-2xl border border-[#EADEC9] shadow-luxe flex flex-col justify-between space-y-4">
                    <div className="flex space-x-4">
                      <img src={prod.image} alt={prod.name} className="w-20 h-20 object-cover rounded-xl bg-gray-50" />
                      <div>
                        <span className="text-[10px] text-[#C5A059] font-bold uppercase">{prod.brand}</span>
                        <h4 className="font-serif-luxe text-base font-bold text-[#1A1A1A] leading-snug">{prod.name}</h4>
                        <p className="text-xs font-bold text-[#1A1A1A] mt-1">{formatIDR(prod.price)}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => onAddToCart(prod)}
                      className="w-full py-2.5 bg-gold-gradient text-white rounded-xl text-xs font-semibold hover:opacity-95 transition-all flex items-center justify-center space-x-2"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Tambah ke Keranjang</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommended Clinic Treatments */}
          {recommendedTreats.length > 0 && (
            <div className="space-y-4 pt-4">
              <h3 className="font-serif-luxe text-2xl font-semibold text-[#1A1A1A]">
                Rekomendasi Treatment Klinik Attaya
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendedTreats.map((treat) => (
                  <div key={treat.id} className="bg-white p-5 rounded-2xl border border-[#D4AF37]/30 shadow-luxe flex justify-between items-center space-x-4">
                    <div className="space-y-1">
                      <span className="text-[10px] bg-amber-50 text-[#8C6B1F] px-2 py-0.5 rounded-full font-bold border border-amber-200">{treat.category}</span>
                      <h4 className="font-serif-luxe text-lg font-bold text-[#1A1A1A]">{treat.title}</h4>
                      <p className="text-xs text-gray-500">{treat.durationMinutes} Menit • {formatIDR(treat.price)}</p>
                    </div>

                    <button
                      onClick={() => onBookTreatment(treat)}
                      className="px-4 py-2.5 bg-white border border-[#D4AF37] text-[#8C6B1F] rounded-xl text-xs font-semibold hover:bg-[#FAF3E0] transition-colors shrink-0 flex items-center space-x-1"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Reservasi</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      ) : (
        /* Quiz & Photo Upload Form */
        <form onSubmit={handleStartAnalysis} className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EADEC9] shadow-luxe max-w-4xl mx-auto space-y-8">
          
          {/* Photo Upload Section */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider block">
              1. Upload Foto Wajah untuk Gemini Vision AI (Opsional tapi Direkomendasikan)
            </label>
            <div className="border-2 border-dashed border-[#D4AF37]/50 bg-[#FAF8F5] rounded-2xl p-6 text-center hover:bg-[#FAF3E0]/30 transition-colors">
              {imagePreview ? (
                <div className="space-y-3">
                  <img src={imagePreview} alt="Pratinjau Foto Wajah" className="w-32 h-32 object-cover rounded-2xl mx-auto border-2 border-[#D4AF37]" />
                  <button
                    type="button"
                    onClick={() => { setImagePreview(null); setQuizInput(prev => ({ ...prev, imageBase64: undefined })); }}
                    className="text-xs text-rose-600 font-semibold hover:underline"
                  >
                    Hapus Foto & Ganti
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer space-y-2 block">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#D4AF37] mx-auto shadow-xs border border-[#EADEC9]">
                    <Camera className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-medium text-[#1A1A1A]">
                    Klik untuk memilih foto selfie polos tanpa filter
                  </div>
                  <p className="text-[11px] text-gray-400">Format JPG, PNG (Maks 5MB)</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Skin Concerns Checklist */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider block">
              2. Pilih Keluhan Utama Kulit yang Ingin Diatasi:
            </label>
            <div className="flex flex-wrap gap-2.5">
              {availableConcerns.map((concern, idx) => {
                const isSelected = quizInput.concerns.includes(concern);
                return (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => toggleConcern(concern)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-medium border transition-all ${
                      isSelected
                        ? 'bg-[#FAF3E0] border-[#D4AF37] text-[#8C6B1F] font-bold shadow-xs'
                        : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] inline mr-1.5" />}
                    <span>{concern}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Basic Questions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1.5">Tipe Kulit yang Anda Rasakan Saat Ini:</label>
              <select
                value={quizInput.skinType}
                onChange={(e) => setQuizInput({ ...quizInput, skinType: e.target.value })}
                className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl p-3 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="Normal">Normal & Seimbang</option>
                <option value="Dry">Kering & Terasa Kaku</option>
                <option value="Oily">Berminyak di Seluruh Wajah</option>
                <option value="Combination">Kombinasi (T-Zone Berminyak, Pipi Kering)</option>
                <option value="Sensitive">Sensitif / Mudah Merah</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1.5">Kelompok Usia:</label>
              <select
                value={quizInput.ageGroup}
                onChange={(e) => setQuizInput({ ...quizInput, ageGroup: e.target.value })}
                className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl p-3 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="Di bawah 20 Tahun">Di bawah 20 Tahun</option>
                <option value="20-25 Tahun">20-25 Tahun</option>
                <option value="25-34 Tahun">25-34 Tahun</option>
                <option value="35-44 Tahun">35-44 Tahun</option>
                <option value="45+ Tahun">45+ Tahun</option>
              </select>
            </div>
          </div>

          {/* Extra Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1.5">Durasi Paparan Sinar Matahari / Outdoor:</label>
              <select
                value={quizInput.sunExposure}
                onChange={(e) => setQuizInput({ ...quizInput, sunExposure: e.target.value })}
                className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl p-3 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="Jarang (Kurang dari 1 jam)">Jarang (&lt; 1 jam/hari)</option>
                <option value="Sedang (1-3 jam per hari)">Sedang (1-3 jam/hari)</option>
                <option value="Tinggi (Lebih dari 4 jam)">Tinggi (&gt; 4 jam/hari)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1.5">Sensitivitas Kulit Terhadap Skincare Baru:</label>
              <select
                value={quizInput.sensitivity}
                onChange={(e) => setQuizInput({ ...quizInput, sensitivity: e.target.value })}
                className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl p-3 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="Rendah (Jarang Iritasi)">Rendah (Jarang Iritasi)</option>
                <option value="Sedang (Kadang Beruntusan)">Sedang (Kadang Beruntusan)</option>
                <option value="Tinggi (Mudah Perih/Merah)">Tinggi (Sangat Sensitif)</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1.5">Catatan Khusus untuk AI Doctor (Opsional):</label>
            <textarea
              rows={2}
              placeholder="Contoh: Sedang hamil/menyusui, alergi paraben..."
              value={quizInput.notes}
              onChange={(e) => setQuizInput({ ...quizInput, notes: e.target.value })}
              className="w-full bg-[#FAF8F5] border border-gray-300 rounded-xl p-3 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            className="w-full py-4 bg-gold-gradient text-white rounded-xl font-semibold text-sm shadow-luxe hover:opacity-95 transition-all flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-5 h-5 text-white animate-spin-slow" />
            <span>Jalankan AI Diagnostic & Buat Preskripsi Kulit</span>
          </button>

        </form>
      )}

    </div>
  );
};
