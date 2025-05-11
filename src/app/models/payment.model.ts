// src/app/models/payment.model.ts
export interface Payment {
  id: number;
  tripId: number;
  riderId: number;
  driverId: number;
  amount: number;
  paymentMethod: string;
  status: string;
}
