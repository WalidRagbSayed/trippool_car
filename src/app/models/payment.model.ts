// models/payment.model.ts
export interface Payment {
  id: string;
  tripId: string;
  riderId: string;
  driverId: string;
  amount: number;
  paymentMethod: string;
  status: 'Completed' | 'Failed' | 'Pending' | 'Refunded';
  createdAt: Date;
  riderName?: string;
  driverName?: string;
}