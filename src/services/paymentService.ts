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

class PaymentService {
  private config: MidtransSnapConfig = {
    clientKey: ((import.meta as unknown) as { env: Record<string, string> }).env?.VITE_MIDTRANS_CLIENT_KEY || 'SB-Mid-client-ATTAYA123456',
    merchantId: 'G123456789',
    isProduction: false,
  };

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
}

export const paymentService = new PaymentService();
