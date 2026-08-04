import { GoogleGenAI } from '@google/genai';
import { AISkinAnalysisResult, Product, ClinicTreatment } from '../types';

let aiClient: GoogleGenAI | null = null;

function getAIClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) 
      ? process.env.GEMINI_API_KEY 
      : (import.meta as any).env?.VITE_GEMINI_API_KEY || '';
    if (apiKey) {
      aiClient = new GoogleGenAI({ apiKey });
    }
  }
  return aiClient;
}

export interface QuizInput {
  skinType: string;
  ageGroup: string;
  concerns: string[];
  sunExposure: string;
  makeupFrequency: string;
  sensitivity: string;
  budgetPreference: string;
  notes?: string;
  imageBase64?: string;
}

// 1. AI Skin Analysis Generator
export async function analyzeSkinWithAI(
  input: QuizInput,
  availableProducts: Product[],
  availableTreatments: ClinicTreatment[]
): Promise<AISkinAnalysisResult> {
  const client = getAIClient();
  
  const prompt = `
Anda adalah Senior Dermatologist & Beauty Expert dari Attaya Beauty Luxe, sebuah brand kosmetik & klinik estetika mewah Indonesia.
Lakukan analisis kulit profesional berdasarkan data pengguna berikut:

Data Pengguna:
- Jenis Kulit yang Dirasakan: ${input.skinType}
- Kelompok Usia: ${input.ageGroup}
- Masalah Utama Kulit: ${input.concerns.join(', ')}
- Tingkat Paparan Sinar Matahari: ${input.sunExposure}
- Frekuensi Penggunaan Makeup: ${input.makeupFrequency}
- Sensitivitas Kulit: ${input.sensitivity}
- Catatan Tambahan: ${input.notes || 'Tidak ada'}

Daftar Produk Attaya Beauty Luxe yang Tersedia:
${availableProducts.map(p => `- ID: ${p.id}, Nama: ${p.name}, Kategori: ${p.category}, Cocok untuk: ${p.skinTypeMatch.join('/')}`).join('\n')}

Daftar Treatment Klinik Attaya Luxe yang Tersedia:
${availableTreatments.map(t => `- ID: ${t.id}, Judul: ${t.title}, Kategori: ${t.category}`).join('\n')}

Tugas Anda:
Berikan output HANYA dalam format JSON valid tanpa tanda markdown tambahan (tanpa \`\`\`json).
Struktur JSON yang WAJIB dipenuhi:
{
  "skinType": "Normal" | "Dry" | "Oily" | "Combination" | "Sensitive",
  "score": number (skala 1-100),
  "hydrationLevel": number (skala 1-100),
  "agingScore": number (skala 1-100),
  "clarityScore": number (skala 1-100),
  "primaryConcern": "string (masalah paling dominan dalam Bahasa Indonesia)",
  "secondaryConcerns": ["string", "string"],
  "summary": "string (penjelasan dermatologis mendalam & ramah mewah 3-4 kalimat Bahasa Indonesia)",
  "recommendedProductIds": ["id_produk1", "id_produk2"],
  "recommendedTreatmentIds": ["id_treatment1"],
  "morningRoutine": [
    "Langkah 1: ...",
    "Langkah 2: ...",
    "Langkah 3: ..."
  ],
  "eveningRoutine": [
    "Langkah 1: ...",
    "Langkah 2: ...",
    "Langkah 3: ..."
  ]
}
`;

  if (client) {
    try {
      const contents: any[] = [];
      if (input.imageBase64) {
        // Remove header prefix if present
        const base64Data = input.imageBase64.replace(/^data:image\/\w+;base64,/, '');
        contents.push({
          inlineData: {
            mimeType: 'image/jpeg',
            data: base64Data
          }
        });
      }
      contents.push(prompt);

      const response = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: contents,
      });

      const text = response.text || '';
      // Clean potential JSON markdown wrapping
      const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);

      return {
        skinType: parsed.skinType || 'Combination',
        score: parsed.score || 85,
        hydrationLevel: parsed.hydrationLevel || 78,
        agingScore: parsed.agingScore || 82,
        clarityScore: parsed.clarityScore || 80,
        primaryConcern: parsed.primaryConcern || input.concerns[0] || 'Dehidrasi & Kulit Kusam',
        secondaryConcerns: parsed.secondaryConcerns || input.concerns.slice(1),
        summary: parsed.summary || 'Kulit Anda memiliki potensi keindahan luar biasa dengan kebutuhan hidrasi yang presisi dan perlindungan dari penuaan dini.',
        recommendedProductIds: parsed.recommendedProductIds || availableProducts.slice(0, 3).map(p => p.id),
        recommendedTreatmentIds: parsed.recommendedTreatmentIds || availableTreatments.slice(0, 2).map(t => t.id),
        morningRoutine: parsed.morningRoutine || [
          'Gentle Cleansing Oil',
          'Rose Gold Cell Revival Serum',
          'Diamond Radiance Cream',
          'Crystal Nectar Sunscreen SPF 50+'
        ],
        eveningRoutine: parsed.eveningRoutine || [
          'Double Cleansing Botanical Oil',
          'Rose Gold Cell Revival Serum',
          'Diamond Radiance Cream Moisturizer'
        ],
        analysisDate: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
      };
    } catch (err) {
      console.warn('Gemini API call failed, using intelligent fallback analysis', err);
    }
  }

  // Fallback Analysis Logic
  return generateFallbackSkinAnalysis(input, availableProducts, availableTreatments);
}

function generateFallbackSkinAnalysis(
  input: QuizInput,
  products: Product[],
  treatments: ClinicTreatment[]
): AISkinAnalysisResult {
  let mappedType: 'Normal' | 'Dry' | 'Oily' | 'Combination' | 'Sensitive' = 'Combination';
  if (input.skinType.toLowerCase().includes('kering') || input.skinType.toLowerCase().includes('dry')) mappedType = 'Dry';
  else if (input.skinType.toLowerCase().includes('minyak') || input.skinType.toLowerCase().includes('oily')) mappedType = 'Oily';
  else if (input.skinType.toLowerCase().includes('sensitif') || input.skinType.toLowerCase().includes('sensitive')) mappedType = 'Sensitive';
  else if (input.skinType.toLowerCase().includes('normal')) mappedType = 'Normal';

  const relevantProducts = products.filter(p => p.skinTypeMatch.includes(mappedType) || p.skinTypeMatch.includes('All')).slice(0, 3);
  const prodIds = relevantProducts.map(p => p.id);
  const treatIds = treatments.slice(0, 2).map(t => t.id);

  return {
    skinType: mappedType,
    score: 88,
    hydrationLevel: mappedType === 'Dry' ? 62 : 82,
    agingScore: 84,
    clarityScore: 79,
    primaryConcern: input.concerns[0] || 'Pori-Pori & Tanda Penuaan Halus',
    secondaryConcerns: input.concerns.slice(1).length > 0 ? input.concerns.slice(1) : ['Kulit Kurang Bercahaya', 'Paparan Polusi'],
    summary: `Berdasarkan evaluasi dermatologis Attaya Beauty Luxe, kulit ${mappedType} Anda memerlukan fokus utama pada penguatan skin barrier, hidrasi berlapis dengan serum stem cell mawar, serta perlindungan UV hybrid harian untuk mempertahankan kilau ala Glass Skin.`,
    recommendedProductIds: prodIds.length > 0 ? prodIds : [products[0]?.id || 'prod-1'],
    recommendedTreatmentIds: treatIds,
    morningRoutine: [
      'Pembersihan Lembut: Attaya Gentle Botanical Cleansing Oil',
      'Nutrisi Aktif: Attaya Rose Gold Cell Revival Serum (3 tetes)',
      'Pengunci Kelembaban: Attaya Diamond Radiance Cream',
      'Perlindungan UV: Attaya Crystal Nectar Sunscreen SPF 50+'
    ],
    eveningRoutine: [
      'Double Cleansing: Hapus sisa makeup & polusi',
      'Perawatan Intensif: Attaya Rose Gold Cell Revival Serum',
      'Regenerasi Malam: Attaya Diamond Radiance Cream'
    ],
    analysisDate: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
  };
}

// 2. AI Virtual Concierge Chat Assistant
export async function askAttayaAIConcierge(
  userQuery: string,
  chatHistory: { role: 'user' | 'model'; message: string }[],
  products: Product[],
  treatments: ClinicTreatment[]
): Promise<string> {
  const client = getAIClient();

  const systemPrompt = `
Anda adalah "Aurelia", Virtual Luxury Beauty Concierge resmi dari Attaya Beauty Luxe.
Anda sangat sopan, ramah, menggunakan Bahasa Indonesia yang anggun, elegan, dan berkelas.
Anda menguasai seluruh produk kosmetik, skincare, parfum, serta treatment klinik estetika Attaya Beauty Luxe.

Katalog Produk Saat Ini:
${products.map(p => `- ${p.name} (Rp ${p.price.toLocaleString('id-ID')}) : ${p.description}`).join('\n')}

Layanan Klinik Estetika Attaya:
${treatments.map(t => `- ${t.title} (Rp ${t.price.toLocaleString('id-ID')}) : ${t.subtitle}`).join('\n')}

Aturan Jawaban:
1. Selalu sapa pengguna dengan sebutan hangat seperti "Lady/Dear [Nama]" atau "Pelanggan Setia Attaya".
2. Berikan rekomendasi produk/treatment yang paling tepat dengan menyebutkan nama lengkap produk dan harganya.
3. Jawab dalam Bahasa Indonesia yang elegan dan solutif.
`;

  if (client) {
    try {
      const response = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { text: systemPrompt },
          ...chatHistory.map(h => ({ text: `${h.role === 'user' ? 'Pengguna' : 'Aurelia'}: ${h.message}` })),
          { text: `Pengguna: ${userQuery}` }
        ]
      });

      if (response.text) {
        return response.text;
      }
    } catch (err) {
      console.warn('Gemini chat error', err);
    }
  }

  // Smart Fallback Concierge
  const queryLower = userQuery.toLowerCase();
  if (queryLower.includes('serum') || queryLower.includes('gold') || queryLower.includes('flek') || queryLower.includes('aging')) {
    return `Salam hangat dari Attaya Luxe. Untuk kebutuhan pencerah & anti-aging eksklusif, saya sangat merekomendasikan **Attaya Luxe Rose Gold Cell Revival Serum 30ml** (Rp 1.850.000). Kandungan 24K Pure Gold dan Damask Rose Stem Cell terbukti efektif mengencangkan kulit dan memberikan kilau bercahaya instan!`;
  } else if (queryLower.includes('klinik') || queryLower.includes('treatment') || queryLower.includes('facial') || queryLower.includes('reservasi')) {
    return `Suatu kehormatan bagi kami untuk menyambut Anda di Klinik Estetika Attaya. Treatment terfavorit pelanggan VIP kami adalah **Attaya Diamond Microdermabrasion & Glowing Oxygen Infusion** (Rp 2.500.000, 90 menit). Anda dapat melakukan reservasi tanggal dan dokter pilihan langsung melalui menu **Klinik Estetika**.`;
  } else if (queryLower.includes('parfum') || queryLower.includes('wangian') || queryLower.includes('oud')) {
    return `Keagungan aroma **Attaya Imperial Oud & Velvet Silk Eau de Parfum 100ml** (Rp 2.750.000) memadukan Agarwood Kalimantan langka dengan Saffron Persia dan Mawar Bulgaria. Aroma ini dapat bertahan hingga 18 jam dengan botol bertakhtakan aksen emas.`;
  }

  return `Terima kasih telah menghubungi Attaya Beauty Luxe Concierge. Saya Aurelia siap membantu Anda menemukan kombinasi produk skincare, kosmetik, atau jadwal treatment klinik terfavorit. Apakah ada masalah kulit spesifik yang ingin Anda konsultasikan hari ini?`;
}
