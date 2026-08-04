export type ProductCategory = 'Skincare' | 'Cosmetics' | 'Perfume' | 'Treatment Kit';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  subcategory: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  ingredients: string[];
  benefits: string[];
  howToUse: string;
  skinTypeMatch: Array<'Dry' | 'Oily' | 'Combination' | 'Sensitive' | 'Normal' | 'All'>;
  shades?: { name: string; hex: string }[];
  volume: string;
  isBestSeller?: boolean;
  isNew?: boolean;
  inStock: boolean;
  shopeeUrl?: string;
  tiktokUrl?: string;
  tokopediaUrl?: string;
}

export interface AdBanner {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  bgGradient: string;
  image: string;
  ctaText: string;
  targetUrl: string;
  platform: 'Shopee' | 'TikTok' | 'Tokopedia' | 'AttayaLuxe' | 'Sponsor';
  isActive: boolean;
}

export interface ClinicTreatment {
  id: string;
  title: string;
  subtitle: string;
  durationMinutes: number;
  price: number;
  category: 'Facial Glow' | 'Laser & Anti-Aging' | 'Acne Clearance' | 'VIP Diamond Therapy';
  image: string;
  description: string;
  benefits: string[];
  processSteps: string[];
  targetedConcerns: string[];
  recommendedInterval: string;
  doctorSpecialist: string;
}

export interface TreatmentBooking {
  id: string;
  bookingNumber: string;
  userId: string;
  userName: string;
  userPhone: string;
  userEmail: string;
  treatmentId: string;
  treatmentTitle: string;
  treatmentPrice: number;
  date: string;
  timeSlot: string;
  therapist: string;
  status: 'Menunggu Konfirmasi' | 'Terkonfirmasi' | 'Selesai' | 'Batal';
  notes?: string;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedShade?: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  notes?: string;
}

export interface PaymentHistoryEntry {
  id: string;
  type: 'payment' | 'refund' | 'invoice';
  status: 'pending' | 'paid' | 'failed' | 'refunded' | 'processing';
  note: string;
  timestamp: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  grandTotal: number;
  status: 'Menunggu Pembayaran' | 'Diproses' | 'Dikirim' | 'Selesai' | 'Dibatalkan';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: string;
  invoiceNumber?: string;
  refundStatus?: 'none' | 'requested' | 'processing' | 'completed';
  paymentHistory?: PaymentHistoryEntry[];
  shippingAddress: ShippingAddress;
  createdAt: string;
  trackingNumber?: string;
}

export interface AISkinAnalysisResult {
  id?: string;
  skinType: 'Normal' | 'Dry' | 'Oily' | 'Combination' | 'Sensitive';
  score: number;
  hydrationLevel: number;
  agingScore: number;
  clarityScore: number;
  primaryConcern: string;
  secondaryConcerns: string[];
  summary: string;
  recommendedProductIds: string[];
  recommendedTreatmentIds: string[];
  morningRoutine: string[];
  eveningRoutine: string[];
  analysisDate: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  tier: 'Silver Luxe' | 'Gold Luxe' | 'Platinum Luxe';
  points: number;
  skinType?: string;
  wishlistProductIds: string[];
  savedBookingsCount: number;
}

export interface JournalArticle {
  id: string;
  title: string;
  slug: string;
  category: 'Skincare Guide' | 'Beauty Clinic' | 'Perfumerie' | 'AI Technology';
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  readTimeMinutes: number;
  tags: string[];
}

export interface Review {
  id: string;
  targetId: string;
  targetType: 'product' | 'treatment';
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface LiveChatMessage {
  id: string;
  senderName: string;
  senderRole: 'user' | 'ai' | 'admin';
  message: string;
  timestamp: string;
  userPhone?: string;
  userEmail?: string;
}

