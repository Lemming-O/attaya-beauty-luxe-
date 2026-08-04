import { Product, ClinicTreatment, JournalArticle, Review, UserProfile, AdBanner } from '../types';

export const INITIAL_AD_BANNERS: AdBanner[] = [
  {
    id: 'banner-1',
    title: 'Shopee Super Brand Day 8.8 Luxe Promo',
    subtitle: 'Diskon Hingga 40% + Gratis Ongkir Rp 0 & Voucher Cashback Rp 250rb di Shopee Mall Attaya Official',
    badge: 'SHOPEE MALL OFFICIAL',
    bgGradient: 'from-[#EE4D2D] via-[#FF7337] to-[#C93B1B]',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
    ctaText: 'Beli di Shopee Mall',
    targetUrl: 'https://shopee.co.id/attayabeautyluxe',
    platform: 'Shopee',
    isActive: true,
  },
  {
    id: 'banner-2',
    title: 'TikTok LIVE Shopping & Exclusive Bundles',
    subtitle: 'Nonton LIVE Stream dr. Aurelia Sp.DVE setiap jam 19.00 WIB. Klaim Voucher LIVE TikTok Shop s/d Rp 500rb!',
    badge: 'TIKTOK SHOP LIVE',
    bgGradient: 'from-[#000000] via-[#25F4EE] to-[#FE2C55]',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800',
    ctaText: 'Gabung LIVE TikTok',
    targetUrl: 'https://vt.tiktok.com/attayabeautyluxe',
    platform: 'TikTok',
    isActive: true,
  },
  {
    id: 'banner-3',
    title: 'Tokopedia Beauty Fair Flash Deal',
    subtitle: 'Beli Attaya Rose Gold Serum di Tokopedia Official Store. Extra TokoPoints 5x & Cicilan 0% hingga 12 Bulan!',
    badge: 'TOKOPEDIA BEAUTY',
    bgGradient: 'from-[#03AC0E] via-[#218838] to-[#125C21]',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=800',
    ctaText: 'Belanja di Tokopedia',
    targetUrl: 'https://tokopedia.com/attayabeautyluxe',
    platform: 'Tokopedia',
    isActive: true,
  },
  {
    id: 'banner-4',
    title: 'Private Clinic Diamond Treatment Voucher',
    subtitle: 'Diskon 25% Reservasi Treatment Laser & Facial 24K Gold di Flagship Clinic Senayan City',
    badge: 'LUXE CLINIC PROMO',
    bgGradient: 'from-[#141414] via-[#332A15] to-[#8C6B1F]',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800',
    ctaText: 'Klaim Voucher Klinik',
    targetUrl: '#clinic',
    platform: 'AttayaLuxe',
    isActive: true,
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Attaya Luxe Rose Gold Cell Revival Serum 30ml',
    brand: 'Attaya Beauty Luxe',
    category: 'Skincare',
    subcategory: 'Anti-Aging Serum',
    price: 1850000,
    originalPrice: 2100000,
    rating: 4.9,
    reviewCount: 142,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
    description: 'Elixir anti-aging mewah diformulasikan dengan 24K Gold Flakes, Stem Cell Bunga Rose Damask, dan Quadruple Hyaluronic Acid untuk regenerasi sel kulit maksimal dan kilau awet muda.',
    ingredients: ['24K Pure Gold', 'Damask Rose Stem Cell', 'Peptide Complex', 'Niacinamide 5%', 'Sodium Hyaluronate'],
    benefits: ['Mengencangkan kerutan halus', 'Mencerahkan kulit kusam secara instan', 'Meningkatkan elastisitas & hidrasi 24 jam', 'Merangsang kolagen alami'],
    howToUse: 'Teteskan 3-4 tetes serum pada wajah dan leher yang telah dibersihkan. Tepuk lembut dengan gerakan memutar ke atas setiap pagi dan malam.',
    skinTypeMatch: ['Dry', 'Normal', 'Combination', 'Sensitive', 'All'],
    volume: '30 ml / 1.0 fl. oz.',
    isBestSeller: true,
    isNew: false,
    inStock: true,
    shopeeUrl: 'https://shopee.co.id/attaya-rose-gold-serum-i.12345678',
    tiktokUrl: 'https://vt.tiktok.com/attaya-rose-gold-serum',
    tokopediaUrl: 'https://tokopedia.com/attayabeauty/rose-gold-serum',
  },
  {
    id: 'prod-2',
    name: 'Attaya Diamond Radiance Cream Moisturizer 50g',
    brand: 'Attaya Beauty Luxe',
    category: 'Skincare',
    subcategory: 'Moisturizer',
    price: 1650000,
    rating: 4.8,
    reviewCount: 98,
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=800',
    description: 'Krim pelembab ultra-kaya dengan ekstrak bubuk berlian asli dan Squalane organik. Mengunci kelembaban hingga 72 jam sekaligus memberikan perlindungan dari radikal bebas.',
    ingredients: ['Micro Diamond Powder', 'Sugarcane Squalane', 'Ceramide NP', 'Centella Asiatica', 'Vitamin E'],
    benefits: ['Efek Glass Skin alami', 'Memperbaiki skin barrier yang rusak', 'Tekstur velvet halus non-greasy', 'Melindungi dari polusi perkotaan'],
    howToUse: 'Usapkan merata pada wajah setelah penggunaan serum. Gunakan siang dan malam untuk hasil optimal.',
    skinTypeMatch: ['Dry', 'Sensitive', 'Normal', 'Combination'],
    volume: '50 gram',
    isBestSeller: true,
    isNew: false,
    inStock: true,
    shopeeUrl: 'https://shopee.co.id/attaya-diamond-moisturizer-i.12345679',
    tiktokUrl: 'https://vt.tiktok.com/attaya-diamond-moisturizer',
    tokopediaUrl: 'https://tokopedia.com/attayabeauty/diamond-moisturizer',
  },
  {
    id: 'prod-3',
    name: 'Attaya Imperial Oud & Velvet Silk Eau de Parfum 100ml',
    brand: 'Attaya Parfum Luxe',
    category: 'Perfume',
    subcategory: 'Extrait de Parfum',
    price: 2750000,
    originalPrice: 3000000,
    rating: 5.0,
    reviewCount: 86,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800',
    description: 'Parfum kemewahan bangsawan yang memadukan agarwood (Oud) langka asal Kalimantan, Saffron Persia, Bulgar Rose, dan sentuhan hangat Vanilla Madagascar.',
    ingredients: ['Agarwood Essential Oil', 'Persian Saffron', 'Bulgarian Rose', 'Madagascar Vanilla', 'Musk Extra'],
    benefits: ['Ketahanan aroma hingga 18 jam', 'Sillage memikat dan tidak menyengat', 'Botol berlapis emas 18K khas Attaya'],
    howToUse: 'Semprotkan pada titik nadi seperti pergelangan tangan, belakang telinga, dan lipatan siku.',
    skinTypeMatch: ['All'],
    volume: '100 ml',
    isBestSeller: true,
    isNew: true,
    inStock: true,
    shopeeUrl: 'https://shopee.co.id/attaya-imperial-oud-i.12345680',
    tiktokUrl: 'https://vt.tiktok.com/attaya-imperial-oud',
    tokopediaUrl: 'https://tokopedia.com/attayabeauty/imperial-oud',
  },
  {
    id: 'prod-4',
    name: 'Attaya Silk Velvet Matte Lipstick - Royal Ruby',
    brand: 'Attaya Cosmetics',
    category: 'Cosmetics',
    subcategory: 'Lipstick',
    price: 450000,
    rating: 4.7,
    reviewCount: 114,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=800',
    description: 'Lipstik matte lembut seperti sutra yang memberikan pigmentasi intens sekali usap tanpa membuat bibir kering, diperkaya dengan Argan Oil & Shea Butter.',
    ingredients: ['Moroccan Argan Oil', 'Organic Shea Butter', 'Vitamin E', 'Rich Mineral Pigments'],
    benefits: ['Tahan hingga 12 jam', 'Transfer-resistant', 'Formula ringan tidak menggumpal', 'Nutrisi ekstra untuk bibir halus'],
    howToUse: 'Oleskan langsung pada bibir mulai dari pusat bibir hingga ke sudut luar.',
    skinTypeMatch: ['All'],
    shades: [
      { name: 'Royal Ruby', hex: '#8B0000' },
      { name: 'Rose Nude', hex: '#C77B7B' },
      { name: 'Imperial Coral', hex: '#D2691E' },
      { name: 'Velvet Plum', hex: '#4A0E17' },
    ],
    volume: '3.8 gram',
    isBestSeller: false,
    isNew: true,
    inStock: true,
    shopeeUrl: 'https://shopee.co.id/attaya-silk-velvet-lipstick-i.12345681',
    tiktokUrl: 'https://vt.tiktok.com/attaya-lipstick-ruby',
    tokopediaUrl: 'https://tokopedia.com/attayabeauty/silk-velvet-lipstick',
  },
  {
    id: 'prod-5',
    name: 'Attaya Gentle Botanical Cleansing Oil & Makeup Remover 150ml',
    brand: 'Attaya Botanicals',
    category: 'Skincare',
    subcategory: 'Cleanser',
    price: 550000,
    rating: 4.9,
    reviewCount: 77,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800',
    description: 'Pembersih wajah berbasis minyak botanikal alami yang melarutkan makeup waterproof dan kotoran penyumbat pori tanpa mengikis kelembaban alami kulit.',
    ingredients: ['Jojoba Seed Oil', 'Sweet Almond Oil', 'Chamomile Extract', 'Green Tea Leaf Extract'],
    benefits: ['Double cleansing sempurna', 'Menghilangkan sel kulit mati', 'Menenangkan kemerahan', 'Aroma aromaterapi menenangkan'],
    howToUse: 'Pijatkan 2-3 pompa pada wajah kering, beri sedikit air untuk mengemulsi menjadi cairan susu, lalu bilas hingga bersih.',
    skinTypeMatch: ['Dry', 'Oily', 'Combination', 'Sensitive', 'Normal', 'All'],
    volume: '150 ml',
    isBestSeller: false,
    isNew: false,
    inStock: true,
  },
  {
    id: 'prod-6',
    name: 'Attaya Crystal Nectar Facial Sunscreen SPF 50+ PA++++',
    brand: 'Attaya Beauty Luxe',
    category: 'Skincare',
    subcategory: 'Sunscreen',
    price: 620000,
    rating: 4.9,
    reviewCount: 203,
    image: 'https://images.unsplash.com/photo-1567928256565-d0144c9b2e04?auto=format&fit=crop&q=80&w=800',
    description: 'Tabir surya transparan tanpa whitecast dengan formula hybrid serum yang melindungi dari UVA, UVB, Blue Light, dan Infra-Red.',
    ingredients: ['Niacinamide', 'Adenosine', 'Cica Extract', 'Hybrid UV Filters'],
    benefits: ['Zero Whitecast', 'Memberikan efek dewy natural', 'Sebagai primer makeup tahan lama', 'Formula cepat meresap'],
    howToUse: 'Gunakan sebanyak 2 ruas jari pada seluruh wajah dan leher 15 menit sebelum beraktivitas di luar ruangan.',
    skinTypeMatch: ['Dry', 'Oily', 'Combination', 'Sensitive', 'Normal', 'All'],
    volume: '50 ml',
    isBestSeller: true,
    isNew: false,
    inStock: true,
  }
];

export const INITIAL_TREATMENTS: ClinicTreatment[] = [
  {
    id: 'treat-1',
    title: 'Attaya Diamond Microdermabrasion & Glowing Oxygen Infusion',
    subtitle: 'Treatment Wajah Mewah Eksklusif untuk Kulit Bercahaya Instan',
    durationMinutes: 90,
    price: 2500000,
    category: 'VIP Diamond Therapy',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800',
    description: 'Perawatan signature Attaya Clinic yang menggabungkan pengelupasan sel kulit mati dengan kepala diamond steril premium dan infus oksigen hiperbarik murni yang diperkaya serum Peptide Rose Gold.',
    benefits: [
      'Kulit langsung glowing & halus instan',
      'Merangsang sirkulasi darah dan kolagen',
      'Memudarkan flek hitam dan tekstur tidak merata',
      'Tanpa downtime (bisa langsung beraktivitas)'
    ],
    processSteps: [
      'Deep Cleansing & Steam Aromaterapi',
      'Exfoliation Diamond Head Precision',
      'Extraction Impurities Higenis',
      'Hyperbaric Oxygen Serum Infusion',
      'Cryo Gold Facial Massage & LED Light Therapy'
    ],
    targetedConcerns: ['Kulit Kusam', 'Tekstur Kasar', 'Pori-Pori Besar', 'Garis Halus'],
    recommendedInterval: '1 Kali Setiap 3-4 Minggu',
    doctorSpecialist: 'dr. Aurelia Attaya, Sp.DVE (Dokter Spesialis Kulit & Estetika)'
  },
  {
    id: 'treat-2',
    title: 'Pico Sure Gold Laser Anti-Pigmentation & Youth Tightening',
    subtitle: 'Teknologi Laser Picosecond Tercanggih untuk Flek & Anti-Aging',
    durationMinutes: 60,
    price: 3800000,
    category: 'Laser & Anti-Aging',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=800',
    description: 'Inovasi laser picosecond ultra-cepat yang menghancurkan pigmen melasma, bekas jerawat, dan menstimulasi regenerasi serat elastin tanpa merusak lapisan permukaan kulit.',
    benefits: [
      'Menghilangkan flek hitam & melasma bandel',
      'Mengencangkan kulit kendur di area pipi & leher',
      'Meratakan bekas jerawat kehitaman/kemerahan',
      'Hasil permanen dengan perawatan berkala'
    ],
    processSteps: [
      'Konsultasi 3D Skin Scanner',
      'Aplikasi Krim Anestesi Lokal 30 Menit',
      'Prosedur Pico Laser Target Presisi',
      'Cooling Mask Aloe Vera & EGF Serum',
      'Aplikasi Sunscreen Medis'
    ],
    targetedConcerns: ['Flek Hitam / Melasma', 'Hiperpigmentasi', 'Kulit Kendur', 'Bopeng Halus'],
    recommendedInterval: '1 Kali Setiap 1 Bulan',
    doctorSpecialist: 'dr. Raymond S., M.Biomed (Estetik Konsultan)'
  },
  {
    id: 'treat-3',
    title: 'Attaya Clear Pore Therapy with Blue LED & Salicylic Peel',
    subtitle: 'Solusi Tuntas untuk Kulit Berjerawat, Berminyak & Komedo',
    durationMinutes: 75,
    price: 1800000,
    category: 'Acne Clearance',
    image: 'https://images.unsplash.com/photo-1512290900676-26c2a48f4134?auto=format&fit=crop&q=80&w=800',
    description: 'Terapi pembersihan mendalam khusus jerawat aktif dan minyak berlebih. Menggunakan chemical peeling lembut medis dan LED Blue Light untuk membunuh bakteri P. acnes.',
    benefits: [
      'Keringkan jerawat aktif dalam 24-48 jam',
      'Mengurangi produksi sebum hingga 60%',
      'Mencegah timbulnya komedo baru',
      'Meredakan peradangan merah pada kulit'
    ],
    processSteps: [
      'Purifying Tea Tree Cleansing',
      'Medical Salicylic Exfoliation',
      'Pain-free Vacuum Extraction',
      'Blue Light Anti-Bacterial Therapy',
      'Calming Botanical Hydrogel Mask'
    ],
    targetedConcerns: ['Jerawat Aktif', 'Komedo', 'Kulit Berminyak Parah', 'Pori Tersumbat'],
    recommendedInterval: '1 Kali Setiap 2 Minggu saat breakout',
    doctorSpecialist: 'dr. Clara Vanya, Sp.DVE'
  },
  {
    id: 'treat-4',
    title: 'Royal Rose Quartz Hydra-Glow Facial Therapy',
    subtitle: 'Perawatan Relaksasi & Lembut Khusus Kulit Sensitif & Dehidrasi',
    durationMinutes: 60,
    price: 1500000,
    category: 'Facial Glow',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800',
    description: 'Facial relaksasi holistik memanfaatkan energi batu Rose Quartz asli dengan serum Rose Hips organik untuk mengembalikan kelembaban alami kulit yang lelah dan sensitif.',
    benefits: [
      'Menenangkan kulit kemerahan dan iritasi',
      'Drainase limfatik untuk mengurangi sembab',
      'Nourishing kelembaban maksimal',
      'Sensasi aroma terapi mawar alami yang menenangkan'
    ],
    processSteps: [
      'Warm Floral Towel Compress',
      'Mild Organic Milk Cleansing',
      'Guasha Sculpting Massage Rose Quartz',
      'Pure Rose Hydrosol Mask',
      'Moisture Seal Cream Treatment'
    ],
    targetedConcerns: ['Kulit Dehidrasi', 'Sensitif / Kemerahan', 'Sembab Wajah', 'Stres Kusam'],
    recommendedInterval: '1 Kali Setiap 2 Minggu',
    doctorSpecialist: 'Ners Estetik Senior Attaya Luxe'
  }
];

export const INITIAL_JOURNAL: JournalArticle[] = [
  {
    id: 'journal-1',
    title: 'Rahasia Kulit Glass Skin dengan Formulasi 24K Gold & Stem Cell Rose',
    slug: 'rahasia-kulit-glass-skin-gold-rose',
    category: 'Skincare Guide',
    excerpt: 'Temukan bagaimana kombinasi partikel emas 24K dan sel punca mawar Damaskus merevolusi perawatan anti-aging modern untuk kilau mewah yang bertahan lama.',
    content: `
# Keajaiban Emas 24K & Stem Cell Bunga Rose Damask

Selama berabad-abad, emas murni telah digunakan oleh para bangsawan Mesir dan Asia sebagai rahasia awet muda. Dalam era kosmetik modern di **Attaya Beauty Luxe**, teknologi nano-gold memungkinkan partikel emas 24 karat menembus hingga lapisan epidermis terdalam.

## Mengapa Emas 24K Sangat Efektif?
Emas memiliki sifat anti-inflamasi alami dan bertindak sebagai stimulator mikro-sirkulasi darah. Ketika diaplikasikan pada kulit wajah:
1. **Mempercepat Regenerasi Sel:** Mengaktifkan basal sel untuk mengganti jaringan kulit tua.
2. **Menghambat Penurunan Kolagen:** Mencegah degradasi serat elastin akibat radikal bebas.
3. **Pencerah Alami:** Memberikan refleks cahaya (luminous bounce) alami pada kulit.

## Peran Stem Cell Bunga Rose Damask
Diambil dari kelopak mawar terbaik di lembah Bulgaria, ekstrak stem cell mawar kaya akan flavonoid dan polifenol. Ketika digabungkan dengan **Quadruple Hyaluronic Acid**, kelembaban terikat sempurna hingga 72 jam.

> *"Kecantikan sejati adalah perpaduan antara kemewahan alam dan presisi sains medis."* - **dr. Aurelia Attaya, Sp.DVE**
    `,
    author: 'Tim Pakar Dermatologi Attaya Luxe',
    date: '01 Agustus 2026',
    image: 'https://images.unsplash.com/photo-1512290900676-26c2a48f4134?auto=format&fit=crop&q=80&w=800',
    readTimeMinutes: 5,
    tags: ['Glass Skin', 'Gold 24K', 'Anti Aging', 'Attaya Guide']
  },
  {
    id: 'journal-2',
    title: 'Bagaimana AI Skin Consultation Mengubah Cara Anda Memilih Skincare',
    slug: 'ai-skin-consultation-teknologi-masa-depan',
    category: 'AI Technology',
    excerpt: 'Tidak ada lagi trial-and-error. Teknologi Gemini AI di Attaya Beauty Luxe mampu menganalisis masalah kulit secara presisi hanya dalam hitungan detik.',
    content: `
# Era Baru Diagnostic Skincare dengan Kecerdasan Buatan

Membeli skincare secara acak seringkali berujung pada iritasi atau hasil yang kurang maksimal karena jenis kulit setiap individu adalah unik. Di **Attaya Beauty Luxe**, kami memadukan ilmu dermatologi klinis dengan **AI Skin Diagnostic System**.

## Cara Kerja AI Skin Advisor Kami
1. **Analisis Parameter Visual & Kuis:** Mengidentifikasi tingkat dehidrasi, kerutan, produksi sebum, dan indikator inflamasi.
2. **Matching Formula Presisi:** Memadukan profil kulit Anda dengan database bahan aktif kami.
3. **Rekomendasi Personal Pagi & Malam:** Menyusun urutan pemakaian skincare dan treatment klinik yang tepat sasaran.

Mulai konsultasi AI Anda secara gratis hari ini di menu **AI Skin Advisor**!
    `,
    author: 'Attaya AI Research Lab',
    date: '28 Juli 2026',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
    readTimeMinutes: 4,
    tags: ['AI Skincare', 'Attaya Technology', 'Rekomendasi Kulit', 'Dermatology']
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    targetId: 'prod-1',
    targetType: 'product',
    userName: 'Clarissa P., S.H.',
    rating: 5,
    date: '02 Agustus 2026',
    comment: 'Serum Rose Gold nya luar biasa! Dalam 1 minggu flek halus memudar dan kulit berasa kencang banget. Wanginya sangat mewah dan elegan!',
    verifiedPurchase: true
  },
  {
    id: 'rev-2',
    targetId: 'treat-1',
    targetType: 'treatment',
    userName: 'Nadia Setyo, M.B.A.',
    rating: 5,
    date: '30 Juli 2026',
    comment: 'Treatment Diamond Microdermabrasion di klinik Attaya benar-benar VIP experience. Dokternya sangat detail dan setelah treatment muka glowing seketika!',
    verifiedPurchase: true
  }
];

export const INITIAL_USER_PROFILE: UserProfile = {
  id: 'usr-luxe-001',
  name: 'Lady Victoria Attaya',
  email: 'victoria@attayabeauty.com',
  phone: '+62 812 8899 7788',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
  tier: 'Platinum Luxe',
  points: 12500,
  skinType: 'Kombinasi cenderung Dehidrasi',
  wishlistProductIds: ['prod-1', 'prod-3'],
  savedBookingsCount: 1
};
