import { Product, ClinicTreatment, TreatmentBooking, Order, AISkinAnalysisResult, JournalArticle, Review, UserProfile, AdBanner } from '../types';
import { INITIAL_PRODUCTS, INITIAL_TREATMENTS, INITIAL_JOURNAL, INITIAL_REVIEWS, INITIAL_USER_PROFILE, INITIAL_AD_BANNERS } from '../data/mockData';

const KEYS = {
  PRODUCTS: 'attaya_products_v1',
  TREATMENTS: 'attaya_treatments_v1',
  BOOKINGS: 'attaya_bookings_v1',
  ORDERS: 'attaya_orders_v1',
  JOURNAL: 'attaya_journal_v1',
  REVIEWS: 'attaya_reviews_v1',
  USER: 'attaya_user_v1',
  AI_LOGS: 'attaya_ai_logs_v1',
  CART: 'attaya_cart_v1',
  BANNERS: 'attaya_banners_v1',
  ADMIN_PASS: 'attaya_admin_pass_v1',
};

// Initialize default storage if empty
export const initializeStorage = () => {
  if (!localStorage.getItem(KEYS.PRODUCTS)) {
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
  }
  if (!localStorage.getItem(KEYS.TREATMENTS)) {
    localStorage.setItem(KEYS.TREATMENTS, JSON.stringify(INITIAL_TREATMENTS));
  }
  if (!localStorage.getItem(KEYS.JOURNAL)) {
    localStorage.setItem(KEYS.JOURNAL, JSON.stringify(INITIAL_JOURNAL));
  }
  if (!localStorage.getItem(KEYS.REVIEWS)) {
    localStorage.setItem(KEYS.REVIEWS, JSON.stringify(INITIAL_REVIEWS));
  }
  if (!localStorage.getItem(KEYS.USER)) {
    localStorage.setItem(KEYS.USER, JSON.stringify(INITIAL_USER_PROFILE));
  }
  if (!localStorage.getItem(KEYS.BANNERS)) {
    localStorage.setItem(KEYS.BANNERS, JSON.stringify(INITIAL_AD_BANNERS));
  }
  if (!localStorage.getItem(KEYS.ADMIN_PASS)) {
    localStorage.setItem(KEYS.ADMIN_PASS, 'ATTAYA2026');
  }
  if (!localStorage.getItem(KEYS.BOOKINGS)) {
    // Default initial booking
    const sampleBooking: TreatmentBooking = {
      id: 'book-1001',
      bookingNumber: 'ATL-BK-2026-0801',
      userId: INITIAL_USER_PROFILE.id,
      userName: INITIAL_USER_PROFILE.name,
      userPhone: INITIAL_USER_PROFILE.phone,
      userEmail: INITIAL_USER_PROFILE.email,
      treatmentId: INITIAL_TREATMENTS[0].id,
      treatmentTitle: INITIAL_TREATMENTS[0].title,
      treatmentPrice: INITIAL_TREATMENTS[0].price,
      date: '2026-08-10',
      timeSlot: '14:00 - 15:30 WIB',
      therapist: 'dr. Aurelia Attaya, Sp.DVE',
      status: 'Terkonfirmasi',
      notes: 'Harap siapkan sampel serum Rose Gold.',
      createdAt: new Date().toISOString()
    };
    localStorage.setItem(KEYS.BOOKINGS, JSON.stringify([sampleBooking]));
  }
  if (!localStorage.getItem(KEYS.ORDERS)) {
    localStorage.setItem(KEYS.ORDERS, JSON.stringify([]));
  }
  if (!localStorage.getItem(KEYS.AI_LOGS)) {
    localStorage.setItem(KEYS.AI_LOGS, JSON.stringify([]));
  }
};

// Products API
export const getStoredProducts = (): Product[] => {
  initializeStorage();
  try {
    const data = localStorage.getItem(KEYS.PRODUCTS);
    return data ? JSON.parse(data) : INITIAL_PRODUCTS;
  } catch (e) {
    console.error('Error loading products from storage', e);
    return INITIAL_PRODUCTS;
  }
};

export const saveProduct = (product: Product): Product[] => {
  const products = getStoredProducts();
  const index = products.findIndex(p => p.id === product.id);
  if (index >= 0) {
    products[index] = product;
  } else {
    products.unshift(product);
  }
  localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
  return products;
};

export const deleteProduct = (id: string): Product[] => {
  const products = getStoredProducts().filter(p => p.id !== id);
  localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
  return products;
};

// Clinic Treatments API
export const getStoredTreatments = (): ClinicTreatment[] => {
  initializeStorage();
  try {
    const data = localStorage.getItem(KEYS.TREATMENTS);
    return data ? JSON.parse(data) : INITIAL_TREATMENTS;
  } catch (e) {
    return INITIAL_TREATMENTS;
  }
};

export const saveTreatment = (treatment: ClinicTreatment): ClinicTreatment[] => {
  const treatments = getStoredTreatments();
  const index = treatments.findIndex(t => t.id === treatment.id);
  if (index >= 0) {
    treatments[index] = treatment;
  } else {
    treatments.unshift(treatment);
  }
  localStorage.setItem(KEYS.TREATMENTS, JSON.stringify(treatments));
  return treatments;
};

// Bookings API
export const getStoredBookings = (): TreatmentBooking[] => {
  initializeStorage();
  try {
    const data = localStorage.getItem(KEYS.BOOKINGS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const createBooking = (bookingData: Omit<TreatmentBooking, 'id' | 'bookingNumber' | 'createdAt'>): TreatmentBooking => {
  const bookings = getStoredBookings();
  const randomId = Math.floor(1000 + Math.random() * 9000);
  const newBooking: TreatmentBooking = {
    ...bookingData,
    id: `book-${Date.now()}`,
    bookingNumber: `ATL-BK-${new Date().getFullYear()}-${randomId}`,
    createdAt: new Date().toISOString()
  };
  bookings.unshift(newBooking);
  localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(bookings));
  return newBooking;
};

export const updateBookingStatus = (id: string, status: TreatmentBooking['status']): TreatmentBooking[] => {
  const bookings = getStoredBookings();
  const index = bookings.findIndex(b => b.id === id);
  if (index >= 0) {
    bookings[index].status = status;
    localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(bookings));
  }
  return bookings;
};

// Orders API
export const getStoredOrders = (): Order[] => {
  initializeStorage();
  try {
    const data = localStorage.getItem(KEYS.ORDERS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>): Order => {
  const orders = getStoredOrders();
  const randomId = Math.floor(10000 + Math.random() * 90000);
  const newOrder: Order = {
    ...orderData,
    id: `ord-${Date.now()}`,
    orderNumber: `ATL-ORD-${randomId}`,
    createdAt: new Date().toISOString(),
    trackingNumber: `ATL-EXPRESS-${Math.floor(100000 + Math.random() * 900000)}`
  };
  orders.unshift(newOrder);
  localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
  return newOrder;
};

export const updateOrderStatus = (id: string, status: Order['status']): Order[] => {
  const orders = getStoredOrders();
  const index = orders.findIndex(o => o.id === id);
  if (index >= 0) {
    orders[index].status = status;
    localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
  }
  return orders;
};

// AI Analysis Logs API
export const getStoredAILogs = (): AISkinAnalysisResult[] => {
  initializeStorage();
  try {
    const data = localStorage.getItem(KEYS.AI_LOGS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const saveAILog = (analysis: AISkinAnalysisResult): AISkinAnalysisResult[] => {
  const logs = getStoredAILogs();
  logs.unshift(analysis);
  localStorage.setItem(KEYS.AI_LOGS, JSON.stringify(logs));
  return logs;
};

// User Profile API
export const getStoredUser = (): UserProfile => {
  initializeStorage();
  try {
    const data = localStorage.getItem(KEYS.USER);
    return data ? JSON.parse(data) : INITIAL_USER_PROFILE;
  } catch (e) {
    return INITIAL_USER_PROFILE;
  }
};

export const saveUser = (user: UserProfile): UserProfile => {
  localStorage.setItem(KEYS.USER, JSON.stringify(user));
  return user;
};

// Journal Articles
export const getStoredJournal = (): JournalArticle[] => {
  initializeStorage();
  try {
    const data = localStorage.getItem(KEYS.JOURNAL);
    return data ? JSON.parse(data) : INITIAL_JOURNAL;
  } catch (e) {
    return INITIAL_JOURNAL;
  }
};

// Reviews API
export const getStoredReviews = (): Review[] => {
  initializeStorage();
  try {
    const data = localStorage.getItem(KEYS.REVIEWS);
    return data ? JSON.parse(data) : INITIAL_REVIEWS;
  } catch (e) {
    return INITIAL_REVIEWS;
  }
};

export const addReview = (review: Omit<Review, 'id' | 'date'>): Review[] => {
  const reviews = getStoredReviews();
  const newReview: Review = {
    ...review,
    id: `rev-${Date.now()}`,
    date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
  };
  reviews.unshift(newReview);
  localStorage.setItem(KEYS.REVIEWS, JSON.stringify(reviews));
  return reviews;
};

// Cart API
export const getStoredCart = () => {
  initializeStorage();
  try {
    const data = localStorage.getItem(KEYS.CART);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const saveCart = (cart: any[]) => {
  localStorage.setItem(KEYS.CART, JSON.stringify(cart));
  return cart;
};

// Banners API
export const getStoredBanners = (): AdBanner[] => {
  initializeStorage();
  try {
    const data = localStorage.getItem(KEYS.BANNERS);
    return data ? JSON.parse(data) : INITIAL_AD_BANNERS;
  } catch (e) {
    return INITIAL_AD_BANNERS;
  }
};

export const saveBanners = (banners: AdBanner[]): AdBanner[] => {
  localStorage.setItem(KEYS.BANNERS, JSON.stringify(banners));
  return banners;
};

// Admin Password API
export const getAdminPassword = (): string => {
  initializeStorage();
  return localStorage.getItem(KEYS.ADMIN_PASS) || 'ATTAYA2026';
};

export const saveAdminPassword = (newPassword: string): void => {
  localStorage.setItem(KEYS.ADMIN_PASS, newPassword);
};

// Live Chat Logs API
export const getStoredLiveChats = (): any[] => {
  initializeStorage();
  try {
    const data = localStorage.getItem('attaya_live_chats_v1');
    return data ? JSON.parse(data) : [
      {
        id: 'msg-101',
        senderName: 'Siti Aminah (Blora)',
        senderRole: 'user',
        message: 'Halo CS Attaya Blora, klinik di Jl. Pemuda Alun-Alun Blora buka sampai jam berapa ya?',
        timestamp: '10:15 WIB',
        userPhone: '0812-9876-5432'
      },
      {
        id: 'msg-102',
        senderName: 'dr. Aurelia AI / Admin',
        senderRole: 'ai',
        message: 'Halo Kak Siti! Klinik Attaya Luxe Blora buka setiap hari dari jam 08.00 - 21.00 WIB. Dokter Spesialis Sp.DVE standby untuk konsultasi.',
        timestamp: '10:16 WIB'
      }
    ];
  } catch (e) {
    return [];
  }
};

export const saveLiveChats = (messages: any[]): any[] => {
  localStorage.setItem('attaya_live_chats_v1', JSON.stringify(messages));
  return messages;
};

// Unified storageService helper object export
export const storageService = {
  getProducts: getStoredProducts,
  saveProduct,
  deleteProduct,
  getTreatments: getStoredTreatments,
  saveTreatment,
  getBookings: getStoredBookings,
  createBooking,
  updateBookingStatus,
  saveBookings: (bookings: TreatmentBooking[]) => localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(bookings)),
  getOrders: getStoredOrders,
  createOrder,
  updateOrderStatus,
  saveOrders: (orders: Order[]) => localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders)),
  getAILogs: getStoredAILogs,
  addAILog: saveAILog,
  getUser: getStoredUser,
  saveUser,
  getJournal: getStoredJournal,
  getReviews: getStoredReviews,
  addReview,
  getCart: getStoredCart,
  saveCart,
  saveProducts: (products: Product[]) => localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products)),
  getBanners: getStoredBanners,
  saveBanners,
  getAdminPassword,
  saveAdminPassword,
  getLiveChats: getStoredLiveChats,
  saveLiveChats,
};

export default storageService;

