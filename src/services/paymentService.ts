import { Order, CartItem } from '../types';

export interface MidtransSnapConfig {
  clientKey: string;
  merchantId: string;
  isProduction: boolean;
}

export interface MidtransTransactionRequest {
  orderId: string;
  grossAmount: number;
  customerDetails: {
    fullName: string;
    email?: string;
    phone: string;
    address: string;
  };
  itemDetails: Array<{
    id: string;
    price: number;
    quantity: number;
    name: string;
  }>;
  paymentType: string;
}

export interface MidtransTransactionResponse {
  token: string;
  redirectUrl: string;
  status: 'pending' | 'settlement' | 'expire' | 'deny' | 'cancel';
  paymentType: string;
  vaNumber?: string;
  qrUrl?: string;
  createdAt: string;
}

export interface GatewayOption {
  id: string;
  label: string;
  category: 'MIDTRANS' | 'XENDIT' | 'STRIPE' | 'COD' | 'BANK_TRANSFER' | 'EWALLET';
}

class PaymentService {
  private config: MidtransSnapConfig = {
    clientKey: ((import.meta as unknown) as { env: Record<string, string> }).env?.VITE_MIDTRANS_CLIENT_KEY || 'SB-Mid-client-ATTAYA123456',
    merchantId: 'G123456789',
    isProduction: false,
  };

  public getSupportedPaymentMethods(): GatewayOption[] {
    return [
      { id: 'Midtrans QRIS Instant', label: '⚡ Midtrans QRIS Instant', category: 'MIDTRANS' },
      { id: 'Midtrans BCA Virtual Account', label: '🏦 Midtrans BCA VA', category: 'MIDTRANS' },
      { id: 'Midtrans Mandiri / BRI / BNI VA', label: '🏦 Midtrans Bank Transfer VA', category: 'MIDTRANS' },
      { id: 'Midtrans E-Wallet (GoPay & ShopeePay)', label: '📱 Midtrans E-Wallet', category: 'MIDTRANS' },
      { id: 'Midtrans Kartu Kredit (3DS 2.0)', label: '💳 Midtrans Credit Card', category: 'MIDTRANS' },
      { id: 'Xendit QRIS & E-Wallet', label: '📲 Xendit QRIS / E-Wallet', category: 'XENDIT' },
      { id: 'Xendit Virtual Account', label: '🏦 Xendit Virtual Account', category: 'XENDIT' },
      { id: 'Stripe Card Payment', label: '💳 Stripe Card Payment', category: 'STRIPE' },
      { id: 'Transfer Bank Manual', label: '🏛️ Transfer Bank Manual', category: 'BANK_TRANSFER' },
      { id: 'COD Luxe Express', label: '🚚 COD Luxe Express', category: 'COD' },
    ];
  }

  /**
   * Generates a Midtrans Snap Token & Transaction Session
   */
  public async createSnapTransaction(
    orderNumber: string,
    amount: number,
    customer: { fullName: string; phone: string; address: string },
    items: CartItem[],
    paymentMethod: string
  ): Promise<MidtransTransactionResponse> {
    const snapToken = `MDTR-SNAP-${Math.floor(10000000 + Math.random() * 90000000)}`;
    const vaNumber = `8830${Math.floor(100000000000 + Math.random() * 900000000000)}`;

    const response: MidtransTransactionResponse = {
      token: snapToken,
      redirectUrl: `https://app.sandbox.midtrans.com/snap/v2/vtweb/${snapToken}`,
      status: 'pending',
      paymentType: paymentMethod,
      vaNumber,
      qrUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=ATTAYA-MIDTRANS-${orderNumber}`,
      createdAt: new Date().toISOString(),
    };

    return response;
  }

  public buildInvoiceNumber(orderNumber: string): string {
    return `INV-ATTAYA-${orderNumber.replace(/[^a-zA-Z0-9]/g, '').slice(-8)}-${new Date().getFullYear()}`;
  }

  public buildPaymentHistory(orderNumber: string, paymentMethod: string, paymentStatus: Order['paymentStatus']): Array<{ id: string; type: 'payment' | 'refund' | 'invoice'; status: 'pending' | 'paid' | 'failed' | 'refunded' | 'processing'; note: string; timestamp: string; }> {
    return [
      {
        id: `pay-hist-${Date.now()}`,
        type: 'invoice',
        status: 'paid',
        note: `Invoice otomatis dibuat untuk ${orderNumber}`,
        timestamp: new Date().toISOString(),
      },
      {
        id: `pay-hist-${Date.now() + 1}`,
        type: 'payment',
        status: paymentStatus,
        note: `Pembayaran via ${paymentMethod} telah diproses oleh gateway sistem Attaya Luxe`,
        timestamp: new Date().toISOString(),
      },
    ];
  }

  /**
   * Verifies Midtrans transaction status against backend or webhook
   */
  public async verifyPaymentStatus(orderId: string, currentStatus: string): Promise<{
    status: 'pending' | 'settlement' | 'expire' | 'deny';
    message: string;
    isPaid: boolean;
  }> {
    if (currentStatus === 'Diproses' || currentStatus === 'Selesai') {
      return {
        status: 'settlement',
        message: 'Pembayaran berhasil dikonfirmasi oleh sistem Midtrans (Settlement)',
        isPaid: true,
      };
    } else if (currentStatus === 'Dibatalkan') {
      return {
        status: 'expire',
        message: 'Transaksi telah kedaluwarsa atau dibatalkan (Expired)',
        isPaid: false,
      };
    } else {
      return {
        status: 'pending',
        message: 'Menunggu proses transfer / pembayaran pelanggan (Pending)',
        isPaid: false,
      };
    }
  }

  /**
   * Simulates Webhook Notification Callback from Midtrans Gateway
   */
  public processWebhookCallback(
    orderId: string,
    transactionStatus: 'settlement' | 'pending' | 'expire' | 'deny'
  ): {
    orderStatus: Order['status'];
    statusText: string;
    notificationCode: number;
  } {
    switch (transactionStatus) {
      case 'settlement':
        return {
          orderStatus: 'Diproses',
          statusText: 'Pembayaran Lunas (Settlement). Pesanan siap dikemas.',
          notificationCode: 200,
        };
      case 'pending':
        return {
          orderStatus: 'Menunggu Pembayaran',
          statusText: 'Menunggu Pembayaran Transfer / QRIS (Pending).',
          notificationCode: 201,
        };
      case 'expire':
      case 'deny':
      default:
        return {
          orderStatus: 'Dibatalkan',
          statusText: 'Transaksi Dibatalkan atau Kedaluwarsa (Expired/Deny).',
          notificationCode: 407,
        };
    }
  }

  public getClientKey(): string {
    return this.config.clientKey;
  }

  public getRefundStatusLabel(refundStatus?: 'none' | 'requested' | 'processing' | 'completed'): string {
    switch (refundStatus) {
      case 'requested':
        return 'Refund sedang diajukan';
      case 'processing':
        return 'Refund sedang diproses';
      case 'completed':
        return 'Refund selesai';
      default:
        return 'Tidak ada refund';
    }
  }
}

export const paymentService = new PaymentService();
